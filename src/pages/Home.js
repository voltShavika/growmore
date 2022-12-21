import React, { useState, useRef, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import Container from '../components/Container'
import { API_LOGIN, API_SIGNUP } from '../api'
import axios from 'axios';
import QuizContext from '../Context';
import FormErrors from '../components/FormErrors';
import LoadingButton from '../components/LoadingButton';

export default function Home() {
    const {login} = useContext(QuizContext);
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const [loginErrors, setLoginErrors] = useState([]);
    const [loginLoading, setLoginLoading] = useState(false);


    const signupNameRef = useRef();
    const signupPasswordRef = useRef();
    const signupEmailRef = useRef();
    const signupTypeRef = useRef();
    const [signupErrors, setSignupErrors] = useState([]);
    const [signupLoading, setSignupLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        setLoginLoading(true);
        axios.post(API_LOGIN, {
            email: loginEmailRef.current.value,
            password: loginPasswordRef.current.value
        }).then(res => {
            setLoginLoading(false);
            setLoginErrors([]);
            login(res.data.token, res.data.user, navigate)

        }).catch(e => {
            console.log(e);
            setLoginLoading(false);
            setLoginErrors([...e.response.data.errors]);
        })
    }

    const handleSignup = () => {
        setSignupLoading(true);
        axios.post(API_SIGNUP, {
            name: signupNameRef.current.value,
            email: signupEmailRef.current.value,
            userType: signupTypeRef.current.value,
            password: signupPasswordRef.current.value

        }).then(res => {
            console.log(res);
            setSignupLoading(false);
            setSignupErrors([]);
            login(res.data.token, res.data.user, navigate)

        }).catch(e => {
            setSignupLoading(false);
            setSignupErrors([...e.response.data.errors]);
        })

    }

  return (
    <Container>
        <div className='container p-3'>
            <div className='row'>
                <div className='col'>
                    <div className='card p-5'>
                        <FormErrors errors={loginErrors} />
                        <div className='row'>
                            <div className='col-md-3'>
                                <label>Email</label>
                            </div>
                            <div className='col-md-9'>
                                <input type="email" className="form-control" ref={loginEmailRef} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-3'>
                                <label>Password</label>
                            </div>
                            <div className='col-md-9'>
                                <input type="password" className="form-control" ref={loginPasswordRef} />
                            </div>
                        </div>
                        <LoadingButton text="Login" loading={loginLoading} handleClick={handleLogin} />
                        
                    </div>
                    <div className='text-center'>
                        <hr/>
                    </div>
                    <div className='card p-5 mt-3'>
                        <FormErrors errors={signupErrors} />
            
                        <div className='row'>
                            <div className='col-md-3'>
                                <label>Name</label>
                            </div>
                            <div className='col-md-9'>
                                <input type="text" className="form-control" ref={signupNameRef} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-3'>
                                <label>Email</label>
                            </div>
                            <div className='col-md-9'>
                                <input type="email" className="form-control" ref={signupEmailRef} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-3'>
                                <label>User Type</label>
                            </div>
                            <div className='col-md-9'>
                                <select className='form-select' ref={signupTypeRef}>
                                    <option value="Admin">Admin</option>
                                    <option value="Student">Student</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-3'>
                                <label>Password</label>
                            </div>
                            <div className='col-md-9'>
                                <input type="password" className="form-control" ref={signupPasswordRef} />
                            </div>
                        </div>
                        <LoadingButton text="Signup" loading={signupLoading} handleClick={handleSignup} />
                    </div>
                </div>
                <div className='col'>
                    <div className='text-center'>
                        <img src={require("../images/logo.png")} height="120"/>
                        <br/><br/>
                        <img className='img-fluid' src={require("../images/test.png")}/>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}
