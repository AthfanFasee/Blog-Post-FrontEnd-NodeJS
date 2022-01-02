
function DeleteButton({deletePost}) {
    return (
        <div className="deletediv">
            <button
                title="Delete Post" 
                onClick={deletePost}>&#128465;</button>
        </div>
    )
}

export default DeleteButton
