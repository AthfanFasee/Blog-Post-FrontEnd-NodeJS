import { useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts";
import './CreatePost.css';
import {CreatePostContext} from '../../Helper/CreatePostContext/CreatePostProvider';
import {useDispatch} from 'react-redux';
import {createPost} from '../../api/CreatePostAPI/CreatePost';


function CreatePost() {

    const {title, postText, setError} = useContext(CreatePostContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

   
    //Adding Post to MongoDB
    const CreatePostButtonClick = async () => {
        try{
            await dispatch(createPost({title, postText, token}));    
            localStorage.removeItem("Title");
            localStorage.removeItem("PostText");
            navigate("/"); 
        } catch(err){
            setError(err);
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
            <CreatePostElmnts Cancel={Cancel} CreatePostButtonClick={CreatePostButtonClick} />
        </div>
        
    )
}

export default CreatePost;
