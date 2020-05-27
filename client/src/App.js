import React from 'react';
import logo from './logo.svg';
import './App.css';

class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({list}))
  }

  render() {
    return (
      <div className="App">
        <h1>List of items</h1>
        <ul>
          {
            this.state.list.map((item) => {
              return(
                <li>{item}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
