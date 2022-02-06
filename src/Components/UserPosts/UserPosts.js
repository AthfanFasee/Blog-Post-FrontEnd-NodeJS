import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import { useContext, useState } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UserPosts.css'
import axios from "axios"
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function UserPosts({post, deletePost}) {
    const {setId, isEditsection, setNewTitle, setNewPostText} = useContext(HomePageContext)
    const userID = localStorage.getItem('userID')
    
    //Saving default values to show when page reloads
    const [likesCount, setLikesCount] = useState(post.likedBy.length)
    const [liked, setLiked] = useState(post.likedBy.includes(userID)? true : false)
    
    
    const token = localStorage.getItem('token')

    //This function is when the user didnt like the post yet
    const LikePost = async () => {
        const {data} = await axios.patch(`http://localhost:4000/api/v1/posts/liked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        
        setLikesCount(data.post.likedBy.length)  //Live updating likes count and like icon
        setLiked(true)
         
    }

    //This function is when user already liked the post and wanna dislike
    const disLikePost = async () => {
        const {data} = await axios.patch(`http://localhost:4000/api/v1/posts/disliked/${post._id}`,{id: userID}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        setLikesCount(data.post.likedBy.length)  //Live updating likes count and like icon     
        setLiked(false)

    }
    return (        
          <div className="post">

            <div className="postHeader"><h1>{post.title}</h1></div>

             <div className="postContentContainer">
                  <div className="postTextContainer">{post.postText}</div>
                  <h4 className="Aurthor">Posted by: {post.userName}</h4>
                  <div className="Time">@{post.createdAt}</div>
                  <p className="likesCount">{likesCount}</p>    
              </div>          

            <div className="UIButtons">

            {/* Showing like button according to if the user alrdy liked the post or not */}
            {!liked ? <ThumbUpOffAltIcon fontSize="medium" className="LikeIcon" onClick ={LikePost}/> 
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
    )
}

export default UserPosts
