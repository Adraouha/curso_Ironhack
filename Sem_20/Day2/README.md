# Semana 20 - Dia 2: Git y GitHub con Visual Studio Code

Guia completa y sencilla para aprender a usar **Git** y **GitHub** desde cero utilizando la interfaz grafica de **Visual Studio Code** y los comandos basicos de terminal.

---

## 1. Instalacion y Comprobacion de Git

1. **Instalar Git en tu ordenador**:
   - Descarga el instalador desde la web oficial: [https://git-scm.com/install/](https://git-scm.com/install/)
   - Sigue los pasos del instalador pulsando "Next" (puedes dejar todas las opciones por defecto) y confirma la instalacion.

2. **Comprobar si esta instalado**:
   - Abre la terminal de Visual Studio Code (`Ctrl + ñ` o en el menu superior `Terminal > New Terminal`).
   - Escribe el comando:
     ```bash
     git --version
     ```
   - Si esta bien instalado, te respondera con el numero de version (por ejemplo: `git version 2.45.0`).
   - Si escribes `git status` en una carpeta nueva y te sale:
     ```
     fatal: not a git repository (or any of the parent directories): .git
     ```
     Significa simplemente que en esa carpeta **todavia no has activado el control de versiones**.

3. **Configuracion inicial (solo la primera vez en tu ordenador)**:
   Debes indicar a Git quien eres para que tus commits lleven tu nombre y el correo que usas en GitHub:
   ```bash
   git config --global user.name "Tu Nombre o Alias"
   git config --global user.email "tuemail@example.com"
   ```

---

## 2. Iniciar el Control de Versiones en un Proyecto

Para que Git empiece a vigilar los archivos de una carpeta:
- **Desde la interfaz de VS Code**: Abre la barra lateral izquierda y pulsa el icono de **Source Control** (parece un circuito con tres ramas). Veras un boton azul que dice **"Initialize Repository"**. Pulsa ese boton.
- **Desde la terminal**: Puedes escribir:
  ```bash
  git init
  ```

---

## 3. Estados de los Archivos y Primer Commit Local

Cuando creas o modificas un archivo en VS Code, aparece una letra a su derecha en el panel de Source Control:

1. **Letra U (Untracked)**:
   - Significa que es un archivo nuevo que Git todavia no esta vigilando.
2. **Poner en sala de espera (Staging)**:
   - Pasa el raton por encima del archivo en la lista y pulsa el icono **+** (Stage Changes).
   - El archivo pasa a la seccion **"Staged Changes"** y ahora muestra una letra **A (Added)**.
3. **Confirmar los cambios (Commit)**:
   - En la caja de texto que dice "Message", escribe una frase corta que explique lo que has hecho (por ejemplo: `Primer commit: anadido index.html`).
   - Pulsa el boton azul **Commit**.

> [!IMPORTANT]
> **Atencion**: Al hacer Commit, los cambios quedan confirmados y guardados, **pero solo en tu ordenador (en local)**. Todavia no se han subido a internet (GitHub).

---

## 4. Conectar tu Repositorio Local con GitHub

Para guardar una copia en internet y poder compartir tu codigo:

1. Entra en tu cuenta de [GitHub](https://github.com/) y pulsa en **"New repository"**.
2. Ponle un nombre al repositorio (por ejemplo: `testgit`).
3. Dejalo **Publico** y **NO marques** las casillas de README, .gitignore ni License (debe ser un repositorio totalmente vacio).
4. Pulsa en **"Create repository"**.
5. GitHub te mostrara varias lineas de codigo. Busca la seccion que dice *"…or push an existing repository from the command line"* y copia las tres instrucciones:

```bash
# 1. Conecta tu proyecto local con la direccion de tu repositorio en GitHub
git remote add origin https://github.com/TuUsuario/testgit.git

# 2. Asegura que la rama principal se llame 'main' en vez de 'master'
git branch -M main

# 3. Sube tus archivos y commits locales a GitHub
git push -u origin main
```

A partir de este momento, tus archivos ya seran visibles en tu cuenta de GitHub.

---

## 5. Trabajar en el Dia a Dia: Modificar y Sincronizar

Cuando abres un archivo existente y haces cambios:
1. El archivo queda marcado con la letra **M (Modified)**.
2. Vuelves a pulsar el **+** para pasarlo a Staging.
3. Escribes un mensaje explicativo y pulsas **Commit**.
4. Para subirlo a GitHub:
   - Puedes pulsar el boton **"Sync Changes"** (en la esquina inferior izquierda o en el panel de Source Control).
   - O escribir en la terminal: `git push`.
   - El boton "Sync Changes" se encarga de subir lo que tu hayas hecho (`push`) y de bajarse cambios si alguien ha subido algo nuevo (`pull`).

---

## 6. Trabajar con Ramas (Branches)

Las ramas sirven para probar nuevas funciones, hacer experimentos o crear paginas nuevas sin romper la rama principal (`main`).

### Como crear una nueva rama:
- **Opcion 1 (la mas facil)**: Haz clic abajo a la izquierda en la barra azul donde pone `main`. Se abrira un menu arriba con la opcion **"Create new branch..."**. Escribe el nombre (por ejemplo: `mi-rama`) y pulsa Enter. VS Code saltara directamente a esa nueva rama.
- **Opcion 2**: Pulsa `Ctrl + Shift + P` en el teclado, escribe `git: create branch` y pulsa Enter.
- **Opcion 3**: En el panel de Source Control, pulsa en los tres puntos `...` arriba a la derecha > `Branch > Create Branch...`.

### Hacer cambios y subir la rama:
1. Estando en la nueva rama, crea o edita archivos (como `rama.html`).
2. Haz **+ (Stage)** y haz **Commit**.
3. Pulsa el boton **"Publish Branch"** (o escribe `git push -u origin mi-rama`) para subir la rama a GitHub.

---

## 7. Unir Ramas (Merge)

Cuando has terminado el trabajo en la rama secundaria y quieres juntarlo con la rama principal:

1. **Paso fundamental**: Primero debes **colocarte en la rama principal (`main`)**.
   - Haz clic abajo a la izquierda en el nombre de la rama y selecciona `main`.
2. En el panel de Source Control, pulsa en los tres puntos `...` arriba a la derecha.
3. Selecciona **Branch > Merge Branch...**.
4. Elige la rama secundaria que quieres unir (por ejemplo: `mi-rama`).
5. Ahora los cambios de esa rama ya forman parte de `main`.
6. Haz un **Sync Changes** o `git push` para que la rama `main` en GitHub tambien tenga estos cambios actualizados.

---

## 8. Como Borrar una Rama que ya no se necesita

Cuando una rama ya ha sido unida a `main`, se suele borrar para no acumular ramas viejas:

1. **Borrar en local**:
   - **Regla obligatoria**: No puedes borrar la rama en la que estas situado. Debes estar en `main` o en otra rama diferente.
   - En el panel de Source Control, pulsa en los tres puntos `...` > `Branch > Delete Branch...`.
   - Selecciona la rama que quieres borrar y confirma.
2. **Borrar en GitHub**:
   - En GitHub la rama sigue existiendo.
   - Entra en la pagina de tu repositorio en GitHub.
   - Pulsa en el texto que dice **"branches"** (cerca del selector de rama).
   - Busca la rama secundaria y pulsa el icono de la papelera para eliminarla.

---

## 9. Videos Recomendados

- [Video 1: Para empezar con Git y VS Code (Render2Web)](https://www.youtube.com/watch?v=qdec2M4NwT0)
- [Video 2: El mejor resumen rapido (en ingles)](https://www.youtube.com/watch?v=i_23KUAEtUM)
- [Video 3: Git merge y resolucion de conflictos (en ingles con subtitulos)](https://www.youtube.com/watch?v=vw-2U0u7Ni4)

---

## 10. Laboratorio Practico Paso a Paso (LAB)

En la carpeta [proyecto_git/](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day2/proyecto_git) tienes un proyecto de ejemplo preparado para practicar.

Sigue estos pasos ordenados:

1. **Crear o abrir la carpeta del proyecto**:
   Abre una nueva ventana de Visual Studio Code (`Archivo > Nueva ventana`) y abre la carpeta `Sem_20/Day2/proyecto_git`.
2. **Hacer cambios en un archivo**:
   Abre `index.html`, escribe una descripcion o anade tu nombre en el parrafo, y guarda con `Ctrl + S`.
3. **Rastrear cambios (Staging)**:
   Ve al icono de Source Control. Veras `index.html` con la letra `M`. Pulsa el `+` para pasarlo a Staging.
4. **Hacer el Commit**:
   Escribe un mensaje como `Actualizada descripcion en index.html` y pulsa el boton Commit.
5. **Crear una rama nueva**:
   Haz clic abajo a la izquierda en `main` > `Create new branch...` y ponle de nombre `feature-contacto`.
6. **Hacer cambios en la nueva rama**:
   Abre `rama.html`, haz algun cambio y guardalo. En Source Control haz `+` y commit con el mensaje `Pagina de rama preparada`.
7. **Subir a GitHub (Push)**:
   Pulsa "Publish Branch" si tienes conectado un repositorio de prueba en GitHub.
8. **Fusionar en local (Merge)**:
   Vuelve a la rama `main` (haciendo clic abajo a la izquierda). Luego pulsa en los tres puntos `...` > `Branch > Merge Branch...` y selecciona `feature-contacto`.
9. **Borrar la rama secundaria**:
   Estando en `main`, ve a los tres puntos `...` > `Branch > Delete Branch...` y borra `feature-contacto`.
