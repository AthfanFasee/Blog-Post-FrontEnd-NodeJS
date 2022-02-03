import axios from "axios";
import { useEffect, useContext } from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './HomePage.css'

//Using contextApi to pass props to Child Components


function HomePage({ isAuth }) {

  const {postLists, setPostLists, newtitle, newpostText, id, editsection, isEditsection} = useContext(HomePageContext)



  //Getting Posts from FireBase DataBase when the HomePage Component is rendered
  const url = 'http://localhost:4000/api/v1/posts'
  
  useEffect(() => {
    const getPosts = async () => {
      const {data} = await axios.get(url)
      console.log(data)
      setPostLists(data.posts)
    };
    getPosts();
  });



  //Deleting the post
  

  

  //Updating the Post(Editing the Post)
  


  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
     

      {/*Showing Posts when HomePage Component is Rendered */}
      {postLists.map((post) => {
        return(
          <div key={post._id}> 
          <UserPosts post={post} isAuth={isAuth} /></div> //delete post ithukkulle props ah pohuma
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost/>
    }
    </div>)
}

export default HomePage;
