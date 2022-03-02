import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deletePost} from '../../api/HomePageAPIs/Posts';
import {getPosts} from '../../api/HomePageAPIs/Posts';
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";


function DeleteButton({post}) {

  const {sort, page} = useContext(HomePageContext);
  const UserIDParam = useSelector((state) => state.UserIDParam.value);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

    //for delete confirmation
    const [open, setOpen] = useState(false);

    
  
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const confirmDelete = async () => {
        await dispatch(deletePost({id: post._id, token}));
        dispatch(getPosts({page, sort, UserIDParam}));
        setOpen(false);
      }

      
      
    return (
        <div className="deletediv">

            {/* Delete Confirmation */} 
             <DeleteIcon variant="outlined" data-testid="deleteIcon" onClick={handleClickOpen}></DeleteIcon>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this post?"}
                    </DialogTitle>

                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Note That Once Deleted, This Post cannot be RESTORED!!!
                    </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                    <Button onClick={confirmDelete} autoFocus>
                        Confirm
                    </Button>

                    </DialogActions>
                </Dialog>
                        
        </div>
    )
}

export default DeleteButton;
