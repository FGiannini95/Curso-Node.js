const os = require('os')
//import {platform, release, arch, uptime} from 'node:os'

console.log('Info de sistema operativo');
console.log("------------------------");
console.log('Nombre sistema operativo: ', os.platform());
console.log('Versión sistema operativo: ', os.release());
console.log('Arquitectura: ', os.arch());
console.log('uptime', os.uptime()/60/60);

//ejectutar node 1.os-info.js en la terminal