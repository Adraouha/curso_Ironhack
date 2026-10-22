#!/bin/bash
# =====================================================================
# Ejercicio 2: Crear 3 commits, git reset, y exportar log e historial
# =====================================================================

# 1. Crear un repositorio vacio (o clonar uno existente con: git clone URL)
git init

# Conectar con el repositorio de GitHub (si no lo clonaste)
git remote add origin https://github.com/AlbertIronhack/testgit-3.git
git branch -M main

# 2. COMMIT 1: Creacion de archivo base
echo "Version 1.0 del proyecto" > notas.txt
git add notas.txt
git commit -m "Commit 1: primer apunte en notas.txt"

# Subir por primera vez a GitHub con flag -u
git push -u origin main

# 3. COMMIT 2: Anadir segunda linea
echo "Version 2.0: anadida segunda caracteristica" >> notas.txt
git add notas.txt
git commit -m "Commit 2: anadida segunda caracteristica"
git push

# 4. COMMIT 3: Anadir tercera linea
echo "Version 3.0: anadido contenido final" >> notas.txt
git add notas.txt
git commit -m "Commit 3: anadido contenido final"
git push

# 5. Ver los 3 commits en una sola linea
git log --oneline

# ---------------------------------------------------------------------
# 6. VOLVER AL PRIMER COMMIT BORRANDO LOS SIGUIENTES (git reset)
# ---------------------------------------------------------------------

# A) Volver 2 commits atras en local con --hard (borra los commits 2 y 3):
git reset --hard HEAD~2

# Tambien se puede hacer indicando el identificador (hash) del primer commit:
# git reset --hard <hash_del_commit_1>

# B) Actualizar GitHub borrando tambien alli los commits 2 y 3 (forzar subida):
# ATENCION: El flag --force sobreescribe el historial en GitHub.
git push origin main --force

# ---------------------------------------------------------------------
# 7. GUARDAR EL LOG Y EL HISTORIAL EN ARCHIVOS DE TEXTO
# ---------------------------------------------------------------------

# Guardar el registro de commits resumido en un archivo .txt con el operador '>'
git log --oneline > tuNombreGitlog.txt

# Guardar el historial de los ultimos comandos usados en la terminal Git Bash
history 50 > tuNombreHistorial.txt

# Si tu terminal no acepta 'history 50', puedes usar:
# history | tail -n 50 > tuNombreHistorial.txt
