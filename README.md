# pre-intern-task-telkom

Sistem manajemen perpustakaan kampus dengan:
- Backend: Go (Echo, GORM, PostgreSQL)
- Frontend: React (CRA)

Fitur utama:
- Manajemen buku (CRUD) + stok
- Manajemen pengguna (CRUD)
- Peminjaman & pengembalian buku
	- Stok buku otomatis berkurang saat dipinjam
	- Stok buku otomatis bertambah saat dikembalikan
	- Buku yang sedang dipinjam tidak bisa dihapus
- Dashboard statistik (total buku, user, peminjaman, buku yang sedang dipinjam, top user, top buku)

---

## Struktur Project

- [backend](backend)
	- API server (Echo)
	- Koneksi & migrasi database (GORM + PostgreSQL)
	- Folder utama:
		- [main.go](backend/main.go) – entrypoint server
		- [database/config.go](backend/database/config.go) – koneksi DB & AutoMigrate
		- [model/schema.go](backend/model/schema.go) – definisi tabel (Buku, Pengguna, Peminjaman, Dashboard DTO)
		- [handlers](backend/handlers) – handler API (buku, pengguna, peminjaman, dashboard)
- [frontend](frontend)
	- Aplikasi React (Create React App)
	- Folder utama:
		- [src/app/Admin.js](frontend/src/app/Admin.js) – layout utama admin
		- [src/app/Dashboard.js](frontend/src/app/Dashboard.js) – dashboard statistik
		- [src/components](frontend/src/components) – tabel, modal form, kartu statistik
		- [src/services/api.js](frontend/src/services/api.js) – konfigurasi Axios

---

## Prasyarat

Pastikan sudah terinstall:

- Go (disarankan minimal 1.20)
- Node.js + npm (minimal Node 16)
- Database PostgreSQL / Supabase instance

### Environment Variable Backend

Di folder [backend](backend) gunakan file `.env` dengan isi minimal:

```env
DB_URL=postgresql://USER:PASSWORD@HOST:PORT/postgres?sslmode=require
```

Contoh pola (jangan commit credential asli):

```env
DB_URL=postgresql://postgres:mysecret@localhost:5432/postgres?sslmode=disable
```

Backend akan otomatis:
- Membaca `DB_URL` dari `.env`
- Menjalankan `AutoMigrate` untuk tabel `buku`, `pengguna`, dan `peminjaman`

---

## Menjalankan Backend (API Server)

1. Masuk ke folder backend:

	 ```bash
	 cd backend
	 ```

2. (Opsional) Unduh dependency Go:

	 ```bash
	 go mod tidy
	 ```

3. Pastikan file `.env` sudah berisi `DB_URL` yang benar.

4. Jalankan server:

	 ```bash
	 go run main.go
	 ```

5. Jika sukses, akan muncul log:

	 ```
	 We're in!
	 ⇨ http server started on :8080
	 ```

6. API base URL:

	 - `http://localhost:8080/api`

	 Endpoint utama:

	 - Buku
		 - `GET    /api/buku`
		 - `GET    /api/buku/:id`
		 - `POST   /api/buku`
		 - `PUT    /api/buku/:id`
		 - `DELETE /api/buku/:id`
	 - Pengguna
		 - `GET    /api/pengguna`
		 - `GET    /api/pengguna/:id`
		 - `POST   /api/pengguna`
		 - `PUT    /api/pengguna/:id`
		 - `DELETE /api/pengguna/:id`
	 - Peminjaman
		 - `GET    /api/peminjaman`
		 - `GET    /api/peminjaman/:id`
		 - `POST   /api/peminjaman`
		 - `PUT    /api/peminjaman/:id/return` – mengembalikan buku (stok +1)
		 - `DELETE /api/peminjaman/:id`
	 - Dashboard
		 - `GET    /api/dashboard/stats`
		 - `GET    /api/dashboard/top-users`
		 - `GET    /api/dashboard/top-books`

---

## Menjalankan Frontend (React)

1. Buka terminal baru, masuk ke folder frontend:

	 ```bash
	 cd frontend
	 ```

2. Install dependency:

	 ```bash
	 npm install
	 ```

3. Jalankan aplikasi React:

	 ```bash
	 npm start
	 ```

4. Buka di browser:

	 - `http://localhost:3000`

Frontend akan melakukan request ke backend dengan base URL:

```js
// frontend/src/services/api.js
baseURL: "http://localhost:8080/api"
```

Pastikan backend sudah jalan di port `8080` sebelum membuka frontend.

---

## Cara Pakai Aplikasi

### 1. Dashboard

- Menampilkan kartu statistik:
	- Total Buku
	- Total User
	- Total Peminjaman
	- Buku Dipinjam (jumlah peminjaman aktif / status "dipinjam")
- Tabel:
	- Top User (berdasarkan total durasi peminjaman)
	- Top Buku (berdasarkan total durasi dipinjam)
	- Recent Peminjaman (peminjaman terbaru)

### 2. Manajemen Buku

- Menu Buku memungkinkan:
	- Menambah buku baru dengan stok awal
	- Mengubah data buku (termasuk stok)
	- Menghapus buku **hanya jika tidak sedang dipinjam**
- Logika stok:
	- Saat peminjaman dibuat (`POST /api/peminjaman`), stok buku otomatis berkurang 1
	- Saat buku dikembalikan (`PUT /api/peminjaman/:id/return`), stok buku otomatis bertambah 1

### 3. Manajemen Pengguna

- Menu Pengguna memungkinkan:
	- Menambah user baru
	- Mengubah data user
	- Menghapus user (disarankan hanya jika tidak memiliki peminjaman aktif)

### 4. Peminjaman Buku

- Untuk membuat peminjaman:
	- Pilih pengguna dan buku
	- Isi tanggal pengembalian
	- Backend akan:
		- Validasi stok buku (`stok > 0`)
		- Validasi tanggal pengembalian (harus setelah tanggal pinjam)
		- Menyimpan record peminjaman dengan status `dipinjam`
		- Mengurangi stok buku 1
- Untuk mengembalikan buku:
	- Gunakan aksi "Return" / "Kembalikan" di tabel peminjaman
	- Backend akan:
		- Mengisi tanggal pengembalian
		- Mengubah status (mis. menjadi `selesai`)
		- Menambah stok buku 1

---

## Catatan & Troubleshooting Singkat

- **Port 8080 sudah dipakai**
	- Error: `listen tcp :8080: bind: Only one usage of each socket address ...`
	- Solusi: pastikan tidak ada instance backend lain yang masih jalan, atau ganti port di [backend/main.go](backend/main.go) dan [frontend/src/services/api.js](frontend/src/services/api.js).

- **Koneksi DB gagal / 500 dari API**
	- Cek terminal backend untuk pesan error detail (mis: credential salah, host tidak bisa diakses, dsb.).
	- Pastikan `DB_URL` benar dan database bisa diakses dari mesin lokal.

- **Frontend error `Request failed with status code 500`**
	- Artinya ada error di backend; buka endpoint API langsung dari browser (mis. `http://localhost:8080/api/peminjaman`) untuk melihat pesan `{"error":"..."}` dan perbaiki dari sisi backend/database.

---

## Lisensi

Project ini untuk keperluan tugas/pre-intern. Silakan modifikasi sesuai kebutuhan internal.

