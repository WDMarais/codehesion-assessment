import React from 'react';

const Menu = ({ props }) => {
    return (
        <div style={{border: "1px solid black"}}>
            {
                props.icon_url && <img src={props.icon_url} alt={props.name} />
            }
            <h2 style={{color: props.colour_1}}>{props.name}</h2>
            <h3 style={{color: props.colour_2}}>{props.description}</h3>
        </div>
    );
};

export default Menu;
