const {generateTemplateFiles} = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Generar capas de tabla',
        entry: {
            folderPath: './tools/ddd/',
        },
        stringReplacers: [
            {
                question: 'Nombre del esquema: ',
                slot: '__Esquema__'
            },
            {
                question: 'Nombre de la tabla: ',
                slot: '__Tabla__'
            }
        ],
        output: {
            path: './src/',
            overwrite: true
        },
        onComplete: (results) => {
            console.log(`Archivos generados`, results.output.files);
            console.log('Capas generadas exitosamente :)')
        },
    },
    {
        option: 'Generar capas de vista',
        entry: {
            folderPath: './tools/dddv/',
        },
        stringReplacers: [
            {
                question: 'Nombre del esquema: ',
                slot: '__Esquema__'
            },
            {
                question: 'Nombre de la vista: ',
                slot: '__Tabla__'
            }
        ],
        output: {
            path: './src/',
            overwrite: true
        },
        onComplete: (results) => {
            console.log(`Archivos generados`, results.output.files);
            console.log('Capas generadas exitosamente :)')
        },
    },
]);