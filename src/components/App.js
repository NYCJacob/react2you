import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import {addCategory} from "../actions/index";

// import Posts from './components/Posts'
// import Categories from './components/Categories'


class App extends Component {

    state = {
        commentApp: this.props.store.getState().commentApp
    }

    // componentDidMount () {
    //     const { store } = this.props;
    //
    //     this.setState( () => {
    //         store.getState().commentApp
    //     })
    //
    // }

     // generate random integer for key index where no unique value available
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     getRandomInt = (min = 1, max = 999999) =>  {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    submitCategory = () => {
        this.props.store.dispatch(addCategory({
            name: this.input.value,
            pathName : this.input.value,
        }))

        this.input.value = ''
    }

  render() {

    return (
      <div className="App">
          {/* Routes */}
          <Route exact path="/" render={() => (
              <div>
                  <h1>Post, listen, react</h1>
                  {/*show categories*/}
                      <div id="cat-view">
                          <div>
                              {/*{ console.log (this.state.commentApp.sampleCats)}*/}
                              <ul id="cat-list">
                                  {
                                      this.state.commentApp.sampleCats.map( (categoryObj) => (
                                          <li key= {this.getRandomInt()}>
                                              { categoryObj.name }
                                          </li>
                                      ) )
                                  }
                              </ul>
                          </div>
                          <div>
                              <input
                                  type="'text"
                                  ref={(input) => this.input = input}
                                  placeholder="enter new category"
                              />
                              <button onClick={this.submitCategory}>Submit</button>
                          </div>
                      </div>
                  {/*show posts*/}
                  <div>

                  </div>
              </div>

          )}
          />

      </div>
    );
  }
}

export default App;
