import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate, useParams, Link} from "react-router-dom";
import { Button } from 'reactstrap';

const MangaDetail = (props) => {
    const [manga, setManga] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    const webpageStyle = {
        width: "100%",
        height: "100vh",
        margin: "0px",
        backgroundImage: `url(${process.env.PUBLIC_URL+ "/backgroundImage.png"})`,
        backgroundSize: 'cover',
        color: "black"
    }
    
    const buttonStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "75px",
        height: "40px",
        marginLeft: "725px",
        marginTop: "35px"
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/manga/" + id)
            .then( res => {
                console.log(res.data);
                setManga(res.data);
            })
            .catch( err => console.log(err) );
    }, [id]);

    const deleteManga = (mangaId) => {
        axios.delete('http://localhost:8000/api/manga/' + mangaId)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/manga/favorite");
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={webpageStyle}>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h2>Manga Tracker</h2>
            </div>
            <div className="d-flex justify-content-end align-items-center px-3">
                <Link to={ "/manga/favorite"}>Favorite Manga List</Link>
            </div>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h4>Welcome, Irtaza!</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <h4>{manga.title} Info</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
                Title: {manga.title}
            </div>
            <div className="d-flex justify-content-center align-items-center my-3"
                >Description: {manga.description}
            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
                Latest Chapter Read: Chapter {manga.latestChapterRead}
            </div>
            <div className="d-flex justify-content-center align-items-center my-3"
                >Comment: {manga.comment}
            </div>
            <Button style={buttonStyle} color="primary" onClick={(e)=>{deleteManga(manga._id)}}>Delete</Button>
        </div>
    );
}

export default MangaDetail;