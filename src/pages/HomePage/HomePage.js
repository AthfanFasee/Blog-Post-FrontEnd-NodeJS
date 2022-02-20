import axios from "axios";
import { useEffect, useContext} from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import Pagination from '../../Components/HomePageComponents/Pagination/Pagination';
import SortButton from "../../Components/HomePageComponents/SortingButton/SortingButton";
import BackToTop from "../../Components/ScrollToTopButton/ScrollToTopButton";
import './HomePage.css';
import LoadingComponent from "../../Components/HomePageComponents/LoadingComponent/LoadingComponent";
import {useSelector, useDispatch} from 'react-redux';
import {updateInputValue} from '../../features/UpdateInputElements';

//Using contextApi to pass props to Child Components


function HomePage() {

  const {sort, setSort, setUpdatedPost, updatedPost, pageCount, setPageCount, page, postLists, setPostLists, editsection, isEditsection} = useContext(HomePageContext);

  const update = useSelector((state) => state.update.value);
  const UserIDParam = useSelector((state) => state.UserIDParam.value);

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  
  
  //Getting Posts from MongoDB when the HomePage Component is rendered
  const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts';
  useEffect(() => {
    const getPosts = async () => {
      const {data} = await axios.get(url+`?page=${page}&sort=${sort}${UserIDParam}`);
      setPostLists(data.posts);
      setPageCount(data.noOfPages);
    };
    getPosts();
  }, [page, sort, UserIDParam]);

 

  //Updating the Post(Editing the Post)

  const updatePost = async (postID) => {
      const {data} = await axios.patch(url+`/${postID}`, {title: update.newtitle, postText: update.newpostText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUpdatedPost(data.post); //To re-render a post as soon as it's updated
      isEditsection(false);

      //After Updating when user click edit button again giving them the updated values typed in Inputs already.
      dispatch(updateInputValue({newtitle: updatedPost.title, newpostText: updatedPost.postText}))
  }
  
  
  
  
  //Deleting the post
  const deletePost = async (id) => {
    axios.delete(url+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })   
};

  



  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
      {/* Need to make this like an Alert */}
      {!token && <p>Please Login to Create Your Own Posts</p>} 
      
      {/* Sort Button */}
      {!editsection && 
      <div className="SortButtonContainer">
      <SortButton setSort={setSort}/>
      </div>
      }
      
        
      {/* Page SetUp(Pagination) */}
      {!editsection && <Pagination pageCount={pageCount}/>}

      <BackToTop />

      {/* Loading Icon */}
      {postLists.length < 1 && <LoadingComponent />}


      {/*Showing Posts when HomePage Component is Rendered */}
      {postLists.map((post) => {
        return(
          
          <div key={post._id}>
          <UserPosts updatedPost={updatedPost} post={post} deletePost={deletePost}/></div> 
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePost={updatePost}/>
    }
    
    
    
    </div>)
}

export default HomePage;
