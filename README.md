# Kruskal-Wallis Test

Python FastAPI backend and a React (TanStack) frontend for performing the Kruskal-Wallis H-test.

## Prerequisites

- **Python**: >= 3.12
- **Node.js**: >= 22 (Recommended)
- **uv**: (Optional, for Python dependency management)
- **Docker**: (Optional, for containerized frontend)

## Backend 

The backend is a FastAPI application that handles the statistical computations.

### 1. Navigate to the directory
```bash
cd be
```

### 2. Install Dependencies

**Using `uv` (Recommended):**
```bash
# Sync dependencies and create virtual environment
uv sync
```

**Using `pip` (Standard):**
```bash
# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -e .
```

### 3. Run the Development Server

**Using `uv`:**
```bash
uv run fastapi dev main.py
```

**Standard:**
```bash
fastapi dev main.py
```

The API will be available at [http://localhost:8000](http://localhost:8000).
Interactive documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Frontend

The frontend is a modern React application built with Vite, Tailwind CSS, and TanStack libraries.

### 1. Navigate to the directory
```bash
cd fe
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

`Frontend with Docker 🐳`

```bash
# Run from the project root
docker build -t kruskal-wallis-fe ./fe
docker run -p 8080:80 kruskal-wallis-fe
```
