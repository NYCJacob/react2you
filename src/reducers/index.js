import { combineReducers } from 'redux'

import {
    ALL_POSTS,
} from '../actions'
import {ADD_CATEGORY, ALL_CATEGORIES} from "../actions/index";


// this is taken from server posts file

const samplePosts = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false
    }
};

const sampleCats = [
        {
            name: 'react',
            path: 'react'
        },
        {
            name: 'redux',
            path: 'redux'
        },
        {
            name: 'udacity',
            path: 'udacity'
        }
    ]


const initialState = {samplePosts, sampleCats};

function commentApp (state = initialState, action) {

    switch (action.type) {
        case ALL_POSTS :
            return state;

        case ALL_CATEGORIES :
            return state;

        case ADD_CATEGORY :
            const { name, pathName } = action.newCategory;
            console.log( name, pathName);
            return Object.assign({}, state, {
                sampleCats: [
                    ...state.sampleCats,
                    {name : name, path : pathName}
            ]} )

        default :
            return state;
    }
}



export default combineReducers({
    commentApp,
})