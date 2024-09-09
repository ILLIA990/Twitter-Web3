import React, { useEffect, useState } from 'react';
import '../App.css';
import './Profile.css';
import theme from '../constants/color';
import { useContract } from '../context/ContractContext';
import Twitt from '../components/Twitt';
import { Skeleton } from 'antd';
import { Button, message, Popconfirm } from 'antd';

export default function Profile() {
    const { contract, balance, account } = useContract();
    const [user, setUser] = useState();
    const [link, setLink] = useState('');
    const [active, setActive] = useState(false);

    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isOpened, setIsOpened] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const [twitts, setTwitts] = useState([]);

    useEffect(() => {
        if (contract) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLogged(isLoggedIn);

            CheckRegistration();

            if(isLogged) {
                GetUserData();
                getUserTwitts();
            }
        }
    }, [isLogged, contract, isRegistered]);

    const sendTransaction = async (method, args) => {
        try {
            const gasEstimation = await method(...args).estimateGas({ from: account });
            await method(...args).send({ from: account, gas: gasEstimation });
        } catch (err) {
            alert(err);
        }
    };

    const AddTwitt = async (_text) => {
        if (!_text) return;

        try {
            await sendTransaction(contract.methods.AddTwitt, [_text]);

            setText('');
            getUserTwitts();
        } catch (err) {
            alert(err);
        }
    };

    const Registration = async (_username, _password) => {
        if (!_username || !_password) return;
        try {
            await sendTransaction(contract.methods.Registration, [_username, _password]);

            setIsRegistered(true);
        } catch (err) {
            alert(err);
        }
    };

    const Login = async (_password) => {
        if (!_password) return;
        try {
            await sendTransaction(contract.methods.Login, [_password]);

            localStorage.setItem('isLoggedIn', true);
            setIsLogged(true);
        } catch (err) {
            alert(err);
        }
    };

    const getUserTwitts = async () => {
        try {
            const twitts = await contract.methods.UserTwitts(account).call({ from: account });

            setTwitts(twitts);
        } catch (err) {
            alert(err);
        }
    };

    const GetUserData = async () => {
        try {
            const user = await contract.methods.GetUser(account).call({ from: account });

            setUser(user);
        } catch (err) {
            alert(err);
        }
    };

    const UpdateAvatar = async (link) => {
        if (!link) return;
        try {
            await sendTransaction(contract.methods.UpdateUser, [link]);

            setLink('');
            setIsOpened(false);
            GetUserData();
        } catch (err) {
            alert(err);
        }
    };

    const Exit = async () => {
        try {
            await sendTransaction(contract.methods.Logout, []);

            localStorage.setItem('isLoggedIn', false);
            setIsLogged(false);
            setTwitts([]);
        } catch (err) {
            alert(err);
        }
    };

    const CheckRegistration = async () => {
        try {
            const result = await contract.methods.CheckRegistration(account).call({ from: account });
            setIsRegistered(result);
        } catch (err) {
            alert(err);
        }
    };
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <div className='main'>
            <div className='container'
                 style={{
                     alignItems: 'start',
                     justifyContent: 'flex-start',
                     gap: '5vh'}}>
                <div>
                    {user ? (
                        user.avatar ? (
                            <img src={user.avatar} className='avatar' alt="User Avatar"/>
                        ) : (
                            <Skeleton.Image active={true} className='avatar'/>
                        )
                    ) : (
                        <Skeleton.Image active={true} className='avatar'/>
                    )}
                </div>
                <div className='user-info'>
                    <div className='user-balance-account' style={{marginTop: '5vh'}}>
                        <h2>Account: <span style={{color: theme.primaryColor}}>{account}</span></h2>
                        <h2>Balance: {balance} TWT</h2>
                    </div>
                    {isLogged ? (
                            <Popconfirm
                                // onClick={Exit}
                                title="Go out ?"
                                onConfirm={Exit}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                                className='edit-btn'
                            >
                                <Button danger>Exit</Button>
                            </Popconfirm>
                        // <button className='edit-btn' onClick={Exit}>Exit</button>
                    ) : (
                        isRegistered ? (
                            <div className='registration'>
                                <input type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
                                <button className='edit-btn' style={{margin: '0'}} onClick={() => Login(password)}>Login</button>
                            </div>
                        ) : (
                            <div className='registration'>
                                <input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
                                <input type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
                                <button className='edit-btn' style={{margin: '0'}} onClick={() => Registration(username, password)}>Registration</button>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="container" style={{
                alignItems: 'start',
                justifyContent: 'flex-start',
                marginBottom: '5vh',
                gap: '5vh'
            }}>

                {isLogged && <div className='sidebar'>
                    {user && <h2 style={{marginBottom: '4vh'}}>
                        <span style={{color: 'gray'}}>Username:</span><br/>@{user.username}
                    </h2>}
                    {isOpened && <input type='text' style={{marginBottom: '1vh'}} placeholder='link to img' value={link} onChange={e => setLink(e.target.value)}/>}
                    {isOpened
                        ? <button className='edit-btn' onClick={() => UpdateAvatar(link)}>Save</button>
                        : <button className='edit-btn' onClick={() => setIsOpened(true)}>Update avatar</button>
                    }
                </div>}
                <div style={{display: 'flex', flexDirection: 'column', gap: '5vh', width: '80%'}}>
                    {isLogged && <div className='add-twitt'>
                        <textarea className='input_twitt' type='text' placeholder='What are you thinking?' value={text} onChange={e => setText(e.target.value)}/>
                        <button onClick={() => AddTwitt(text)} disabled={!isLogged} className='add-btn'>Twitt it</button>
                    </div>}

                    {
                        twitts.sort((a, b) => Number(b.createdTime) - Number(a.createdTime)).map((twit) => {
                            return (
                                <Twitt key={twit.createdTime} twit={twit} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
