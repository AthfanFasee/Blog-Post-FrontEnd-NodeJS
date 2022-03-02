import axios from 'axios';

const url = 'https://blog-posts-1699.herokuapp.com/api/v1/auth/login';

export const login =  async ({loginEmail, loginPassword}) => {
    try {
        return await axios.post(url, {email: loginEmail, password: loginPassword}); 
        
    } catch (error) {
        alert(error);
    }    
  }