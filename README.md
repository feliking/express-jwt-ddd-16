# Base Backend

Proyecto base para desarrollo de backends usando node.js, es un mini-framework que utiliza la arquitecutra [ddd](doc/Arquitectura.md).

Este base contiene los siguientes módulos:

- Entidades
- Usuarios
- Personas
- Roles
- Módulos
- Permisos
- Tokens
- Ciudadanía Digital

También ya se integra los siguientes módulos con sus respectivos seeders

- Logs del sistema
- Parámetros del sistema
- Servicios de Interoperabilidad

Funcionalidades incluidas

- Integración con ciudadanía Digital (require parametrizar)
- Módulo para deploy del sistema a producción
- Módulos API rest y graphql
- Ejemplo de uso para cronjobs
- app-Iop para gestionar servicios de interoperabilidad endpoints, tokens, etc en BD.
- Tests unitarios.
- Guardado de logs en BD.

## Sobre el proyecto

Licencia y lista de colaboradores

  - Licencia: [LPG-Bolivia v1.0](LICENCIA.md)
  - Lista de personas autoras: [COLABORACIÓN.md](COLABORACIÓN.md)

Requisitos

  - Nodejs 10.13.0 en adelante
  - Postgresql 9 en adelante

Instalación

  - Especificación a detalle en archivo [INSTALL.md](INSTALL.md)

Documentación estrucutra del proyecto y código fuente `doc/`

  - Arquitectura del proyecto: [Arquitectura.md](doc/Arquitectura.md)
  - Estructura del código fuente: [Codigo.md](doc/Codigo.md)
  - Modelos, roles y permisos: [Modelos.md](doc/Modelos.md)

Ejecutar lo siguiente para ejecutar tests unitarios de las 3 capas del DDD, esto eliminará las tablas y los datos de estas para reescribirlos.

```bash
npm run test
```

Puede usar los siguientes comandos por separado para hacer lo mismo que el comando `npm test`.

```bash
npm run test-db # Test de la capa de infrastructura
npm run test-domain # Test de la capa de dominio
```
