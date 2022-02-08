import axios from "axios";
import { useEffect, useContext, useState } from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './HomePage.css'
import Pagination from '../../Components/HomePageComponents/Pagination/Pagination'
import SortButton from "../../Components/HomePageComponents/SortingButton/SortingButton";
import BackToTop from "../../Components/ScrollToTopButton/ScrollToTopButton";



//Using contextApi to pass props to Child Components


function HomePage({ ID }) {

  const {page, postLists, setPostLists, newtitle, setNewTitle, newpostText, setNewPostText, editsection, isEditsection} = useContext(HomePageContext)

  const token = localStorage.getItem('token')
  

  //To save noOfPages
  const [pageCount, setPageCount] = useState(1)

  //To save updatedPost
  const [updatedPost, setUpdatedPost] = useState("")

  //to save sort value
  const [sort, setSort] = useState('-createdAt')

  

  //Getting Posts from MongoDB when the HomePage Component is rendered
  const url = 'http://localhost:4000/api/v1/posts'
  useEffect(() => {
    const getPosts = async () => {
      const {data} = await axios.get(url+`?page=${page}&sort=${sort}${ID}`)
      setPostLists(data.posts);
      setPageCount(data.noOfPages);
    };
    getPosts();
  }, [page, sort, ID]);

 

  //Updating the Post(Editing the Post)

  const updatePost = async (id) => {
      const {data} = await axios.patch(url+`/${id}`, {title: newtitle, postText: newpostText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUpdatedPost(data.post) //To re-render a post as soon as it's updated
      isEditsection(false);

      //After Updating when user click edit button again giving them the updated values typed in Inputs already.
      setNewTitle(data.post.title)
      setNewPostText(data.post.postText)
  }
  
  
  
  
  //Deleting the post
  const deletePost = async (id) => {
    axios.delete(url+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
}

  

  


  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
      {/* Need to make this like an Alert */}
      {!token && <p>Please Login to createPosts or to comment</p>} 
      
      {/* Sort Button */}
      {!editsection && 
      <div className="SortButtonContainer">
      <SortButton setSort={setSort}/>
      </div>
      }
      
        
      {/* Page SetUp(Pagination) */}
      {!editsection && <Pagination pageCount={pageCount}/>}

      <BackToTop />
      {/*Showing Posts when HomePage Component is Rendered */}
      {postLists.map((post) => {
        return(
          <div key={post._id}>
          <UserPosts updatedPost={updatedPost} post={post} deletePost={deletePost}/></div> //delete post ithukkulle props ah pohuma
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePost={updatePost}/>
    }
    
    
    
    </div>)
}

export default HomePage;
