# 🚀 Story Post Project

A full-stack web application with:

* 🖥️ **Frontend** (Next.js / React)
* ⚙️ **Backend** (Node.js + Express)
* 🗄️ **Database** (MySQL)
* 🐳 **Dockerized setup**
* ☁️ **Deployed on AWS EC2**
* 🔄 **Manual CI/CD using GitHub Actions**

---

## 📦 Tech Stack

* Frontend: Next.js / React
* Backend: Node.js, Express
* Database: MySQL
* Containerization: Docker & Docker Compose
* Deployment: AWS EC2
* CI/CD: GitHub Actions

---

## 📁 Project Structure

```
Story-Post-project/
│── client/        # Frontend (Next.js)
│── server/        # Backend (Express API)
│── docker-compose.yml
│── README.md
```

---

## ⚙️ Environment Variables

### 🔹 Client (`client/.env`)

```
NEXT_PUBLIC_API_URL=http://<EC2_PUBLIC_IP>:8000/api
```

---

### 🔹 Server (`server/.env`)

```
PORT=8000

DB_HOST=db
DB_USER=weboconnect_user
DB_PASSWORD=weboconnect_pass
DB_NAME=weboconnect
```

---

## 🐳 Run Locally with Docker

```bash
docker-compose up -d --build
```

App will be available at:

* Frontend → http://localhost:3000
* Backend → http://localhost:8000

---

## ☁️ Deployment (AWS EC2)

### 1. Setup EC2

* Install Docker & Docker Compose
* Clone repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd Story-Post-project
```

---

### 2. Run Application

```bash
docker-compose up -d --build
```

Access app:

```
http://<EC2_PUBLIC_IP>:3000
```

---

### 3. Open Required Ports (Security Group)

* 3000 → Frontend
* 8000 → Backend
* 22 → SSH

---

## 🔄 CI/CD (Manual Deployment)

This project uses GitHub Actions for manual deployment.

---

### 📄 Workflow File

```
.github/workflows/deploy.yml
```

---

### ⚙️ GitHub Secrets Required

| Secret Name | Description            |
| ----------- | ---------------------- |
| EC2_HOST    | EC2 Public IP          |
| EC2_USER    | ubuntu                 |
| EC2_SSH_KEY | EC2 private key (.pem) |

---

### 🚀 Deployment Process

1. Go to **GitHub → Actions**
2. Select **Deploy to EC2**
3. Click **Run workflow**

---

### 🔧 Deployment Script

```bash
cd ~/Story-Post-project
git pull origin main
docker-compose down
docker-compose up -d --build
```

---

## 🧪 Health Check (Optional)

Add in backend:

```js
app.get("/health", (req, res) => {
  res.send("OK");
});
```

Test:

```bash
curl http://localhost:8000/health
```

---

## ⚠️ Notes

* Do NOT expose MySQL port (3306) in production
* Use environment variables for sensitive data
* Replace `<EC2_PUBLIC_IP>` with your actual server IP

---

## 📌 Future Improvements

* 🔐 Add HTTPS (SSL with Nginx)
* 🌐 Use custom domain
* ⚡ Zero-downtime deployment
* 📦 Docker image optimization
* 🔄 Auto deployment pipeline

---

## 👨‍💻 Author

Your Name

---

## ⭐ License

This project is open-source and available under the MIT License.
