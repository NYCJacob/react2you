import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';

// import Posts from './components/Posts'
import Categories from './Categories'


class App extends Component {



  render() {
      console.log('Props: ', this.props);

    return (
      <div className="App">
              <div>
                  <h1>Post, listen, react</h1>
                    <Categories/>
              </div>

      </div>
    );
  }
}

export default App