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
        <>
            <h1 className="text-5xl font-bold text-center py-10">Mon compte</h1>
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 mx-auto ">
                <div className="card-body">
                    {user?.displayName && <p className="text-center font-bold uppercase text-2xl">{user.displayName}</p>}
                    {user?.photoURL ? (
                        <img className="w-32 mx-auto mb-5" src={user.photoURL} alt="" />
                    ) : (
                        <img className="w-32 mx-auto mb-5" src="https://fr.seaicons.com/wp-content/uploads/2015/10/dev-icon1.png" />
                    )}
                    <p className="italic text-center">Connecté sous: {user && user.email}</p>
                    <button onClick={handleLogout} className="btn btn-primary mt-5">
                        Se déconnecter
                    </button>
                </div>
            </div>
        </>
    );
};

export default Account;
