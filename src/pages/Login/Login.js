import {auth, provider} from '../../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import LoginButton from '../../Components/LoginButton/LoginButton'

function Login({setIsAuth}) {

    const navigate = useNavigate()

    const signInWithGoogle = () => {
            signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true) //making sure we stay signed in even after closing tab or browser//

            setIsAuth(true) //can use it to prevent users from specific pages without signin//
            //note that button click function doesnt change state value. instead the promise(signInwithProp does that if the promise is suceeded. so users cant simply click button and then cancel google login page and still acess restricted pages)

            navigate("/")
        }).catch(alert) //if promise doesnt pass or if user couldnt signIn, alerting them the error
    }
//IMPORTANTTTT local storage le save panne muthal check box and state use panni tick panna mattum staysigned in option kudukkalam(extra va theveyenda)

    return (
        <div>
            <LoginButton signInWithGoogle={signInWithGoogle}/>
        </div>
    )
}

export default Login
