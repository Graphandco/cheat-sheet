/* eslint-disable no-undef */
import React, { useState } from 'react';
import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';

// import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const TipsList = () => {
    const [searchText, setSearchText] = useState('');
    const [filterTip, setFilterTip] = useState('');
    const [active, setActive] = useState(-1);

    const handleActive = (lang, index) => {
        setFilterTip(lang);
        setActive(index);
        setOrderByLang(true);
    };

    const { tips } = CheatTips();
    const [orderByLang, setOrderByLang] = useState(false);

    const filteredTips = tips.filter((tip) => {
        if (orderByLang === true) {
            return tip.name.toLowerCase().includes(searchText.toLowerCase()) && tip.verified === true && tip.language === filterTip ? tip : '';
        } else {
            return tip.name.toLowerCase().includes(searchText.toLowerCase()) && tip.verified === true ? tip : '';
        }
    });

    const showAll = () => {
        setFilterTip('');
        setActive(-1);
        setOrderByLang(false);
    };

    let languages = tips.map((tip) => tip.language);
    let uniqueLanguages = [...new Set(languages.filter((item) => item.length !== 0))];
    uniqueLanguages = uniqueLanguages.sort((a, b) => a.localeCompare(b));
    // console.log(uniqueLanguages);

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
            <ul className="filter-list menu menu-horizontal bg-white/5 rounded-md float-right mx-5">
                <li onClick={showAll} className={`capitalize${active == -1 ? ' active' : ''}`}>
                    <span>Tous</span>
                </li>
                {uniqueLanguages.map((lang, index) => (
                    <li onClick={() => handleActive(lang, index)} className={`capitalize${active == index ? ' active' : ''}`} key={lang}>
                        <div className="menu-icon">
                            <span>{lang}</span>
                            <img src={`../svg/${lang}.svg`} alt={lang} />
                        </div>
                    </li>
                ))}
            </ul>
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
