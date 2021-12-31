import { useEffect, useContext } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageContext";


//Using contextApi to pass props to Child Components


function HomePage({ isAuth }) {

  const postsCollectionRef = collection(db, "posts");
  const {postLists, setPostLists, newtitle, newpostText, id, editsection, isEditsection} = useContext(HomePageContext)

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

  

  //Updating the Post(Editing the Post)
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
        return( 
          <UserPosts post={post} isAuth={isAuth} deletePost={() => deletePost(post.id)}/>
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePost={() => updatePost(id, newtitle, newpostText )}/>
    }
    </div>)
}

export default HomePage;
