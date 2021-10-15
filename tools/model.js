const { generateTemplateFiles } = require("generate-template-files");

generateTemplateFiles([
  {
    option: "Generar modelo sin esquema",
    entry: {
      folderPath: "./tools/model/without_schema",
    },
    stringReplacers: [
      {
        question: "Nombre del modelo: ",
        slot: "__Modelo__",
      },
    ],
    output: {
      path: "./src/",
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`Generación terminada`, results.output.files);
    },
  },
  {
    option: "Generar modelo con esquema",
    entry: {
      folderPath: "./tools/model/with_schema",
    },
    stringReplacers: [
      {
        question: "Nombre del esquema: ",
        slot: "__Esquema__",
      },
      {
        question: "Nombre del modelo: ",
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
