import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateButton from "../UpdateButton/UpdateButton";
import { useContext, useState } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UserPosts.css';
import axios from "axios"
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LikePopOver from "../LikePopOver/LikePopOver";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

 
function UserPosts({post, deletePost, updatedPost}) {
    const {setId, isEditsection, setNewTitle, setNewPostText} = useContext(HomePageContext);
    const userID = localStorage.getItem('userID');
    
    //Modifying Time which comes from DB
    let time = post.createdAt.split('T').join(', ')
    time = time.slice(0, 17)

    //Saving default values to show when page reloads
    const [likesCount, setLikesCount] = useState(post.likedBy.length);
    const [liked, setLiked] = useState(post.likedBy.includes(userID)? true : false);
    
    
    const token = localStorage.getItem('token');

    //Like Button Section
    //This function is when the user didnt like the post yet
    const LikePost = async () => {
        const {data} = await axios.patch(`http://localhost:4000/api/v1/posts/liked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        
        setLikesCount(data.post.likedBy.length);  //Live updating likes count and like icon
        setLiked(true);
         
    }

    //This function is when user already liked the post and wanna dislike
    const disLikePost = async () => {
        const {data} = await axios.patch(`http://localhost:4000/api/v1/posts/disliked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        setLikesCount(data.post.likedBy.length);  //Live updating likes count and like icon     
        setLiked(false);
    }

    //Showing alert if user isnt logged in but tried to like the post
    //Otherwise showing the correct like button(Empty or filled)
    let likeButton;
    if(!token) {
      likeButton = <LikePopOver />;
    } else if (!liked) {
      likeButton = <ThumbUpOffAltIcon fontSize="medium"  onClick ={LikePost}/>;
    } else {
      likeButton = <ThumbUpAltIcon fontSize="medium" onClick ={disLikePost}/>;
    }


    //For Comment Section

    //For comments button
    const [isComments, setIsComments] = useState(false)
  
   //to save comments data
    const [commentData, setCommentData] = useState("")
    
    //to save commentInput value
    const [commentInput, setCommentInput] = useState("")


    const url = 'http://localhost:4000/api/v1/posts/comments'

    const CommentButtonClick = async () => {
      try {
        const {data} = await axios.get(`${url}/${post._id}`)
        setCommentData(data.comments)
        setIsComments(true)

      } catch (error) {
        alert(error)
      }
       
    }

    const addComment = async (id) => {
      try {
          await axios.post(url, {Text:commentInput, Post:id}, {
            headers: {Authorization: `Bearer ${token}`}
          })
          CommentButtonClick()
          setCommentInput("")
      } catch (error) {
        alert(error)
      }
    }


  const deleteComment = async (id) => {
    try{
      await axios.delete(`${url}/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      CommentButtonClick()
    } catch (error) {
      alert.log(error)
    }   
  }




    return (        
          <div className="post">
                                            {/* Making sure only the newly Updated post's title and postText re-renders on screen*/}
            <div className="postHeader"><h1>{updatedPost._id === post._id ? updatedPost.title : post.title}</h1></div> 

             <div className="postContentContainer">
                  <div className="postTextContainer">{updatedPost._id === post._id ? updatedPost.postText : post.postText}</div>
                  <h4 className="Aurthor">Posted by: {post.userName}</h4>
                  <div className="Time">@{time}</div>   
              </div>   

              <div className="UpdateButton">
              {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn(passing post as props so I can access post.id and stuffs to set them to states)*/}     
              {userID === post.createdBy && 
              <div><UpdateButton updatedPost={updatedPost} post={post} setId={setId} isEditsection={isEditsection} setNewTitle={setNewTitle} setNewPostText={setNewPostText}/></div>
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
              <div className="DeleteButton"><DeleteButton deletePost={deletePost} post={post}/></div>
              }
            </div>

            {/* If comment Icon is clicked Rendering Comments on Screen */}
            
            {isComments && <CommentInput commentInput={commentInput} setCommentInput={setCommentInput} id={post._id} addComment={addComment}/>}
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

export default UserPosts
