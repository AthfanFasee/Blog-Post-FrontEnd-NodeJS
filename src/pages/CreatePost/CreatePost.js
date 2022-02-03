import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts"

function CreatePost({isAuth}) {

    const [title, setTitle] = useState( localStorage.getItem("Title") || "")
    const [postText, setPostText] = useState(localStorage.getItem("PostText") || "")
    let navigate = useNavigate()

  


    //saving or adding post to firebase data base
    
    const createPost = async () => {
        
        localStorage.removeItem("Title")
        localStorage.removeItem("PostText")
        navigate("/")  // Imagine internet is bad or something. We dont want the page to redirected to homepage before even the data is properly added to the firebase database right? and thats why we use async await here, telling to function to actually await addingDoc beofore navigating
    }

    //If page reloads whatever we typed inside createElement inputs will stay still
    useEffect(()=>{
        localStorage.setItem("Title" , title)
        localStorage.setItem("PostText" , postText)
    },[title, postText])

    
    //redirecting nonSignedIn users back to login if they try and access createPost Page
    useEffect(() => {
        !isAuth && navigate("/login")
    })

    return (
        <div >
            <CreatePostElmnts createPost={createPost} setTitle={setTitle} setPostText={setPostText} title={title} postText={postText}/>
        </div>
        
    )
}

export default CreatePost
