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
    required: true,
  },
  invitados: [
    {
      type: String,
    },
  ],
  tipo: {
    type: String,
    enum: ["creador", "invitado"],
    required: true,
  },
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Calendario", schema);
