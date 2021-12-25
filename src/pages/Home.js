import { useEffect, useState, createContext } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Updatepost from "./updatepost";

//Using contextApi to pass props to updatepost Component
export const AppContext = createContext(null)

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  
  


  const [newtitle, setTitle] = useState("")
  const [newpostText, setPostText] = useState("")

  const [id, setId] = useState("")

  const[editsection, isEditsection] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef) //just like we did in addDoc inside creatpost.js, we are just letting getDoc knw from which exact app and which collection or table it needs to get data from
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //Imagine internet is bad. We dont want the setter function to run and update state value before even the data is read (or getten from firebaser server) properly. that's why we are using async await here, telling the function to await gettingDoc before updating state value
    };
    getPosts();
  });

  //Deleting the post
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  

  //Updating the Post
  const updatePost = async (id, ntitle, npostText) => {
    const userDoc = doc(db, "posts", id)
    const newFields = {title : ntitle, postText: npostText}  
    await updateDoc(userDoc, newFields)
    isEditsection(false)
    }        


  return (
    <div className="homePage">
      {postLists.map((post) => {
        return ( 
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="deletePost">

            {/* Making sure that the delete and edit buttons only show to the user authenticated rn */}
            {isAuth && post.aurthor.id === auth.currentUser.uid &&(
            <button 
              onClick={() => {
              deletePost(post.id)}}>&#128465;</button>
            )}

            {isAuth && post.aurthor.id === auth.currentUser.uid &&(
            <button 
              onClick={() => { 
                setId(post.id)                           //I need the id of the specific post the edit button is clicked later to use on updateDoc function. And I can't access the id outside of mapping, so setting it up on a state right here when I click the edit button
                isEditsection(true)
                setTitle(post.title)
                setPostText(post.postText)  
              }}>&#128394;</button> //rendering the updateDoc component when button is clicked
            )}
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4>@{post.aurthor.name}</h4>
            <div>{post.time}</div>
            
          </div>
        );
      })}

    {editsection && 
    <AppContext.Provider value={{newtitle, newpostText, setTitle, setPostText, isEditsection  }}>
    <Updatepost toggle={() => updatePost(id, newtitle, newpostText )}/>
    </AppContext.Provider>
    }
    </div>
  );
}

export default Home;
