//JAVASCRIPT BACKEND

//Pegando, no node_modules, o express
require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes/routes.js");
const connectToDb = require("./database/db");

//Função para conectar com a base de dados
connectToDb();

//Armazenando na variável app a execução do express. Sempre que você usa app.algo, o código
//vai pegar a função dentro do express.
const app = express();

//Porta que vai ser usada para rodar o servidor local
const port = process.env.PORT;

//Coloca a view engine para ejs, para poder rodar os arquivos do front-end
app.set("view engine", "ejs");
//Usa esse caminho para colocar o css e js no ejs
app.use(express.static(path.join(__dirname, "public")));
//Metodo do express para poder pegar os valores da interface no frontend
app.use(express.urlencoded());
//Manda o programa usar as rotas especificadas em routes.js
app.use(routes);

//Rodar um servidor local na porta 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
