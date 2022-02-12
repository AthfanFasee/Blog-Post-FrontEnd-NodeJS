import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts";
import './CreatePost.css';

function CreatePost() {

    const [title, setTitle] = useState( localStorage.getItem("Title") || "");
    const [postText, setPostText] = useState(localStorage.getItem("PostText") || "");
    const navigate = useNavigate();

    const url = "https://blog-posts-1699.herokuapp.com/api/v1/posts";
    const token = localStorage.getItem("token");

    //to catch errors
    const [error, setError] = useState("");

    //Adding Post to MongoDB
    const createPost = async () => {
        try {
            await axios.post(url, {title, postText}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem("Title");
            localStorage.removeItem("PostText");
            navigate("/"); 

        } catch (err) {
            setError(err.response.data.msg);
        }
    }

    //For Cancel button
    const Cancel = () => {
        localStorage.removeItem("Title");
        localStorage.removeItem("PostText");
        navigate("/");
    }

    //If page reloads whatever we typed inside createElement inputs will stay still
    useEffect(()=>{
        localStorage.setItem("Title" , title);
        localStorage.setItem("PostText" , postText);
    },[title, postText]);

    
    //redirecting nonSignedIn users back to login if they try and access createPost Page
    useEffect(() => {
        if(!token) {
            navigate('/');
        }
    });

    return (
        <div className="CreatePage">
            <CreatePostElmnts error={error} Cancel={Cancel} createPost={createPost} setTitle={setTitle} setPostText={setPostText} title={title} postText={postText}/>
        </div>
        
    )
}

export default CreatePost;
