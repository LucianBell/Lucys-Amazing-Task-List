//Mogoose p/ conectar com o mongoDB
const mongoose = require("mongoose");

//Função anônima guardada em uma varíavel para conectar com o mongoDB
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      //para evitar erros
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //Depois disso, já que o mongoose.conect é uma função assíncrona, vai dizer que tá conectado ou...
    .then(() => console.log("MongoDB Atlas connected"))
    //se tiver um erro, vai mostrar qual o erro
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
