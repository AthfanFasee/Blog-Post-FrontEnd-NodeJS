import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import { useContext, useState } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UserPosts.css'
import axios from "axios"
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


function UserPostswithComments({post, deletePost}) {
    const {setId, isEditsection, setNewTitle, setNewPostText} = useContext(HomePageContext)
    
  
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')

    //This function is when the user didnt like the post yet
    const LikePost = async () => {
      await axios.patch(`http://localhost:4000/api/v1/posts/liked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
         
    }

    //This function is when user already liked the post and wanna dislike
    const disLikePost = async () => {
      await axios.patch(`http://localhost:4000/api/v1/posts/disliked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})

    }
    return (
        <div className="postParent">
             
             
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="UIButtons">

            {/* Showing like button according to if the user alrdy liked the post or not */}
            {!post.likedBy.includes(userID) ? <ThumbUpOffAltIcon fontSize="medium" className="LikeIcon" onClick ={LikePost}/> 
            : <ThumbUpAltIcon fontSize="medium" className="LikeIcon" onClick ={disLikePost}/>
            }

            {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn(passing post as props so I can access post.id and stuffs to set them to states)*/}     
            {userID === post.createdBy && 
            <div className="UpdateButton"><UpdateButton post={post} setId={setId} isEditsection={isEditsection} setNewTitle={setNewTitle} setNewPostText={setNewPostText}/></div>
            }
             
            

            {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
           {userID === post.createdBy &&
            <div className="DeleteButton"><DeleteButton deletePost={deletePost} post={post}/></div>
           }
            
           <CommentIcon fontSize="medium" className="commentsIcon"/>
            
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4 className="Aurthor">Posted by: {post.userName}</h4>
            <div className="Time">@{post.createdAt}</div>
            <p className="likesCount">{post.likedBy.length}</p>
            
          </div>
        </div>
    )
}

export default UserPostswithComments
