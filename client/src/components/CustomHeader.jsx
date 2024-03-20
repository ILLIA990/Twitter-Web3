import {Link} from "react-router-dom";
import React from "react";
import theme from "../constants/color";

export default function CustomHeader() {
    return (
        <div style={{
            height: '10vh',
            backgroundColor: theme.primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: '10%'
        }}
        >

            <Link to={"/"}><h1 style={{color: 'white'}}>Twitter dApp</h1></Link>
            <Link to={"/profile"}>
                <img style={{
                    width: '6vh',
                    height: '6vh'
                }}
                     src={process.env.PUBLIC_URL + '/profile-pic.png'}
                     alt='user'/>

            </Link>
        </div>
    )
}