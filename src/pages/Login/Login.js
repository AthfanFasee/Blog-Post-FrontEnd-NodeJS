import { useNavigate } from 'react-router-dom'
import LoginButton from '../../Components/LoginButton/LoginButton'
import Register from '../../Components/Register/Register'
import {useState} from 'react'
import axios from 'axios'


function Login({setIsAuth}) {

    const navigate = useNavigate();
    const RegisterURL = 'http://localhost:4000/api/v1/auth/register'
    const LoginURL = 'http://localhost:4000/api/v1/auth/login'

    //To render register form
    const [isRegister, setIsRegister] = useState(false);

    //in Register form
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerUserName, setRegisterUserName] = useState("");


    //in Login Form
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    //to catch errors
    const [error, setError] = useState("")


    //Login
    const LoginUser = async () => {
        try{
            const {data} = await axios.post(LoginURL, {email: loginEmail, password: loginPassword});
            localStorage.setItem('token', data.token)
            navigate("/")
            window.location.reload();
        } catch(err) {
            setError(err.response.data.msg)
        }
    }


    //Register
    const RegisterUser = async () => {
        try {
            const {data} = await axios.post(RegisterURL, {email: registerEmail, password: registerPassword, name: registerUserName});
            localStorage.setItem('token', data.token)
            navigate("/")
            window.location.reload();

        } catch(err) {
            setError(err.response.data.msg)
        }
    }

    return (
        <div>
            {isRegister ? <Register error={error} setIsRegister={setIsRegister} setRegisterUserName={setRegisterUserName} setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword} RegisterUser={RegisterUser}/>
             : <LoginButton error={error} LoginUser={LoginUser}  setIsRegister={setIsRegister} setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword} />}       
            
        </div>
    )
}

export default Login
