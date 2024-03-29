const fs = require("node: fs/promises"); //promesas y calback tienen la misma funcionalidad

//leemos el fichero con una codificación concreta
//Manera asyncrona
console.log("Leyendo el primer archivo");
fs.readFile("./archivo.txt", "utf-8")
  .then((text) => {
    console.log("primer text", text);
});

console.log("--> Hacer cosas");

console.log("Leyendo el segundo archivo");
fs.readFile("./archivo2.txt", "utf-8")
  .then((text) => {
    console.log("segundo text", text);
});
