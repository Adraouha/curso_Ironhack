#!/bin/bash
# =====================================================================
# LAB 1: Proyecto Biblioteca (Terminal: archivos de texto)
# Objetivo: Practicar ramas, commits, merges y resolver conflictos
# =====================================================================

# 1.1.- Inicializar el repositorio Git
git init

# 1.2.- Crear archivo libros.txt con tres libros y primer commit en main
cat << 'EOF' > libros.txt
1. Don Quijote de la Mancha - Miguel de Cervantes
2. Cien anios de soledad - Gabriel Garcia Marquez
3. El principito - Antoine de Saint-Exupery
EOF

git add libros.txt
git commit -m "Commit 1 en main: anadidos 3 libros iniciales"

# 1.3.- Crear rama nuevos-libros y anadir dos libros
git checkout -b nuevos-libros

cat << 'EOF' >> libros.txt
4. 1984 - George Orwell
5. Un mundo feliz - Aldous Huxley
EOF

git add libros.txt
git commit -m "Commit 2 en nuevos-libros: anadidos 2 libros nuevos"

# 1.4.- Volver a main y modificar la primera linea de libros.txt
git checkout main

# Modificamos la primera linea en main para provocar el conflicto mas adelante
cat << 'EOF' > libros.txt
1. Don Quijote de la Mancha - Miguel de Cervantes (Edicion Especial)
2. Cien anios de soledad - Gabriel Garcia Marquez
3. El principito - Antoine de Saint-Exupery
EOF

git add libros.txt
git commit -m "Commit 3 en main: modificada edicion de Don Quijote"

# 1.5.- Fusionar nuevos-libros en main (aqui surge el conflicto!)
git merge nuevos-libros

# NOTA DE RESOLUCION DE CONFLICTO:
# Git entrara en el estado (main|MERGING).
# Abre libros.txt con nano, VS Code o notepad.
# Veras marcas como:
# <<<<<<< HEAD
# 1. Don Quijote de la Mancha - Miguel de Cervantes (Edicion Especial)
# =======
# 1. Don Quijote de la Mancha - Miguel de Cervantes
# ...
# >>>>>>> nuevos-libros
#
# Borra las marcas <<<<<<< HEAD, ======= y >>>>>>> nuevos-libros.
# Deja el archivo con la edicion corregida y los 5 libros combinados.
#
# Luego confirma la solucion con:
git add libros.txt
git commit -m "Commit 4 en main: resuelto conflicto de merge en libros.txt"

# 1.6.- Crear segunda rama llamada autores desde main
git checkout -b autores

# 1.7.- Anadir archivo autores.txt con 3 autores y hacer commit
cat << 'EOF' > autores.txt
1. Miguel de Cervantes - Espana (1547-1616)
2. Gabriel Garcia Marquez - Colombia (1927-2014)
3. George Orwell - Reino Unido (1903-1950)
EOF

git add autores.txt
git commit -m "Commit 5 en autores: anadido autores.txt"

# 1.8.- Volver a main y fusionar la rama autores
git checkout main
git merge autores

# 1.9.- Comprobar historial y ramas existentes
git log --oneline
git branch

# 1.10.- Eliminar las ramas secundarias (usando -d o -D para forzar)
git branch -d nuevos-libros
git branch -d autores

# 1.11.- Guardar git log --oneline en archivo de texto
git log --oneline > tuNombreGitLogoneLine.txt

# 1.12.- Guardar git log completo en archivo de texto
git log > tuNombreGitLog.txt

# 1.13.- Guardar historial de comandos en archivo de texto
history 70 > tuNombreHistorial.txt
