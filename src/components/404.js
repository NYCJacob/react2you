import React from 'react';
import { Link } from 'react-router-dom'



export const NoMatch = () => (
    <div>
        <div>Sorry your page could not be found. Check out the current posts <Link to="/">here.</Link></div>
    </div>
)