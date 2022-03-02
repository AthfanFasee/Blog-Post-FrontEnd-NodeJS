import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateButton from "../UpdateButton/UpdateButton";
import {  useState } from "react";
import './UserPosts.css';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LikePopOver from "../LikePopOver/LikePopOver";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {useSelector} from 'react-redux';
import {FetchComments, AddComment, DeleteComment} from '../../api/UserPostsAPIs/Comments';
import {LikePost, DisLikePost} from '../../api/UserPostsAPIs/Likes';

function UserPosts({post}) {
  
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');

    //to save comments data
    const [commentData, setCommentData] = useState("");
    
    //to save commentInput value
    const [commentInput, setCommentInput] = useState("");


    //For comments button
    const [isComments, setIsComments] = useState(false);
  

    //To re-render a post as soon as it's updated
    const updatedPost = useSelector((state) => state.updatePost.value.UpdatedPost);


    //Modifying Time which comes from DB
    let time = post.createdAt.split('T').join(', ');
    time = time.slice(0, 17);


    //Like Button Section

    //Saving default values to show when page reloads
    const [likesCount, setLikesCount] = useState(post.likedBy.length);
    const [liked, setLiked] = useState(post.likedBy.includes(userID)? true : false);
    
    
    //This function is when the user didnt like the post yet
    const likePost = async () => {
        const {data} = await LikePost({postID: post._id, userID, token});
        setLikesCount(data.post.likedBy.length);  //Live updating likes count and like icon
        setLiked(true);
         
    }

    //This function is when user already liked the post and wanna dislike
    const disLikePost = async () => {
      const {data} = await DisLikePost({postID: post._id, userID, token});
        setLikesCount(data.post.likedBy.length);  //Live updating likes count and like icon     
        setLiked(false);
    }

    //Showing alert if user isnt logged in but tried to like the post
    //Otherwise showing the correct like button(Empty or filled)
    let likeButton;
    if(!token) {
      likeButton = <LikePopOver />;
    } else if (!liked) {
      likeButton = <ThumbUpOffAltIcon fontSize="medium"  onClick ={likePost}/>;
    } else {
      likeButton = <ThumbUpAltIcon fontSize="medium" onClick ={disLikePost}/>;
    }


    
    //Comment Functionality

    const CommentButtonClick = async () => {
        const {data} = await FetchComments ({postID: post._id});
        setCommentData(data.comments);       
        setIsComments(true);
       
    }

    const addComment = async (id) => {
        await AddComment(commentInput, id, token);
        CommentButtonClick();
        setCommentInput("");
    }


    const deleteComment = async (id) => {
        await DeleteComment(id, token);
        CommentButtonClick();
    }


    return (        
          <div className="post">
                                           {/* Making sure only the newly Updated post's title and postText re-renders on screen */}
            <div className="postHeader"><h1>{updatedPost._id === post._id ? updatedPost.title : post.title}</h1></div> 

             <div className="postContentContainer">
                  <div className="postTextContainer">{updatedPost._id === post._id ? updatedPost.postText : post.postText}</div>
                  <h4 className="Aurthor">Posted by: {post.userName}</h4>
                  <div className="Time">@{time}</div>   
              </div>   

              <div className="UpdateButton">
              {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn(passing post as props so I can access post.id and stuffs to set them to states)*/}     
              {userID === post.createdBy && 
              <div><UpdateButton updatedPost={updatedPost} post={post}/></div>
              }        
            </div>

            

            <div className="LikeandCommentDeleteContainer">

              {/* Showing like button according to if the user alrdy liked the post or not */}
            
              <div className="LikeIcon">{likeButton}</div>

              <p className="likesCount">{likesCount}</p> 


              {/* Conditionally Rendering CommentsIcon */}

              {isComments ?  <CloseFullscreenIcon onClick={() => setIsComments(false)} className="commentsIcon" fontSize="medium" /> :
              <CommentIcon onClick={CommentButtonClick} fontSize="medium" className="commentsIcon"/>}


              {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
              {userID === post.createdBy &&
              <div className="DeleteButton"><DeleteButton post={post}/></div>
              }
            </div>

            {/* If comment Icon is clicked Rendering Comments on Screen */}
            
            {isComments && <CommentInput id={post._id} addComment={addComment} setCommentInput={setCommentInput} commentInput={commentInput}/>}
            <div className="AllComments">
            {isComments && commentData.map(comment => {
              return (
                <div key={comment._id}>
                  <Comments userID={userID} comment={comment} deleteComment={deleteComment}/>
                </div>
              )             
            })}
            </div>                        
          </div>
    )
}

export default UserPosts;
