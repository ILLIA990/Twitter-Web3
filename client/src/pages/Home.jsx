import React, {useEffect, useState} from 'react'
import { useContract } from '../context/ContractContext';
import Twitt from '../components/Twitt';

export default function Home() {
    const { contract, accounts, account } = useContract();
    const [twitts, setTwitts] = useState([]);

    const getAllTwitts = async() => {
        try {
            const uniqueTwittsSet = new Set();

            for (const acc of accounts) {
                if(acc != account) {
                    const _twitts = await contract.methods.UserTwitts(acc).call({ from: account });

                    _twitts.forEach((twit) => uniqueTwittsSet.add(twit));
                }
            };

            const uniqueTwittsArray = [...uniqueTwittsSet];

            setTwitts(uniqueTwittsArray);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        if (contract) {
            getAllTwitts();
        }
    }, [contract]);

    return (
        <div className='main'>
            <div className="container" style={{display: 'flex', justifyContent: 'center', marginBottom: '5vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5vh', width: '80%'}}>
                    {
                        twitts.sort((a, b) => Number(b.createdTime) - Number(a.createdTime)).map((twit) => {
                            return (
                                <Twitt key={twit.createdTime}  twit={twit} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}