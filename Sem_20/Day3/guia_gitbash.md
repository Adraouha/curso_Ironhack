# Guia Rapida de Comandos Unix en Git Bash

Git Bash es una terminal basada en **Unix** (igual que Linux y macOS). Esto permite usar comandos que no existen de la misma forma en el CMD de Windows.

---

## 1. Comandos basicos de navegacion y archivos

| Comando | Para que sirve | Ejemplo |
| :--- | :--- | :--- |
| `pwd` | Muestra la ruta de la carpeta donde estas actualmente | `pwd` |
| `ls` | Lista los archivos y carpetas del directorio | `ls` |
| `ls -la` | Lista todos los archivos, incluidos los ocultos como `.git` | `ls -la` |
| `cd carpeta` | Entra dentro de una carpeta | `cd proyecto` |
| `cd ..` | Sube un nivel hacia la carpeta padre | `cd ..` |
| `mkdir nombre` | Crea una carpeta nueva | `mkdir mi_proyecto` |
| `touch archivo`| Crea un archivo vacio | `touch index.html` |
| `nano archivo` | Abre un editor de texto basico dentro de la terminal | `nano notas.txt` |
| `cat archivo`  | Muestra el contenido del archivo en la consola | `cat index.html` |
| `clear`        | Limpia la pantalla de la terminal | `clear` |
| `history`      | Muestra el historial de los ultimos comandos escritos | `history` |

---

## 2. Que es un "Flag" (Modificador de comando)?

Un **flag** es una opcion o modificador que anadimos a un comando para cambiar o ampliar su comportamiento. Suelen empezar por un guion `-` (formato corto) o dos guiones `--` (formato largo).

### Ejemplos comunes de flags en Git:

- `git log --oneline`: El flag `--oneline` reduce la informacion del historial a una sola linea por commit (muestra el hash corto y el mensaje).
- `git commit -m "Mensaje"`: El flag `-m` permite escribir el mensaje del commit directamente entre comillas sin abrir un editor.
- `git branch -M main`: El flag `-M` renombra la rama a la fuerza.
- `git checkout -b nueva-rama`: El flag `-b` crea la rama y a la vez salta a ella.
- `git push -u origin main`: El flag `-u` guarda la referencia del servidor remoto para que la proxima vez baste con escribir `git push`.
- `git push origin main --force`: El flag `--force` obliga a GitHub a aceptar los cambios aunque no coincidan con el historial anterior.

---

## 3. Redirecciones con `>` y `>>`

En Git Bash podemos enviar la salida de cualquier comando a un archivo de texto:

- **Operador `>` (Sobrescribir)**:  
  Crea el archivo (o reemplaza todo su contenido si ya existia):
  ```bash
  git log --oneline > tuNombreGitlog.txt
  ```
- **Operador `>>` (Anadir al final)**:  
  Anade una linea al final del archivo sin borrar lo que habia:
  ```bash
  echo "Nueva linea" >> notas.txt
  ```
