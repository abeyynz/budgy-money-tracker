# Gunakan image Python
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Salin file requirements.txt dan instal dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file proyek
COPY . .

# Set Google Application Credentials
ENV GOOGLE_APPLICATION_CREDENTIALS=credentials.json

# Salin file kredensial (pastikan sudah dibuat sebelumnya)
COPY credentials.json /app/credentials.json

# Ekspos port untuk Flask
EXPOSE 8080

# Jalankan aplikasi
CMD ["python", "app.py"]
