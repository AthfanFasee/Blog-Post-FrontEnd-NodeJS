import { useContext } from "react";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './UpdatePost.css';
import {useSelector, useDispatch} from 'react-redux';
import {updateInputValue} from '../../features/UpdateInputElements';


export default function UpdatePost({updatePost}) {

    const {isEditsection} = useContext(HomePageContext);

    const update = useSelector((state) => state.update.value);
    const PostID = useSelector((state) => state.PostID.value);

    const dispatch = useDispatch();

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
            <button disabled={!update.newpostText || !update.newtitle} onClick={() => updatePost(PostID) }>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        
    )
}


