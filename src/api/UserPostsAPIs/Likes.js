import axios from 'axios';


export const LikePost = async ({postID, userID, token}) => {
    return await axios.patch(`https://blog-posts-1699.herokuapp.com/api/v1/posts/liked/${postID}`,
    {id: userID}, {
    headers: {
      Authorization: `Bearer ${token}`
    }})
}

export const DisLikePost = async ({postID, userID, token}) => {
    return await axios.patch(`https://blog-posts-1699.herokuapp.com/api/v1/posts/disliked/${postID}`,{id: userID}, {
    headers: {
      Authorization: `Bearer ${token}`
    }})
}