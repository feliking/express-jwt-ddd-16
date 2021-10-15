const { generateTemplateFiles } = require("generate-template-files");

generateTemplateFiles([
  {
    option: "Crear tabla",
    entry: {
      folderPath: "./tools/migration/create_table",
    },
    stringReplacers: [
      {
        question: "Orden de la migración: ",
        slot: "__Orden__",
      },
      {
        question: "Nombre de la tabla: ",
        slot: "__Tabla__",
      },
    ],
    output: {
      path: "./src/",
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`Archivos generados`, results.output.files);
    },
  },
  {
    option: "Generar capas de vista",
    entry: {
      folderPath: "./tools/dddv/",
    },
    stringReplacers: [
      {
        question: "Nombre del esquema: ",
        slot: "__Esquema__",
      },
      {
        question: "Nombre de la vista: ",
        slot: "__Tabla__",
      },
    ],
    output: {
      path: "./src/",
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`Archivos generados`, results.output.files);
      console.log("Capas generadas exitosamente :)");
    },
  },
]);
