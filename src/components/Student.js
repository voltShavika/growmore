import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Container from './Container'
import QuizContext from '../Context';
import { API_GET_ALL_QUIZ_RESULTS, API_GET_STUDENT_QUIZES } from '../api';

export default function Student() {
    const {loginStatus, user, authToken} = useContext(QuizContext);
    const [quizes, setQuizes] = useState([])
    const [results, setResults] = useState([])
    useEffect(()=> {
        axios.get(API_GET_STUDENT_QUIZES,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            // console.log(res.data);
            setQuizes([...res.data])
        })

        axios.get(API_GET_ALL_QUIZ_RESULTS,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            // console.log(res.data);
            setResults([...res.data])
        })

  }, [])
  return (
    <div className='container p-3' style={{height: "100vh"}}>
        <h3>Attempt New Quiz</h3>
        <hr/>
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
        <h3>Your Recent Scores</h3>
        {
            quizes.length > 0 &&
            <ul>
                {
                    results.map((result, i) => {
                        return (
                        <li key={i}>
                            <Link to={"/result/"+result.quiz} className="btn btn-info">Result {i+1}</Link>
                        </li>)
                    })
                }
            </ul>
        }
    </div>
  )
}

