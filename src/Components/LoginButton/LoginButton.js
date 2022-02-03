import './LoginButton.css'

function LoginButton({setIsRegister}) {

    
    return (
        <div className="createPostPage">
        <div className="cpContainer">
        <h1>Login with your Email</h1>
        <div className="inputGp">
            <label>Email:</label>
            <input placeholder="Email..." />
        </div>
        <div className="inputGp">
            <label>Password:</label>
            <input placeholder="Password..." />
        </div>
        <button disabled>Login</button>
        <div className="RegisterContainer">
            <p>Don't have an account?</p>
        <button onClick={() => setIsRegister(true)} className="Register">Register Here</button>
        </div>
        </div>
    </div>
    
    )
}

export default LoginButton
