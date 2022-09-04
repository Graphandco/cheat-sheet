import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const CreateTip = () => {
    const [tipName, setTipName] = useState('');
    const [tipContent, setTipContent] = useState('');
    const [tipLanguage, setTipLanguage] = useState('');

    const { user } = UserAuth();

    const navigate = useNavigate();

    const addTip = async (e) => {
        e.preventDefault(e);
        if (tipName === '') {
            alert('Please enter a valid todo');
            return;
        }
        await addDoc(collection(db, 'tips'), {
            name: tipName,
            content: tipContent,
            language: tipLanguage,
            userID: user.uid,
            userEmail: user.email,
            created: serverTimestamp(),
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTipName('');
        navigate('/');
    };

    return (
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom du tip</span>
                    </label>
                    <input onChange={(e) => setTipName(e.target.value)} type="text" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contenu du tip</span>
                    </label>
                    <textarea onChange={(e) => setTipContent(e.target.value)} type="text" className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Catégorie du tip</span>
                    </label>
                    <select onChange={(e) => setTipLanguage(e.target.value)} className="select select-bordered w-full max-w-xs">
                        <option disabled selected>
                            Sélectionnez...
                        </option>
                        <option value="php">PHP</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="react">React</option>
                        <option value="prestashop">Prestashop</option>
                    </select>
                </div>

                <div className="form-control mt-6">
                    <button onClick={addTip} className="btn btn-primary">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTip;
