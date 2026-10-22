# Chuleta de Comandos de Git (Terminal vs Interfaz VS Code)

Tabla comparativa sencilla para saber que hace cada boton de VS Code en la terminal:

| Accion | En la interfaz visual de VS Code | En la terminal |
| :--- | :--- | :--- |
| **Comprobar si Git esta instalado** | - | `git --version` |
| **Configurar tu nombre** | - | `git config --global user.name "Tu Nombre"` |
| **Configurar tu correo** | - | `git config --global user.email "tu@email.com"` |
| **Ver estado de los archivos** | Icono de Git (Source Control) a la izquierda | `git status` |
| **Iniciar control de versiones** | Boton azul "Initialize Repository" | `git init` |
| **Pasar a sala de espera (Stage)** | Pulsar en el icono **+** al lado del archivo | `git add nombre_archivo` (o `git add .`) |
| **Guardar cambios (Commit local)** | Escribir mensaje en la caja y pulsar "Commit" | `git commit -m "Mensaje del commit"` |
| **Conectar con GitHub** | - | `git remote add origin https://github.com/usuario/repo.git` |
| **Renombrar rama a main** | - | `git branch -M main` |
| **Subir por primera vez a GitHub** | Boton "Publish Branch" | `git push -u origin main` |
| **Subir cambios posteriores** | Boton "Sync Changes" o tres puntos > Push | `git push` |
| **Traer cambios de GitHub** | Boton "Sync Changes" o tres puntos > Pull | `git pull` |
| **Crear nueva rama** | Clic abajo a la izquierda en "main" > "Create branch" | `git checkout -b nombre-rama` |
| **Cambiar de rama** | Clic abajo a la izquierda y elegir la rama | `git checkout nombre-rama` |
| **Fusionar ramas (Merge)** | Estando en main: Tres puntos > Branch > Merge Branch | `git merge nombre-rama` |
| **Borrar rama en local** | Estando en otra rama: Tres puntos > Branch > Delete Branch | `git branch -d nombre-rama` |
| **Borrar rama en GitHub** | En la web de GitHub: pestaña Branches > papelera | `git push origin --delete nombre-rama` |

---

### Letras de estado en VS Code:
- **U (Untracked)**: Archivo nuevo que Git todavia no sigue ni vigila.
- **A (Added / Staged)**: Archivo anadido a la sala de espera (despues de pulsar el `+`).
- **M (Modified)**: Archivo que ya existia pero ha sido modificado.
- **D (Deleted)**: Archivo que ha sido borrado.
