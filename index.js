//express
const express = require("express");
const app = express();
const port = 3000;

// arreglo nombre users para llamar al json
const usuarios = ["Carlos", "Belen", "Tony", "Pepper", "Teddy"];

// declaramos la carpeta assets como publica
app.use("./assets", express.static("assets"));

//gets
app.get("/", (req, res) => res.send("hello world"));
app.get("/about", (req, res) => res.send("about page"));

// Middleware para validar si el usuario existe en el arreglo de nombres
// con operador ternario, si no existe mostrar el who.jpeg
const validarUsuario = (req, res, next) => {
  const usuario = req.params.usuario;
  usuarios.includes(usuario)
    ? next()
    : res.sendFile(__dirname + ".assets/img/who.jpeg");
};

// Ruta con middleware para validar el usuario
app.get("/abracadabra/juego/:usuario", validarUsuario, (req, res) => {
  res.send("El usuario existe en el arreglo");
});

// direccion para ver users en formato json
app.get("/abracadabra/usuarios:", (req, res) => {
  res.json(usuarios);
});

//ruta geenerica * error 404, al final
app.get("*", (req, res) =>
  res.send("<center><h1>ERROR 404: Esta pagino no existe</h1></center>")
);





//---------------------------------------------------
//app listen
app.listen(port, () =>
  console.log(`🔥servidor corriendo🔥 en port http://localhost:${port}`)
);
