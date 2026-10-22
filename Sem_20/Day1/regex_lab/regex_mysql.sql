-- =====================================================================
-- Ejemplos basicos de RegEx en MySQL (REGEXP) para principiantes
-- =====================================================================

-- 1. Crear una tabla sencilla de peliculas
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

-- 2. Insertar algunos registros de ejemplo
INSERT INTO movies (title) VALUES 
('Avatar'),
('Batman'),
('Casablanca'),
('Django'),
('El Padrino'),
('Iron Man');

-- 3. Consulta del temario:
-- Buscar peliculas que comiencen por 'a', 'b', 'c' o 'd'
-- El simbolo ^ significa "que empiece por"
SELECT * FROM movies WHERE title REGEXP '^[abcd]';

-- 4. Buscar peliculas que contengan numeros (del 0 al 9)
SELECT * FROM movies WHERE title REGEXP '[0-9]';

-- 5. Buscar peliculas que terminen en 'man'
-- El simbolo $ significa "que termine en"
SELECT * FROM movies WHERE title REGEXP 'man$';
