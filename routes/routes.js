const routes = require("express").Router();
//Para trazer os metodos de rota que serão utilizados (estão em arquivos separados por questão de arquitetura de software)
const taskController = require("../controller/TaskController");

//Pega a rota "/" e chama o metodo getAllTasks para mostrar todas as tasks
routes.get("/", taskController.getAllTasks);
//    .post pois você vai INSERIR UM NOVO DADO no banco de dados
routes.post("/create", taskController.createTask);
routes.get("/getById/:id/:method", taskController.getById);
routes.post("/updateOne/:id", taskController.updateOneTask);
routes.get("/deleteOne/:id/", taskController.deleteOneTask);
routes.get("/check/:id/", taskController.taskCheck);

module.exports = routes;

//2 parametros na função get
//      rota, função callback anônima(depois que a get é executada), o modulo
//app.get("/", (req, res) => {
//  //Renderizar essa página ao acessar a rota(coloca o nome da página e não onde ela está).
//  //O JS já resolve isso sozinho
//  res.render("index");
//});
