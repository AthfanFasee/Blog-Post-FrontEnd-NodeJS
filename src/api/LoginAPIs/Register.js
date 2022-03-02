import axios from 'axios';

const url = 'https://blog-posts-1699.herokuapp.com/api/v1/auth/register';

export const register =  async ({registerEmail, registerPassword, registerUserName}) => {
    try {
        return await axios.post(url, {email: registerEmail, password: registerPassword, name: registerUserName});
        
    } catch (error) {
        alert(error);
    }    
  }