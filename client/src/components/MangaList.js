import React, { useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

const MangaList = (props) => {
    const { removeFromDom, manga, setManga } = props;

    const webpageStyle = {
        width: "100%",
        height: "100vh",
        margin: "0px",
        backgroundImage: `url(${process.env.PUBLIC_URL+ "/backgroundImage.png"})`,
        backgroundSize: 'cover',
        color: "black"
    }

    const buttonStyle = {
        width: "70px",
        height: "35px",
        marginLeft: "5px",
    }

    const tableStyle = {
        width: "650px",
        height: "50px",
        marginLeft: "425px"
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/manga")
            .then((res) => {
                console.log(res.data);
                setManga(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteManga = (mangaId) => {
        axios.delete('http://localhost:8000/api/manga/' + mangaId)
            .then(res => {
                removeFromDom(mangaId)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div style={webpageStyle}>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h2>Manga Tracker</h2>
            </div>
            <div className="d-flex justify-content-end align-items-center mx-3">
                <Link to={ "/manga/form"}>Add Favorite Manga</Link>
            </div>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h4>Welcome, Irtaza!</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center py-3">
                <h4>All Favorite Mangas</h4>
            </div>
            <table className="table table-light table-striped" style={tableStyle}>
                <thead>
                    <tr>
                        <th>Manga Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {manga.map((manga, index) => (
                        <tr key={index}>
                            <td>{ manga.title }</td>
                            <td>{ <Link className="mx-2" to={"/manga/update/" + manga._id}>Update</Link> } 
                            | { <Link className="mx-2" to={ "/manga/" + manga._id }>View</Link> } 
                            | <Button style={buttonStyle} color="primary" onClick={(e)=>{deleteManga(manga._id)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MangaList;