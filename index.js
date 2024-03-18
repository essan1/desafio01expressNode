//express
const express = require("express");
const app = express();
const port = 3000;

// declaramos la carpeta assets como publica. puede ser sin el primer "./assets" app.use(express.static('assets'));
app.use(express.static("assets"));

// arreglo nombre users para llamar al json
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

//gets
// /ruta raiz..
app.get("/", (req, res) => res.send("hello world"));
// direccion para ver users en formato json
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

//------------------------------------------------------
// Ruta conejo
//los dos puntos(:) antes de la n, indican que es un paramentro dinamico
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = +req.params.n;
  const num = Math.floor(Math.random() * 4) + 1;
  if (n === num) {
    res.sendFile(__dirname + "/assets/img/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/assets/img/voldemort.jpg");
  }
});

//validar con middleware
//validando que lo que esta en la ruta/direccion este en el array
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
  const userName = req.params.usuario // capturamos x ruta dinamica
  const user = usuarios.map((u) => u.toLowerCase()).includes(userName.toLowerCase());

  user ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//------------------------------------------------------

//ruta geenerica * error 404, al final.. SIEMPRE AL FINAL
app.get("*", (req, res) => {
  res.send("<center><h1>📍ERROR 404: Esta pagino no existe📍</h1></center>");
});

//---------------------------------------------------
//app listen
app.listen(port, () =>
  console.log(`🔥servidor corriendo🔥 en port http://localhost:${port}`)
);
