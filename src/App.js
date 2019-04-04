import React, { Component } from 'react';
import './scss/App.scss';
import BasicGraph from './components/BasicGraph';

class App extends Component {

  state = {
    data: [50],
  }

  render() {
    return (
      <div className="App">
        <div className="graphs-container">
          <BasicGraph data={this.state.data}></BasicGraph>
          <div className="buttons">
            <div className="button" onClick={this.updateData}>Update</div>
            <div className="button" onClick={this.addData}>Add</div>
            <div className="button" onClick={this.removeData}>Remove</div>
          </div>
        </div>
      </div>
    );
  }

  updateData = () => {
    const newData = this.state.data;
    newData.forEach((d, i) => newData[i] = Math.round(Math.random() * 100));
    console.log('new', newData)
    this.setState({data: newData});
  }

  addData = () => {
    const newData = this.state.data;
    newData.push(Math.round(Math.random() * 100))
    this.setState({data: newData});
  }

  removeData = () => {
    const newData = this.state.data;
    newData.pop();
    this.setState({data: newData});
  }
}

export default App;
