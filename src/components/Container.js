import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import QuizContext from '../Context'

export default function Container({children}) {
    const {loginStatus, logout} = useContext(QuizContext)
    const navigate = useNavigate()
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={require("../images/logo.png")} height="40" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    loginStatus &&
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn" style={{color: "white"}} onClick={()=> logout(navigate)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
        <div style={{backgroundColor: "#eeeeee"}}>
            {children}
        </div>
    </>
  )
}
