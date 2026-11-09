# Little Dino Sanctuary

A lightweight full-stack web application designed to track and manage dinosaur records, containerized using Docker and Docker Compose. Built for the Software DevOps & Cloud Infrastructure practical evaluation.


## Project Overview & Rationale

**Little Dino Sanctuary** provides a snug digital home for every dinosaur you know. It allows users to view existing sanctuary residents and add new entries via a web interface or REST API.

### Why GitHub Codespaces?
This project was developed and evaluated inside **GitHub Codespaces**. Due to local system hardware constraints preventing the installation and smooth execution of **Docker Desktop**, GitHub Codespaces provided a consistent, high-performance cloud development environment. 

Using Codespaces enabled running the full containerized stack (Node.js Express backend and PostgreSQL database) seamlessly via cloud-hosted Docker daemons. Public port forwarding (`port 3000`) allowed browser-based testing alongside internal terminal API verifications.


## Architecture & Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend & API** | Node.js / Express | Serves static assets, user interface, and handles RESTful routes |
| **Database** | PostgreSQL | Relational database management system for resident storage |
| **Containerization** | Docker & Docker Compose | Multi-container architecture running `app` and `db` services |
| **Orchestration** | `dino-net` (Bridge) | Dedicated custom bridge network for inter-container communication |
| **Storage** | `pgdata` (Named Volume) | Persistent volume ensuring database records survive container restarts |


## Getting Started

Follow these steps to clone and launch the project in any environment with Docker installed.

### Prerequisites
* Git
* Docker Engine & Docker Compose

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Clarisse-X/little-dino-sanctuary.git
   cd little-dino-sanctuary
   ```

2. **Set up Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   *(Optionally edit `.env` to configure your custom database credentials if needed).*

3. **Build and Start Containers:**
   ```bash
   docker compose up -d --build
   ```

4. **Access the Application:**
   * **Local Environment:** Open `http://localhost:3000` in your web browser.
   * **GitHub Codespaces:** Open the **Ports** tab, locate **Port 3000**, change visibility to **Public**, and click the forwarded web link.


## API Endpoints & Verification

The application exposes the following RESTful endpoints:

* **`GET /dinosaurs`** — Retrieves the complete list of resident dinosaurs (HTTP `200 OK`).
* **`POST /dinosaurs`** — Creates a new dinosaur record (HTTP `201 Created`).

### Test Endpoints via `curl`

**1. Fetch All Dinosaurs (GET):**
```bash
curl -i http://localhost:3000/dinosaurs
```
*Expected Output:* `HTTP/1.1 200 OK` along with a JSON array of existing residents.

**2. Add a New Dinosaur (POST):**
```bash
curl -i -X POST http://localhost:3000/dinosaurs \
  -H "Content-Type: application/json" \
  -d '{"name": "Triceratops", "era": "Cretaceous", "diet": "Herbivore", "fun_fact": "Its frill may have helped it find a mate."}'
```
*Expected Output:* `HTTP/1.1 201 Created` with the newly stored dinosaur object.


## Demonstration & Media Links

* **Article Link:** `[Insert link to medium/blog article here]`
* **Video Explanation:** `[Insert YouTube video link explaining Dockerfile and docker-compose.yml here]`


## AI Usage Declaration

* **Declaration:** Partial Usage (Approx. 25–30% of total project process).
* **AI Tools Used:** Gemini (Google).
* **Areas Assisted:**
  1. **Debugging:** Resolving PostgreSQL `.env` password sync mismatches during initial container initialization.
  2. **Documentation:** Structuring cURL endpoint verification steps and Markdown explanations for volume persistence (`docker compose down` vs `-v`).
  3. **Drafting:** Generating boilerplate README structure and technical report phrasing.
* **Core Prompts Used:**
  * *"How to resolve PostgreSQL authentication failure after changing password in .env file with Docker Compose?"*
  * *"Formulate a concise paragraph explaining the difference between docker compose down and docker compose down -v on named volumes."*