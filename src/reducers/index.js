import { combineReducers } from 'redux'

// redux-form imports
import { reducer as formReducer } from 'redux-form'


import {
    ALL_POSTS,
    RECEIVE_POSTS,
    RECEIVE_CATEGORIES,
    RECEIVE_COMMENTS,
    GET_POST_DETAILS,
    CLOSE_POST,
    EDIT_POST,
    CANCEL_EDIT,
    UPDATED_POST,
    NEW_POST,
    DELETE_POST
} from '../actions'
import {ADD_CATEGORY,  SORT_VOTES} from "../actions/index";


function categoryReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES :
            console.log(action.categories.categories)
            let catArray = action.categories.categories.slice(0);
            console.log(catArray)
            return Object.assign({}, state,  action.categories.categories )

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

function postReducer( state = {
    openPost : false,
    editing : false,
    newPostForm : false,
    openTarget : null,
    items : []
    },
                      action) {

    switch (action.type) {
        case ALL_POSTS :
            return state;
        case RECEIVE_POSTS :
            //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            action.posts.sort(function(a, b) {
                return b.voteScore - a.voteScore;
            });
            return Object.assign({}, state,  { openPost : false, items : action.posts } );

        case GET_POST_DETAILS :
            return Object.assign({}, state,  { openPost : true , openTarget : action.openTarget} );

        //    close post also resets openTarget to prevent populating newPost form with data
        case CLOSE_POST :
            return Object.assign({}, state,  { openPost : false, openTarget : null } );

        case NEW_POST :
            return Object.assign({}, state, {newPostForm: true });

        case EDIT_POST :
            return Object.assign({}, state,  { editing : true } );

        case UPDATED_POST :
            console.log(action);
            return Object.assign({}, state, { items: [ action.updatedPost]} );

        case DELETE_POST :
            console.log(action);
            let priorPosts = state.items;
            let newPostsState = priorPosts.filter( post => post.id !== action.deletePostId);
            return Object.assign({}, state, { openTarget : null, items: newPostsState} );

        case CANCEL_EDIT :
            return Object.assign({}, state,  { editing : false, newPostForm : false } );


        case SORT_VOTES :
            console.log(state)
            let willSortPosts = Object.assign({}, state);
            console.log(willSortPosts);
            return state;

        default :
            return state;
    }
}

function commentsReducer( state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            console.log('commentReducer RECEIVE:  ',  action.comments );
            let commentKey = action.parentId +  '-comments';
            return Object.assign({}, state,  { [commentKey] : action.comments} );
        default :
            return state;
    }
}


const rootReducer = combineReducers({ categories: categoryReducer, posts: postReducer, comments: commentsReducer, form: formReducer });
// export default combineReducers({ categoryReducer, postReducer });

export default rootReducer

