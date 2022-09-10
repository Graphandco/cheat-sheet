/* eslint-disable no-undef */
import React, { useState } from 'react';
import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';

// import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const TipsList = () => {
    const [searchText, setSearchText] = useState('');

    const { tips } = CheatTips();
    const filteredTips = tips.filter((tip) => {
        return tip.name.toLowerCase().includes(searchText.toLowerCase()) && tip.verified === true ? tip : '';
    });

    console.log(tips);

    return (
        <div className="tips">
            <div className="text-center pr-5">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Rechercher"
                    className="input input-primary w-full max-w-xs my-5"
                />
            </div>
            <div className="tips-length px-5 my-5 text-primary text-xl font-bold">
                {filteredTips.length} Tip{filteredTips.length > 1 && 's'}
            </div>
            {/* {tips.length} tip{tips.length > 1 && 's'} disponible{tips.length > 1 && 's'} */}
            <div className="tips-list px-5 mt-10">
                {filteredTips.map((tip) => (
                    <TipItem key={tip.id} tip={tip} showAvatar />
                ))}
            </div>
        </div>
    );
};

export default TipsList;
