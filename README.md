# Little Dino Sanctuary

    cp .env.example .env     # then edit the password (a ready-made .env is included)
    docker compose up -d --build

Open http://localhost:3000

- `GET /dinosaurs` returns all dinosaurs as JSON
- `POST /dinosaurs` saves `{name, era, diet, fun_fact}`
- `docker compose down` keeps your data; `docker compose down -v` deletes the volume
