/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

import { db } from '../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

const TipsContext = createContext();

export const TipsContextProvider = ({ children }) => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'tips'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tipsArr = [];
            querySnapshot.forEach((doc) => {
                tipsArr.push({ ...doc.data(), id: doc.id });
            });
            setTips(tipsArr);
            console.log(tips);
        });
        return () => unsubscribe();
    }, []);

    return <TipsContext.Provider value={{ tips, setTips }}>{children}</TipsContext.Provider>;
};

export const CheatTips = () => {
    return useContext(TipsContext);
};
