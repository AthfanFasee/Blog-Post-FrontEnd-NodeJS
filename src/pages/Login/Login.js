import { useNavigate } from 'react-router-dom';
import LoginButton from '../../Components/LoginButton/LoginButton';
import Register from '../../Components/Register/Register';
import {useContext} from 'react';
import './Login.css';
import { LoginPageContext } from '../../Helper/LoginPageContext/LoginPageProvider';
import {useLoginUserMutation, useRegisterUserMutation} from '../../services/LoginPageApi';

function Login() {

    const {loginPassword, loginEmail, registerUserName, registerPassword, isRegister, registerEmail, setError} =
     useContext(LoginPageContext);

    const navigate = useNavigate();

    const [login] = useLoginUserMutation()
    const [register] = useRegisterUserMutation()
    
    localStorage.getItem('userInfo')
    //Login
    const LoginUser = async () => {
            const {data} = await login({loginEmail, loginPassword})
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data.user.id);
            localStorage.setItem('userName', data.user.name);           
            navigate("/");
            window.location.reload();
    }


    //Register
    const RegisterUser = async () => {
            const {data} = await register({registerEmail, registerPassword, registerUserName})
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data.user.id);
            localStorage.setItem('userName', data.user.name);           
            navigate("/");
            window.location.reload();
    }

    return (
        <div className="LoginAndRegister">
            {isRegister ? <Register RegisterUser={RegisterUser}/>
             : <LoginButton LoginUser={LoginUser}/>}       
            
        </div>
    )
}

export default Login;
