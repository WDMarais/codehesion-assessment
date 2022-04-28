import React from 'react';
import { default as getMockMenus } from "../mock_menus";
import Menu from './menu';

const Menus = () => {
    let menus = getMockMenus();

    return (
        <div style={{ display: "flex" }}>
            <nav
                style={{
                borderRight: "solid 1px",
                padding: "1rem",
                }}
            >
                {menus.map((menu) => <Menu key={menu.id} props={menu}/>)}
            </nav>
        </div>
    );
};

export default Menus;
