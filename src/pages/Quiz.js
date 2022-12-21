import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {useParams, Navigate} from 'react-router-dom'
import { API_GET_QUIZ_QUESTIONS } from '../api';
import Container from '../components/Container'
import Question from '../components/Question'
import QuizContext from '../Context'

export default function Quiz() {
    const {quizId} = useParams();
    const {loginStatus, authToken, currentLevel, setCurrentLevel, levelWiseQuestions, setLevelWiseQuestions, score, scoreHistory} = useContext(QuizContext);
    const [question, setQuestion] = useState(null);

    const convertToLevelWise = (questions) => {
        let levelWiseQuestions = {}
        for(let i=1;i<=10;i++){
            levelWiseQuestions[i] = []
        }
        questions.forEach(element => {
            levelWiseQuestions[element.level] = [...levelWiseQuestions[element.level], element]
        });
        return levelWiseQuestions
    }


    useEffect(()=> {
        axios.get(API_GET_QUIZ_QUESTIONS + quizId,{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            const levelWiseQuestions = convertToLevelWise(res.data.questions);
            setLevelWiseQuestions({...levelWiseQuestions});
            setCurrentLevel(5);
        })
    }, [])

    const getRandomQuestion = (level) => {
        const levelQuestions = levelWiseQuestions[level];
        const randomIndex = Math.floor(Math.random() * levelQuestions.length);
        return levelQuestions[randomIndex];
    }

    useEffect(() => {
        if(currentLevel && currentLevel >=1 && currentLevel <= 10){
            const ques = getRandomQuestion(currentLevel);
            setQuestion(ques);
        }
    }, [currentLevel])

    return (
    <Container>
        {
            !loginStatus && <Navigate to="/" />
        }
        <div className='container p-3'>
            {
                question && 
                <Question question={question}/>
            }
            <div className='text-center mt-5'>
                <h1>{score}</h1>
                <div>
                    {
                        scoreHistory.map((history, i) => {
                            return (
                                history.result
                                ?<button className='btn btn-lg btn-success ms-2' key={i}>{history.questionNumber}</button>
                                :<button className='btn btn-lg btn-danger ms-2' key={i}>{history.questionNumber}</button>
                            )
                        
                        })
                    }
                </div>  
            </div>
        </div>
    </Container>
    )
}
