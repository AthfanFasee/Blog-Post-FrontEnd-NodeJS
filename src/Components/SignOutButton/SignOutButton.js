import {signOut} from 'firebase/auth'
import { auth } from '../../firebase-config'
import './SignOutStyle/SignOut.css'



function SignOutButton({setIsAuth}) {

    //setting up logout function
  const signout = () => {
    signOut(auth).then(() => {
      localStorage.clear()        //reverting back both things we added when we signed in
      setIsAuth(false)
    })
  }
    return (
        <div className="SignOut">
            <button onClick={signout}>LogOut</button>
        </div>
    )
}

export default SignOutButton
