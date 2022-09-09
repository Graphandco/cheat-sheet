import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    console.log(user);

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
            {user?.photoURL ? <img src={user.photoURL} alt="" /> : <img src="https://fr.seaicons.com/wp-content/uploads/2015/10/dev-icon1.png" />}
            <p className="italic">Connecté sous: {user && user.email}</p>
            <button onClick={handleLogout} className="btn btn-sm btn-primary mt-5">
                Se déconnecter
            </button>
        </div>
    );
};

export default Account;
