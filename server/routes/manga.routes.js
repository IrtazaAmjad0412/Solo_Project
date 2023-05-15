const MangaController = require('../controllers/manga.controller');

module.exports = (app) => {
    app.get('/api/manga', MangaController.getAllManga);
    app.post('/api/manga', MangaController.createManga);
    app.get('/api/manga/:id', MangaController.getOneManga);
    app.patch('/api/manga/:id', MangaController.updateManga);
    app.delete('/api/manga/:id', MangaController.deleteManga);
}