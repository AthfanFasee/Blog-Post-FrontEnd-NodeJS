import { useEffect, useState, createContext } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UpdateButton from "../../Components/UpdateButton/UpdateButton";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";


//Using contextApi to pass props to CreatePost Component
export const AppContext = createContext(null)

function HomePage({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");


  const [newtitle, setTitle] = useState("")
  const [newpostText, setPostText] = useState("")



  const [id, setId] = useState("")

  const[editsection, isEditsection] = useState(false);


  //Getting Posts from FireBase DataBase when the HomePage Component is rendered
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

      {/*Warning Users to SignIn when they are not SignedIn */}
      {!isAuth && <h3 className="signInWarning">Please LogIn to Post Blogs and Edit your own blogs</h3>}

      {/*Showing Posts when HomePage Component is Rendered */}
      {postLists.map((post) => {
        return ( 
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="deletePost">

            {/*Setting up DeleteButton*/}
            {isAuth && post.aurthor.id === auth.currentUser.uid && 
            <DeleteButton deletePost={() => deletePost(post.id)}/>}


            {/*Setting up Update button(passing post as props so I can access post.id and stuffs to set them to states)*/}
            {isAuth && post.aurthor.id === auth.currentUser.uid &&
             <AppContext.Provider value={{setId, isEditsection, setTitle, setPostText}}>
             <UpdateButton post={post}/> 
             </AppContext.Provider>}
             
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4>@{post.aurthor.name}</h4>
            <div>{post.time}</div>
            
          </div>
        );
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <AppContext.Provider value={{newtitle, newpostText, setTitle, setPostText, isEditsection  }}>
    <UpdatePost updatePost={() => updatePost(id, newtitle, newpostText )}/>
    </AppContext.Provider>
    }
    </div>
  );
}

export default HomePage;
