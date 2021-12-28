function LoginButton({signInWithGoogle}) {
    return (
        <div className="loginPage">
            <p>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default LoginButton
