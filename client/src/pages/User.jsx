import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import './Profile.css';
import theme from '../constants/color';
import { useContract } from '../context/ContractContext';
import Twitt from '../components/Twitt';
import { Skeleton } from 'antd';

export default function User() {
	const { contract, account } = useContract();
	const { userAdr } = useParams();
	const [user, setUser] = useState();
	const [twitts, setTwitts] = useState([]);

	useEffect(() => {
		if (contract) {
			GetUserData();
			getUserTwitts();
		}
	}, [contract]);

	const getUserTwitts = async() => {
		try {
			const twitts = await contract.methods.UserTwitts(userAdr).call({ from: account });
			setTwitts(twitts);
		} catch (err) {
			alert(err);
		}
	}

	const GetUserData = async() => {
		try {
			const _user = await contract.methods.GetUser(userAdr).call({ from: account });
			setUser(_user);
		} catch (err) {
			alert(err);
		}
	}

	return (
		<div className='main'>
			<div className='container' style={{ alignItems: 'start', justifyContent: 'flex-start', gap: '5vh' }}>
				<div>
					{user ? (
						<img
							src={user.avatar ? user.avatar : process.env.PUBLIC_URL + '/basicProfile.png'}
							className='avatar'
						/>
					) : (
						<Skeleton.Image active={true} className='avatar'/>
					)}
				</div>
				<div className='user-info'>
					<div className='user-info-account'>
						{user ? (
							<h2>
								Account: <span style={{ color: theme.primaryColor }}>{userAdr}</span>
							</h2>
						) : (
							<Skeleton.Input active={true} size="small" style={{ width: 200 }} />
						)}
					</div>
				</div>
			</div>

			<div className='container' style={{ alignItems: 'start', justifyContent: 'flex-start', marginBottom: '5vh', gap: '5vh' }}>
				<div className='sidebar'>
					{user ? (
						<h2 style={{ marginBottom: '4vh' }}>
							<span style={{ color: 'gray' }}>Username:</span><br />@{user.username}
						</h2>
					) : (
						<Skeleton.Input active={true} size="default" style={{ width: 150 }} />
					)}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '5vh', width: '80%' }}>
					{twitts.length > 0 ? (
						twitts
							.sort((a, b) => Number(b.createdTime) - Number(a.createdTime))
							.map(twit => (
								<Twitt key={twit.createdTime} twit={twit} />
							))
					) : (
						<Skeleton active={true} paragraph={{ rows: 4 }} />
					)}
				</div>
			</div>
		</div>
	);
}
