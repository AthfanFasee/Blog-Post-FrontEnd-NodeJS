import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";



function UpdateButton({post, updatedPost}) {
  const {setNewTitle, setNewPostText, isEditsection, setId} = useContext(HomePageContext)
    return (
        <div>
            <button 
                title="Update"
                onClick={() => { 
                setId(post._id)                           
                isEditsection(true)
                setNewTitle(updatedPost._id === post._id ? updatedPost.title : post.title)          //If user updated the post when they click edit button again showing them the updated values in input boxes
                setNewPostText(updatedPost._id === post._id ? updatedPost.postText : post.postText)
                  
              }}>&#128394;</button>
        </div>
    )
}

export default UpdateButton;
