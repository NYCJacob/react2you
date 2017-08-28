import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addCategory} from "../actions/index"


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Categories extends Component {
    // generate random integer for key index where no unique value available
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt = (min = 1, max = 999999) =>  {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    submitCategory = () => {

        this.props.dispatch(addCategory({
            name: this.input.value,
            pathName : this.input.value,
        }))
        this.input.value = ''
    };

    render() {
        return (
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
        )
    }
}

// mapStateToProps must return a plain object
function mapStateToProps({ categoryReducer, postReducer }) {
    console.log(categoryReducer)
    let catArray =  () => {
        let cats = [];
        for (let cat in categoryReducer) {
            console.log(cat);
            cats.push(cat.name);
        }
        return cats;
    }
    console.log(catArray());
    return {
        categories : catArray()
    };
}

export default connect(mapStateToProps)(Categories);
