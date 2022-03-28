import {useContext} from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import Pagination from '../../Components/HomePageComponents/Pagination/Pagination';
import SortButton from "../../Components/HomePageComponents/SortingButton/SortingButton";
import BackToTop from "../../Components/HomePageComponents/ScrollToTopButton/ScrollToTopButton";
import './HomePage.css';
import LoadingComponent from "../../Components/HomePageComponents/LoadingComponent/LoadingComponent";
import {useSelector, useDispatch} from 'react-redux';
import {updateInputValue} from '../../features/UpdateInputElements';
import {useGetPostsQuery, useUpdatePostMutation} from '../../services/HomePageApi';

import {updatePostAction} from '../../features/UpdatedPost';

function HomePage() {

  const {sort, setSort, page, editsection, isEditsection} = useContext(HomePageContext);

  const update = useSelector((state) => state.update.value);
  const UserIDParam = useSelector((state) => state.UserIDParam.value);
  const updatedPost = useSelector((state) => state.updatePost.value.UpdatedPost);

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

   //Getting Posts from MongoDB when the HomePage Component is rendered
  const { data : PostsList, isFetching } = useGetPostsQuery({page, sort, UserIDParam })
    
  const [updatePost] = useUpdatePostMutation()
  
  //Updating the Post(Editing the Post)
  const updatePostButtonClick = async (PostID) => {
      await updatePost({PostID, update})
      isEditsection(false);  
      //After Updating when user click edit button again giving them the updated values typed in Inputs already.
      dispatch(updateInputValue({newtitle: updatedPost.title, newpostText: updatedPost.postText}))
  }
   
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
      {!editsection && <Pagination pageCount={PostsList?.noOfPages}/>}

      <BackToTop />

      {/* Loading Icon */}
      {isFetching && <LoadingComponent />}


      {/*Showing Posts when HomePage Component is Rendered */}
      {PostsList?.posts.map((post) => {
        return( 
          <div key={post._id}>
          <UserPosts post={post}/>
          </div> 
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePostButtonClick={updatePostButtonClick}/>
    }
    
    
    
    </div>)
}

export default HomePage;
