# DevOps-WebApp-Project
A DevOps project showcasing the deployment and management of a web application built with Node.js, Redis, GitHub Actions, Vagrant, and Ansible. It includes a CI/CD pipeline, infrastructure provisioning, and automated testing.

## Table of Contents
1	Project Overview

2	 Features

3	Technologies Used

4	Setup Instructions

    Prerequisites
  
    Local Setup
  
    GitHub Actions CI/CD
  
    Vagrant and Ansible Setup
  
5	Project Structure



## Project Overview
This is a Node.js Express app (backend) and React app (frontend), using MongoDB as the database and Redis for caching. 
The app allows users to perform CRUD operations (Create, Read, Update, Delete) for managing employees via a form. The application is fully containerized and runs inside Docker, Kubernetes, and Istio, with monitoring via Prometheus and Grafana.
It includes automated testing (unit, integration tests) and health checks ,CI/CD pipeline using GitHub Actions and provisioning using Vagrant and Ansible.


## Features
### API:
Create, read, update, and delete users.
Health check endpoint (/health).
### Testing:
Unit tests, API tests, and configuration tests.
### CI/CD Pipeline:
Automated testing and deployment using GitHub Actions.
### Infrastructure as Code (IaC):
Provisioning with Vagrant and Ansible.
### Containerization:
Docker image creation and orchestration with Docker Compose and Kubernetes.


## Technologies Used
- Node.js (Express) – Backend API

- React.js – Frontend UI

- MongoDB – Database for storing employee data

- Redis – Caching layer

- Docker & Docker Compose – Containerization

- Kubernetes & Minikube – Orchestration

- Istio – Service Mesh

- Prometheus & Grafana – Monitoring

- Swagger – API Documentation
  
- Vagrant – Virtual machine provisioning

- Ansible – Configuration management


## Setup Instructions
- Ensure you have installed:

- Docker

- Docker Compose

- Kubernetes (kubectl)

- Minikube

- Istio CLI (istioctl)

- Node.js & NPM

- Vagrant

- Ansible

## Local Setup
1. Clone the repository: ```sh
git clone https://github.com/wafa26/DevOps-WebApp-Project.git
cd DevOps-WebApp-Project/userWebApi
```


## 2. Install Dependencies:

```sh
npm install --save-dev nodemon jest supertest
npm install express mongoose redis ejs swagger-jsdoc swagger-ui-express dotenv body-parser cors
```

## 3. Setup Environment Variables

Create a `.env` file in both `frontend/` and `backend/src/`.

Example `.env`:

```sh
PORT=5000
MONGO_URI=mongodb://mongo:27017/employeeDB
REDIS_HOST=redis-service
REDIS_PORT=6379
```

## 4. Build and Run Containers:

```sh
npm install --save-dev nodemon jest supertest
```

## 4. Access the App & API Documentation:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api/employees](http://localhost:5000/api/employees)
- **Swagger UI Documentation:** [http://localhost:5000/docs](http://localhost:5000/docs)

## 5. Run Tests:

```sh
docker exec -it userwebapi_backend npm test
```

## 6. Verify MongoDB and Redis Are Running

- **Check MongoDB:**

```sh
docker exec -it userwebapi_mongo mongosh
use employeeDB
db.employees.find().pretty()
```

- **Check Redis:**

```sh
docker exec -it userwebapi_redis redis-cli
keys *
```

## GitHub Actions CI/CD:

The CI/CD pipeline is configured using GitHub Actions. It automatically runs tests and deploys the application.

### Workflow File

The workflow file is located at `.github/workflows/ci.yml`. It performs the following steps:
- Checks out the repository.
- Sets up Node.js.
- Installs dependencies.
- Runs tests.
- Deploys the application (if tests pass).

### Triggering the Pipeline

The pipeline is triggered on every push to the main branch.

## Vagrant and Ansible Setup

Vagrant is used to create a virtual machine, and Ansible is used to provision it.

### Vagrantfile

The `Vagrantfile` is located in the `iac/` directory. It configures a VM with:
- `centos/7`

### Ansible Playbook

The Ansible playbook (`iac/playbooks/setup.yml`) installs:
- Node.js.
- Redis.

### Steps to Run

Navigate to the `iac/` directory:

```sh
cd iac
```

Start the VM:

```sh
vagrant up
```

SSH into the VM:

```sh
vagrant ssh
```

Verify the setup:
- Check if Node.js and Redis are installed.
- Run the application inside the VM.

## Deploying to Kubernetes (Minikube):

### 1. Start Minikube:

```sh
minikube start
```

### 2. Deploy Services to Kubernetes:

```sh
kubectl apply -f k8s/
```

### 3. Start Minikube Tunnel in a Separate Terminal:

```sh
minikube tunnel
```

### 4. Verify Pods & Services:

```sh
kubectl get pods -n userwebapi
kubectl get svc -n userwebapi
```

### Expose Ingress Nginx in Minikube:

Since Minikube Ingress does not use `minikube ip`, you must use `127.0.0.1`.
Edit `/etc/hosts` (Windows: `C:\Windows\System32\drivers\etc\hosts`) and add:

```sh
127.0.0.1 userwebapi.local
```

## 5. Monitoring with Prometheus & Grafana:

### Enable Minikube Metrics Server:

```sh
minikube addons enable metrics-server
```

### Configure Host File for Prometheus & Grafana:

```sh
127.0.0.1 prometheus.local
127.0.0.1 grafana.local
```

### Access Monitoring Dashboards:

```sh
Prometheus: http://prometheus.local
Grafana: http://grafana.local
```

### Import Grafana Dashboard:

1. Go to Grafana → Click **Import Dashboard** → Use **Dashboard ID 3119**
2. Select **Prometheus** as the data source
3. Click **Import**

### Check Grafana Dashboard:

1. Click ☰ → **Dashboards** → **Manage**
2. Open your dashboard
3. If no data appears, click **"Edit Panel"**
4. Under Queries, check:
   - **Data Source** = Prometheus
   - `http_requests_total` → run query → data appears

## 6. Deploying with Istio (Already Configured in `k8s/istio/`):

### Verify Istio Setup:

```sh
kubectl get pods -n istio-system
kubectl get svc istio-ingressgateway -n istio-system
```

**If `EXTERNAL-IP` is `127.0.0.1`, start Minikube Tunnel**

### Restart Deployments to Enable Istio:

```sh
kubectl rollout restart deployment backend -n userwebapi
kubectl rollout restart deployment frontend -n userwebapi
```

### Access the App via Istio Gateway:

```sh
http://127.0.0.1/
```

## Docker Hub Images:

- **Backend Image:** [Docker Hub - Backend](https://hub.docker.com/repository/docker/wafa2616/userwebapi-backend/general)
  - (`v1` and `v2`, `v2` with Istio metrics enabled and `app.js` modified to allow Istio metrics)

- **Frontend Image:** [Docker Hub - Frontend](https://hub.docker.com/repository/docker/wafa2616/userwebapi-frontend/general)

## Summary of Key Commands

### Run Locally:

```sh
docker-compose up --build -d
```

### Deploy to Kubernetes:

```sh
kubectl apply -f k8s/
```

### Deploy with Vagrant & Ansible:

```sh
vagrant up
ansible-playbook -i inventory setup.yml
```

### Use Istio:

```sh
kubectl apply -f k8s/istio/
```

## Conclusion:

Node.js & React web app is now running inside Docker, Kubernetes, Istio, Vagrant, and Ansible, with monitoring via Prometheus and Grafana.

## Project Structure

```
.github/
  workflows/
    ci.yml
    ci-with-containers.yml
userwebapi/
  src/                 # Application source code
  test/                # Test files
  package.json         # Node.js dependencies
  Dockerfile           # Docker configuration
iac/
  Vagrantfile          # Vagrant configuration
  playbooks/
    setup.yml          # Ansible Playbook
README.md              # Project documentation
```


  playbooks/
    
    setup.yml          

README.md              # Project documentation
