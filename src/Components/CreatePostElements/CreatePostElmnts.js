import { useContext } from 'react';
import { CreatePostContext } from '../../Helper/CreatePostContext/CreatePostProvider';
import './CreatePostElement.css';

function CreatePostElmnts({Cancel, CreatePostButtonClick}) {
    
    const {title, setTitle, postText, setPostText, error} = useContext(CreatePostContext);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Create A Post</h1>
            {error && <h3 className="error">{`!! ${error}`}</h3>}
            <div className="inputGp">
                <label>Title:</label>
                <input placeholder="Title.." value={title}  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>Post:</label>
                <textarea placeholder="Post..." value={postText} onChange={(event) => setPostText(event.target.value)} />
            </div>
            <button disabled={!title || !postText}  onClick={CreatePostButtonClick}>Submit Post</button>
            <button onClick={Cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePostElmnts;

