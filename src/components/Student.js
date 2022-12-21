import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Container from './Container'
import QuizContext from '../Context';
import Spinner from './Spinner';
import { API_GET_ALL_QUIZ_RESULTS, API_GET_STUDENT_QUIZES } from '../api';

export default function Student() {
    const {loginStatus, user, authToken} = useContext(QuizContext);
    const [quizes, setQuizes] = useState([])
    const [results, setResults] = useState([])

    const [quizLoading, setQuizLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);

    useEffect(()=> {
        setQuizLoading(true);
        axios.get(API_GET_STUDENT_QUIZES,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            // console.log(res.data);
            setQuizes([...res.data])
            setQuizLoading(false);
        })
        setResultLoading(true);
        axios.get(API_GET_ALL_QUIZ_RESULTS,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            // console.log(res.data);
           
            setResults([...res.data])
            setResultLoading(false);
        })

  }, [])
  return (
    <div className='container p-3' style={{height: "100vh"}}>
        <h3>Attempt New Quiz</h3>
        <hr/>
        <Spinner loading={quizLoading} />
        {
            quizes.length > 0 &&
            <ul>
                {
                    quizes.map((quiz, i) => {
                        return (
                        <li key={i}>
                            <Link to={"/quiz/"+quiz._id} className="btn btn-info mt-2">Quiz {i+1} - Questions {quiz.questions && quiz.questions.length}</Link>
                        </li>)
                    })
                }
            </ul>
        }
        <hr/>
        <h3>Your Recent Scores</h3>
        <Spinner loading={resultLoading} />
        {
            results.length > 0 &&
            <div className='card p-3'>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Quiz Id</th>
                        <th scope="col">Attempted At</th>
                        <th scope="col">Total Score</th>
                        <th scope="col">History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((result, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td>{result.quiz}</td>
                                        <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                                        <td>{result.totalScore}</td>
                                        <td>
                                            <Link to={"/result/"+result.quiz} className="btn btn-info">Check Performance Graph</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>  
            </div>
            
        }
    </div>
  )
}

