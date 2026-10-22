# Semana 20 - Dia 4: .gitignore y Conflictos de Merge en Git

Guia completa y sencilla para aprender a ignorar archivos con **.gitignore**, desenvolverse en editores de terminal como **VIM** y el **Pager**, y solucionar **conflictos de merge** paso a paso.

---

## 1. Que es el archivo `.gitignore`?

Un archivo `.gitignore` es un documento de texto plano donde indicamos a Git que archivos, formatos o carpetas **NO queremos que se incluyan en el control de versiones**.

- **Ejemplos habituales de lo que se ignora**:
  - Archivos con claves o contraseñas (como `.env` o `config.properties`).
  - Carpetas temporales o de cache (como `temp/` o `target/`).
  - Archivos pesados o innecesarios del sistema (como `.DS_Store`).

> [!IMPORTANT]
> El archivo `.gitignore` **siempre debe confirmarse y subirse al repositorio** (con `git add .gitignore`, `git commit` y `git push`). De esta manera, todos los miembros del equipo comparten exactamente las mismas exclusiones.

---

## 2. Editores de Terminal: VIM y el Pager

### A) El editor VIM
Si alguna vez haces un commit sin escribir el modificador `-m` o Git te pide editar un mensaje durante un merge, se abrira el editor **VIM** dentro de la terminal:
- Tiene dos modos: **Insert** (para escribir texto, pulsando la letra `i`) y **Normal/Comandos** (pulsando la tecla `ESC`).
- **Para guardar y salir**:
  1. Pulsa la tecla `ESC`.
  2. Escribe `:wq` y pulsa `ENTER`.
- **Para salir sin guardar a la fuerza (force quit)**:
  1. Pulsa la tecla `ESC`.
  2. Escribe `:q!` y pulsa `ENTER`.

### B) El visor Pager (cuando aparece END)
Al ejecutar comandos que muestran mucho texto (como `git log` o `git diff`), la terminal entra en un modo visor donde al final aparece una etiqueta blanca con la palabra `(END)` o `:`.
- Para salir del visor y volver a la consola normal, solo debes **pulsar la letra `q`** en el teclado.

---

## 3. Comandos Utiles: Amend y Diff

- **Corregir el ultimo mensaje de commit**:
  ```bash
  git commit --amend -m "Nuevo mensaje corregido del commit"
  ```
- **Ver las modificaciones antes de hacer commit**:
  ```bash
  git diff
  ```
  Muestra en color **rojo (-)** las lineas que has borrado y en color **verde (+)** las lineas que has anadido.

---

## 4. Como Gestionar y Resolver Conflictos de Merge

Un conflicto de merge aparece cuando dos ramas modifican la misma linea de un mismo archivo. Git no sabe cual de las dos versiones es la correcta, por lo que entra en un estado temporal llamado **`(main|MERGING)`**.

### Marcas de conflicto en el archivo:
Git inserta tres lineas especiales que delimitan las dos versiones:
```text
<<<<<<< HEAD
Contenido que esta actualmente en la rama main
=======
Contenido que viene de la rama secundaria que quieres fusionar
>>>>>>> rama2
```

### Como resolverlo paso a paso:
1. Abre el archivo en conflicto con VS Code, con `nano nombreArchivo` o con el bloc de notas.
2. Decide que texto quieres conservar y cual quieres borrar (o junta ambos).
3. **Imprescindible**: Borra manualmente las marcas `<<<<<<< HEAD`, `=======` y `>>>>>>> rama2`.
4. Guarda el archivo.
5. Ejecuta:
   ```bash
   git add nombreArchivo
   git commit -m "Resuelto conflicto de merge"
   ```
6. Al hacer este commit, Git sale automaticamente del modo `(main|MERGING)` y vuelve a `main`.
7. Si deseas borrar la rama secundaria y Git te muestra advertencias por el conflicto, puedes forzar su borrado con el flag en mayuscula `-D`:
   ```bash
   git branch -D rama2
   ```

---

## 5. Laboratorios Practicos (LABS)

### LAB 0: Juego Interactivo Online
Practica la logica de Git jugando online en:  
[https://gitmastery.me/intro/?stage=Intro&level=1](https://gitmastery.me/intro/?stage=Intro&level=1)

---

### LAB 1: Proyecto de una Biblioteca (archivos de texto)
Carpeta del proyecto: [lab1_biblioteca/](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day4/lab1_biblioteca)

**Objetivo**: Practicar ramas, commits, merge y resolucion manual de un conflicto en `libros.txt`.

- **Pasos resumidos**:
  1. `git init` en la carpeta `biblioteca`.
  2. Crear `libros.txt` con 3 libros y hacer el primer commit en `main`.
  3. Crear rama `nuevos-libros`, anadir 2 libros y hacer commit.
  4. Volver a `main`, modificar la primera linea de `libros.txt` y hacer commit.
  5. Fusionar `nuevos-libros` con `main`: se provoca el conflicto.
  6. Editar `libros.txt`, borrar las marcas `<<<<<<<`, `=======` y `>>>>>>>`, guardar y hacer commit.
  7. Crear rama `autores`, anadir `autores.txt` con 3 autores y hacer commit.
  8. Volver a `main` y fusionar `autores`.
  9. Borrar las ramas secundarias con `git branch -d nuevos-libros` y `git branch -d autores`.
  10. Guardar archivos de salida:
      ```bash
      git log --oneline > tuNombreGitLogoneLine.txt
      git log > tuNombreGitLog.txt
      history 70 > tuNombreHistorial.txt
      ```

*(El script completo con todos los comandos comentados se encuentra en [script_lab1_biblioteca.sh](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day4/lab1_biblioteca/script_lab1_biblioteca.sh)).*

---

### LAB 2: Tienda Online (.gitignore y multiples ramas)
Carpeta del proyecto: [lab2_tienda_online/](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day4/lab2_tienda_online)

**Objetivo**: Simular un proyecto con 3 ramas (`productos`, `inventario`, `configuracion`), reglas de `.gitignore` y resolucion de dos conflictos.

- **Pasos resumidos**:
  1. Crear repositorio `tienda-online` e inicializar con `git init`.
  2. En `main`, crear `productos.txt` (5 productos), `README.md` e `inventario.txt`. Commit inicial.
  3. Crear rama `productos`: anadir 3 productos nuevos y modificar un precio (2 commits).
  4. Crear rama `inventario`: actualizar cantidades y modificar tambien el precio de un producto en `productos.txt` (2 commits).
  5. Crear rama `configuracion`: crear `config.properties`, `tienda.properties`, la carpeta `temp/` y el archivo `.gitignore` con:
     ```text
     *.properties
     temp/
     ```
  6. Comprobar archivos ignorados con `git status --ignored`. Confirmar unicamente el `.gitignore`.
  7. Fusionar `productos` en `main`.
  8. Fusionar `inventario` en `main`: surge conflicto en `productos.txt`. Editar, resolver y confirmar con commit.
  9. Fusionar `configuracion` en `main`: comprobar que las reglas de ignorado se mantienen.
  10. Provocar y resolver un conflicto adicional en `README.md`.
  11. Borrar las ramas que ya no se necesiten con `git branch -d` o `git branch -D`.
  12. Guardar archivos de salida:
      ```bash
      git log --oneline > tuNombreGitLogoneLine.txt
      git log > tuNombreGitLog.txt
      history 100 > tuNombreHistorial.txt
      ```

*(El script completo con todos los comandos comentados se encuentra en [script_lab2_tienda.sh](file:///c:/Users/adrao/Documents/GitHub/curso_Ironhack/Sem_20/Day4/lab2_tienda_online/script_lab2_tienda.sh)).*
