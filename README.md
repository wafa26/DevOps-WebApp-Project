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
This project is a Employee API built with Node.js and Redis. It provides CRUD functionality for employees and includes:
Automated testing (unit, integration tests).
CI/CD pipeline using GitHub Actions.
Infrastructure provisioning using Vagrant and Ansible.
Containerization with Docker and orchestration with Kubernetes.

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
Backend: Node.js, Express.js
Database: Redis
Testing: Jest
CI/CD: GitHub Actions
Infrastructure: Vagrant, Ansible
Containerization: Docker, Docker Compose, Kubernetes
Monitoring: Prometheus, Grafana

## Setup Instructions
Prerequisites
Node.js: Install Node.js (v20).
Redis: Install Redis.
Vagrant: Install Vagrant.
Ansible: Install Ansible.
Docker: Install Docker.
GitHub Account: Required for GitHub Actions.

## Local Setup
1. Clone the repository:git clone https://github.com/your-username/DevOps-WebApp-Project.git
cd DevOps-WebApp-Project/userapi
2. Install dependencies:
npm install
3. Start the Redis server:
redis-server
4. Run the application:
npm start
5. Run tests:
npm test

## GitHub Actions CI/CD
The CI/CD pipeline is configured using GitHub Actions. It automatically runs tests and deploys the application.
### Workflow File
The workflow file is located at .github/workflows/ci-cd.yml. It performs the following steps:
Checks out the repository.
Sets up Node.js.
Installs dependencies.
Runs tests.
Deploys the application (if tests pass).
### Triggering the Pipeline
The pipeline is triggered on every push to the main branch.
### Vagrant and Ansible Setup
Vagrant is used to create a virtual machine, and Ansible is used to provision it.

Vagrantfile
The Vagrantfile is located in the iac/ directory. It configures a VM with:
centos/7

### Ansible Playbook
The Ansible playbook (iac/playbooks/setup.yml) installs:
Node.js.
Redis.

## Application dependencies.

Steps to Run
Navigate to the iac/ directory:
In bash terminal:
cd iac
Start the VM:
vagrant up
SSH into the VM:
vagrant ssh
Verify the setup:
Check if Node.js and Redis are installed.
Run the application inside the VM.


## Project Structure
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
    
    setup.yml          

README.md              # Project documentation
