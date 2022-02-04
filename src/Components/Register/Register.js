import './Register.css';


function Register({setError, error, RegisterUser, setIsRegister, setRegisterPassword, setRegisterEmail, setRegisterUserName}) {

    return (
    <div className="MainContainer">
        <div className="childContainer">
        <h1>Register Here</h1>   
       {error && <h3 className="error">{`!! ${error}`}</h3>}  

        <div className="inputGp">
            <label>Email:</label>
            <input placeholder="Email..." onChange={(event) => setRegisterEmail(event.target.value)} />
        </div>
        <div className="inputGp">
            <label>Username:</label>
            <input placeholder="Name..." onChange={(event) => setRegisterUserName(event.target.value)}/>
        </div>
        <div className="inputGp">
            <label>Password:</label>
            <input placeholder="Password..." onChange={(event) => setRegisterPassword(event.target.value)}/>
        </div>
        <button onClick={RegisterUser}>Submit</button>
        <div className="RegisterContainer">
            <p>Already Registered?</p>
        <button onClick={() => {
            setIsRegister(false)
            setError("")
            }} className="Register">Login Here</button>
        </div>
        </div>
    </div>
    
  )
}

export default Register;
