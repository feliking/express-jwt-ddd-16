# Estrucutra del código Fuente

El código se divide en módulos dentro del directorio `src/`, cada módulo implementa las capas del modelo ddd que son:

* [Infraestructura](#capa-infraestrcutura-de-acceso-a-datos): `infraestructure/`
* [Dominio](#capa-de-dominio): `domain/`
* [Aplicación](#capa-de-aplicación): `application/`

Hay una capa transversal en el directorio `common/`.

Arborescencia de directorios para el módulo Usuarios:

```
src/
├── application/                   # capa aplicacion
│   ├── api/
│   │   ├── api.js
│   │   ├── index.js
│   │   ├── public/
│   │   └── system/
│   │       ├── ...
│   │       └── usuario.js
│   ├── graphql/
│   │   ├── index.js
│   │   ├── queries/
│   │   │   └── system/
│   │   │       ├── ...
│   │   │       └── Usuario.js
│   │   ├── resolvers/
│   │   │   └── system/
│   │   │       ├── ...
│   │   │       └── Usuario.js
│   │   ├── scalars.js
│   │   ├── schemes/
│   │   │   └── system/
│   │   │       ├── ...
│   │   │       └── Usuario.js
│   │   └── server.js
│   ├── index.js
│   ├── lib/
├── common/                        # capa transversal
├── domain/                        # capa dominio
│   ├── index.js
│   ├── lib/
│   ├── services/
│   │   └── system/
│   │       ├── ...
│   │       └── Usuario.js
│   ├── setup.js
│   └── tests/
│       ├── ...
│       └── usuarios-tests.js
└── infrastructure/                # capa infraestructura
    ├── associations.js
    ├── hooks/
    ├── index.js
    ├── lang/
    ├── lib/
    ├── models/
    │   └── system/
    │       ├── ...
    │       └── usuarios.js
    ├── repositories/
    │   └── system/
    │       ├── ...
    │       └── usuarios.js
    ├── seeders/
    │   ├── ...
    │   ├── 0005-seeder-modulos.js
    │   └── templates/
    ├── setup.js
    └── tests/
        ├── ...
        └── usuarios-tests.js
```
 
### Capa Infraestrcutura de acceso a datos

En el directorio `infrastructure/` está la parte que se encarga de la interfaz para el almacenamiento y lectura de datos (*dao*).

#### models

Aquí se definen los modelos que el orm abstrae y usa para interactuar con la base de datos. Por ejemplo para el módulo Usuarios, se lo define en `models/system/usuarios.js`, es buena práctica crear directorios dentro de `models/` que agrupen módulos según la necesidad.

#### repositorios

Aquí se definen funciones y rutinas por cada modelo definido en `models/`, el objetivo de estos archivos es definir nuevas funciones para interactuar con el orm según nuestra conveniencia. Esto para poder aplicar lógica adaptada las necesidades de un proyecto en particular y mantener limpia y minimilaista la interfaz directa con el orm definida en models (abstraer el orm).

#### hooks

Utilidades transversales por ejemplo para errores de validación.

#### lang

Definiciones para soporte multilenguaje utiliza la capa transversal common.

#### lib

Bibliotecas y utilitarios comunes para la capa infraestrucutra.

#### seeders

Seeders que el orm utiliza para generar datos iniciales en la base de datos.

#### migrations (agregar)

#### tests

Conjunto de pruebas para la capa de infraestructura.

#### Otros archivos importantes

Las asociaciones y relaciones entre modelos (tablas) en la base de datos quedan definidas en un sólo archivo `infrastructure/associations.js`, para esta base se usa el estilo de asociaciones del orm sequelize.

### Capa de dominio

En el directorio `domain/` está la parte encargada de implementar la lógica para cada modelo definido. 

#### services

Típicamente se define al menos un archivo por cada modelo definido en `infrastrucutre`, la idea es utilizar las funciones en `infrastructure/repositories` para realizar operaciones en los modelos.

Se definen funciones y rutinas para interactuar con los modelos y a través de estas, controlar operaciones. Por ejemplo para los usuarios del sistema en `domain/services/system/Usuario.js` se establecen las acciones a seguir cuando se crea, actualiza o elimina un usuario del sistema.

Es buena práctica crear directorios para agrupar submódulos del sistema.

#### lib

Bibliotecas transversales de esta capa.

#### tests

Conjunto de pruebas para la capa de dominio.

### Capa de aplicación

En esta capa está la parte del código para la interfaz con el frontend definiendo *endpoints* y métodos para interactuar con sistemas externos.

#### api

Aquí va la parte del código para los *endpoints API*. La configuración de endpoints empieza en el archivo `application/api.js` donde se registran los prefijos para dividirlos por modulos, por ejemplo para los endpoints definidos en `api/api/system/usuario.js` en `api.js` se ha establecido que empezarán con `system/`.

Cada directorio dentro de `application/api` es para agrupar los endpoints por módulos al igual que se hace en la capa de infraestrucutura y dominio.

Para los endpoints que requieren un *json web token (jwt)* de acceso, se puede utilizar la funcion `guard` que extrae la información del jwt y verifica si el usuario dado tiene los permisos para usar el endpoint, por ejemplo para camboar la contraseña.

```javascript
api.patch('/cambiar_pass',
  guard.check(['usuarios:update']), // verifica permisos 'usuarios:update'
  async (req, res, next) => {
  // funcion ...
});
```

Para mantener el orden del modelo *ddd*, es recomendable que los endpoints tengan poco código de verificación ya que pueden usar las funciones definas en `domain/services` que contienen la lógica necesaria para procesar las peticiones, y la funcion que se encarga del endpoint sólo le pase los parámetros necesarios a la función en *services*.

#### graphql

Aquí se agregan endpoints [graphql](https://graphql.org/). Para facilitar las consultas `graphql` y hacer pruebas localmente se usa [graphiql](https://www.npmjs.com/package/graphiql)

...

#### lib
...

### Capa transversal

Definida en el directorio: `common`.

#### config

...

#### Sobre parametros

En la base de datos existe la tabla `parametros` para establecer valores comunes como tiempo de expiración de tokens, urls, emails, etc. Se recomienda ajustar los *seeders* en `infrastructure/0007-seeder-parametros` a las necesidades del proyecto.

#### Sobre modulos y permisos

En la base de datos existen varias tablas con los usuarios y a qué grupo y modulo pertenecen.

* sys_roles: Para definir roles de usuarios en el sistema.
* sys_entidades: Para definir detalles entidades del sistema, sirven para indicar a qué entidad pertenecen los usuarios.
* sys_modulos: Para definir Móudlos del sistema, los módulos son para agrupar distintas relaciones por ejemplo si hubiesen las relaciones; viaje, itinerario, venta, etc. Se los podría agrupar en el módulo viajes.
* sys_permisos: Para definir permisos por roles y módulos.
* sys_persona: Para detallar datos de personas.
* sys_usuarios: Para definir usuarios del sistema, que están basados en personas, pertenecen a al menos un rol y una entidad.

Para definir nuevos módulos, roles o entidades se deben crear nuevas relaciones que les den consistencia.
