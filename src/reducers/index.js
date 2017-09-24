import { combineReducers } from 'redux'

// redux-form imports
import { reducer as formReducer } from 'redux-form'
import * as ActionType from '../actions/types'


function categoryReducer(state = {}, action) {
    switch (action.type) {
        case ActionType.RECEIVE_CATEGORIES :
            console.log(action.categories.categories)
            let catArray = action.categories.categories.slice(0);
            console.log(catArray)
            return Object.assign({}, state,  action.categories.categories )

        case ActionType.ADD_CATEGORY :
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
        timestamp: null,
        commentTotal: null
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
        case ActionType.ALL_POSTS :
            return state;

        case ActionType.RECEIVE_POSTS :
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

                    case 3:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                    function compareTimeStampAscending(a,b) {
                        if (a.timestamp < b.timestamp)
                            return 1;
                        if (a.timestamp > b.timestamp)
                            return -1;
                        return 0;
                    }
                        sortingPosts.sort(compareTimeStampAscending);
                        break;

                    case -3:
                        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript#1129270
                    function compareTimeStampDscending(a,b) {
                        if (b.timestamp < a.timestamp)
                            return 1;
                        if (b.timestamp > a.timestamp)
                            return -1;
                        return 0;
                    }
                        sortingPosts.sort(compareTimeStampDscending);
                        break;

                    default :
                        return 0;

                }
                // end switch
            return Object.assign({}, state,  { openPost : false, items : sortingPosts, newPostForm : false } );

        case ActionType.SET_SORTKEY :
            return {...state, sortKey : action.key };


        case ActionType.SET_TARGET:
            return Object.assign({}, state,  { openPost : true , target : action.target} );

        //    close post also resets openTarget to prevent populating newPost form with data
        case ActionType.CLOSE_POST :
            return Object.assign({}, state,  { openPost : false } );

        case ActionType.NEW_POST :
            return Object.assign({}, state, {newPostForm: true });

        case ActionType.CREATE_POST :
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
                        timestamp: null,
                        commentTotal:null
                    }
                }
            );


        case ActionType.EDIT_POST :
            return Object.assign({}, state,  { editing : true, target: action.postData } );

        case ActionType.UPDATED_POST :
            return Object.assign({}, state, { items: [ action.updatedPost]} );

        case ActionType.CLEAR_TARGET :
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

        case ActionType.DELETE_POST :
            console.log(action);
            let priorPosts = state.items;
            let newPostsState = priorPosts.filter( post => post.id !== action.deletePostId);
            return Object.assign({}, state, { openTarget : null, items: newPostsState} );

        case ActionType.CANCEL_EDIT :
            return Object.assign({}, state,  { editing : false, newPostForm : false } );

        case ActionType.POST_VOTE :
            let currStateItems = state.items;
            let indexVoted = currStateItems.findIndex( (item) => item.id === action.postId);
            currStateItems[indexVoted].voteScore += action.vote;
            return Object.assign({}, state, {items: currStateItems}  );
            // return state;

        case ActionType.NEW_COMMENT :
            return {...state, commentForm: true };

        case ActionType.CLOSE_COMMENT_FORM :
            return {...state, commentForm: false};

        case ActionType.POST_COMMENT_TOTAL :
            let statePosts = state.items;
            let commentTotalIndex = statePosts.findIndex( (post) => post.id === action.id );
            statePosts[commentTotalIndex].commentTotal = action.commentTotal;
            return Object.assign({}, state, {items: statePosts})


        default :
            return state;
    }
}

function commentsReducer( state = {commentEditing: false, targetComment:{}},
                          action) {
    switch (action.type) {
        case ActionType.COMMENT_VOTE :
            let parentId = action.votedComment.parentId;
            let parentKey = parentId + '-comments';
            let currComments = state[parentKey];
            let indexVoted = currComments.findIndex( (item) => item.id === action.votedComment.id);
            currComments[indexVoted].voteScore = action.votedComment.voteScore;
            return Object.assign({}, state, {[parentKey]: currComments} );

        case ActionType.RECEIVE_COMMENTS:
            let commentKey = action.parentId +  '-comments';
            return Object.assign({}, state,  { [commentKey] : action.comments} );

        case ActionType.ADD_COMMENT :
            let newCommentKey = action.comment.parentId +  '-comments';
            return {
                ...state,
                ...state[newCommentKey].push(action.comment)
            }

        case ActionType.EDIT_COMMENT :
            return { ...state, commentEditing : true, targetComment : action.comment }

        case ActionType.UPDATE_COMMENT :
            let postCommentsKey = `${action.comment.parentId}-comments`;
            let currCommentsArray = state[postCommentsKey];
            let commentIndex = currCommentsArray.findIndex( (item) => item.id === action.comment.id )
            currCommentsArray[commentIndex] = action.comment;
            return Object.assign({}, state, { [postCommentsKey]: currCommentsArray})


        case ActionType.DELETE_COMMENT :
            let deleteKey = action.parentId + '-comments';
            return {
                ...state, [deleteKey] : state[deleteKey].filter((comment) => comment.id !== action.id)
            }

        case ActionType.CLOSE_COMMENT_EDIT :
            return { ...state, commentEditing : false, targetComment : {} }

        default :
            return state;
    }
}


const rootReducer = combineReducers({ categories: categoryReducer, posts: postReducer, comments: commentsReducer, form: formReducer });
// export default combineReducers({ categoryReducer, postReducer });

export default rootReducer

