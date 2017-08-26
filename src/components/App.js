import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import {addCategory} from "../actions/index";

// import Posts from './components/Posts'
// import Categories from './components/Categories'


class App extends Component {
     // generate random integer for key index where no unique value available
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     getRandomInt = (min = 1, max = 999999) =>  {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


  render() {
      console.log('Props: ', this.props);

    return (
      <div className="App">
              <div>
                  <h1>Post, listen, react</h1>
                  show categories
                      <div id="cat-view">
                          <div>
                              <ul id="cat-list">
                                                {/*TODO: using forEach did not work, because does not return array??*/}
                                  {
                                      this.props.categories.map( (category) => (
                                          <li key= {this.getRandomInt()}>
                                              { category }
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
                  show posts
                  <div>

                  </div>
              </div>

          <p>Hello World</p>

      </div>
    );
  }
}

// mapStateToProps must return a plain object
function mapStateToProps(commentApp) {
    let catArray =  () => {
        let cats = [];
        commentApp.sampleCats.forEach((cat) => { cats.push(cat.name) } )
        return cats;
    }

    return {
        categories : catArray()
    };
}

export default connect(mapStateToProps)(App);
