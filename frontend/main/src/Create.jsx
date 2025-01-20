import axios from 'axios'
import{useState} from 'react'
import { useUser } from "./UserContext"; 
import { useNavigate } from 'react-router-dom'
import  './styles.css'

function Create(){
        const navigate = useNavigate();
        const { setUser } = useUser(); 

        const[values, setValues] = useState({   
            Username: '',
            Email: '',
            Password: ''
        })
        const[valuesLogin, setValuesLogin] = useState({   
            Username: '',
            Password: ''
        })

        const handleSubmitLogin = (e) => {
            e.preventDefault();
            console.log("Values before sending:",valuesLogin); 
        
            axios.post('http://localhost:8081/mysql/login', valuesLogin)
                .then(res => {
                    console.log("Response:", res);
                    console.log("Username:", valuesLogin.Username);
                    if (res.data.message) 
                    {
                        alert(res.data.message); 
                    }
                    else{
                        setUser(valuesLogin.Username);
                        navigate('/home');
                    }
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                });
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Values before sending:",values); 
        
            axios.post('http://localhost:8081/mysql', values)
                .then(res => {
                    console.log("Response:", res);
                    console.log("Username:", values.Username);
                    setUser(values.Username);

                    navigate('/home');
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                });
        }
    return(
        <div className="body_dup">
            <div className="container">
                <div className="signin-signup">
                    <form action="" className="sign-in-form" onSubmit={handleSubmitLogin}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" required  onChange={e=>setValuesLogin({...valuesLogin, Username: e.target.value})}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required onChange={e=>setValuesLogin({...valuesLogin, Password: e.target.value})}/>
                        </div>
                        <input type="submit" value="Login" className="btn" />
                        <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p className="account-text">Dont have an account? <a href="#" id="sign-up-btn2" onClick={()=>{const container = document.querySelector(".container"); 
                            container.classList.add("sign-up-mode2");}}>Sign up</a></p>
                    </form>
                    <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder='Username' required onChange={e=>setValues({...values, Username: e.target.value})}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder ='Email' required onChange={e=>setValues({...values, Email: e.target.value})}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder='Password' required onChange={e=>setValues({...values, Password: e.target.value})}/>
                        </div>
                        <input type="submit" value="Sign up" className="btn" />
                        <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p className="account-text">Already have an account? <a href="#" id="sign-in-btn2"  onClick={`
                            const container = document.querySelector(".container"); 
                            container.classList.remove("sign-up-mode2");`}>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Member of Brand?</h3>
                            <p></p>
                            <button className="btn" id="sign-in-btn"  onClick={()=>{
                            const container = document.querySelector(".container"); 
                            container.classList.remove("sign-up-mode");}}>Sign in</button>
                        </div>
                        <img src="signin.svg" alt="" className="image" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>New to Brand?</h3>
                            <p></p>
                            <button className="btn" id="sign-up-btn"  onClick={()=>{
                            const container = document.querySelector(".container"); 
                            container.classList.add("sign-up-mode");}}>Sign up</button>
                        </div>
                        <img src="signup.svg" alt="" className="image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create