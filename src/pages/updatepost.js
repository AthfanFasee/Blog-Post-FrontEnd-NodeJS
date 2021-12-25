import { useEffect, useState } from "react"
import {updateDoc, doc, getDocs, collection} from 'firebase/firestore'
import {db, auth} from '../firebase-config'
import {useNavigate} from 'react-router-dom'

export default function Updatepost({isAuth}) {

    const [postLists, setPostLists] = useState([]);

    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(postsCollectionRef) //just like we did in addDoc inside creatpost.js, we are just letting getDoc knw from which exact app and which collection or table it needs to get data from
          setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //Imagine internet is bad. We dont want the setter function to run and update state value before even the data is read (or getten from firebaser server) properly. that's why we are using async await here, telling the function to await gettingDoc before updating state value
        };
        getPosts();
      }, []);

    const [newtitle, setTitle] = useState("")
    const [newpostText, setPostText] = useState("")
    let navigate = useNavigate()

    //Updating post

    const updatePost = async (id, title, postText) => {
        const userDoc = doc(db, "posts")
        const newFields = {title : newtitle, postText: newpostText}  
        await updateDoc(userDoc, newFields)
        navigate("/")
        }   
    
    const neededpost = postLists.filter(post => {
        return post.aurthor.id === auth.uid 
        
    })

    
    
    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Update Your Post</h1>
            <div className="inputGp">
                <label>New Post Title:</label>
                <input placeholder="Title.."  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>New Post:</label>
                <textarea placeholder="Post..." onChange={(event) => setPostText(event.target.value)} />
            </div>
            <button onClick={() => {
                updatePost(neededpost.aurthor.id, neededpost.title, neededpost.postText)
            }}>Save Changes</button>
            </div>
        </div>
        
    )
}


