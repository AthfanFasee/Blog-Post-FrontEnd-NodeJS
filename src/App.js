import './AppStyle/App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import HomePage from './pages/HomePage/HomePage';
import {HomePageProvider} from './Helper/HomePageContexts/HomePageProvider';
import ProfileButton from './Components/ProfileButton/ProfileButton';
import { useState } from 'react';





function App() {

  const token = localStorage.getItem('token');
  //Saving current User's ID to get only his posts if needed
  const [ID, setID] = useState("")

  return (
    <Router>
      <nav>
      <Link to='/'>Home</Link>
        
        {!token ? <>
        <Link to='/login'>Login</Link>
          </>
         : (
           <>
           
         <Link to='/createpost'>Create Post</Link>

         <div className='ProfileButton'>
          <ProfileButton ID={ID} setID={setID}/>
         </div>
       
      
         
         </>
         )}
      </nav>
      
      <Routes>
      
        <Route path='/' element={<HomePageProvider><HomePage ID={ID}/></HomePageProvider>} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/login' element={<Login />} />
{
        //Our Login(child component)is being rendered in App(parent comp) right here so gotta pass props right here as well(if u are passing props. but in our case no props needed)
}
      </Routes>
    </Router>
  )
}

export default App;
