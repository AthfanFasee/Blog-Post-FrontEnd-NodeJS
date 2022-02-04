
function DeleteButton({deletePost, post}) {
    return (
        <div className="deletediv">
            <button
                title="Delete Post" 
                onClick={() => deletePost(post._id)}>&#128465;</button>
        </div>
    )
}

export default DeleteButton
