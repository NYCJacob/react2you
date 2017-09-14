import { combineReducers } from 'redux'

// redux-form imports
import { reducer as formReducer } from 'redux-form'

import {
    ADD_CATEGORY,
    ALL_POSTS,
    RECEIVE_POSTS,
    RECEIVE_CATEGORIES,
    RECEIVE_COMMENTS,
    CLOSE_POST,
    EDIT_POST,
    CANCEL_EDIT,
    UPDATED_POST,
    NEW_POST,
    DELETE_POST,
    POST_VOTE,
    SET_SORTKEY,
    CREATE_POST,
    CLEAR_TARGET,
    SET_TARGET,
    NEW_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    CLOSE_COMMENT_FORM
} from '../actions'


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
    target : {
        title: '',
        author: '',
        category: '',
        voteScore: '',
        deleted: false,
        body: '',
        id: '',
        timestamp: null
    },
    openPost : false,
    commentForm : false,
    editing : false,
    newPostForm : false,
    sortKey : 1,    // 1 is default voteScore, 2 is by category, negative reverses sort
    items : [],
    postView : -1      //postView -1=all posts
    }, action) {

    switch (action.type) {
        case ALL_POSTS :
            return state;


        case RECEIVE_POSTS :
            // sort logic
                let sortingPosts = action.posts.filter((post) => post.deleted !== true);
                switch (state.sortKey) {
                    // by vote descending
                    case 1:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                        function compareVoteAscending(a,b) {
                            if (a.voteScore < b.voteScore)
                                return 1;
                            if (a.voteScore > b.voteScore)
                                return -1;
                            return 0;
                        }
                        sortingPosts.sort(compareVoteAscending);
                        break;
                    // by vote ascending
                    case -1:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                        function compareVoteDescending(a,b) {
                            if (b.voteScore < a.voteScore)
                                return 1;
                            if (b.voteScore > a.voteScore)
                                return -1;
                            return 0;
                        }
                        sortingPosts.sort(compareVoteDescending);
                        break;
                    // by category
                    case 2:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                        function compareCategoryAscending(a,b) {
                            if (a.category < b.category)
                                return 1;
                            if (a.category > b.category)
                                return -1;
                            return 0;
                        }
                        sortingPosts.sort(compareCategoryAscending);
                        break;
                    // by vote ascending
                    case -2:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                        function compareCategoryDescending(a,b) {
                            if (b.category < a.category)
                                return 1;
                            if (b.category > a.category)
                                return -1;
                            return 0;
                        }
                        sortingPosts.sort(compareCategoryDescending);
                        break;

                    default :
                        return 0;

                }
                // end switch
            return Object.assign({}, state,  { openPost : false, items : sortingPosts, newPostForm : false } );

        case SET_SORTKEY :
            return {...state, sortKey : action.key };

        // case GET_POST_DETAILS :
        //     return Object.assign({}, state,  { openPost : true , target : action.target} );
        //
        case SET_TARGET:
            return Object.assign({}, state,  { openPost : true , target : action.target} );

        //    close post also resets openTarget to prevent populating newPost form with data
        case CLOSE_POST :
            return Object.assign({}, state,  { openPost : false } );

        case NEW_POST :
            return Object.assign({}, state, {newPostForm: true });

        case CREATE_POST :
            return Object.assign({}, state,
                {newPostForm: true },
                {
                    target : {
                        title: '',
                        author: '',
                        category: '',
                        voteScore: '',
                        deleted: false,
                        body: '',
                        id: '',
                        timestamp: null
                    }
                }
            );


        case EDIT_POST :
            return Object.assign({}, state,  { editing : true, target: action.postData } );

        case UPDATED_POST :
            console.log(action);
            return Object.assign({}, state, { items: [ action.updatedPost]} );

        case CLEAR_TARGET :
            return {
                ...state,
                target: {
                    title: '',
                    author: '',
                    category: '',
                    voteScore: '',
                    deleted: false,
                    body: '',
                    id: '',
                    timestamp: null
                }
            }

        case DELETE_POST :
            console.log(action);
            let priorPosts = state.items;
            let newPostsState = priorPosts.filter( post => post.id !== action.deletePostId);
            return Object.assign({}, state, { openTarget : null, items: newPostsState} );

        case CANCEL_EDIT :
            return Object.assign({}, state,  { editing : false, newPostForm : false } );


        case POST_VOTE :
            // let votedPost =  state.items.find( post => post.id === action.postId);
            let currStateItems = state.items;
            console.log( currStateItems);
            let indexVoted = currStateItems.findIndex( (item) => item.id === action.postId);
            console.log(indexVoted);
            currStateItems[indexVoted].voteScore += action.vote;
            return Object.assign({}, state, {items: currStateItems}  );
            // return state;

        case NEW_COMMENT :
            return {...state, commentForm: true };

        case CLOSE_COMMENT_FORM :
            return {...state, commentForm: false};

        default :
            return state;
    }
}

// let newPostsState = priorPosts.filter( post => post.id !== action.deletePostId);
// return Object.assign({}, state, { openTarget : null, items: newPostsState} );

function commentsReducer( state = {commentEditing: null},
                          action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            let commentKey = action.parentId +  '-comments';
            return Object.assign({}, state,  { [commentKey] : action.comments} );

        case ADD_COMMENT :
            console.log(action);
            let newCommentKey = action.comment.parentId +  '-comments';
            return {
                ...state,
                ...state[newCommentKey].push(action.comment)
            }

        case DELETE_COMMENT :
            let deleteKey = action.parentId + '-comments';
            console.log(state[deleteKey].filter((comment) => comment.deleted === false));
            // return Object.assign({}, state,  state[deleteKey].filter((comment) => comment.id !== action.id )  )
            let deletedCommentArray = state[deleteKey].filter((comment) => comment.id !== action.id);
            return {
                ...state, [deleteKey] : state[deleteKey].filter((comment) => comment.id !== action.id)
            }

        case EDIT_COMMENT :
            return { ...state, commentEditing : action.id }

        default :
            return state;
    }
}


const rootReducer = combineReducers({ categories: categoryReducer, posts: postReducer, comments: commentsReducer, form: formReducer });
// export default combineReducers({ categoryReducer, postReducer });

export default rootReducer

