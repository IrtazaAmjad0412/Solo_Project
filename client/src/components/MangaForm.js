import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import { FormGroup } from "reactstrap";
import { Label } from "reactstrap";
import { Col } from "reactstrap";
import { Input } from "reactstrap";

const MangaForm = (props) => {
    const {manga, setManga} = props;
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState("");
    const [latestChapterRead, setLatestChapterRead] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const webpageStyle = {
        width: "100%",
        height: "100vh",
        margin: "0px",
        backgroundImage: `url(${process.env.PUBLIC_URL+ "/backgroundImage.png"})`,
        backgroundSize: 'cover',
        color: "black"
    }

    const textareaStyle = {
        resize: "none"
    }

    const buttonStyle = {
        width: "75px",
        height: "40px",
        marginLeft: "550px",
    }

    const errorStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px"
    }

    const formStyle = {
        margin: "0px"
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/manga', {
            title, 
            description,
            latestChapterRead,
            comment
        })
            .then(res=>{
                console.log(manga)
                console.log(res); 
                console.log(res.data);
                setManga([...manga, res.data]);
                setTitle("");
                setDescription("");
                setLatestChapterRead("");
                setComment("");
                navigate("/manga/favorite");
            })
            .catch(err=>{
                console.log(err);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div style={webpageStyle}>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h2>Manga Tracker</h2>
            </div>
            <div className="d-flex justify-content-start align-items-center px-3 py-1">
                <h4>Welcome, Irtaza!</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <h4>Add Manga</h4>
            </div>
            <form onSubmit={onSubmitHandler}>
                {errors.map((error, index) => <div style={errorStyle} key={index}>{error}</div>)}
                <div className="mx-auto" style={{ width : 475 + "px" }}>
                    <h5>Title:</h5>
                </div>
                <FormGroup className="d-flex justify-content-center" style={formStyle} row>
                    <Label for="title" sm={1}></Label>
                    <Col sm={5}>
                        <Input id="title" type="text" value={title} name="title" placeholder="Enter Title..." onChange = {(e)=>setTitle(e.target.value)}/>
                    </Col>
                </FormGroup>
                <div className="mx-auto" style={{ width : 475 + "px" }}>
                    <h5>Description:</h5>
                </div>
                <FormGroup className="d-flex justify-content-center" style={formStyle}  row>
                    <Label for="description" sm={1}></Label>
                    <Col sm={5}>
                        <Input style={textareaStyle} id="description" type="textarea" value={description} name="description" placeholder="Enter Description..." onChange = {(e)=>setDescription(e.target.value)}/>
                    </Col>
                </FormGroup>
                <div className="mx-auto" style={{ width : 475 + "px" }}>
                    <h5>Latest Chapter Read:</h5>
                </div>
                <FormGroup className="d-flex justify-content-center" style={formStyle}  row>
                    <Label for="latestChapterRead" sm={1}></Label>
                    <Col sm={5}>
                        <Input id="latestChapterRead" type="number" value={latestChapterRead} name="latestChapterRead" placeholder="Enter Latest Chapter Read..." onChange = {(e)=>setLatestChapterRead(e.target.value)}/>
                    </Col>
                </FormGroup>
                <div className="mx-auto" style={{ width : 475 + "px" }}>
                    <h5>Comment:</h5>
                </div>
                <FormGroup className="d-flex justify-content-center" style={formStyle}  row>
                    <Label for="comment" sm={1}></Label>
                    <Col sm={5}>
                        <Input style={textareaStyle} id="comment" type="textarea" value={comment} name="comment" placeholder="Enter Comment..." onChange = {(e)=>setComment(e.target.value)}/>
                    </Col>
                </FormGroup>
                <Button style={buttonStyle} color="primary">Submit</Button>
            </form>
        </div>
    )
}

export default MangaForm;