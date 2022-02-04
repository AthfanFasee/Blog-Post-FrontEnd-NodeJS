import './Register.css';


function Register({setError, error, RegisterUser, setIsRegister, setRegisterPassword, setRegisterEmail, setRegisterUserName}) {\
    
  return (
    <div className="createPostPage">
        <div className="cpContainer">
        <h1>Register</h1>
        {error && <div className="errDiv">
                    <h3>{error}</h3>
                    </div>
        }
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
        <button onClick={() => setIsRegister(false) } className="Register">Login Here</button>
        </div>
        </div>
    </div>
    
  )
}

export default Register;
