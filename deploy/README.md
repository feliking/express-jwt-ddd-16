# Manual de deploy para producción

Este documento contiene todas las instrucciones para instalar el sistema en producción.

**IMPORTANTE.-** Este deploy está en etapas de pruebas para que funcione al 100%

## 1. Instalando Ansible

Instalar de acuerdo al sistema operativo http://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html con la última versión de Ansible.

**Nota.-** Este documento se lo realizó con la versión 2.5.2 de Ansible.

## 2. Instalando Dependencias de Ansible

Se deben instalar los siguientes paquetes de ansible-galaxy para realizar el deploy del sistema.

``` bash
# Instalando Postgres
ansible-galaxy install ANXS.postgresql

# Instalando Nginx
ansible-galaxy install jdauphant.nginx
```

## 3. Configuración de la base de datos

Configurar los datos de la base de datos en el archivo `deploy/roles/database/vars/main.yml`, si se coloca la variable `pass` con un valor encriptado colocar la variable **encrypted** así `encrypted: yes`

## 4. Creando llave ssh de conexión

Creamos una llave ssh para poder conectarnos directamente con el servidor de producción

``` bash
# Generamos la llave ssh dentro la carpeta deploy/ssh con el nombre deploy
ssh-keygen -t rsa -C "ogutierrez@email.gob.bo - deploy"
```

## 5. Configurando servidor

Ingresamos al servidor de producción y agregamos la llave ssh dentro del mismo

``` bash
# Ingresamos como root
sudo su -

# Editamos el archivo ~/.ssh/authorized_keys
vi ~/.ssh/authorized_keys
```

Agregamos el contenido de nuestra llave pública `deploy/ssh/deploy.pub` que generamos previamente, lo copiamos en el archivo `authorized_keys` abierto en el servidor de producción y nos salimos del servidor.

**Nota.-** en caso de salir un error relacionado con known_hosts (esto no es en el servidor) eliminar este archivo con `rm ~/.ssh/known_hosts`

Probamos la conexión con el servidor de producción usando la llave privada generada en `deploy/ssh/deploy` (esto lo hacemos dentro la carpeta deploy del proyecto)

``` bash
ssh root@127.0.0.1 -p 2222 -i ssh/deploy
```

## 6. Copiando archivos para el deploy

Se copiará todo el código fuente para su subida a producción

``` bash
# Ejecutar este archivo shell dentro la carpeta deploy
sh copy.sh
```

Se debe verificar que todas estas carpetas existan con su contenido correspondiente:

``` bash
deploy/roles/common/files/common/
deploy/roles/infrastructure/files/infrastructure/
deploy/roles/domain/files/domain/
deploy/roles/application/files/application/
deploy/roles/web/files/web/
```

**Nota.-** Si el archivo `copy.sh` no copia todos los archivos requeridos ejecutar todos los comandos del archivo uno por uno.

## 7. Configurando base de datos y correo electrónico

- Se debe configurar la conexión de la base de datos en el archivo copiado `deploy/roles/common/files/common/src/config/db.js`

- Se debe configurar el correo electrónico en el archivo copiado `deploy/roles/common/files/common/src/config/correo.js`

## 8. Ejecutando Ansible y haciendo deploy del sistema

``` bash
# Ejecutamos el playbook de ansible
ansible-playbook -i inventory.ini backend.yml --private-key ssh/deploy
```

## 9. Probando servicios en el servidor de producción

``` bash
# Probando conexión a la bd en el servidor de producción
psql -U usuario base-de-datos

# Comprobamos el estado del servicio backend-admin
systemctl status backend-admin

# Comprobamos el estado del servicio backend-proxy
systemctl status backend-proxy
```

# Para entorno de desarrollo

## 1. Probando las configuraciones en vagrant

Si se desea probar el deploy de manera local seguir los siguientes pasos:

1. Requisitos.-
- Instalar Virtualbox https://www.virtualbox.org/wiki/Downloads
- Instalar Vagrant https://www.vagrantup.com/downloads.html

2. Instalando e iniciando un servidor Debian con Vagrant

``` bash
# Instalando Debian con Vagrant
vagrant init debian/jessie64

# Inicializando Debian Vagrant
vagrant up

# Ingresando a Debian mediante SSH
vagrant ssh
```