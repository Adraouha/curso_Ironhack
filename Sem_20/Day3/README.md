# Semana 20 - Dia 3: Git Bash y Comandos de Terminal

Guia sencilla y directa para aprender a manejar **Git** utilizando la terminal **Git Bash**, entender los comandos basados en Unix y utilizar **flags** para modificar su comportamiento.

---

## 1. Que es Git Bash?

Es habitual y muy recomendable usar Git desde la terminal, ya que ofrece mas opciones y control que la interfaz visual.

Al instalar Git en Windows, se incluye automaticamente una terminal propia llamada **Git Bash**:
- Esta basada en **Unix**, por lo que comparte comandos y comportamiento con las terminales de **Linux** y **macOS** (a diferencia del CMD clasico de Windows).
- Permite usar utilidades como `ls`, `pwd`, `nano` (editor de texto en consola), `history` (historial de comandos) y operadores de redireccion como `>` y `>>`.

---

## 2. Que son las "Flags" (Modificadores)?

Las instrucciones de Git pueden contener **flags**, que son modificadores anadidos al comando para cambiar su comportamiento.

Por ejemplo:
- `git log`: Muestra el historial completo detallado (autor, fecha, mensaje extenso).
- `git log --oneline`: El flag `--oneline` modifica la salida para mostrar solo el codigo corto (hash) y el mensaje en una sola linea por commit.

Otros flags comunes:
- `-m`: Para anadir el mensaje del commit directamente: `git commit -m "Mensaje"`.
- `-b`: Para crear una rama y cambiar a ella a la vez: `git checkout -b nueva-rama`.
- `-u`: Vincula la rama local con la rama de GitHub para futuros push: `git push -u origin main`.
- `--force`: Fuerza la actualizacion en GitHub si se ha reescrito el historial con reset: `git push origin main --force`.

---

## 3. Conectar con un Repositorio Remoto en GitHub

Para conectar una carpeta local con un repositorio existente en GitHub, se ejecutan estas tres instrucciones:

```bash
# 1. Le dice a Git cual es el repositorio de GitHub de referencia
git remote add origin https://github.com/AlbertIronhack/testgit-3.git

# 2. Fuerza el cambio de nombre de la rama principal a 'main' (en lugar de master)
git branch -M main

# 3. Sube los cambios y configura el origen por defecto
git push -u origin main
```

*(Una vez ejecutado este primer push con `-u`, en las siguientes ocasiones basta con escribir simplemente `git push`).*

---

## 4. Recursos y Enlaces Recomendados

- [Articulo sobre como configurar origin en Git (DelftStack)](https://www.delftstack.com/es/howto/git/git-set-origin/)
- [Listado de comandos mas comunes ampliado (Hostinger)](https://www.hostinger.es/tutoriales/comandos-de-git)
- [Video: Introduccion a Git mediante comandos (YouTube)](https://www.youtube.com/watch?v=iT4UOkyI09k)
- [PDF: Git Cheat Sheet oficial en espanol (GitHub)](https://training.github.com/downloads/es_ES/github-git-cheat-sheet.pdf)
- [Videojuego descargable para practicar Git: "Oh My Git!"](https://ohmygit.org/)

---

## 5. Instrucciones del Laboratorio (LAB)

### Ejercicio 1: Flujo completo de Ramas y Merge en Git Bash

El objetivo es realizar el ejercicio de ayer pero utilizando unicamente comandos en la terminal de Git Bash.

1. **Abrir Git Bash**:
   Haz clic derecho dentro de la carpeta del proyecto y selecciona **"Open Git Bash here"** (o abre la terminal en VS Code y elige `bash`).
2. **Inicializar y primer commit**:
   ```bash
   git init
   git add index.html
   git commit -m "Commit 1: anadido index.html"
   ```
3. **Conectar y subir a GitHub**:
   ```bash
   git remote add origin https://github.com/AlbertIronhack/testgit-3.git
   git branch -M main
   git push -u origin main
   ```
4. **Crear y trabajar en una segunda rama (`rama2`)**:
   ```bash
   git checkout -b rama2
   git add detalle.html
   git commit -m "Commit 2 en rama2: anadido detalle.html"
   git push -u origin rama2
   ```
5. **Fusionar (Merge) en main**:
   ```bash
   git checkout main
   git merge rama2
   git push
   ```
6. **Borrar la rama2 tanto en local como en GitHub**:
   ```bash
   git branch -d rama2
   git push origin --delete rama2
   ```
7. **Consultar el historial resumido**:
   ```bash
   git log --oneline
   ```

*(Tienes todos estos comandos reunidos en el archivo [ejercicio1_flujo_ramas.sh](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/ejercicio1_flujo_ramas.sh)).*

---

### Ejercicio 2: Creacion de 3 Commits, Git Reset y Exportacion

1. **Iniciar el repositorio o clonar**:
   - Opcion A (conectar vacio):
     ```bash
     git init
     git remote add origin https://github.com/AlbertIronhack/testgit-3.git
     git branch -M main
     ```
   - Opcion B (clonar):
     ```bash
     git clone https://github.com/AlbertIronhack/testgit-3.git
     ```
2. **Crear al menos 3 commits sucesivos**:
   ```bash
   echo "Version 1.0" > notas.txt
   git add notas.txt
   git commit -m "Commit 1: version 1.0"
   git push -u origin main

   echo "Version 2.0" >> notas.txt
   git add notas.txt
   git commit -m "Commit 2: version 2.0"
   git push

   echo "Version 3.0" >> notas.txt
   git add notas.txt
   git commit -m "Commit 3: version 3.0"
   git push
   ```
3. **Comprobar los commits creados**:
   ```bash
   git log --oneline
   ```
4. **Volver al primer commit borrando los siguientes (git reset)**:
   - Para retroceder 2 commits en tu ordenador:
     ```bash
     git reset --hard HEAD~2
     ```
   - Para aplicar el borrado tambien en GitHub (forzar actualizacion):
     ```bash
     git push origin main --force
     ```
5. **Guardar el log y el historial de comandos en archivos de texto**:
   - Guardar el log resumido en un archivo de texto:
     ```bash
     git log --oneline > tuNombreGitlog.txt
     ```
   - Guardar los ultimos 50 comandos tecleados en la terminal:
     ```bash
     history 50 > tuNombreHistorial.txt
     ```
     *(En algunas versiones de Git Bash que no admiten el numero tras history, puedes usar: `history | tail -n 50 > tuNombreHistorial.txt`).*

---

## 6. Archivos disponibles en Day3

- [guia_gitbash.md](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/guia_gitbash.md): Chuleta de comandos Unix (`pwd`, `ls`, `cd`, `nano`, `history`, `>`, `>>`).
- [ejercicio1_flujo_ramas.sh](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/ejercicio1_flujo_ramas.sh): Script de terminal para el Ejercicio 1.
- [ejercicio2_reset_historial.sh](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/ejercicio2_reset_historial.sh): Script de terminal para el Ejercicio 2.
- [tuNombreGitlog.txt](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/tuNombreGitlog.txt): Ejemplo de salida de `git log --oneline`.
- [tuNombreHistorial.txt](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/tuNombreHistorial.txt): Ejemplo de salida de `history`.
- [proyecto_gitbash/](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day3/proyecto_gitbash): Pagina web de ejemplo (`index.html`, `detalle.html`, `estilo.css`).
