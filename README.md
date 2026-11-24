# 🏗️ Portfolio Web — Full-Stack Personal Portfolio

> A full-stack personal portfolio web application built with **React** (frontend) and **Flask** (backend), powered by **Supabase** for database & authentication.

---

## 📋 Project Description

This is a personal portfolio website that allows the owner to showcase their profile, project catalog, resume history (education, work experience, certifications), and receive messages from visitors. The application is divided into two main parts:

### 🌐 Public Pages (Visitors)
| Page | Description |
|---|---|
| **Landing Page** (`/`) | Hero section, marquee gallery, about, journey (education, work experience, certifications), project list, services, testimonials, and CTA |
| **Project Detail** (`/project/:slug`) | Detailed view of each project by slug |
| **Contact** (`/contact`) | Contact form to send direct messages to the portfolio owner |
| **404 Not Found** (`/*`) | Catch-all page for undefined routes |

### 🔒 Admin Dashboard (Protected)
| Page | Description |
|---|---|
| **Login** (`/login`) | Admin authentication via email & password (Supabase Auth + JWT) |
| **Admin Dashboard** (`/admin/dashboard`) | CRUD panel to manage Projects, Resume/Journey, Profile, and Messages |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, Vite, Tailwind CSS v4, Axios |
| **Backend** | Python, Flask, Flask-RESTful, Flask-CORS, Flasgger (Swagger UI) |
| **Database & Auth** | Supabase (PostgreSQL + Auth) |
| **Data Validation** | Pydantic v2 (backend) |
| **API Authentication** | JWT (PyJWT) — Token valid for 7 days |
| **Deployment** | Frontend: Vercel · Backend: Gunicorn-ready |

---

## 📁 Project Structure

```
UTS-Pemweb/
├── backend/
│   ├── middleware/           # Middleware / decorators
│   │   ├── auth.py           # JWT token verification decorator
│   │   └── rate_limit.py     # Sliding window rate limiter per IP
│   ├── resources/            # Flask-RESTful resource classes (endpoint handlers)
│   │   ├── auth.py           # Login endpoint
│   │   ├── messages.py       # Public & admin messages CRUD
│   │   ├── profile.py        # Public & admin profile
│   │   ├── projects.py       # Public & admin projects CRUD
│   │   └── resume.py         # Public & admin resume CRUD
│   ├── utils/                # Helper modules
│   │   ├── responses.py      # Standardized response format (success/error envelope)
│   │   └── validators.py     # Pydantic schemas & input validation
│   ├── app.py                # Flask entry point — initialization & route registration
│   ├── config.py             # Env config, Supabase client, Swagger template
│   ├── requirements.txt      # Python dependencies
│   └── .example.env          # Example environment variables
│
├── frontend/
│   ├── public/               # Static assets (favicon, icons)
│   ├── src/
│   │   ├── assets/           # Images (hero, logo)
│   │   ├── components/       # Reusable components
│   │   │   ├── admin/        # Admin tabs (ProjectsTab, ResumeTab, ProfileTab, MessagesTab)
│   │   │   ├── landing/      # Landing sections (Hero, About, Journey, Projects, etc.)
│   │   │   ├── AlertBanner.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Icons.jsx
│   │   │   ├── MarkdownRenderer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── SkeletonBlueprint.jsx
│   │   ├── data/             # Fallback mock data
│   │   ├── pages/            # Main pages
│   │   │   ├── admin/        # AdminDashboard.jsx
│   │   │   ├── auth/         # Login.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── ProjectDetail.jsx
│   │   ├── services/         # API service layer (axios abstraction)
│   │   │   ├── apiClient.js  # Axios instance + interceptors (auth & 401 handler)
│   │   │   ├── authService.js
│   │   │   ├── messageService.js
│   │   │   ├── profileService.js
│   │   │   ├── projectService.js
│   │   │   ├── resumeService.js
│   │   │   └── index.js      # Barrel export
│   │   ├── App.jsx           # Main router & global interceptor
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json           # Vercel deployment config (SPA rewrite + security headers)
│   └── .example.env          # Example environment variables
│
├── .gitignore
└── README.md                 # ← You are here
```

---

## 🔌 REST API Endpoints

### Public (No Authentication Required)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile` | Retrieve profile data |
| `GET` | `/api/projects` | List published projects |
| `GET` | `/api/projects/<slug>` | Project detail by slug |
| `POST` | `/api/messages` | Send a message from visitor (rate-limited) |
| `GET` | `/api/resume` | List resume items (education, work, certifications) |

### Admin (JWT Bearer Token Required)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Admin login → receive JWT token |
| `POST` | `/api/admin/profile` | Create/update profile |
| `GET` | `/api/admin/projects` | All projects (including drafts) |
| `POST` | `/api/admin/projects` | Add new project |
| `PUT` | `/api/admin/projects/<id>` | Edit project |
| `DELETE` | `/api/admin/projects/<id>` | Delete project |
| `GET` | `/api/admin/messages` | List incoming messages |
| `PUT` | `/api/admin/messages/<id>` | Update message read status |
| `DELETE` | `/api/admin/messages/<id>` | Delete message |
| `POST` | `/api/admin/resume` | Add new resume item |
| `PUT` | `/api/admin/resume/<id>` | Edit resume item |
| `DELETE` | `/api/admin/resume/<id>` | Delete resume item |

> 📖 Interactive Swagger UI documentation is available at `http://localhost:5000/apidocs` when the backend is running.

---

## 🚀 Installation & Running Locally

### Prerequisites

Make sure the following are installed on your machine:
- **Python** ≥ 3.10 — [Download](https://www.python.org/downloads/)
- **Node.js** ≥ 18 (or **Bun**) — [Download Node](https://nodejs.org/) / [Download Bun](https://bun.sh/)
- **Git** — [Download](https://git-scm.com/)
- **Supabase** account (free) — [supabase.com](https://supabase.com/)

---

### 1️⃣ Clone Repository

```bash
git clone <REPOSITORY_URL>
cd UTS-Pemweb
```

---

### 2️⃣ Backend Setup (Flask)

```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows (CMD):
venv\Scripts\activate
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Backend Environment Configuration

Copy the example file and fill in your Supabase credentials:

```bash
copy .example.env .env     # Windows
# cp .example.env .env     # macOS / Linux
```

Edit `backend/.env`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SECRET_KEY="your_random_secret_key_for_jwt"
FRONTEND_URL=http://localhost:5173
```

> **Note:** `SUPABASE_URL` and `SUPABASE_KEY` can be obtained from **Supabase Dashboard** → **Settings** → **API**.

#### Run Backend

```bash
python app.py
```

The backend will be running at **`http://127.0.0.1:5000`**.

---

### 3️⃣ Frontend Setup (React + Vite)

Open a **new terminal** (keep the backend running):

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (choose one)
npm install
# or
bun install
```

#### Frontend Environment Configuration

Copy the example file and fill it in:

```bash
copy .example.env .env     # Windows
# cp .example.env .env     # macOS / Linux
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

#### Run Frontend

```bash
npm run dev
# or
bun dev
```

The frontend will be running at **`http://localhost:5173`**.

---

### 4️⃣ Database Setup (Supabase)

Create the following tables in Supabase SQL Editor:

```sql
-- Profiles Table
CREATE TABLE profiles (
    id BIGINT PRIMARY KEY,
    full_name TEXT,
    role TEXT,
    bio_text TEXT,
    resume_url TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    content TEXT,
    image_url TEXT,
    tech_stack TEXT[],
    github_url TEXT,
    live_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    message_body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume Items Table
CREATE TABLE resume_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,         -- 'education', 'work', 'certification', 'organization'
    title TEXT NOT NULL,
    organization TEXT,
    period TEXT,
    description TEXT,
    badge_label TEXT,
    badge_color TEXT DEFAULT 'blue',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> ⚠️ Make sure **Row Level Security (RLS)** is configured accordingly so public endpoints can read data and admin endpoints can write data.

---

## ✅ Verification

Once everything is running, open your browser:

| Service | URL |
|---|---|
| **Frontend** | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://127.0.0.1:5000](http://127.0.0.1:5000) |
| **Swagger Docs** | [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs) |

---

## 📄 License

This project is proprietary and intended for personal use only.
