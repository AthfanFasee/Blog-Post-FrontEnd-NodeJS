import { useNavigate } from 'react-router-dom';
import LoginButton from '../../Components/LoginButton/LoginComponent';
import Register from '../../Components/Register/Register';
import {useContext} from 'react';
import axios from 'axios';
import './Login.css';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';


function Login() {

    const {loginPassword, loginEmail, registerUserName, registerPassword, isRegister, registerEmail, setError} =
     useContext(LoginPageContext);

    const navigate = useNavigate();
    const RegisterURL = 'https://blog-posts-1699.herokuapp.com/api/v1/auth/register';
    const LoginURL = 'https://blog-posts-1699.herokuapp.com/api/v1/auth/login';


    //Login
    const LoginUser = async () => {
        try{
            const {data} = await axios.post(LoginURL, {email: loginEmail, password: loginPassword});
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data.user.id); //Saving token and username as soon as the user is logged in / Registered
            localStorage.setItem('userName', data.user.name);

            navigate("/")
            window.location.reload();
        } catch(err) {
             setError(err.response.data.msg);          
        }
    }


    //Register
    const RegisterUser = async () => {
        try {
            const {data} = await axios.post(RegisterURL, {email: registerEmail, password: registerPassword, name: registerUserName});
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data.user.id);
            localStorage.setItem('userName', data.user.name);

            navigate("/");
            window.location.reload();

        } catch(err) {
            setError(err.response.data.msg);
        }
    }

    return (
        <div className="LoginAndRegister">
            {isRegister ? <Register RegisterUser={RegisterUser}/>
             : <LoginButton LoginUser={LoginUser}/>}       
            
        </div>
    )
}

export default Login;
