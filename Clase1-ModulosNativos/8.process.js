//objeto process proprociona información y control sobre el porceso actual

//argumentos de entrada
console.log(process.argv);
//para crear una API necesitaremos paserle argumentos

//controlar el proceso y su salida
process.exit(0) //0 todo bien, 1 que salga porque puede haber errores

//El current working directory nos dice la carpeta actual en la que trabajamos
console.log(process.cwd());

//variables de entornos
process.env()