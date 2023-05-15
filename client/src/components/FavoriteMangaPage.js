import React from 'react'
import MangaList from './MangaList';

const FavoriteMangaPage = (props) => {
    const {manga, setManga} = props;
    
    const removeFromDom = mangaId => {
        setManga(manga.filter(manga => manga._id !== mangaId));
    }
    
    return (
        <div>
            <MangaList manga={manga} setManga={setManga} removeFromDom={removeFromDom}/>
        </div>
    )
}

export default FavoriteMangaPage;