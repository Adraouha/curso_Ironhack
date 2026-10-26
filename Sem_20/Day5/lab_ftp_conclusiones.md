# Laboratorio Dia 5: Respuestas y Conclusiones sobre Redes, cPanel y FTP

Documento con las respuestas a las preguntas del laboratorio y las conclusiones de los videos asignados en el Dia 5 de la Semana 20.

---

## 1. Conclusiones de los Videos

### Video 1: Que son los DNS?
Enlace: https://www.youtube.com/watch?v=7XjJqUM0dvg

- **Que problema resuelve el DNS**:
  Las computadoras se comunican mediante direcciones IP numericas (como `185.27.134.12`), pero para las personas es dificil recordar numeros para cada pagina. El sistema DNS (Domain Name System) funciona como una guia de contactos: traduce nombres de dominio faciles de recordar (como `google.com` o `tuweb.tonohost.com`) en la direccion IP del servidor correspondiente.

- **Proceso de resolucion**:
  1. El navegador consulta primero su propia memoria cache y la del sistema operativo.
  2. Si no la tiene, consulta a los servidores DNS del proveedor de internet o configurados en el equipo.
  3. Los servidores DNS buscan de forma jerarquica: servidores raiz, servidores del dominio superior (.com, .es) y el servidor con autoridad sobre el dominio.
  4. Una vez encontrada la IP, el navegador se conecta directamente al servidor web.

- **Tiempo de propagacion y TTL**:
  Cada registro DNS tiene un valor llamado TTL (Time To Live), que indica cuanto tiempo se guarda la direccion en cache antes de volver a preguntar. Por eso, al cambiar de hosting o registrar un dominio, los cambios pueden tardar unas horas en verse en todo el mundo.

---

### Video 2: Guia rapida cPanel
Enlace: https://www.youtube.com/watch?v=e0BRJINnf6c

- **Que es cPanel**:
  Es un panel de administracion web que permite gestionar un servidor de hosting desde una interfaz grafica en el navegador, sin necesidad de usar comandos de consola Linux.

- **Funciones principales que incluye**:
  1. Administrador de archivos: para subir, editar o borrar archivos directamente en el servidor.
  2. Cuentas de correo: para crear direcciones asociadas al dominio.
  3. Bases de datos MySQL y phpMyAdmin: para crear bases de datos y gestionar tablas de forma visual.
  4. Dominios y subdominios: para asociar nombres de pagina al hosting.
  5. Cuentas FTP: para permitir que programas externos como FileZilla suban y bajen archivos.
  6. Certificados SSL: para que el sitio funcione de forma segura bajo https.

---

## 2. Experiencia con el Hosting Gratuito Tonohost

- **Proceso de registro**:
  El alta en el servicio gratuito de Tonohost requiere completar un formulario con correo, contrasena y la eleccion de un subdominio. En algunos casos puede costar un poco mas por las comprobaciones de seguridad o la demora en activar el panel. Una vez activada la cuenta, se accede a un panel (VistaPanel, variante ligera de cPanel) donde se muestran los datos del servidor.

- **Exploracion del panel de control**:
  El panel resulta util porque reune en una sola pantalla los datos necesarios para trabajar: el nombre del servidor FTP, el usuario asignado, el estado de la cuenta y los accesos directos al Administrador de Archivos y a phpMyAdmin.

- **Conexion con FileZilla y carpeta htdocs**:
  - Al configurar FileZilla con el servidor (por ejemplo `ftpupload.net`), el usuario asignado y el puerto 21, se accede a las carpetas remotas del hosting.
  - Es fundamental subir los archivos dentro de la carpeta `htdocs`, porque el servidor web esta configurado para mostrar al publico unicamente lo que este dentro de ese directorio.
  - El archivo principal debe llamarse `index.html`. Si tuviera otro nombre, al entrar a la direccion web saldria un error 403 Forbidden o un listado vacio.

---

## 3. Preguntas y Dudas para Compartir en Clase

1. **Seguridad en FTP tradicional vs SFTP**:
   En el protocolo FTP normal (puerto 21), los datos y las contrasenas viajan sin cifrar. Para proyectos reales en produccion, conviene utilizar SFTP (puerto 22) o FTPS con certificados para proteger las credenciales.
2. **Modo Pasivo en FileZilla**:
   En conexiones domesticas detras de un router con cortafuegos, el modo pasivo evita que la conexion se corte al solicitar el listado de archivos.
3. **Cache del navegador**:
   Al subir un archivo nuevo por FTP y recargar la pagina en el navegador, muchas veces no se ven los cambios de inmediato porque el navegador conserva en cache el archivo anterior. Para solucionarlo, se usa la recarga forzada con `Ctrl + F5`.
