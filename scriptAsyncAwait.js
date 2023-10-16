const readlineSync = require('readline-sync');
const chalk = require('chalk');



const tareas = [];

let i;

async function mostrarMenu() {
  console.log(" ");
  console.log(chalk.bgGreen("BIENVENIDOS, ¿QUÉ DESEAS REALIZAR?"));
  const opciones = ["Mostrar Tareas", "Agregar Tarea", "Completar Tarea","Eliminar Tareas", "Salir"];
  const index = readlineSync.keyInSelect(opciones, "Elige una opcion",{cancel:"Regresar al menu"});
  console.log(`Escogiste ${opciones[index]}`);

  switch (index) {
    case 0:
      i=0;
      mostrarTareas();
      break;
    case 1:
      await agregarTarea();
      i=1;
      break;
    case 2:
      await completarTarea()
      i=2;
      break;
    case 3:
      await eliminarTarea()
      i=3;
      break;
    case 4:
      i=4;
      break;
    default:
     await mostrarMenu();
  }
}

function mostrarTareas() {
  if (tareas.length <= 0) {
    console.log(chalk.red("No hay tareas disponibles."));
    const opciones = [ "Agregar una Tarea","Regresar al menu"];
    const index = readlineSync.keyInSelect(opciones, "Elige una opcion");
    console.log(`Escogiste ${opciones[index]}`);
      switch(index){
        case 0:
          agregarTarea();
        break;
        case 1:
          mostrarMenu();
        break;
      }
  } else {
    console.log("Lista de Tareas:");
    tareas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.tarea} [${tarea.estado}]`);
    });
  }
  
}

async function agregarTarea() {
  const tareaNueva = readlineSync.question("Agrega una tarea: ");
  const nuevaTarea = {
    tarea: tareaNueva,
    estado: "❎"
  }
  tareas.push(nuevaTarea);
  console.log(chalk.bgBlue(`Se agregó la tarea: ${nuevaTarea.tarea}`));
}


async function completarTarea() {
    if (tareas.length <= 0) {
    console.log(chalk.red("No hay tareas para completar."));
    const opciones = [ "Agregar una Tarea","Regresar al menu"];
    const index = readlineSync.keyInSelect(opciones, "Elige una opcion");
    console.log(`Escogiste ${opciones[index]}`);
      switch(index){
        case 0:
          await agregarTarea();
        break;
        case 1:
          await mostrarMenu();
        break;
      }
  } else {
    mostrarTareas();
    const indiceTarea = readlineSync.questionInt("Ingresa el numero de la tarea que deseas completar: ");
    
    if (indiceTarea >= 1 && indiceTarea <= tareas.length) {
      const tareaCompletada = tareas[indiceTarea - 1].tarea;
      tareas[indiceTarea-1].estado = '✅'
      console.log(chalk.bgBlue(`Tarea completada: ${tareaCompletada}`));
    } else {
      console.log("Numero de tarea inválido.");
    }
  }
}
    


async function eliminarTarea(){
    if (tareas.length <= 0) {
    console.log(chalk.red("No hay tareas para eliminar."));
    const opciones = [ "Agregar una Tarea","Regresar al menu"];
    const index = readlineSync.keyInSelect(opciones, "Elige una opcion");
    console.log(`Escogiste ${opciones[index]}`);
      switch(index){
        case 0:
          await agregarTarea();
        break;
        case 1:
          await mostrarMenu();
        break;
      }
  } else {
    mostrarTareas();
    const indiceTarea = readlineSync.questionInt("Ingresa el numero de la tarea que quieres eliminar: ");
    if (indiceTarea >= 1 && indiceTarea <= tareas.length) {
      const tareaEli = tareas[indiceTarea-1].tarea;
      tareas.splice(indiceTarea - 1,1);
      console.log(chalk.bold(`Tarea eliminada: ${tareaEli}`));
      await mostrarMenu();
    } else {
      console.log("Numero de tarea inválido.");    
  }
   }
}

do{
  mostrarMenu();
}while(i!=4)
