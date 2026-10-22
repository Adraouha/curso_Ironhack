# Guia Rapida: .gitignore, VIM, Pager y Conflictos de Merge

Resumen directo y sin complicaciones de los conceptos tecnicos de Git tratados en el dia de hoy.

---

## 1. El archivo `.gitignore`

Es un archivo de texto plano que se coloca en la carpeta del proyecto para indicarle a Git que archivos, extensiones o carpetas **NO deben vigilarse ni subirse al repositorio**.

### Reglas basicas de sintaxis:
- `*.properties` : Ignora todos los archivos que terminen en la extension `.properties`.
- `temp/` : Ignora toda la carpeta llamada `temp` y todos sus archivos interiores.
- `secretos.txt` : Ignora ese archivo especifico.
- `# comentario` : Las lineas que empiezan por almohadilla son comentarios.

> [!IMPORTANT]
> El archivo `.gitignore` **si debe subirse a GitHub** (haciendo `add`, `commit` y `push`). De esta forma, cualquier companero que clone el proyecto compartira las mismas reglas de exclusion.

---

## 2. Salir de VIM y del Pager

A veces, al hacer un commit sin poner `-m` o al realizar un merge, la terminal abre un editor de texto o visor interno.

### A) El editor VIM (cuando te pide mensaje de commit):
VIM tiene dos modos:
1. **Modo Edicion (Insert)**: Permite escribir texto (se entra pulsando la tecla `i`).
2. **Modo Comando (Normal)**: Permite dar ordenes (se entra pulsando la tecla `ESC`).

**Como guardar y salir de VIM**:
1. Pulsa la tecla `ESC`.
2. Escribe:
   ```text
   :wq
   ```
   *(w = write / guardar, q = quit / salir)* y pulsa `ENTER`.
3. Si te equivocaste y quieres salir sin guardar los cambios a la fuerza (force quit):
   Pulsa `ESC`, escribe `:q!` y pulsa `ENTER`.

### B) El visor Pager (cuando sale END en el fondo):
Al ejecutar comandos con mucha informacion (como `git log` o `git diff`), Git usa un visor paginador.
- Veras que al final de la pantalla pone `(END)` o `:`.
- Para salir y volver a la terminal normal, solo tienes que **pulsar la tecla `q`** en tu teclado.

---

## 3. Corregir el Ultimo Commit (`git commit --amend`)

Si te has equivocado en el texto del mensaje del ultimo commit y quieres corregirlo sin crear un commit nuevo:

```bash
git commit --amend -m "Nuevo mensaje corregido del commit"
```

---

## 4. Ver Diferencias con `git diff`

El comando `git diff` te muestra que lineas han cambiado en tus archivos antes de hacer commit:
- Las lineas en **rojo** que empiezan por `-` son las lineas que se han borrado.
- Las lineas en **verde** que empiezan por `+` son las lineas que se han anadido.

---

## 5. Como Resolver un Conflicto de Merge

Un conflicto ocurre cuando **dos ramas han modificado exactamente la misma linea en el mismo archivo**, y Git no sabe con que version quedarse.

### Pasos exactos para resolverlo:
1. Al hacer `git merge rama2`, la terminal te avisara:  
   `CONFLICT (content): Merge conflict in archivo.txt`  
   Y veras que la terminal entra en un estado temporal: `(main|MERGING)`.
2. Abre el archivo con conflicto (en VS Code, con `nano archivo.txt` o abriendolo en el bloc de notas).
3. Veras unas marcas que Git ha insertado:
   ```text
   <<<<<<< HEAD
   Texto que tenias en tu rama actual (main)
   =======
   Texto que viene de la otra rama (rama2)
   >>>>>>> rama2
   ```
4. **Regla de oro**: Debes borrar manualmente las lineas `<<<<<<< HEAD`, `=======` y `>>>>>>> rama2`. Deja unicamente el texto final que desees conservar.
5. Guarda el archivo corregido.
6. En la terminal ejecuta:
   ```bash
   git add archivo.txt
   git commit -m "Resuelto conflicto de merge"
   ```
7. Al hacer el commit, la terminal saldra automaticamente de `(main|MERGING)` y volvera a `main`. Ya estara todo resuelto en tu repositorio local.
8. Para forzar el borrado de una rama conflictiva que ya uniste:
   ```bash
   git branch -D rama2
   ```
