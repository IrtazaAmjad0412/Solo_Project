import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MangaForm from './components/MangaForm';
import FavoriteMangaPage from './components/FavoriteMangaPage';
import MangaDetail from './components/MangaDetail';
import MangaUpdate from './components/MangaUpdate';

const App = () => {
  const [manga, setManga] = useState([]);

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MangaForm manga={manga} setManga={setManga}/>} path="/manga/form" />
          <Route element={<FavoriteMangaPage manga={manga} setManga={setManga}/>} path="/manga/favorite" />
          <Route element={<MangaDetail/>} path="/manga/:id" />
          <Route element={<MangaUpdate/>} path="/manga/update/:id"/> 
        </Routes>
      </BrowserRouter>
    </div>
  ) 
}

export default App;