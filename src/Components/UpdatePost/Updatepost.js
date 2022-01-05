import { useContext } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider"
import './UpdatePost.css'


export default function UpdatePost({updatePost}) {
    const {isEditsection, setNewTitle, setNewPostText, newpostText, newtitle } = useContext(HomePageContext)
    return (
        <div className="UpdatePostBG">
        <div className="">
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Update Your Post</h1>
            <div className="inputGp">
                <label>New Post Title:</label>
                <input placeholder="Title.." title="Title" value={newtitle}  onChange={(event) => setNewTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>New Post:</label>
                <textarea placeholder="Post..." title="TextArea" value={newpostText} onChange={(event) => setNewPostText(event.target.value)} />
            </div>
            <button disabled={!newpostText || !newtitle} onClick={updatePost}>Save Changes</button>
            <button onClick={() => isEditsection(false)}>Cancel</button>
            </div>
        </div>
        </div>
        </div>
        
    )
}


