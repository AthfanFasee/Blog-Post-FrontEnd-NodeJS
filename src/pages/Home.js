import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

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
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return ( 
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="deletePost">
            {isAuth && post.aurthor.id === auth.currentUser.uid &&(
            <button 
              onClick={() => {
              deletePost(post.id)}}>&#128465;</button>
            )}
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4>@{post.aurthor.name}</h4>
            <div>{post.time}</div>           
          </div>
        );
      })}
    </div>
  );
}

export default Home;
