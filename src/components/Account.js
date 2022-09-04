import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { CheatTips } from '../context/TipsContext';
import TipItem from './TipItem';

const Account = () => {
    const { user, logout } = UserAuth();
    const { tips } = CheatTips();
    const navigate = useNavigate();

    // console.log(user.uid);
    console.log(tips);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('You are logged out');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4">Mon Compte</h1>
            <p className="italic">Connecté sous: {user && user.email}</p>
            <button onClick={handleLogout} className="btn btn-sm btn-primary mt-5">
                Se déconnecter
            </button>

            <h2 className="text-2xl font-bold py-4 mt-10">Mes tips</h2>

            <div className="tips-list">
                {tips
                    .filter((tip) => {
                        return tip.userID !== user.uid ? '' : tip.userID.includes(user.uid);
                    })
                    .map((tip) => (
                        <TipItem key={tip.id} tip={tip} showControl />
                    ))}
            </div>
        </div>
    );
};

export default Account;
