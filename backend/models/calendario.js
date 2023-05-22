const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
  },
  creador: {
    ref: "Usuario",
    type: mongoose.Schema.Types.ObjectId,
  },
  invitados: [
    {
      ref: "Usuario",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("calendario", schema);
