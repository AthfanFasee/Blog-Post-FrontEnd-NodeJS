import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import { useContext, useState } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UserPosts.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function UserPosts({post, deletePost}) {
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
            
            {/* Need to change these button  logics according to JWT token */}
            
             <div className="UpdateButton"><UpdateButton post={post} setId={setId} isEditsection={isEditsection} setNewTitle={setNewTitle} setNewPostText={setNewPostText}/></div>
            

            {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
           
            <div className="DeleteButton"><DeleteButton deletePost={deletePost} post={post}/></div>
    
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4 className="Aurthor">{post.userName}</h4>
            <div className="Time">{post.createdAt}</div>
            
          </div>
        </div>
    )
}

export default UserPosts
