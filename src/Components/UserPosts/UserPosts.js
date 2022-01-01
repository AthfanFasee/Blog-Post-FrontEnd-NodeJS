import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import { useContext } from "react"
import { auth } from "../../firebase-config";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";


function UserPosts({post, deletePost, isAuth}) {
    const {setId, isEditsection, setNewTitle, setNewPostText} = useContext(HomePageContext)
    return (
        <div>
             
          <div className="post">
            <div className="postHeader">
            <div className="title"><h1>{post.title}</h1></div>
            <div className="deletePost">

            {/*Showing DeleteButton only when the user who posted the post LoggedIn*/}
            {isAuth && post.aurthor.id === auth.currentUser.uid && 
            <DeleteButton deletePost={deletePost}/>}
    


            {/*Showing UpdateButton(Edit Button) only when the user who posted the post LoggedIn(passing post as props so I can access post.id and stuffs to set them to states)*/}
            
            {isAuth && post.aurthor.id === auth.currentUser.uid && ( 
             <UpdateButton post={post} setId={setId} isEditsection={isEditsection} setNewTitle={setNewTitle} setNewPostText={setNewPostText}/>
            )}
            </div>
            </div>
            
            <div className="postTextContainer">{post.postText}</div>
            <h4>@{post.aurthor.name}</h4>
            <div>{post.time}</div>
            
          </div>
        </div>
    )
}

export default UserPosts
