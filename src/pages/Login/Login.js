import { useNavigate } from 'react-router-dom';
import LoginButton from '../../Components/LoginButton/LoginButton';
import Register from '../../Components/Register/Register';
import {useContext} from 'react';
import './Login.css';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import {login} from '../../api/LoginAPIs/Login'
import { register } from '../../api/LoginAPIs/Register';


function Login() {

    const {loginPassword, loginEmail, registerUserName, registerPassword, isRegister, registerEmail, setError} =
     useContext(LoginPageContext);

    const navigate = useNavigate();

    //Login
    const LoginUser = async () => {
        try{
            const {data} = await login({loginEmail, loginPassword})
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
            const {data} = await register({registerEmail, registerPassword, registerUserName})
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
