//Controller = metodo da rota

//Importa o modelo de task criado em models/Task
//Fazendo isso, você JÁ ESTÁ TRAZENDO O MONGOOSE E SUAS FUNÇÕES. Já que ele já está sendo requerido em Tasks.js
const Task = require("../models/Task");

//Mensagem que vai aparecer para o usuário (não pode fazer isso, tarefa excluída...)
let message = "";
//Tipo da mensagem (alerta, confirmação etc...)
let type = "";

//Função assíncrona (programa espera ela ser finalizada para seguir) para pegar todas as task
const getAllTasks = async (req, res) => {
  //Código tenta...
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    //Pegar todas as tasks utilizando Task.find() e guarda em tasksList.
    //                Await pq isso demora e o código precisa esperar a resposta do servidor
    const tasksList = await Task.find();
    //Retorno da função. Vai renderizar a página index.ejs e vai retornar o objeto com todas as tasks
    //trazidas do servidor e colocando task como null e taskDelete também.
    return res.render("index", {
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
    //Se isso tudo não funcionar, ele vai retornar um erro de servidor por usuário (status(500))
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//Função assíncrona para criar uma task
const createTask = async (req, res) => {
  //task vai receber uma requisição do body (trazer os valores inseridos no form)
  const task = req.body;

  //Se a task vier vazia (task recebida sem a informação do que ela é, inserida no "task:" do TaskModel)
  if (!task.task) {
    message = "Insert text before adding the task";
    type = "danger";
    //Vai só responder recarregando a página
    return res.redirect("/");
  }

  //Tenta, se receber com o valor task (já passou pelo filtro anterior)
  try {
    //espera criar uma task (com os valores passados no req.body) utilizando o modelo Task)
    //Create é uma função do mongoose.
    await Task.create(task);
    message = "Task created successfully";
    type = "success";
    //Depois de tudo, manda dnv para a página inicial, onde vai estar a task, por meio do return res.redirect("/");
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const tasksList = await Task.find();

    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, tasksList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, tasksList, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;

    await Task.updateOne({ _id: req.params.id }, task);
    message = "Task updated successfully";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Task deleted successfully";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    task.check ? (task.check = false) : (task.check = true);

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
  taskCheck,
};
