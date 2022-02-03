import { auth } from '../../firebase-config'
import './SignOutStyle/SignOut.css'



function SignOutButton({setIsAuth}) {

    //setting up logout function
  const signOut = () => {
    
  }
    return (
        <div className="SignOut">
            <button className = "SignOutbutton" onClick={signOut}>LogOut</button>
        </div>
    )
}

export default SignOutButton
