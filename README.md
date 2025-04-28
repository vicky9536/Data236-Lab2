# UberEats Project - Frontend Setup and Testing Guide

Welcome to the UberEats Lab2 Project!

This guide will walk you through everything you need to **set up the environment** and **start testing** the frontend connected to the backend.

---

## Step 1: Install Prerequisites

Make sure you have these installed on your laptop:

- **Docker Desktop**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **kubectl** (Kubernetes command-line tool): [Install kubectl](https://kubernetes.io/docs/tasks/tools/)
- **Helm** (Kubernetes package manager): [Install Helm](https://helm.sh/docs/intro/install/)
- **Node.js and npm** (to run frontend): [Install Node.js](https://nodejs.org/)

---

## Step 2: Start Kubernetes

- Open Docker Desktop
- Go to **Settings** -> **Kubernetes** -> **Enable Kubernetes**
- Click **Apply & Restart**

Wait until Kubernetes says "Running."

Verify with:
```bash
kubectl get nodes
```
You should see `docker-desktop Ready`.

---

## Step 3: Set Up Kafka and Zookeeper

Install Kafka using Helm charts:

```bash
brew install helm

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install zookeeper bitnami/zookeeper
helm install kafka bitnami/kafka
```

Verify pods:
```bash
kubectl get pods
```
You should see `kafka-controller` pods and `zookeeper-0` pod all in `Running` state.

---

## Step 4: Deploy Backend Services

built Docker images:
docker build -t order-service:latest ./order-service

pushed them to DockerHub:
docker tag order-service:latest your-dockerhub-username/order-service:latest
docker push your-dockerhub-username/order-service:latest

Now deploy the services:

```bash
kubectl apply -f k8s/user-deployment.yaml
kubectl apply -f k8s/order-deployment.yaml
kubectl apply -f k8s/restaurant-deployment.yaml

kubectl apply -f k8s/user-service.yaml
kubectl apply -f k8s/order-service.yaml
kubectl apply -f k8s/restaurant-service.yaml
```

Check all pods:
```bash
kubectl get pods
```
They should all be `Running`.

Check services (NodePorts open):
```bash
kubectl get svc
```

Look for ports exposed for user-service, order-service, restaurant-service.

---

## Step 5: Connect Frontend to Backends

In your frontend project, **set the API URLs** correctly.
Example `.env` file for frontend:

```env
REACT_APP_USER_SERVICE_URL=http://localhost:<user-service-port>
REACT_APP_ORDER_SERVICE_URL=http://localhost:<order-service-port>
REACT_APP_RESTAURANT_SERVICE_URL=http://localhost:<restaurant-service-port>
```

Replace `<user-service-port>`, `<order-service-port>`, and `<restaurant-service-port>` with the actual NodePorts you saw from `kubectl get svc`.

(Usually NodePorts are 30000~32767 range)

---

## Step 6: Start Frontend

In the frontend folder, install dependencies:

```bash
npm install
```

Then start the frontend app:

```bash
npm start
```

It should open `http://localhost:3000` automatically.

---

## Troubleshooting Tips

- If frontend can't reach backend, double-check NodePorts.
- If pods crash, run `kubectl logs <pod-name>` to see errors.
- If Kafka issues, port-forward kafka:

```bash
kubectl port-forward svc/kafka 9092:9092
```



