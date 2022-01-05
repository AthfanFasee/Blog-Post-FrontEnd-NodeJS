import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase-config";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UserPosts.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function UserPosts({post, deletePost, isAuth}) {
    const {setId, isEditsection, setNewTitle, setNewPostText} = useContext(HomePageContext)
    const [isFavorite, SetisFavorite] = useState(false)
    
    
    

    const handleClickFavrt = () => {
      SetisFavorite(false)
      
    }

    const handleClickFavrtNotFavrt = () => {
      SetisFavorite(true)
      
    }
    return (
        <div className="postParent">
             
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="UIButtons">

            {/* Setting Up Heart icon */}
            {!isFavorite ? <FavoriteBorderIcon fontSize="medium" className="HeartIcon" onClick ={handleClickFavrtNotFavrt}/> 
            : <FavoriteIcon fontSize="medium" className="HeartIcon" onClick ={handleClickFavrt}/>
            }

            {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn(passing post as props so I can access post.id and stuffs to set them to states)*/}
            
            {isAuth && post.aurthor.id === auth.currentUser.uid && ( 
             <div className="UpdateButton"><UpdateButton post={post} setId={setId} isEditsection={isEditsection} setNewTitle={setNewTitle} setNewPostText={setNewPostText}/></div>
            )}

            {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
            {isAuth && post.aurthor.id === auth.currentUser.uid && 
            <div className="DeleteButton"><DeleteButton deletePost={deletePost}/></div>}
    
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4 className="Aurthor">@{post.aurthor.name}</h4>
            <div className="Time">{post.time}</div>
            
          </div>
        </div>
    )
}

export default UserPosts
