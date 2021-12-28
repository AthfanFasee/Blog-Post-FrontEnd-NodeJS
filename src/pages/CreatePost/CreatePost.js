import { useEffect, useState } from "react"
import {addDoc, collection} from 'firebase/firestore'
import {db, auth} from '../../firebase-config'
import {useNavigate} from 'react-router-dom'
import CreatePostElmnts from "../../Components/CreatePostElements/CreatePostElmnts"

function CreatePost({isAuth}) {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    let navigate = useNavigate()

    //getting current date and time
    const currentdate = new Date(); 
    const datetime = "Posted at: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() 


    //saving or adding post to firebase data base
    const postsCollectionRef = collection(db, "posts")  //We need to let addDoc or getDoc knw which exact collection or table("posts") we wanna add information to and in which exact app("db")
                                                        //so we are simply creating a reference to the exact collection here
    const createPost = async () => {
        await addDoc(postsCollectionRef, {                
            title, 
            postText, 
            aurthor: {name: auth.currentUser.displayName , id: auth.currentUser.uid},
            time : datetime,
        })
        navigate("/")  // Imagine internet is bad or something. We dont want the page to redirected to homepage before even the data is properly added to the firebase database right? and thats why we use async await here, telling to function to actually await addingDoc beofore navigating
    }

    useEffect(()=>{
        !isAuth && navigate("/login")
    })

    
    return (
        <div >
            <CreatePostElmnts createPost={createPost} setTitle={setTitle} setPostText={setPostText}/>
        </div>
        
    )
}

export default CreatePost
