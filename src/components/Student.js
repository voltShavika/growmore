import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Container from './Container'
import QuizContext from '../Context';
import { API_GET_STUDENT_QUIZES } from '../api';

export default function Student() {
    const {loginStatus, user, authToken} = useContext(QuizContext);
    const [quizes, setQuizes] = useState([])
    useEffect(()=> {
        axios.get(API_GET_STUDENT_QUIZES,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            console.log(res.data);
            setQuizes([...res.data])
        })

  }, [])
  return (
    <div className='container'>
        <h3>My Attempts</h3>
        {
            quizes.length > 0 &&
            <ul>
                {
                    quizes.map((quiz, i) => {
                        return (
                        <li key={i}>
                            <Link to={"/quiz/"+quiz._id} className="btn btn-info">Quiz {i+1} - Questions {quiz.questions && quiz.questions.length}</Link>
                        </li>)
                    })
                }
            </ul>
        }
    </div>
  )
}
