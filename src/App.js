import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './styles/App.css';
// import bootstrap css en masse for now

import Posts from './components/Posts'
import Categories from './components/Categories'


class App extends Component {
  render() {
    return (
      <div className="App">
          {/* Routes */}
          <Route exact path="/" render={() => (
              <div>
                  <h1>Post, listen, react</h1>
                  {/*show categories*/}
                  <div>
                    <Categories />
                  </div>
                  {/*show posts*/}
                  <div>
                      <Posts />
                  </div>
              </div>

          )}
          />

      </div>
    );
  }
}

export default App;
