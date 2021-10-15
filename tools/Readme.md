# Generador de modelos y estructura DDD

Genera archivos base para el desarrollo bajo la arquitectura Domain-Driven Design

Motivación
---------------
Muchas veces es un trabajo repetitivo contruir un sistema bajo una estructura que la mayoría de las veces suele repetirse pero respetarse a nivel de capas, entoces fue que nació esta idea de poder generar estos archivos mandandole ciertos parametros para su construcción, obviamente esta herramienta no va a generar toda la estructura pero sí los archivos base en las capas 
de Repositorio, Servicio y Aplicación, luego habrá que modificarlo según sea la lógica de nuestro negocio

Uso
-----

### Generación de modelos a partir de una base de datos

* Copia el archivo `config.js.sample` como `config.js`
* Abre el archivo `config.js` Introduce los parametros necesarios como credenciales de la base de datos, rutas de salida, template que deseas utilizar y esquemas que desea que genere separados por una coma
* Una vez configurado correctamente los parametros, ejecuta el comando `npm run gen-mod` en la terminal y listo!!!

### Generación de archivos base en la arquitectura DDD

* Ejecuta el comando `npm run gen-arq`
* Elije la opción `Crear nueva arquitectura DDD`
* Introduce el esquema al que pertenece en la base de datos, ejemplo: `Replace __Esquema__ with > seguridad`
* Introduce el nombre del modelo que es el nombre de la tabla en la base de datos con la primera letra mayúscula, ejemplo: `Replace __Model__ with > Usuario`
* Introduce el nombre de la tabla `Replace __Tabla__ with > usuario`
* Por ultimo presiona un enter en `Output path` o escribe la ruta `src` del proyecto y Listo


The MIT License (MIT)

Copyright (c) 2021 Felix Mamani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.