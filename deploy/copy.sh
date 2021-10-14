#!/usr/bin/env bash
# Archivo para copiar el base-backend a la carpeta deploy/roles para subir a producción
echo - Copiando archivos para el deploy -
pwd
echo 1. Copiando Backend
rm -rf roles/backend/files/base-backend
cp -rf ../../base-backend roles/backend/files
rm -rf roles/backend/files/base-backend/node_modules
rm -rf roles/backend/files/base-backend/deploy
rm -f roles/backend/files/base-backend/src/common/config/db.js
cp roles/backend/files/base-backend/src/common/config/db.js.sample roles/backend/files/base-backend/src/common/config/db.js
rm -f roles/backend/files/base-backend/src/common/config/correo.js
cp roles/backend/files/base-backend/src/common/config/correo.js.sample roles/backend/files/base-backend/src/common/config/correo.js
echo 2. ¡Finalizado!


