from flask import Flask, request, jsonify
from google.cloud import storage
import tensorflow as tf
import numpy as np
import os
import psycopg2
import jwt
from datetime import datetime
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Konfigurasi bucket dan path model di GCS
BUCKET_NAME = 'budgy-storage'
MODEL_PATH = 'models/my_model.keras'  # Lokasi model di dalam bucket GCS

# Fungsi untuk memuat model dari GCS
def load_model_from_gcs(bucket_name, model_path):
    """Memuat model langsung dari Google Cloud Storage."""
    model_uri = f'gs://{bucket_name}/{model_path}'
    model = tf.keras.models.load_model(model_uri)
    print(f"Model loaded from GCS: {model_uri}")
    return model

# Muat model langsung saat aplikasi dimulai
model = load_model_from_gcs(BUCKET_NAME, MODEL_PATH)

# Memuat file .env
load_dotenv()

# Ambil JWT_SECRET dari environment variable
JWT_SECRET = os.getenv('JWT_SECRET')


# Fungsi untuk memverifikasi token dan mendapatkan user_id
def get_user_id_from_token(token):
    try:
        # Verifikasi token dengan secret key yang sama
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload['id']
    except jwt.ExpiredSignatureError:
        raise Exception('Token expired')
    except jwt.InvalidTokenError:
        raise Exception('Invalid token')


# Fungsi untuk mengambil saldo dan target dari PostgreSQL Cloud SQL
def get_data_from_db(user_id):
    """Mengambil saldo dan target dari PostgreSQL berdasarkan user_id."""
    try:
        db_socket_dir = '/cloudsql'  # Lokasi default Cloud SQL socket
        instance_connection_name = 'budgy-money-tracker:asia-southeast2:money-tracker'
        
        conn = psycopg2.connect(
            user="postgres",
            password="123123",
            dbname="postgres",
            host=f"{db_socket_dir}/{instance_connection_name}"
        )

        cursor = conn.cursor()
        cursor.execute("""
            SELECT saldo.nominal AS saldo_nominal, target.nominal AS target_nominal
            FROM saldo
            JOIN target ON saldo.user_id = target.user_id
            WHERE saldo.user_id = %s
            LIMIT 1;
        """, (user_id,))
        
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            saldo_nominal, target_nominal = result
            return saldo_nominal, target_nominal
        else:
            return None, None
    except Exception as e:
        print(f"Error retrieving data from Cloud SQL: {e}")
        return None, None

# Fungsi untuk menyimpan rekomendasi ke tabel rekomendasi
def save_rekomendasi(user_id, nominal_rekomendasi):
    """Menyimpan nominal rekomendasi dan tanggal ke dalam tabel rekomendasi."""
    try:
        db_socket_dir = '/cloudsql'  # Lokasi default Cloud SQL socket
        instance_connection_name = 'budgy-money-tracker:asia-southeast2:money-tracker'
        
        conn = psycopg2.connect(
            user="postgres",
            password="123123",
            dbname="postgres",
            host=f"{db_socket_dir}/{instance_connection_name}"
        )

        cursor = conn.cursor()
        current_timestamp = datetime.utcnow()  # Mengambil waktu UTC
        cursor.execute("""
            INSERT INTO rekomendasi (user_id, nominal, tanggal)
            VALUES (%s, %s, %s);
        """, (user_id, nominal_rekomendasi, current_timestamp))
        
        conn.commit()
        cursor.close()
        conn.close()

    except Exception as e:
        print(f"Error saving recommendation to database: {e}")

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/generate_rekomendasi', methods=['POST'])
def generate_rekomendasi():
    try:
        # Ambil token dari header Authorization
        token = request.headers.get('Authorization').split(" ")[1]
        
        # Dapatkan user_id dari token
        user_id = get_user_id_from_token(token)

        # Ambil data dari request
        data = request.get_json()
        saldo_nominal = data.get('saldo')
        target_nominal = data.get('target')

        if saldo_nominal is None or target_nominal is None:
            return jsonify({'error': 'Saldo and target are required'}), 400

        input_features = np.array([[saldo_nominal, target_nominal]])  # Bentuk array 2D

        # Prediksi dengan model
        prediction = model.predict(input_features)
        nominal_rekomendasi = float(prediction[0][0])

        # Simpan hasil rekomendasi ke tabel rekomendasi
        save_rekomendasi(user_id, nominal_rekomendasi)

        return jsonify({'nominal_rekomendasi': nominal_rekomendasi, 'status': 'success'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/rekomendasi', methods=['GET'])
def get_rekomendasi():
    try:
        # Ambil rekomendasi terbaru dari database
        db_socket_dir = '/cloudsql'  # Lokasi default Cloud SQL socket
        instance_connection_name = 'budgy-money-tracker:asia-southeast2:money-tracker'
        
        conn = psycopg2.connect(
            user="postgres",
            password="123123",
            dbname="postgres",
            host=f"{db_socket_dir}/{instance_connection_name}"
        )

        cursor = conn.cursor()
        cursor.execute("""
            SELECT nominal, tanggal
            FROM rekomendasi
            ORDER BY tanggal DESC
            LIMIT 1;
        """)
        
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            nominal_rekomendasi, tanggal = result
            return jsonify({
                'nominal_rekomendasi': nominal_rekomendasi,
                'tanggal': tanggal.isoformat()
            })

        return jsonify({'error': 'No recommendation found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

port = int(os.environ.get("PORT", 8080))
app.run(host="0.0.0.0", port=port)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
