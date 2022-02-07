import './LoginComponent.css'

function LoginButton({setError, error, setIsRegister, setLoginEmail, setLoginPassword, LoginUser}) {
 
    return (
        <div className="MainContainer">
        <div className="childContainer">
        <h1>Login with your Email</h1>
        {error && <h3 className="error">{`!! ${error}`}</h3>}
        
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
        <button onClick={() => {
            setIsRegister(true)
            setError("")
            }} className="Register">Register Here</button>
        </div>
        </div>
    </div>
    
    )
}

export default LoginButton
