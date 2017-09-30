import React from 'react';

export const NoMatch = ({ location }) => (
    <div>
        <h3>Sorry your page could not be found <code>{location.pathname}</code></h3>
    </div>
)