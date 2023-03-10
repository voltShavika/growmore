import React, { useContext, useEffect, useRef, useState } from 'react'
import QuizContext from '../Context';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { API_POST_QUIZ_RESULT } from '../api';

export default function Question({question}) {

    const {quizId} = useParams();
    const {authToken, currentLevel, setCurrentLevel, questionNumber, setQuestionNumber, score, setScore, scoreHistory, setScoreHistory, levelWiseQuestions} = useContext(QuizContext);

    const [op1Check, setOp1Check] = useState(false);
    const [op2Check, setOp2Check] = useState(false);
    const [op3Check, setOp3Check] = useState(false);
    const [op4Check, setOp4Check] = useState(false);

    const navigate = useNavigate();

    const handleOptionChange = (e, option) => {
    
        if(question.questionType === 'single'){
            switch(option){
                case "1":
                    setOp1Check(!op1Check);
                    setOp2Check(false);
                    setOp3Check(false);
                    setOp4Check(false);
                    break;
                case "2":
                    setOp1Check(false);
                    setOp2Check(!op2Check);
                    setOp3Check(false);
                    setOp4Check(false);
                    break;
                case "3":
                    setOp1Check(false);
                    setOp2Check(false);
                    setOp3Check(!op3Check);
                    setOp4Check(false);
                    break;
                case "4":
                    setOp1Check(false);
                    setOp2Check(false);
                    setOp3Check(false);
                    setOp4Check(!op4Check);
                    break;
                default:
                    break;
            }
        }
        else{
            switch(option){
                case "1":
                    setOp1Check(!op1Check);
                    break;
                case "2":
                    setOp2Check(!op2Check);
                    break;
                case "3":
                    setOp3Check(!op3Check);
                    break;
                case "4":
                    setOp4Check(!op4Check);
                    break;
                default:
                    break;
            }
        }
    }

    const checkAnswer = (submitted, original) => {
        if(submitted.length == original.length){
            for(let i=0;i<submitted.length;i++){
                if(submitted[i] != original[i]){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        let answers = [];
        if(op1Check){
            answers.push(1);
        }
        if(op2Check){
            answers.push(2);
        }
        if(op3Check){
            answers.push(3);
        }
        if(op4Check){
            answers.push(4);
        }
        const result = checkAnswer(answers, question.answers);
        let newScore = score;
        if(result){
            setCurrentLevel(currentLevel + 1);
            newScore = newScore + 5;
        }
        else{
            setCurrentLevel(currentLevel - 1);
            newScore = newScore - 2;
        }
        setScore(newScore)
        setScoreHistory([...scoreHistory, {questionNumber: questionNumber, score: score, result: result}])
        // Quiz End Logic
        if(questionNumber == 10 || (currentLevel == 1 && result == false) || (currentLevel == 10 && result == true)){
            axios.post(API_POST_QUIZ_RESULT+quizId, {
                performance: [...scoreHistory, {questionNumber: questionNumber, score: score, result: result}],
                totalScore: newScore
            },{
                headers: {
                    "auth-token": authToken
                }
            }).then(res => {
                console.log(res.data);
                navigate("/result/"+quizId);
            })
            
        }
        else{
            setQuestionNumber(questionNumber + 1);
            setOp1Check(false);
            setOp2Check(false);
            setOp3Check(false);
            setOp4Check(false);
        }
        
    }

    return (
        <> 
            <div className='mt-5'>
                <div className='text-center'>
                    <h2>Q{questionNumber}: {question.question}</h2>
                    <h5><span className='badge bg-primary'>{question.questionType}</span> <span className='badge bg-danger ms-2'>Level {currentLevel}</span></h5>
                    
                </div>
                
                <div className='row mt-5'>
                    <div className='col-md-6 mb-3'>
                        <div className='card p-3'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="1" checked={op1Check} onChange={(e) => handleOptionChange(e, "1")} />
                                <label className="form-check-label">{question.option1}</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3'>
                        <div className='card p-3'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="2"  checked={op2Check} onChange={(e) => handleOptionChange(e, "2")} />
                                <label className="form-check-label">{question.option2}</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3'>
                        <div className='card p-3'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="3"  checked={op3Check} onChange={(e) => handleOptionChange(e, "3")} />
                                <label className="form-check-label">{question.option3}</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3'>
                        <div className='card p-3'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="4"  checked={op4Check} onChange={(e) => handleOptionChange(e, "4")} />
                                <label className="form-check-label">{question.option4}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-5'>
                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}
