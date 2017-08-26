import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Categories extends Component {
    state = {
        categories: null
    }

    submitCategory = () => {
        this.props.store.dispatch(addCategory({
            name: this.input.value,
            pathName : this.input.value,
        }))

        this.input.value = ''
    }

    componentDidMount () {
        const { store } = this.props

        store.subscribe(() => {
               this.setState( () => {
                   categories: store.getState()
               })
            })
    }

    render() {
        return (
            <div id="cat-view">
                <div>
                   <ul id="cat-list">
                       <li>Cat 1</li>
                       <li>Cat 2</li>
                       <li>Cat 3</li>
                       <li>Cat 4</li>
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
export default Categories