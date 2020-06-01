import React from 'react'
import socketIOClient from 'socket.io-client'
import {isFirstTime} from './utils/visitor.js'
import './App.css'

let socket 
class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: [],
      endpoint: 'ws://tiserge2-visit.herokuapp.com'
    }
    socket = socketIOClient(this.state.endpoint)
  }

  componentDidMount = () => {
    this.fetchData();
    if(isFirstTime()) {
      console.log("Send +1 visit to server")
      this.updateVisit()
    } else {
      console.log("Dont send +1 visit to server")
    }

    socket.on('FromAPI', visits => {
      this.setState({ visit: visits})
    })
  }

  updateVisit = () => {
    fetch('/api/addVisit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ 
        websiteId: "5ed2ed637c213e044cc03312"
      })
    })
  }

  fetchData = () => {
    fetch('/api/getVisitList')
    .then(res => res.json())
    .then(list => {
      this.setState({visit: list})
      console.log("showing: ", list)
    })
  }

  render() {
    console.log('showing state ',this.state.visit)
    return (
      <div className="App">
        <h1>Number of visit</h1>
        <h4>
          This is a simple app to show the number of visit from each of my deployed app.
        </h4>
        <p id="footer">
          Coded by <a href="https://github.com/tiserge2" rel="noopener noreferrer" target="_blank">Osson Sergio Suzerain</a>
        </p>
        <div id="container">
          {
            this.state.visit.map((site, index) => {
              let visit = site.visit > 0 ? site.visit : "0"
              return(
                <div id="visit-container" key={index}>
                  <p id="visit-counter">{visit}</p>
                  <a href={site.website} rel="noopener noreferrer" target="_blank" id="website-url">{site.name}</a>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
