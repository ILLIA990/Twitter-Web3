import React from "react";
import theme from '../constants/color'
import './Twitt.css'
import { Link } from "react-router-dom";
import { useContract } from "../context/ContractContext";

export default function Twitt({twit}) {
    const { account } = useContract();
    const isOwner = account == twit.author.login.toLowerCase();

    const date = new Date(Number(twit.createdTime) * 1000);
    const formattedDateTime = date.toLocaleString();

    return (
        <div className='Twitt'>
            <Link style={{color: 'black'}} to={isOwner ? '/profile' : `/user/${twit.author.login}`}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2vh'}}>
                    <img className='twitt-pic' src={twit.author.avatar ? twit.author.avatar : `${process.env.PUBLIC_URL}/profile-pic.png`} alt="Profile Picture"/>
                    <div>
                        <h3>@{twit.author.username}</h3>
                        <h3 style={{color: theme.primaryColor}}>{formattedDateTime}</h3>
                    </div>
                </div>
            </Link>
            <h3 style={{marginTop: '2vh'}}>{twit.text}</h3>
            <div className="likes">
                <img src="https://pngimg.com/uploads/like/like_PNG40.png" className='like'/>
                <h3>{twit.likes.toString()}</h3>
            </div>
        </div>
    )
}