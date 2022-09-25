/* eslint-disable no-undef */
import React, { useState } from 'react';
import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';
// import { useEffect } from 'react';

// import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const TipsList = () => {
    const [searchText, setSearchText] = useState('');
    const [filterTip, setFilterTip] = useState('');
    const [active, setActive] = useState(-1);
    const { tips } = CheatTips();
    const [orderByLang, setOrderByLang] = useState(false);
    // const [tipsByTags, setTipsByTags] = useState([]);

    const handleActive = (lang, index) => {
        setFilterTip(lang);
        setActive(index);
        setOrderByLang(true);
    };

    const verifiedTips = tips.filter((tip) => {
        return tip.verified === true ? tip : '';
    });

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };

    const filteredTips = verifiedTips.filter((tip) => {
        const tipTagsJoinded = tip.tags.join('');
        normalizeText(tipTagsJoinded);
        normalizeText(searchText);
        const normalizedTipName = normalizeText(tip.name);
        if (orderByLang === true) {
            return normalizedTipName.includes(searchText) && tip.language === filterTip ? tip : '';
        } else {
            return normalizedTipName.includes(searchText) || tipTagsJoinded.includes(searchText) ? tip : '';
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
            <div className="text-center pr-5 mb-2">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Rechercher"
                    className="input input-primary w-full max-w-xs my-5"
                />
            </div>
            <div className="tips-infos md:flex justify-between items-center gap-3">
                <div className="shadow bg-primary text-primary-content mx-5 rounded-md mb-3 md:mb-0">
                    <div className="stat">
                        <div className="stat-title text-black opacity-100">Nombre de tip{filteredTips.length > 1 ? 's' : ''}</div>
                        <div className="stat-value">{filteredTips.length}</div>
                    </div>
                </div>

                <ul className="filter-list menu menu-horizontal bg-white/5 rounded-md mx-5 flex-wrap">
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
            </div>
            <div className="tips-list px-5 mt-10">
                {filteredTips.map((tip) => (
                    <TipItem key={tip.id} tip={tip} showAvatar />
                ))}
            </div>
        </div>
    );
};

export default TipsList;
