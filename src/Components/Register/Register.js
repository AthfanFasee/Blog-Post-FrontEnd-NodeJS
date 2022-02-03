import './Register.css';


function Register({setIsRegister}) {
  return (
    <div className="createPostPage">
        <div className="cpContainer">
        <h1>Register</h1>
        <div className="inputGp">
            <label>Email:</label>
            <input placeholder="Email..." />
        </div>
        <div className="inputGp">
            <label>Username:</label>
            <input placeholder="Name..." />
        </div>
        <div className="inputGp">
            <label>Password:</label>
            <input placeholder="Password..." />
        </div>
        <button disabled>Submit</button>
        <div className="RegisterContainer">
            <p>Already Registered?</p>
        <button onClick={() => setIsRegister(false)} className="Register">Login Here</button>
        </div>
        </div>
    </div>
    
  )
}

export default Register;
