import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import QuizContext from '../Context';
import AddQuestion from './AddQuestion';

export default function Admin() {
    const {loginStatus, authToken} = useContext(QuizContext);
    const [questions, setQuestions] = useState([]);
    const [quizes, setQuizes] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    useEffect(()=> {
        axios.get('http://localhost:8000/questions/', {
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            setQuestions([...res.data])
        })
        axios.get('http://localhost:8000/quiz/', {
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
        axios.post('http://localhost:8000/quiz/generate',{
            questions: selectedQuestions
        },{
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            setQuizes([...quizes, res.data])
        })
    }

    const addQuestionCallback = (newQuestion) => {
        setQuestions([newQuestion, ...questions]);

    }
  return (
    <div className='container'>
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
                <div className="text-center">
                    <button className='btn btn-info'>Questions selected: {selectedQuestions.length}</button>
                    <button className='btn btn-warning ms-2' onClick={handleGenerateQuiz}>Generate Quiz</button>
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
