//MODELO DE DOCUMENTO DA MINHA COLEÇÃO

const mongoose = require("mongoose");

//Schema = collection/coleção dentro do mongoDB
//O post será feito dentro desse schema
//O padrão das requisições digamos assim
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  check: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", taskSchema);
