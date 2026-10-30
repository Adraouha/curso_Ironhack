# Semana 21 - Dia 2: Despliegue en AWS con Docker y Amazon EC2

Guia completa y laboratorio practico para aprender a desplegar una aplicacion en Amazon Web Services (AWS) utilizando contenedores Docker y un servidor virtual Amazon EC2 con Ubuntu.

---

## 1. Ideas clave sobre el despliegue en la nube

### 1.1. Que significa desplegar
Hasta ahora una aplicacion funciona unicamente en el entorno de desarrollo local (tu propio ordenador a traves de `localhost`).  
Desplegar consiste en ejecutar la aplicacion en un servidor conectado a internet de forma permanente, permitiendo que cualquier usuario real pueda acceder a ella mediante una direccion IP publica o un nombre de dominio. En esta unidad, ese servidor sera una instancia de Amazon EC2.

### 1.2. Amazon EC2 como servidor virtual
Una instancia EC2 (Elastic Compute Cloud) es un ordenador virtual alojado en los centros de datos de AWS. En el puedes:
- Seleccionar el sistema operativo base (habitualmente Ubuntu Server).
- Instalar herramientas y entornos de ejecucion como Docker.
- Configurar reglas de red para permitir o denegar el trafico entrante desde internet.
- Administrar el servidor mediante una conexion remota segura por SSH (Secure Shell).

Es fundamental tener clara la distincion entre tu maquina local y la maquina remota: cuando te conectas mediante la terminal por SSH, los comandos que tecleas se ejecutan directamente en el sistema operativo del servidor de AWS, no en tu ordenador local.

### 1.3. Por que Docker facilita el despliegue
Docker empaqueta el codigo fuente junto con sus dependencias, version exacta del lenguaje y configuracion en una unidad estandar. Esto evita el tipico problema de "en mi ordenador si funciona".
Conceptos basicos que debes dominar:
- Dockerfile: Archivo de texto plano con las instrucciones paso a paso para construir la imagen.
- Imagen: Paquete o plantilla inmutable lista para ejecutar.
- Contenedor: Instancia viva en ejecucion de una imagen.
- Puerto: Canal logico de comunicacion por donde viajan los datos (por ejemplo, el puerto 3000 o el 80).

### 1.4. Condiciones para que la aplicacion sea accesible desde la IP publica
Tener la maquina EC2 encendida no basta para que la pagina web cargue en el navegador. Deben cumplirse todas estas condiciones simultaneamente:
1. El contenedor Docker debe estar en estado de ejecucion (`Up`).
2. La aplicacion debe escuchar en la interfaz `0.0.0.0` (todas las interfaces de red), nunca exclusivamente en `127.0.0.1` o `localhost`.
3. El puerto del contenedor debe estar publicado y mapeado hacia el host de la maquina virtual mediante la opcion `-p` de Docker (ejemplo: `-p 3000:3000`).
4. El Grupo de Seguridad (Security Group) de AWS debe tener una Regla de Entrada (Inbound Rule) que autorice el trafico TCP en dicho puerto desde cualquier origen (`0.0.0.0/0`).
5. El firewall interno del sistema operativo (por ejemplo `ufw` o `iptables`) no debe bloquear ese puerto.

### 1.5. Seguridad y control de costes
Antes de comenzar a trabajar en AWS se deben aplicar dos medidas obligatorias:
- Activar la autenticacion multifactorial (MFA) en la cuenta raiz (Root User) y crear un usuario IAM de trabajo para evitar accesos no autorizados.
- Configurar un presupuesto o alerta de gasto en AWS Budgets (por ejemplo, alerta a los 0,01 USD) para recibir un correo de aviso y prevenir cobros accidentales.
- Mantenerse siempre dentro de la capa gratuita (Free Tier): seleccionar el tipo de instancia `t2.micro` (o `t3.micro` segun la region) y no activar servicios avanzados ni de pago innecesarios.

---

## 2. Flujo paso a paso del laboratorio

### Paso 1: Crear la instancia EC2 en AWS
1. Accede a la consola de administracion de AWS.
2. Dirigete al servicio **EC2** y pulsa en **Launch Instance** (Lanzar instancia).
3. Configura los siguientes parametros basicos:
   - Nombre: `servidor-docker-demo`
   - Sistema operativo (AMI): `Ubuntu Server 24.04 LTS` o `Ubuntu Server 22.04 LTS` (Apto para la capa gratuita).
   - Tipo de instancia: `t2.micro` (Free tier eligible).
   - Par de claves (Key pair): Crea un nuevo par de claves de tipo RSA y formato `.pem` (por ejemplo `mi-clave-aws.pem`). Descargalo y guardalo en una carpeta segura de tu ordenador.
4. En **Network settings** (Configuracion de red):
   - Asegurate de marcar "Allow SSH traffic from Anywhere" (puerto 22).
   - Anade una regla adicional para el puerto web de la aplicacion:
     - Type: Custom TCP
     - Port range: `3000`
     - Source type: Anywhere (`0.0.0.0/0`)
5. Pulsa en **Launch Instance**.

### Paso 2: Conectarse por SSH a la instancia EC2
Abre la terminal en la carpeta donde guardaste tu archivo `.pem`:

1. En sistemas tipo Unix o Git Bash, ajusta los permisos de la clave privada:
   ```bash
   chmod 400 mi-clave-aws.pem
   ```
2. Conectate a la IP publica asignada a tu instancia:
   ```bash
   ssh -i "mi-clave-aws.pem" ubuntu@IP_PUBLICA_DE_TU_INSTANCIA
   ```
3. Si el sistema te pregunta si deseas continuar la conexion (`Are you sure you want to continue connecting (yes/no)?`), escribe `yes` y presiona Enter.

### Paso 3: Instalar Docker en el servidor Ubuntu
Una vez dentro de la maquina virtual, ejecuta los siguientes comandos:

```bash
# 1. Actualizar la lista de paquetes del sistema
sudo apt update

# 2. Instalar el paquete de Docker
sudo apt install -y docker.io

# 3. Arrancar y habilitar el servicio de Docker
sudo systemctl start docker
sudo systemctl enable docker

# 4. Comprobar que Docker esta instalado y funcionando
sudo docker --version
```

### Paso 4: Preparar la aplicacion en el servidor
Puedes clonar tu repositorio de GitHub directamente en el servidor o crear una carpeta con los archivos de la app:

```bash
# Crear directorio de trabajo
mkdir mi-app
cd mi-app

# Crear el package.json, server.js, index.html y Dockerfile
# (O clonar tu proyecto con: git clone https://github.com/tu-usuario/tu-repo.git .)
```

### Paso 5: Construir la imagen Docker y arrancar el contenedor
En la carpeta donde esta el `Dockerfile`:

```bash
# 1. Construir la imagen localmente en la maquina virtual
sudo docker build -t app-demo:1.0 .

# 2. Ejecutar el contenedor en segundo plano (-d) mapeando el puerto (-p)
sudo docker run -d -p 3000:3000 --name mi-contenedor-web app-demo:1.0

# 3. Verificar que el contenedor esta activo
sudo docker ps
```

### Paso 6: Probar el acceso desde Internet
Abre tu navegador habitual en tu ordenador personal e introduce la siguiente direccion:
```
http://IP_PUBLICA_DE_TU_INSTANCIA:3000
```
Veras cargarse la pagina web y el mensaje confirmando que la aplicacion esta ejecutandose dentro del contenedor Docker en Amazon EC2.

---

## 3. Diagnostico de posibles errores (Checklist ordenado)

Si introduces la IP publica en el navegador y la aplicacion no carga o da tiempo de espera agotado, debes revisar las siguientes 7 preguntas en este orden exacto:

1. **La instancia EC2 esta encendida?**  
   Comprueba en la consola de AWS que el estado de la instancia sea "Running" (En ejecucion) y que haya superado las comprobaciones de estado (2/2 checks passed).

2. **El contenedor esta ejecutandose?**  
   Conectate por SSH y ejecuta `sudo docker ps`. Si la lista aparece vacia, el contenedor se ha detenido. Usa `sudo docker ps -a` para ver los contenedores detenidos y su codigo de salida.

3. **El puerto esta publicado correctamente?**  
   En la columna `PORTS` de `docker ps` debes ver `0.0.0.0:3000->3000/tcp`. Si solo pone `3000/tcp` sin la flecha de mapeo, significa que olvidaste el modificador `-p 3000:3000` al ejecutar `docker run`.

4. **La aplicacion escucha en 0.0.0.0?**  
   Revisa el codigo del servidor (`server.js` o configuracion de Spring Boot). Debe escuchar explicitamente en la interfaz `0.0.0.0`. Si escucha en `localhost` o `127.0.0.1`, las peticiones provenientes del exterior del contenedor seran rechazadas.

5. **El grupo de seguridad permite el puerto?**  
   En la consola de AWS, selecciona la instancia, pestana "Security", haz clic en el Security Group y revisa las "Inbound rules" (Reglas de entrada). Debe existir una regla de tipo Custom TCP para el puerto `3000` con origen `0.0.0.0/0`.

6. **La IP publica es la correcta?**  
   Si detuviste la instancia y la volviste a iniciar, AWS asigna una nueva IP publica salvo que tengas una Elastic IP asociada. Copia siempre la IP publica actual desde la consola de EC2. Recuerda ademas utilizar `http://` y no `https://` salvo que tengas un certificado SSL configurado.

7. **Los logs del contenedor muestran algun error?**  
   Ejecuta en la terminal del servidor:
   ```bash
   sudo docker logs mi-contenedor-web
   ```
   Ahi podras ver excepciones de ejecucion, problemas al cargar modulos o errores de sintaxis en la aplicacion.

---

## 4. Finalizacion y limpieza de recursos

Al terminar la practica para evitar cualquier consumo innecesario de la capa gratuita:
1. En la consola de AWS EC2, selecciona tu instancia.
2. Haz clic en "Instance state" -> "Stop instance" (Detener) si deseas conservarla apagada, o "Terminate instance" (Terminar) si ya no vas a necesitarla.
