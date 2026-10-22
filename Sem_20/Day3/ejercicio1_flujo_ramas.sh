#!/bin/bash
# =====================================================================
# Ejercicio 1: Flujo completo de Ramas, Merge y Log en Git Bash
# =====================================================================

# 1. Iniciar el repositorio local
git init

# 2. Anadir el archivo principal al area de preparacion (staging)
git add index.html

# 3. Hacer el primer commit
git commit -m "Commit 1: anadido index.html"

# 4. Conectar con el repositorio remoto de GitHub
# (Cambia la URL por la de tu propio repositorio en GitHub)
git remote add origin https://github.com/AlbertIronhack/testgit-3.git

# 5. Asegurar que la rama principal se llama 'main'
git branch -M main

# 6. Subir por primera vez a GitHub (-u establece el origen por defecto)
git push -u origin main

# 7. Crear una segunda rama llamada 'rama2' y cambiarse a ella
git checkout -b rama2

# 8. Anadir el archivo nuevo en la rama2
git add detalle.html

# 9. Hacer commit en la rama2
git commit -m "Commit 2 en rama2: anadido detalle.html"

# 10. Subir la rama2 a GitHub
git push -u origin rama2

# 11. Volver a la rama principal 'main'
git checkout main

# 12. Fusionar (merge) los cambios de rama2 en main
git merge rama2

# 13. Subir la rama main actualizada a GitHub
git push

# 14. Borrar la rama2 en tu ordenador (en local)
git branch -d rama2

# 15. Borrar la rama2 en GitHub (en remoto)
git push origin --delete rama2

# 16. Ver el historial resumido en una sola linea por commit
git log --oneline
