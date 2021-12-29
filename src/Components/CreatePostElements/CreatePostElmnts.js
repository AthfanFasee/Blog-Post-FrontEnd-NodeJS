function CreatePostElmnts({createPost, setTitle, setPostText, postText, title}) {
    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h1>Create A Post</h1>
            <div className="inputGp">
                <label>Title:</label>
                <input placeholder="Title.."  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="inputGp">
                <label>Post:</label>
                <textarea placeholder="Post..." onChange={(event) => setPostText(event.target.value)} />
            </div>
            <button disabled={!title || !postText}  onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePostElmnts

