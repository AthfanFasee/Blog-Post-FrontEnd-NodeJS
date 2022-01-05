import './LoginButton.css'

function LoginButton({signInWithGoogle}) {
    return (
        <div className="loginPage">
            <p>Sign In With Google To Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default LoginButton
