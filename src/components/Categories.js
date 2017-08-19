import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Categories extends Component {

    render() {
        return (
            <div id="cat-view">

               <ul id="cat-list">
                   <li>Cat 1</li>
                   <li>Cat 2</li>
                   <li>Cat 3</li>
                   <li>Cat 4</li>
               </ul>

            </div>
        )
    }
}
export default Categories