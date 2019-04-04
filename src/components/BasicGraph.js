import React, { Component } from 'react';
import * as d3 from 'd3';

class BasicGraph extends Component {

    state = {
        width: 0,
        height: 0
    }

    render() {
        return (
           <div className="graph-container" id="basic-chart" style={{ width: '50vw', height: '50vh' }}>

           </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart').clientWidth;
        const height = document.getElementById('basic-chart').clientHeight;
        this.setState({width: width, height: height}, this.initGraph)
    }

    componentWillReceiveProps(nextProps){

        //  Delete exceding elemnts
        this.state.mainGroup.selectAll('.mycircle').data(nextProps.data).exit().remove();

        //  Add new elements
        this.state.mainGroup.selectAll('.mycircle').data(nextProps.data).enter()
        .append('circle')
            .attr('class', 'mycircle')
            .attr('cx', (d, i) => (i + 1) * this.relativeWidth(100) / (nextProps.data.length + 1))
            .attr('cy', 0)
            .attr('r', d => 3 + d / 20)
            .attr('fill', 'white');

        //  Move elements to their new position
        this.state.mainGroup.selectAll('.mycircle').transition().duration(200)
            .attr('cx', (d, i) => (i + 1) * this.relativeWidth(100) / (nextProps.data.length + 1))
            .attr('r', d => 3 + d / 20);

    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select('#basic-chart')
            .append('svg')
            //  The viewbox will try to fill all the space given but preserving the ratio.
            //  h = div height, w = div width
            //  if h > w viewbox = 0 0 100 100*h/w
            //  if w > h viewbox = 0 0 100*w/h 100
            .attr('viewBox', () =>{
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(50) + ')');

        //  Init the circles
        mainGroup.selectAll('.mycircle')
        .data(this.props.data).enter()
        .append('circle')
            .attr('class', 'mycircle')
            .attr('cx', (d, i) => (i + 1) * this.relativeWidth(100) / (this.props.data.length + 1))
            .attr('cy', 0)
            .attr('r', d => 3 + d / 20)
            .attr('fill', 'white');
        
        this.setState({mainGroup: mainGroup})
    }

    //  Takes a % ang returns the right height
    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }

    //  Takes a % ang returns the right width
    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }

}

export default BasicGraph;