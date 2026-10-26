# Semana 20 - Dia 5: Redes, Panel de Control (cPanel/Tonohost) y Acceso FTP con FileZilla

Guia sencilla para entender los conceptos basicos de redes, el funcionamiento de un panel de control de hosting, la configuracion de un cliente FTP y los pasos para publicar una pagina web en internet.

---

## 1. Conceptos Generales sobre Redes

### Modelo Cliente / Servidor
La navegacion web se basa en la comunicacion entre dos partes:
- **Cliente**: El programa o dispositivo que solicita informacion (por ejemplo, el navegador Google Chrome o el cliente FTP FileZilla).
- **Servidor**: La computadora remota donde estan guardados los archivos y que responde enviando la informacion solicitada.

### Direccion IP y Puertos
- **Direccion IP**: Numero unico que identifica a un equipo conectado a una red (ejemplo: `185.27.134.12`).
  - *IP Privada*: Se usa solo dentro de la red de casa o de la oficina (ejemplo: `192.168.1.10`).
  - *IP Publica*: Es la direccion visible en internet.
- **Puertos**: Canales de comunicacion que permiten a una misma computadora ofrecer distintos servicios a la vez:

| Puerto | Protocolo | Descripcion |
| :---: | :---: | :--- |
| **21** | **FTP** | Transferencia de archivos entre cliente y servidor. |
| **22** | **SFTP / SSH** | Acceso por terminal y transferencia de archivos cifrada. |
| **53** | **DNS** | Resolucion de nombres de dominio a direcciones IP. |
| **80** | **HTTP** | Navegacion web estandar (sin cifrar). |
| **443** | **HTTPS** | Navegacion web segura con certificado SSL. |

### Que es el DNS?
El **DNS (Domain Name System)** se encarga de traducir los nombres de dominio que escribimos en el navegador (como `tonohost.com` o `tuweb.tonohost.com`) en la direccion IP numerica del servidor correspondiente. Si no existiera el DNS, tendriamos que memorizar combinaciones de numeros para entrar en cada sitio web.

---

## 2. Que es un Panel de Control de Hosting?

Un panel de control es una herramienta web que permite administrar un servidor de alojamiento desde el navegador mediante botones y formularios, sin necesidad de usar comandos de consola.

### Funciones habituales en cPanel / VistaPanel (Tonohost):
- **Administrador de Archivos**: Permite subir, mover, editar o borrar archivos en el servidor.
- **Dominios y Subdominios**: Permite crear alias o subdominios gratuitos.
- **Cuentas FTP**: Muestra los datos de conexion para programas externos como FileZilla.
- **Bases de datos MySQL y phpMyAdmin**: Permite crear bases de datos y gestionar tablas de forma visual.
- **Seguridad**: Gestion de claves de acceso y certificados SSL.

---

## 3. El Protocolo FTP y el Cliente FileZilla

### Que es FTP?
**FTP (File Transfer Protocol)** es un protocolo disenado para transferir archivos a traves de internet.
- Utiliza el puerto **21** para el control de la sesion.
- Requiere un programa **servidor FTP** instalado en el hosting y un programa **cliente FTP** instalado en la computadora del usuario (como FileZilla).

### La Carpeta htdocs y el Archivo index.html
- **Carpeta `htdocs`**: Es la carpeta raiz publica del servidor web Apache. Cualquier archivo que se quiera ver desde el navegador debe subirse obligatoriamente dentro de `htdocs`. Los archivos que queden fuera de esta carpeta no se podran ver en internet.
- **Archivo `index.html`**: Es el nombre estandar del archivo principal. Cuando un usuario escribe el dominio en el navegador, el servidor busca de forma automatica un archivo llamado exactamente `index.html` (en minusculas).

---

## 4. Recursos de la Leccion

- Presentacion de la leccion (Google Slides):  
  https://docs.google.com/presentation/d/1SirTy0OweTE2tSG0QKjAb7ZALjvWnDKS/edit?usp=drive_link&ouid=110892750782689430380&rtpof=true&sd=true
- Video sobre DNS:  
  https://www.youtube.com/watch?v=7XjJqUM0dvg
- Video sobre cPanel:  
  https://www.youtube.com/watch?v=e0BRJINnf6c
- Web de hosting gratuito Tonohost:  
  https://www.tonohost.com/
- Documento con respuestas y conclusiones:  
  [lab_ftp_conclusiones.md](./lab_ftp_conclusiones.md)
- Carpeta con la web de prueba lista para subir:  
  [web_demo/](./web_demo/)

---

## 5. Instrucciones del LAB 1: Tonohost y FileZilla

### Paso 1: Registrarse en Tonohost
1. Entra en https://www.tonohost.com/ y selecciona la opcion de hosting gratuito (a cero euros).
2. Elige un nombre de subdominio gratuito disponible.
3. Rellena los datos de registro (correo y contrasena) y confirma la activacion de la cuenta.

### Paso 2: Obtener las credenciales FTP
Entra en el panel de control de Tonohost y localiza en la seccion de datos de la cuenta los siguientes campos:
- **Servidor FTP (Host)**: Por ejemplo `ftpupload.net` (o el indicado en tu cuenta).
- **Nombre de usuario FTP**: El codigo de usuario asignado por el hosting (por ejemplo `epiz_12345678`).
- **Contrasena FTP**: La contrasena configurada al registrarte.
- **Puerto**: `21`.

### Paso 3: Conectar con FileZilla
1. Abre el programa FileZilla.
2. En la barra superior de conexion rapida, introduce el Servidor, Nombre de usuario, Contrasena y el Puerto `21`.
3. Pulsa el boton **Conexion rapida**.
4. Si aparece un aviso sobre el certificado TLS del servidor, marca la casilla de aceptar y continuar.
5. Cuando en la ventana de registro de mensajes aparezca `Estado: Directorio listado correctamente`, la conexion estara establecida.

### Paso 4: Subir los archivos a la carpeta htdocs
1. En el panel derecho de FileZilla (Sitio remoto), haz doble clic sobre la carpeta **`htdocs`**.
2. En el panel izquierdo (Sitio local), busca la carpeta del proyecto en tu equipo:  
   `Sem_20/Day5/web_demo/`
3. Selecciona los tres archivos:
   - `index.html`
   - `estilos.css`
   - `script.js`
4. Haz clic derecho y selecciona **Subir** (o arrastralos al panel derecho dentro de `htdocs`).
5. Comprueba en la parte inferior que los archivos se transfieren correctamente a la lista de descargas satisfactorias.

### Paso 5: Comprobar la web en el navegador
1. Abre el navegador web y escribe la direccion de tu subdominio (por ejemplo: `http://tu-subdominio.tonohost.com`).
2. Verifica que carga la pagina, que se aplican los estilos de `estilos.css` y que el boton responde al hacer clic ejecutando `script.js`.
3. Guarda el enlace de tu pagina web para entregarlo como parte de la practica.

---

## 6. Instrucciones del LAB 2: Conclusiones de los Videos

1. Visualiza los dos videos indicados en el apartado de recursos (Que son los DNS y Guia rapida de cPanel).
2. Consulta el archivo [lab_ftp_conclusiones.md](./lab_ftp_conclusiones.md) donde estan redactadas las conclusiones principales, el analisis de la experiencia con Tonohost y las dudas para comentar en clase.

---

## 7. Solucion de Problemas Frecuentes

- **Error "530 Login incorrect"**:
  El usuario o la contrasena estan mal escritos. Revisa en el panel de Tonohost tu nombre de usuario exacto (suele empezar por `epiz_`, no es tu correo electronico).
- **Error "Connection timed out" o la conexion se queda esperando**:
  Asegurate de que FileZilla este configurado en **Modo Pasivo**. Puedes verificarlo en `Edicion > Opciones > Conexion > FTP`.
- **Aparece un error 403 Forbidden en el navegador**:
  Ocurre si subiste los archivos fuera de la carpeta `htdocs`, o si el archivo principal no se llama exactamente `index.html` en minusculas.
- **Los cambios no se ven al actualizar**:
  El navegador suele guardar la version anterior en memoria cache. Pulsa `Ctrl + F5` para forzar la recarga completa de la pagina.
