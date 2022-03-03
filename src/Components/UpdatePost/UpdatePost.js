import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UpdatePost.css';
import {useUpdatePostDispatch, useUpdatePostSelector} from '../../redux/redux-hooks';
import {updateInputValue} from '../../features/UpdateInputElements';


export default function UpdatePost({updatePostButtonClick}) {

    const {isEditsection} = useContext(HomePageContext);
    const PostID = useUpdatePostSelector((state) => state.PostID.value);
    const update = useUpdatePostSelector((state) => state.update.value);

    const dispatch = useUpdatePostDispatch();

    return (
        <div className="UpdatePostBG">
        <div className="UpdatePostPage">
            <div className="UpdatePostContainer">
            <h1>Update Your Post</h1>
            <div className="UpdatePostInput">
                <label>New Post Title:</label>
                <input placeholder="Title.." title="Title" value={update.newtitle}  onChange={(event) => dispatch(updateInputValue({newtitle: event.target.value, newpostText: update.newpostText}))}/>
            </div>
            <div className="UpdatePostInput">
                <label>New Post:</label>
                <textarea placeholder="Post..." title="TextArea" value={update.newpostText} onChange={(event) => dispatch(updateInputValue({newpostText: event.target.value, newtitle: update.newtitle}))} />
            </div>
            <button disabled={!update.newpostText || !update.newtitle} onClick={() => updatePostButtonClick(PostID)}>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        
    )
}


