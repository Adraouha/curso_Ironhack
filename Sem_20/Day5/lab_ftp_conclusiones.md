# Laboratorio Día 5: Acceso FTP, cPanel y Análisis de Redes

Este documento recoge las reflexiones, conclusiones técnicas y respuestas a las preguntas planteadas en los ejercicios prácticos y recursos de video del **Día 5 de la Semana 20**.

---

## 1. Análisis y Conclusiones de los Videos

### A) Video 1: *¿Qué son los DNS?* ([Ver en YouTube](https://www.youtube.com/watch?v=7XjJqUM0dvg))

#### ¿Qué problema resuelve el DNS?
- Los ordenadores y servidores en Internet se comunican mediante **direcciones IP numéricas** (por ejemplo, `185.27.134.12` en IPv4 o direcciones hexadecimales en IPv6).
- Para los seres humanos es inviable memorizar combinaciones numéricas para cada página web.
- El **DNS (Domain Name System)** actúa como la **"gueta telefónica de Internet"**, traduciendo nombres de dominio fáciles de recordar (como `google.com` o `tuweb.tonohost.com`) en las direcciones IP numéricas que necesitan los routers y navegadores.

#### Proceso de Resolución Jerárquica:
1. **Caché local del navegador y del S.O.**: Primero comprueba si ya conoce la IP recientemente o si existe en el archivo local `hosts`.
2. **Servidor DNS recursivo (Resolver del ISP)**: Si no está en caché, consulta al DNS del proveedor de Internet o a DNS públicos como `8.8.8.8` (Google) o `1.1.1.1` (Cloudflare).
3. **Servidores Raíz (Root Servers)**: Indican cuál es el servidor responsable del dominio de nivel superior o TLD (`.com`, `.es`, `.org`).
4. **Servidores TLD (Top-Level Domain)**: Dirigen la consulta al **servidor de nombres autoritativo** del dominio concreto.
5. **Servidor Autoritativo**: Devuelve el registro DNS final (por ejemplo, el registro **Tipo A** con la IP final).
6. **Respuesta al cliente y almacenamiento en caché (TTL)**: El navegador recibe la IP y la almacena durante el tiempo definido por el valor **TTL (Time To Live)** para no repetir toda la cadena en futuras visitas.

#### Conclusión Clave:
> Comprender el funcionamiento del DNS explica por qué al registrar un nuevo dominio o cambiar de hosting se habla de **"tiempo de propagación DNS"** (habitualmente entre unas pocas horas y 24/48h): los servidores DNS de todo el mundo deben actualizar sus cachés para apuntar al nuevo servidor.

---

### B) Video 2: *Guía rápida cPanel* ([Ver en YouTube](https://www.youtube.com/watch?v=e0BRJINnf6c))

#### ¿Qué es cPanel y por qué se utiliza tanto?
- **cPanel** es la interfaz gráfica de administración web (Panel de Control) basada en Linux más extendida en la industria del hosting.
- Permite a desarrolladores y administradores gestionar servidores web complejos sin necesidad de dominar comandos de terminal SSH para cada tarea cotidiana.

#### Módulos principales destacados:
1. **Administrador de Archivos (File Manager)**: Explorador web para crear, editar, subir o descomprimir archivos directamente en el servidor.
2. **Cuentas de Correo Corporativo**: Creación de buzones `@tudominio.com`, redireccionamientos y filtros antispam.
3. **Bases de Datos MySQL y phpMyAdmin**: Creación de bases de datos relacionales, asignación de usuarios y contraseñas con privilegios, y gestión visual mediante phpMyAdmin.
4. **Gestión de Dominios y Subdominios**: Configuración de alias, redirecciones 301/302 y zonas DNS.
5. **Cuentas FTP**: Generación de usuarios adicionales con acceso restringido a carpetas específicas para colaboradores externos.
6. **Seguridad y SSL**: Activación de certificados TLS/SSL (Let's Encrypt) para servir la web de forma segura bajo `https://`.

#### Conclusión Clave:
> Aunque cPanel simplifica drásticamente la operativa, internamente interactúa con software estándar de la arquitectura LAMP/LEMP (Apache/Nginx, MySQL/MariaDB, PHP y Pure-FTPd/ProFTPD). Conocer lo que ocurre por debajo te permite diagnosticar errores como permisos `chmod 755/644` o límites de cuota de disco.

---

## 2. Experiencia con el Hosting Gratuito Tonohost

### A) El proceso de alta a "cero euros"
- **Dificultades encontradas**: 
  - Los hostings gratuitos a menudo implementan procesos de verificación estrictos (confirmaciones por correo, captchas, validación antibot o restricciones de subdominios ya ocupados).
  - La activación no siempre es inmediata; en ocasiones requiere esperar unos minutos hasta que los servicios DNS internos y la cuota de espacio en disco se asignan al servidor compartido.
- **Valoración del panel de control**:
  - Tonohost utiliza **VistaPanel** (una variante ligera y adaptada de cPanel muy común en hostings gratuitos compartidos basados en la infraestructura de ByetHost / iFastNet).
  - La interfaz reúne de un vistazo las **Credenciales del Servidor** (Servidor FTP, Usuario FTP, Nombre de base de datos MySQL, IP del servidor y URL del subdominio).

### B) Conexión con FileZilla y la carpeta `htdocs`
- **¿Por qué subir a `htdocs`?**:
  - El servidor web Apache está configurado con la directiva `DocumentRoot` apuntando a `/htdocs` (o `/public_html` en otros cPanels).
  - Cualquier archivo situado **fuera** de esta carpeta no es accesible públicamente desde el navegador por motivos de seguridad.
- **La importancia de `index.html`**:
  - Por convención estándar, los servidores web buscan automáticamente un archivo llamado `index.html`, `index.php` o `index.htm` cuando un usuario accede a la raíz del dominio (por ejemplo `http://miweb.tonohost.com/`).
  - Si el archivo se llamase `inicio.html` o `home.html`, el visitante recibiría un error **403 Forbidden** (índice desactivado) o un listado de carpetas en lugar de abrir la página web.

---

## 3. Puntos de Debate y Dudas para Compartir en Clase

A continuación se resumen varias preguntas y reflexiones preparadas para abrir debate técnico en el aula:

1. **FTP Plano (puerto 21) vs FTPS / SFTP (puerto 22)**:
   - *¿Es seguro enviar contraseñas por FTP tradicional?*
   - En el FTP clásico, el usuario y la contraseña viajan en texto claro sin cifrar por la red. Si alguien intercepta los paquetes, puede robar el acceso al servidor. ¿Por qué los hostings gratuitos aún ofrecen FTP plano y cuándo es imprescindible exigir FTPS o SFTP?
2. **Modo Pasivo vs Modo Activo en FileZilla**:
   - En los laboratorios y redes domésticas detrás de routers con NAT/Firewall, ¿por qué el modo Pasivo (PASV) es el predeterminado y el que evita que FileZilla se quede congelado al listar directorios?
3. **Propagación DNS y Caché Local**:
   - Si cambiamos un archivo y no lo vemos en el navegador, ¿es culpa de la caché de FileZilla, de la caché del navegador (`Ctrl + F5`) o del TTL del DNS?
4. **Limitaciones de los Hostings Gratuitos**:
   - Falta de soporte para Node.js o Java Spring Boot directo (generalmente solo soportan PHP y HTML estático).
   - Ausencia de certificado SSL automático en algunos planes gratuitos o límites de CPU / llamadas por hora.
