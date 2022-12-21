import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import * as d3 from 'd3';
import QuizContext from '../Context';
import axios from 'axios';
import {useParams, Navigate} from 'react-router-dom'
import { API_GET_QUIZ_QUESTIONS, API_GET_QUIZ_RESULT } from '../api';

export default function Result() {
    const {quizId} = useParams();
    const {scoreHistory, authToken, loginStatus} = useContext(QuizContext);

    const [quizResult, setQuizResult] = useState(null)
    const drawChart = (performance) => {
        const height = 300
        const width = 500;

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const xMinValue = 0;
        const xMaxValue = 10;
        const yMinValue = Math.min(...performance.map(item => item.score));
        const yMaxValue = Math.max(...performance.map(item => item.score));

        const svg = d3
            .select('#graph2')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([yMinValue, yMaxValue]);
        const line = d3
            .line()
            .x(d => xScale(d.questionNumber))
            .y(d => yScale(d.score))    
            .curve(d3.curveMonotoneX);

        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(
            d3.axisBottom(xScale)
                .tickSize(-height)
                .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale)
                .tickSize(-width)
                .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom().scale(xScale).tickSize(15));
        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
        svg
            .append('path')
            .datum(performance)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line') 
            .attr('d', line);
    }

    useEffect(()=>{
        axios.get(API_GET_QUIZ_RESULT+quizId, {
            headers: {
                "auth-token": authToken
            }
        }).then(res => {
            console.log(res.data);
            setQuizResult(res.data)
            drawChart(res.data.performance);
        })
    }, [])
  return (
    <Container>
        {
            !loginStatus && <Navigate to="/" />
        }
        <div className='container p-5' style={{height: "100vh"}}>
            <h3>Your performance on Quiz</h3>
            <hr/>
            <div className='row'>
                <div className='col'>
                    <p>Total Score:</p>
                    <h2>{quizResult && quizResult.totalScore}</h2>
                    <p>Questions attempted:</p>
                    <h4>{quizResult && quizResult.performance.length}</h4>
                    <p>Results Streak:</p>
                    {
                        quizResult && quizResult.performance.map((history, i) => {
                            return (
                                history.result
                                ?<button className='btn btn-lg btn-success ms-2' key={i}>{history.questionNumber}</button>
                                :<button className='btn btn-lg btn-danger ms-2' key={i}>{history.questionNumber}</button>
                            )
                        })
                    }
                </div>
                <div className='col'>
                    <div id='graph2'></div>
                </div>
            </div>
        </div>
    </Container>
  )
}
