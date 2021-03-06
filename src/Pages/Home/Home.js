import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import Banner from './Banner';
import Content from './Content';
import HomePopup from '../../Components/HomePopup';

export default function Home() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});

    useEffect(() => {
        if (loggedIn) {
            fetch("https://mtms-band-site.herokuapp.com/getUserData", {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
                }
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200)
                        setAccountData(response.data);
                    // eslint-disable-next-line
                    else loggedIn = false;
                });
        }

        if (!localStorage.hasOwnProperty("showPopup")) 
            localStorage.setItem("showPopup", 'true');
    }, []);

    return (
        <React.Fragment>
            {localStorage.getItem("showPopup") === 'true' && <HomePopup />}
            <Nav loggedIn={loggedIn} account={accountData} />
            <Banner />
            <Content />
        </React.Fragment>
    );
}
