#!/bin/bash
# =====================================================================
# LAB 2: Tienda Online (Terminal: archivos de texto y properties)
# Objetivo: Simular un proyecto con 3 ramas, .gitignore y conflictos
# =====================================================================

# 2.1.- Inicializar el repositorio
git init

# 2.2.- En la rama main, crear los archivos iniciales:
# productos.txt (5 productos iniciales)
cat << 'EOF' > productos.txt
1. Portatil Pro 15 - 899.99 EUR
2. Raton Inalambrico - 19.99 EUR
3. Teclado Mecanico - 49.99 EUR
4. Monitor 24 Pulgadas - 139.99 EUR
5. Auriculares Bluetooth - 35.00 EUR
EOF

# README.md
cat << 'EOF' > README.md
# Tienda Online - Mi Comercio Digital
Bienvenido a la Tienda Online oficial.
EOF

# inventario.txt
cat << 'EOF' > inventario.txt
1. Portatil Pro 15 - 10 unidades
2. Raton Inalambrico - 50 unidades
3. Teclado Mecanico - 20 unidades
4. Monitor 24 Pulgadas - 5 unidades
5. Auriculares Bluetooth - 30 unidades
EOF

# 2.3.- Commit inicial con todos los archivos
git add .
git commit -m "Commit 1 inicial en main: productos, inventario y README"

# 2.4.- Crear rama productos, anadir 3 productos y cambiar un precio (2 commits)
git checkout -b productos

# Modificamos el precio del raton y anadimos 2 productos
cat << 'EOF' > productos.txt
1. Portatil Pro 15 - 899.99 EUR
2. Raton Inalambrico - 15.99 EUR
3. Teclado Mecanico - 49.99 EUR
4. Monitor 24 Pulgadas - 139.99 EUR
5. Auriculares Bluetooth - 35.00 EUR
6. Alfombrilla XXL - 14.50 EUR
7. Soporte de Pantalla - 22.00 EUR
EOF

git add productos.txt
git commit -m "Commit 2 en productos: rebajado raton y anadidos alfombrilla y soporte"

# Anadimos el 8vo producto
cat << 'EOF' >> productos.txt
8. Webcam Full HD - 39.90 EUR
EOF

git add productos.txt
git commit -m "Commit 3 en productos: anadida webcam"

# 2.5.- Volver a main y crear rama inventario (actualizar cantidades con 2 commits)
git checkout main
git checkout -b inventario

# Modificamos unidades en inventario.txt
cat << 'EOF' > inventario.txt
1. Portatil Pro 15 - 12 unidades disponibles
2. Raton Inalambrico - 45 unidades disponibles
3. Teclado Mecanico - 25 unidades disponibles
4. Monitor 24 Pulgadas - 8 unidades disponibles
5. Auriculares Bluetooth - 40 unidades disponibles
EOF

git add inventario.txt
git commit -m "Commit 4 en inventario: actualizadas existencias principales"

# Modificamos tambien productos.txt en inventario para provocar conflicto despues!
cat << 'EOF' > productos.txt
1. Portatil Pro 15 - 899.99 EUR
2. Raton Inalambrico - 18.00 EUR
3. Teclado Mecanico - 49.99 EUR
4. Monitor 24 Pulgadas - 139.99 EUR
5. Auriculares Bluetooth - 35.00 EUR
EOF

git add productos.txt
git commit -m "Commit 5 en inventario: ajuste de precio de raton en tienda"

# 2.6.- Volver a main y crear rama configuracion con archivos properties
git checkout main
git checkout -b configuracion

echo "db.url=jdbc:mysql://localhost:3306/tienda" > config.properties
echo "tienda.nombre=Mi Tienda" > tienda.properties

# 2.7.- Crear .gitignore para ignorar *.properties y la carpeta temp/
cat << 'EOF' > .gitignore
*.properties
temp/
EOF

mkdir -p temp
echo "Archivo temporal" > temp/prueba.tmp

# 2.8.- Comprobar que archivos estan ignorados
git status
git status --ignored

# Solo agregamos .gitignore (los .properties y temp/ no se agregaran!)
git add .gitignore
git commit -m "Commit 6 en configuracion: anadido .gitignore para properties y temp"

# 2.9.- Volver a main y fusionar productos
git checkout main
git merge productos

# 2.10.- Fusionar inventario en main (conflicto en productos.txt!)
git merge inventario

# Git avisa de CONFLICT (content): Merge conflict in productos.txt
# Editamos productos.txt para dejar el precio final acordado (19.99 EUR)
# y eliminar las marcas <<<<<<< HEAD, ======= y >>>>>>> inventario.
cat << 'EOF' > productos.txt
1. Portatil Pro 15 - 899.99 EUR
2. Raton Inalambrico - 19.99 EUR
3. Teclado Mecanico - 49.99 EUR
4. Monitor 24 Pulgadas - 139.99 EUR
5. Auriculares Bluetooth - 35.00 EUR
6. Alfombrilla XXL - 14.50 EUR
7. Soporte de Pantalla - 22.00 EUR
8. Webcam Full HD - 39.90 EUR
EOF

git add productos.txt inventario.txt
git commit -m "Commit 7 en main: resuelto conflicto de merge entre productos e inventario"

# 2.11.- Fusionar configuracion en main
git merge configuracion

# 2.12.- Conflicto adicional en README.md:
# Creamos una rama temporal para provocar conflicto en README
git checkout -b rama-readme
echo "Tienda con envios en 24 horas y atencion premium." >> README.md
git add README.md
git commit -m "Commit en rama-readme: anadida linea de envios 24h"

git checkout main
echo "Atencion al cliente disponible de lunes a viernes." >> README.md
git add README.md
git commit -m "Commit en main: anadida linea de atencion de lunes a viernes"

git merge rama-readme
# Se genera conflicto en README.md. Resolvemos dejando ambas lineas:
cat << 'EOF' > README.md
# Tienda Online - Mi Comercio Digital

Bienvenido a la Tienda Online oficial.
Aqui encontraras productos de tecnologia, accesorios y oficina a los mejores precios y con envio rapido.
Atencion al cliente disponible de lunes a viernes.
EOF

# 2.13.- Confirmar la resolucion del conflicto en README.md
git add README.md
git commit -m "Commit 8 en main: resuelto conflicto en README.md"

# 2.14.- Ver historial y eliminar ramas secundarias
git log --graph --oneline
git branch -d productos
git branch -d inventario
git branch -d configuracion
git branch -D rama-readme

# 2.15.- Guardar git log --oneline
git log --oneline > tuNombreGitLogoneLine.txt

# 2.16.- Guardar git log completo
git log > tuNombreGitLog.txt

# 2.17.- Guardar historial de comandos
history 100 > tuNombreHistorial.txt
