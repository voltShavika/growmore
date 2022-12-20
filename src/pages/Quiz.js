import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import Container from '../components/Container'
import Question from '../components/Question'
import QuizContext from '../Context'
import * as d3 from 'd3';

export default function Quiz() {
    const {currentLevel, setCurrentLevel, question, setQuestion, score, scoreHistory} = useContext(QuizContext);

    const drawChart = () => {
        const h = 300;
        const w = 700;
        const height = 300
        const width = 400;

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const xMinValue = 0;
        const xMaxValue = 10;
        const yMinValue = 0;
        const yMaxValue = 100;

        const svg = d3
            .select('#graph')
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
            .domain([0, yMaxValue]);
        const line = d3
            .line()
            .x(d => xScale(d.questionNumber))
            .y(d => yScale(d.score))    
            .curve(d3.curveMonotoneX);
        svg
            .append('path')
            .datum(scoreHistory)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line') 
            .attr('d', line);
    }
    useEffect(()=>{
        console.log("Hi");
        console.log(scoreHistory);
        drawChart();
    }, [])
    
    useEffect(()=> {
        axios.get(`http://localhost:8000/questions/generate/${currentLevel}`).then(res => {
            setQuestion({...res.data});
        })
    }, [currentLevel])

    return (
    <Container>
        <div className='container'>
            {
                question && 
                <Question data={question}/>
            }
            <div className='row mt-5'>
                <div className='col-md-3'></div>
                <div className='col-md-3'>
                    <div className='card' id="graph">
                        Current Level Graph
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card'>
                        <h1>{score}</h1>
                    </div>
                </div>
                
            </div>
        </div>
    </Container>
    )
}
