import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import * as d3 from 'd3'

const Diagram = () => {
  const { savedResults } = useContext(QuizContext)
  const [svgWidth, setSvgWidth] = useState(300)

  useEffect(() => {
    window.addEventListener('resize', setChartSize)
    setChartSize()
    return () => {
      window.removeEventListener('resize', setChartSize)
    }
  }, [])

  useEffect(() => {
    createChart()
  }, [svgWidth])

  const setChartSize = () => {
    if (window.innerWidth < 600) {
      setSvgWidth(300)
    } else if (window.innerWidth < 800) {
      setSvgWidth(500)
    } else {
      setSvgWidth(700)
    }
  }

  const createChart = () => {
    d3.selectAll('svg').remove()
    const svgHeight = 300
    const padding = 40

    const innerWidth = svgWidth - 2 * padding
    const innerHeight = svgHeight - 2 * padding

    const rectWidth = innerWidth / savedResults.length

    const xScale = d3
      .scaleLinear()
      .domain([0, savedResults.length])
      .range([padding, svgWidth - padding])

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([innerHeight + padding, padding])

    const svg = d3
      .select('.diagram') //create svg
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    svg
      .selectAll('rect') //create bars
      .data(savedResults)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * rectWidth + padding)
      .attr('y', (d, i) => svgHeight - (d.result * innerHeight) / 100 - padding)
      .attr('width', rectWidth)
      .attr('height', (d, i) => (d.result * innerHeight) / 100)
      .attr('fill', d => (d.result < 50 ? '#880808' : '#186A3B'))
      .attr('class', 'bar')
      .append('title')
      .text(
        d =>
          `Category: ${d.category} \n Difficulty: ${d.difficulty} \n Result: ${d.result}%`
      )

    svg
      .selectAll('text') //create lables
      .data(savedResults)
      .enter()
      .append('text')
      .style("font-size", `${rectWidth < 60 ? "8px" : "12px"}`)
      .attr('x', (d, i) => i * rectWidth + padding + rectWidth / 3)
      .attr(
        'y',
        (d, i) => svgHeight - (d.result * innerHeight) / 100 - padding - 5
      )
      .text(d => d.result + '%')


    const xAxis = d3.axisBottom(xScale)
    xAxis.ticks(savedResults.length)
    svg
      .append('g')
      .attr('transform', `translate(0,${svgHeight - padding})`)
      .call(xAxis)
    svg
      .append('text') // text label for the x axis
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight - 2)
      .style('text-anchor', 'middle')
      .text('Number of quizes')

    const yAxis = d3.axisLeft(yScale)
    svg.append('g').attr('transform', `translate(${padding},0)`).call(yAxis)
    svg
      .append('text') // text label for the y axis
      .attr('x', 3)
      .attr('y', padding / 2)
      .text('Result(%)')
  }

  return <div className='diagram'></div>
}

export default Diagram
