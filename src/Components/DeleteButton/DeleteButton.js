
function DeleteButton({deletePost}) {
    return (
        <div>
            <button
                title="Delete Post" 
                onClick={deletePost}>&#128465;</button>
        </div>
    )
}

export default DeleteButton
