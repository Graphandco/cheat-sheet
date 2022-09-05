import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { CheatTips } from '../context/TipsContext';
import TipItem from './TipItem';

const MyTips = () => {
    const { user } = UserAuth();
    const { tips } = CheatTips();

    return (
        <div className="max-w-[1200px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4 mt-10">Mes tips</h1>

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

export default MyTips;
