import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';

import Categories from './Categories';
import Posts from './Posts';


class App extends Component {

    state = {
        commentApp: this.props.store.getState()
        // commentApp: null
    }

    componentDidMount () {
        const { store } = this.props;

        store.subscribe(() => {
            console.log( store.getState() );
            this.setState(() => ({
                commentApp: store.getState()
            }))
        })

    }

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
      console.log('Props: ', this.props);

    return (
      <div className="App">

          <div>
              <h1>Post, listen, react</h1>
                <Categories/>
          </div>
          <div>
              <Posts/>
          </div>

      </div>
    );
  }
}

export default App