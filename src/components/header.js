import React from 'react';

function Header(props) {
    if (props && props.loggedIn) {
        return (
            <h3>Welcome, User</h3>
        )
    }
    return(
        <h3>Welcome</h3>
    )
}

export default Header;
