import { useContext } from "react"
import {AppContext} from '../../pages/HomePage/HomePage'

export default function UpdatePost({updatePost}) {
    const {isEditsection, setTitle, setPostText, newpostText, newtitle } = useContext(AppContext)
    return (
        <div className="BackGround">
        <div className="">
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Update Your Post</h1>
            <div className="inputGp">
                <label>New Post Title:</label>
                <input placeholder="Title.." value={newtitle}  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>New Post:</label>
                <textarea placeholder="Post..." value={newpostText} onChange={(event) => setPostText(event.target.value)} />
            </div>
            <button onClick={updatePost}>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        </div>
        
    )
}


