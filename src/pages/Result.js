import React, { useContext, useEffect } from 'react'
import Container from '../components/Container'
import * as d3 from 'd3';
import QuizContext from '../Context';

export default function Result() {
    const {scoreHistory} = useContext(QuizContext);
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
            .domain([0, yMaxValue]);
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
  return (
    <Container>
        <div className='container'>
            <div id='graph2'></div>
        </div>
    </Container>
  )
}
