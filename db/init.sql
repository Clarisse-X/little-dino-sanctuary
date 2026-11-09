-- Runs once, the first time the pgdata volume is empty.
CREATE TABLE IF NOT EXISTS dinosaurs (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(80)  NOT NULL,
  era        VARCHAR(20)  NOT NULL CHECK (era IN ('Triassic', 'Jurassic', 'Cretaceous')),
  diet       VARCHAR(20)  NOT NULL CHECK (diet IN ('Herbivore', 'Carnivore', 'Omnivore')),
  fun_fact   VARCHAR(300) NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO dinosaurs (name, era, diet, fun_fact) VALUES
  ('Stegosaurus', 'Jurassic', 'Herbivore', 'Its brain was about the size of a lime, but those back plates helped it warm up in the morning sun.'),
  ('Velociraptor', 'Cretaceous', 'Carnivore', 'It was only turkey-sized and was covered in feathers.'),
  ('Plateosaurus', 'Triassic', 'Herbivore', 'One of the first big long-necked dinosaurs, and it could probably rear up to reach the tallest leaves.');
