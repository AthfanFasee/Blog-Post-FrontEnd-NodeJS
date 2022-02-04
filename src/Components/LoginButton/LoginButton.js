import './LoginButton.css'

function LoginButton({error, setIsRegister, setLoginEmail, setLoginPassword, LoginUser}) {

    
    return (
        <div className="createPostPage">
        <div className="cpContainer">
        <h1>Login with your Email</h1>
        {error && <div className="errDiv">
                    <h3>{error}</h3>
                    </div>
        }
        
        <div className="inputGp">
            <label>Email:</label>
            <input placeholder="Email..." onChange={(event) => setLoginEmail(event.target.value)}/>
        </div>
        <div className="inputGp">
            <label>Password:</label>
            <input placeholder="Password..." onChange={(event) => setLoginPassword(event.target.value)}/>
        </div>
        <button onClick={LoginUser} >Login</button>
        <div className="RegisterContainer">
            <p>Don't have an account?</p>
        <button onClick={() => setIsRegister(true)} className="Register">Register Here</button>
        </div>
        </div>
    </div>
    
    )
}

export default LoginButton
