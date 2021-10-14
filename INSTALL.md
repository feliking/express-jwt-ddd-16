# Instalación

## Requerimientos del servidor

Ver [SERVER.md](SERVER.md)

## Instalación del proyecto

1. Clonar el código fuente desde el repositorio.

```sh
$ git clone https://gitlab.softwarelibre.gob.bo/agetic/agetic-aplicacion-base/base-backend.git
```

2. Ingresar a la carpeta.

```sh
$ cd base-backend
```

3. Instalar las dependencias de paquetes npm

```sh
$ npm install
```

## Configuraciones

1. Copiar archivos de configuración y modificarlos según necesidad.

```sh
$ cp .env.sample .env
$ cp src/common/config/openid.js.sample src/common/config/openid.js
```

2. Configurar el acceso a la base de datos en el archivo `.env`

```sh
# DATABASE
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres
DB_HOST=localhost

DB_DIALECT=postgres
DB_TIMEZONE=America/La_Paz
```
3. Configurar el envío de correo electrónico en el archivo `.env` si usará un servidor SMTP *(Opcional)*

```sh
# MAIL SMTP
MAIL_SENDER=info@midominio.gob.bo
MAIL_HOST=smtp.midominio.gob.bo
MAIL_PORT=587
MAIL_SECURE=false
MAIL_IGNORE_TLS=false
MAIL_AUTH_USER=unusuario@midominio.gob.bo
MAIL_AUTH_PASS=password
MAIL_TLS_REJECT_UNAUTHORIZED=false
```

4. Configurar los logs del sistema en el archivo `.env`

```sh
# LOGS
LOG_STORAGE=database # database o filesystem
LOG_OUTPUT_DIRECTORY=./logs
LOG_OUTPUT_FILENAME=logs.log
LOG_FORMAT=combined
LOG_LEVEL=info
```

5. Si se usa ciudadanía digital, configurar URL, client, client_params `nano src/common/config/openid.js` *(Opcional)*

```js
const openid = {
  // issuer server openid connect
  issuer: 'https://OPENID_URL',
  // response registry client
  client: {
    ...
  },
  // parameters registry client
  client_params: {
    scope: ['openid profile email']
  }
};
```

## Inicializar la base de datos

1. Crear una base de datos vacía en su gestor de base de datos con la información que configuró en el archivo `.env`

2. Ejecutar lo siguiente para crear las tablas, esto eliminará las tablas y los datos de estas para reescribirlos.

```sh
$ npm run setup
```

3. Ejecutar lo siguiente para poblar las tablas con datos iniciales.

#### Para desarrollo
```sh
$ npm run seeders
```
#### Para producción
```sh
$ env NODE_ENV=production npm run seeders
```

> Los seeders ponen `123456` como contraseña de los usuarios.

## Iniciar el proyecto

#### Para desarrollo
```sh
$ npm run dev
```

#### Para producción con PM2
Ejecutar esto dentro el directorio del proyecto:
```sh
$ pm2 start npm -- start --name "proyecto-api"
```
ó
```sh
$ env NODE_ENV=production pm2 start src/application/server.js --name "proyecto-api"
```

## Configurar Nginx

Editar el archivo de configuración `nano /etc/nginx/sites-enabled/default`

Agregar las siguientes lineas

```sh
  ...
  location /myapp/ {
    proxy_pass http://localhost:3000/;
  }
  ...
```

Reiniciar el servicio

```sh
$ sudo service nginx restart
```

---
