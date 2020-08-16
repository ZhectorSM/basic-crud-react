import React from 'react';
import logo from "../img/cassete_logo.png";


const header = () => {

    return(
        <header>
            <nav>
                <img src={logo} alt="logo" width="150px" />
                <h1 className="title">Rebel Music</h1>
                <ul className="standarMenu">
                </ul>
            </nav>
        </header>
        );
}

export default header;