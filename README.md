# 🏗️ Portfolio Web — Full-Stack Personal Portfolio

> Aplikasi web portofolio personal full-stack dengan **React** (frontend) dan **Flask** (backend), menggunakan **Supabase** sebagai database & autentikasi. Dibangun untuk UTS mata kuliah Pemrograman Web Semester 3.

---

## 📋 Deskripsi Proyek

Proyek ini adalah sebuah website portofolio personal yang memungkinkan pemiliknya menampilkan profil, daftar proyek, riwayat pendidikan/kerja/sertifikasi (resume), serta menerima pesan dari pengunjung. Aplikasi terbagi menjadi dua bagian utama:

### 🌐 Halaman Publik (Pengunjung)
| Halaman | Deskripsi |
|---|---|
| **Landing Page** (`/`) | Hero section, marquee gallery, about, journey (pendidikan, pengalaman kerja, sertifikasi), daftar proyek, layanan, testimoni, dan CTA |
| **Detail Proyek** (`/project/:slug`) | Halaman detail dari setiap proyek berdasarkan slug |
| **Contact** (`/contact`) | Form kontak untuk mengirim pesan langsung ke pemilik portofolio |

### 🔒 Dashboard Admin (Terproteksi)
| Halaman | Deskripsi |
|---|---|
| **Login** (`/login`) | Autentikasi admin via email & password (Supabase Auth + JWT) |
| **Admin Dashboard** (`/admin/dashboard`) | Panel CRUD untuk mengelola Projects, Resume/Journey, Profile, dan Messages |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 19, React Router v7, Vite, Tailwind CSS v4, Axios |
| **Backend** | Python, Flask, Flask-RESTful, Flask-CORS, Flasgger (Swagger UI) |
| **Database & Auth** | Supabase (PostgreSQL + Auth) |
| **Autentikasi API** | JWT (PyJWT) — Token berlaku 7 hari |
| **Deployment** | Frontend: Vercel · Backend: (Gunicorn-ready) |

---

## 📁 Struktur Proyek

```
UTS-Pemweb/
├── backend/
│   ├── app.py              # Entry point Flask — semua resource & routing API
│   ├── requirements.txt    # Dependensi Python
│   ├── .env                # Variabel lingkungan (rahasia, tidak di-commit)
│   └── .example.env        # Contoh variabel lingkungan
│
├── frontend/
│   ├── public/             # Aset statis (favicon, icons)
│   ├── src/
│   │   ├── assets/         # Gambar (hero, logo)
│   │   ├── components/     # Komponen reusable (Navbar, Footer, Icons, dll.)
│   │   │   ├── admin/      # Komponen tab admin (ProjectsTab, ResumeTab, dll.)
│   │   │   └── landing/    # Komponen section landing (HeroSection, dll.)
│   │   ├── data/           # Mock data fallback
│   │   ├── pages/          # Halaman utama
│   │   │   ├── admin/      # AdminDashboard.jsx
│   │   │   ├── auth/       # Login.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── ProjectDetail.jsx
│   │   ├── App.jsx         # Router utama & axios interceptor
│   │   ├── main.jsx        # Entry point React
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json         # Konfigurasi deployment Vercel (SPA rewrite + security headers)
│   ├── .env                # Variabel lingkungan frontend
│   └── .example.env        # Contoh variabel lingkungan
│
├── .gitignore
└── README.md               # ← Anda di sini
```

---

## 🔌 REST API Endpoints

### Publik (Tanpa Autentikasi)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/profile` | Ambil data profil |
| `GET` | `/api/projects` | Daftar proyek yang dipublikasikan |
| `GET` | `/api/projects/<slug>` | Detail proyek berdasarkan slug |
| `POST` | `/api/messages` | Kirim pesan dari pengunjung |
| `GET` | `/api/resume` | Daftar riwayat (pendidikan, kerja, sertifikasi) |

### Admin (Memerlukan JWT Bearer Token)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/login` | Login admin → dapatkan token JWT |
| `POST` | `/api/admin/profile` | Buat/perbarui profil |
| `GET` | `/api/admin/projects` | Semua proyek (termasuk draft) |
| `POST` | `/api/admin/projects` | Tambah proyek baru |
| `PUT` | `/api/admin/projects/<id>` | Edit proyek |
| `DELETE` | `/api/admin/projects/<id>` | Hapus proyek |
| `GET` | `/api/admin/messages` | Daftar pesan masuk |
| `PUT` | `/api/admin/messages/<id>` | Update status baca pesan |
| `DELETE` | `/api/admin/messages/<id>` | Hapus pesan |
| `POST` | `/api/admin/resume` | Tambah riwayat baru |
| `PUT` | `/api/admin/resume/<id>` | Edit riwayat |
| `DELETE` | `/api/admin/resume/<id>` | Hapus riwayat |

> 📖 Dokumentasi interaktif Swagger UI tersedia di `http://localhost:5000/apidocs` saat backend berjalan.

---

## 🚀 Instalasi & Menjalankan Secara Lokal

### Prasyarat

Pastikan sudah terinstal di komputer Anda:
- **Python** ≥ 3.10 — [Download](https://www.python.org/downloads/)
- **Node.js** ≥ 18 (atau **Bun**) — [Download Node](https://nodejs.org/) / [Download Bun](https://bun.sh/)
- **Git** — [Download](https://git-scm.com/)
- Akun **Supabase** (gratis) — [supabase.com](https://supabase.com/)

---

### 1️⃣ Clone Repository

```bash
git clone <URL_REPOSITORY>
cd UTS-Pemweb
```

---

### 2️⃣ Setup Backend (Flask)

```bash
# Masuk ke folder backend
cd backend

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Windows (CMD):
venv\Scripts\activate
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# Install dependensi
pip install -r requirements.txt
```

#### Konfigurasi Environment Backend

Salin file contoh dan isi dengan kredensial Supabase Anda:

```bash
copy .example.env .env     # Windows
# cp .example.env .env     # macOS / Linux
```

Edit file `backend/.env`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SECRET_KEY="your_random_secret_key_for_jwt"
FRONTEND_URL=http://localhost:5173
```

> **Catatan:** `SUPABASE_URL` dan `SUPABASE_KEY` bisa didapatkan dari **Supabase Dashboard** → **Settings** → **API**.

#### Jalankan Backend

```bash
python app.py
```

Backend akan berjalan di **`http://127.0.0.1:5000`**.

---

### 3️⃣ Setup Frontend (React + Vite)

Buka terminal **baru** (biarkan backend tetap berjalan):

```bash
# Masuk ke folder frontend
cd frontend

# Install dependensi (pilih salah satu)
npm install
# atau
bun install
```

#### Konfigurasi Environment Frontend

Salin file contoh dan isi:

```bash
copy .example.env .env     # Windows
# cp .example.env .env     # macOS / Linux
```

Edit file `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

#### Jalankan Frontend

```bash
npm run dev
# atau
bun dev
```

Frontend akan berjalan di **`http://localhost:5173`**.

---

### 4️⃣ Setup Database (Supabase)

Buat tabel-tabel berikut di Supabase SQL Editor:

```sql
-- Tabel Profil
CREATE TABLE profiles (
    id BIGINT PRIMARY KEY,
    full_name TEXT,
    role TEXT,
    bio_text TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Proyek
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    tech_stack TEXT[],
    live_url TEXT,
    repo_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Pesan
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    message_body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Resume / Riwayat
CREATE TABLE resume_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,         -- 'education', 'work', 'certification'
    title TEXT NOT NULL,
    institution TEXT,
    description TEXT,
    start_date TEXT,
    end_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> ⚠️ Pastikan **Row Level Security (RLS)** dikonfigurasi sesuai kebutuhan agar endpoint publik bisa membaca data dan endpoint admin bisa menulis data.

---

## ✅ Verifikasi

Setelah semua berjalan, buka browser:

| Layanan | URL |
|---|---|
| **Frontend** | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://127.0.0.1:5000](http://127.0.0.1:5000) |
| **Swagger Docs** | [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs) |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik (UTS Pemrograman Web — Semester 3). Setelah penilaian berakhir akan kembali di private.
