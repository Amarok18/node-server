const readlineSync = require('readline-sync');
const chalk = require('chalk');



const tareas = [];

let i;

function mostrarMenu() {
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
      agregarTarea();
      i=1;
      break;
    case 2:
      completarTarea();
      i=2;
      break;
    case 3:
      eliminarTarea();
      i=3;
      break;
    case 4:
      i=4;
      break;
    default:
      console.log("Digite una opcion valida");
      break;
  }
}

function mostrarTareas() {
 if (tareas.length <= 0) {
    console.log("No hay tareas disponibles.");
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

function agregarTarea() {
  const tareaNueva = readlineSync.question("Agrega una tarea: ");
  const nuevaTarea = {
    tarea: tareaNueva,
    estado: "❎"
  }
  tareas.push(nuevaTarea);
  console.log(`Se agregó la tarea: ${nuevaTarea.tarea}`);
}

function completarTarea() {
  if (tareas.length <= 0) {
    console.log("No hay tareas para completar.");
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
    mostrarTareas();
    const indiceTarea = readlineSync.questionInt("Ingresa el numero de la tarea que deseas completar: ");
    
    if (indiceTarea >= 1 && indiceTarea <= tareas.length) {
      const tareaCompletada = tareas[indiceTarea - 1].tarea;
      tareas[indiceTarea-1].estado = '✅'
      console.log(`Tarea completada: ${tareaCompletada}`);
    } else {
      console.log("Numero de tarea inválido.");
    }
  }
}

function eliminarTarea(){
    if (tareas.length <= 0) {
    console.log("No hay tareas para eliminar.");
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
    mostrarTareas();
    const indiceTarea = readlineSync.questionInt("Ingresa el numero de la tarea que quieres eliminar: ");
    if (indiceTarea >= 1 && indiceTarea <= tareas.length) {
      const tareaEli = tareas[indiceTarea-1].tarea;
      tareas.splice(indiceTarea - 1,1);
      console.log(`Tarea eliminada: ${tareaEli}`);
      mostrarMenu()
    } else {
      console.log("Numero de tarea inválido.");
    }
  }
}

do{
  mostrarMenu();
}while(i!=4)
