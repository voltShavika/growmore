import axios from 'axios';
import React,{useRef, useState, useEffect} from 'react'
import { useContext } from 'react';
import { API_ADD_QUESTION } from '../api';
import QuizContext from '../Context';

export default function AddQuestion({addQuestionCallback}) {
    const {authToken} = useContext(QuizContext);
    const questionRef = useRef();
    const op1Ref = useRef();
    const op2Ref = useRef();
    const op3Ref = useRef();
    const op4Ref = useRef();
    const levelRef = useRef();
    const typeRef = useRef();
    const answerRef = useRef()

    const handleAddQuestion = () => {
        const question = questionRef.current.value;
        const op1 = op1Ref.current.value;
        const op2 = op2Ref.current.value;
        const op3 = op3Ref.current.value;
        const op4 = op4Ref.current.value;
        const level = levelRef.current.value;
        const questionType = typeRef.current.value;
        const answers = answerRef.current.value.split(",").map((v) => parseInt(v))

        axios.post(API_ADD_QUESTION, {
            question: question,
            level: parseInt(level),
            option1: op1,
            option2: op2,
            option3: op3,
            option4: op4,
            answers: answers,
            questionType: questionType
        }, {
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            addQuestionCallback(res.data)
        })
    }
  return (
    <>
        <div className='row'>
            <div className='col-md-3'>
                <label>Question: </label>
            </div>
            <div className='col-md-9'>
                <input type="text" className='form-control' ref={questionRef} />
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col'>
                <input type="text" className='form-control' placeholder='enter option1' ref={op1Ref} />
            </div>
            <div className='col'>
                <input type="text" className='form-control' placeholder='enter option2' ref={op2Ref}  />
            </div>
            <div className='col'>
                <input type="text" className='form-control' placeholder='enter option3' ref={op3Ref}  />
            </div>
            <div className='col'>
                <input type="text" className='form-control' placeholder='enter option4' ref={op4Ref}  />
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col'>
                <input type="text" className='form-control' placeholder='enter answers' ref={answerRef} />
            </div>
            <div className='col'>
                <select className='form-select' ref={typeRef}>
                    <option value="single">Single</option>
                    <option value="multiple">Multiple</option>
                </select>
            </div>
            <div className='col'>
                <select className='form-select' ref={levelRef}>
                    {
                        Array(10).fill(1).map((_, i) => {
                            return (<option value={i+1} key={i}>{i+1}</option>)
                        })
                    }
                </select>
            </div>
        </div>
        <div className='text-center mt-3'>
            <button className='btn btn-primary' onClick={handleAddQuestion}>Add Question</button>
        </div>
    </>
  )
}
