import {useNavigate} from 'react-router-dom';
import './SignOutStyle/SignOut.css'



function SignOutButton() {

    const navigate = useNavigate()

    //setting up logout function
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/')
    window.location.reload();

  }
    return (
        <div className="SignOut">
            <button className = "SignOutbutton" onClick={signOut}>LogOut</button>
        </div>
    )
}

export default SignOutButton
