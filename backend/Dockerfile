# Gunakan image Node.js resmi sebagai dasar
FROM node:16

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Install Cloud SQL Proxy (optional, jika menggunakan Cloud SQL)
ADD https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 /cloud_sql_proxy
RUN chmod +x /cloud_sql_proxy

# Expose port 8080, sesuai dengan port yang digunakan oleh Cloud Run
EXPOSE 8080



# Set entrypoint untuk menjalankan Cloud SQL Proxy dan aplikasi Node.js
CMD /cloud_sql_proxy -dir=/cloudsql & npm start
