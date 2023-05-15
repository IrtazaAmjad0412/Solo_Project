const Manga = require('../models/manga.model'); 

module.exports.createManga = (request, response) => {
    const { title, description, latestChapterRead, comment } = request.body;
    Manga.create({
        title,
        description,
        latestChapterRead,
        comment
    })
        .then(manga => response.json(manga))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllManga = (request, response) => {
    Manga.find({})
        .then(mangas => {
            console.log(mangas);
            response.json(mangas);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getOneManga = (request, response) => {
    Manga.findOne({_id:request.params.id})
        .then(manga => response.json(manga))
        .catch(err => response.json(err));
}

module.exports.updateManga = (request, response) => {
    Manga.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updateManga => response.json(updateManga))
        .catch(err => response.status(400).json(err));
}

module.exports.deleteManga = (request, response) => {
    Manga.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err));
}