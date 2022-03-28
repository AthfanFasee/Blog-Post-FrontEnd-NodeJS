import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import {updateInputValue} from '../../features/UpdateInputElements';
import {updatePostID} from '../../features/PostID';
import {useUpdateButtonDispatch}from '../../redux/redux-hooks';


function UpdateButton({post, updatedPost}) {
  const {isEditsection} = useContext(HomePageContext);

  const dispatch = useUpdateButtonDispatch();

    return (
        <div>
            <button 
                  title="Update"
                  onClick={() => { 
                  dispatch(updatePostID( post._id))                          
                  isEditsection(true)
                  
                  //When users go to update section the post's title and text will already be in the input elements.
                  //If user already updated the post, when they click edit button again, showing them the updated values in input elements.
                  dispatch(updateInputValue({newtitle: updatedPost._id === post._id ? updatedPost.title : post.title,
                  newpostText: updatedPost._id === post._id ? updatedPost.postText : post.postText
                }))                          
              }}>&#128394;</button>
        </div>
    )
}

export default UpdateButton;
