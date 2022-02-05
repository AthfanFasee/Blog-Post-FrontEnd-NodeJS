import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({deletePost, post}) {
    return (
        <div className="deletediv">
            <DeleteIcon
                title="Delete Post" 
                onClick={() => deletePost(post._id)}>&#128465;</DeleteIcon>
        </div>
    )
}

export default DeleteButton
