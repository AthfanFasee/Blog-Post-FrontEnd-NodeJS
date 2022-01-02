
import './AppStyle/App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import { useState } from 'react'
import HomePage from './pages/HomePage/HomePage';
import SignOutButton from './Components/SignOutButton/SignOutButton';
import {HomePageProvider} from './Helper/HomePageContexts/HomePageProvider';





function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

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
         
         <SignOutButton setIsAuth={setIsAuth}/>
         </>
         )}
      </nav>
      <Routes>
      
        <Route path='/' element={<HomePageProvider><HomePage isAuth={isAuth}/></HomePageProvider>} />
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
