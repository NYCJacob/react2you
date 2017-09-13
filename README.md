This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Installation**
- requires backend reddit clone/Udacity project server at port :5001
- npm install
- npm start


**Issues**
- TODO: somehow I could not dispatch in componentDidMount when using mapdispatchtoprops
- method to nest routing to show new/edit comments component was never discovered
- I occasionally got the following error, which I have not been able to track down, but it seems that sometimes
the post id is not being passed to the fetchComments action resulting in a bad api request.
 
    
        Unhandled Rejection (SyntaxError): Unexpected token < in JSON at position 0
        (anonymous function)
        src/actions/index.js:370
        
