
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import { useState } from 'react'
import {signOut} from 'firebase/auth'
import { auth } from './firebase-config';
import Updatepost from './pages/updatepost';



function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))


  //setting up logout function
  const signout = () => {
    signOut(auth).then(() => {
      localStorage.clear()        //reverting back both things we added when we signed in
      setIsAuth(false)
    })
  }

  return (
    <Router>
      <nav>
      <Link to='/'>Home</Link>
        
        {!isAuth ? <>
        <Link to='/login'>Login</Link>
          </>
         : (
           <>
           
         <Link to='/createpost'>Create Post</Link>
         
         <button onClick={signout}>LogOut</button>
         </>
         )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />
{
        //Our Login(child component)is being rendered in App(parent comp) right here so gotta pass props right here as well
}
      </Routes>
    </Router>
  )
}

export default App;
