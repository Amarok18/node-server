const http = require('http');
const host = 'localhost';
const port = 8010;

const listadeTareas = [
    {
        id:1,
        description:"Estudiar Javascript",
        estado: "pendiente"
    },
    {
        id:2,
        description:"Estudiar NodeJs",
        estado: "pendiente"
    },
    {
        id:3,
        description:"Estudiar Html",
        estado: "completado"
    },
    {
        id:4,
        description:"Estudiar CSS",
        estado: "completado"
    },
    
];

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);

  if (req.url === '/listadeTareas') {
    res.end(JSON.stringify(listadeTareas));
  } else {
    res.end(`Ruta no encontrada prueba con http://${host}:${port}/listadeTareas`);
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en http://${host}:${port}`);
});