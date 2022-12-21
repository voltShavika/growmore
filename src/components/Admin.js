import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { API_GENERATE_QUIZ, API_GET_ADMIN_QUIZES, API_GET_QUESTION_BANK } from '../api';
import QuizContext from '../Context';
import AddQuestion from './AddQuestion';
import FormErrors from './FormErrors';
import LoadingButton from './LoadingButton';

export default function Admin() {
    const {loginStatus, authToken} = useContext(QuizContext);
    const [questions, setQuestions] = useState([]);
    const [quizes, setQuizes] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [loading, SetLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(()=> {
        axios.get(API_GET_QUESTION_BANK, {
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            setQuestions([...res.data])
        })
        axios.get(API_GET_ADMIN_QUIZES, {
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            setQuizes([...res.data])
        })
    }, [])

    const handleQuestionCheckbox = (e) => {
        const {value, checked} = e.target;
        if(checked){
            setSelectedQuestions([...selectedQuestions, value])
        }
        else{
            const oldSelections = [...selectedQuestions];
            const index = oldSelections.indexOf(value);
            oldSelections.splice(index, 1);
            setSelectedQuestions(oldSelections);
        }
    }
    const handleGenerateQuiz = () => {
        if(selectedQuestions.length < 10){
            setErrors(["Please select atleast 10 questions"])
        }
        else{
            SetLoading(true);
            axios.post(API_GENERATE_QUIZ,{
                questions: selectedQuestions
            },{
                headers: {
                    "auth-token": authToken
                }
            }).then(res => {
                SetLoading(false);
                setErrors([]);
                setQuizes([...quizes, res.data])
            }).catch(e => {
                SetLoading(false);
                setErrors(["Something went wrong"])
                console.log(e.response);
            })
        }
        
    }

    const addQuestionCallback = (newQuestion) => {
        setQuestions([newQuestion, ...questions]);

    }
  return (
    <div className='container p-3'>
       <div className='row'>
            <div className='col-md-8'>
                <h3>Add a Question</h3>
                <hr/>
                <AddQuestion addQuestionCallback={addQuestionCallback}/>
                <hr/>
                <h3>Questions Bank</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Select</th>
                            <th scope="col">Question</th>
                            <th scope="col">Type</th>
                            <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.map((question, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">
                                            <input type="checkbox" name='questionsBox' value={question._id} onChange={handleQuestionCheckbox}/>
                                        </th>
                                        <td>{question.question}</td>
                                        <td>{question.questionType}</td>
                                        <td>{question.level}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-md-4'>
                <h3>Create a Quiz</h3>
                <hr/>
                <h5>Instructions</h5>
                <ul>
                    <li>You can add your own questions. Added questions will be reflected on the top of table</li>
                    <li>You must select atleast 1 question from every level.</li>
                    <li>After selecting Click on the button below</li>
                    <li>A Quiz will be generated and will be show here</li>
                </ul>
                <FormErrors errors={errors} />
                <div className="text-center">
                    <button className='btn btn-info'>Questions selected: {selectedQuestions.length}</button>
                    <LoadingButton text="Genearate Quiz" loading={loading} handleClick={handleGenerateQuiz} />
                </div>
                <hr/>
                <h3>Generated Quizes</h3>
                {
                    quizes.map((quiz, i) => {
                        return (
                            <Link to={`/quiz/${quiz._id}`} className="btn btn-info ms-2" key={i}>Quiz {i+1}</Link>
                        )
                    })
                }
            </div>
       </div>

    </div>
  )
}
