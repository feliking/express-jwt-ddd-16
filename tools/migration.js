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
    option: "Editar tabla",
    entry: {
      folderPath: "./tools/migration/update_table",
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
]);
