import axios from 'axios';

const url = 'https://blog-posts-1699.herokuapp.com/api/v1/posts/comments';

export const FetchComments =  ({postID}) => {
    try {
        return axios.get(`${url}/${postID}`); 

    } catch (error) {
        alert(error);
    }
     
  }


export const AddComment = async (commentInput, id, token) => {
    try {
        await axios.post(url, {Text:commentInput, Post:id}, {
          headers: {Authorization: `Bearer ${token}`}
        })

    } catch (error) {
      alert(error);
    }
}


export const DeleteComment = async (id, token) => {
    try{
      await axios.delete(`${url}/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      
    } catch (error) {
      alert.log(error);
    }   
  }