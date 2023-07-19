const Archivo = require('../models/archivo.js');
const { UserInputError } = require('apollo-server-errors');
const fs = require('fs');

const ArchivoMutation = {
    

    async subirIcono(_, { file }) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();
        const path = `uploads/iconos/${filename}`;

        await stream.pipe(fs.createWriteStream(path))
        .on('finish', () => console.log('Archivo subido exitosamente'));

        const archivo = new Archivo({
            url: path,
            filename,
            mimetype,
        });
        await archivo.save();
        return archivo;
    },

    async subirBanner(_, { file }) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();
        const path = `uploads/banners/${filename}`;

        await stream.pipe(fs.createWriteStream(path))
        .on('finish', () => console.log('Archivo subido exitosamente'));

        const archivo = new Archivo({
            url: path,
            filename,
            mimetype,
        });
        await archivo.save();
        return archivo;
    },
}

module.exports = ArchivoMutation;