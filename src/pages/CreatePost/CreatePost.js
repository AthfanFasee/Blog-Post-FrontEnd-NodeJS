import { useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts";
import './CreatePost.css';
import {CreatePostContext} from '../../Helper/CreatePostContext/CreatePostProvider';
import {useCreatePostMutation, useLazyGetPostsQuery} from '../../services/HomePageApi';

function CreatePost() {

    const {title, postText} = useContext(CreatePostContext);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [createPost] = useCreatePostMutation()
    const [triggerGetPost] = useLazyGetPostsQuery()

    //Adding Post to MongoDB
    const CreatePostButtonClick = async () => {
            await createPost({title, postText})  
            triggerGetPost()
            localStorage.removeItem("Title");
            localStorage.removeItem("PostText");
            navigate("/"); 
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
