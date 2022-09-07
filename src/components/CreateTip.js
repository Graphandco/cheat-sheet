import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { GrFormClose } from 'react-icons/gr';

const CreateTip = () => {
    const [tipName, setTipName] = useState('');
    const [tipContent, setTipContent] = useState('');
    const [tipLanguage, setTipLanguage] = useState('');
    const [tipTags, setTipsTags] = useState([]);
    const [tipTag, setTipTag] = useState('');

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
            tags: tipTags,
            userID: user.uid,
            userEmail: user.email,
            created: serverTimestamp(),
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTipName('');
        navigate('/');
    };

    const addTag = () => {
        tipTags.push(tipTag);
        setTipTag('');
    };

    const removeTag = (tagToRemove) => {
        const newArr = tipTags.filter((tagName) => tagName !== tagToRemove);
        setTipsTags(newArr);
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
                        <option value="php">PHP</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="react">React</option>
                        <option value="prestashop">Prestashop</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <div className="tags-wrapper flex gap-2">
                        <input value={tipTag} onChange={(e) => setTipTag(e.target.value)} type="text" className="input input-bordered flex-grow" />
                        <button onClick={addTag} className="btn btn-primary">
                            +
                        </button>
                    </div>
                    {tipTags && (
                        <div className="mt-4 flex flex-wrap">
                            {tipTags.map((tag) => (
                                <div key={tag} className="mr-3 mb-1 flex">
                                    <div id={tag} className="mr-1 backdrop-brightness-50 py-1 px-2 rounded-md">
                                        {tag}
                                    </div>
                                    <button className="btn btn-primary btn-xs">
                                        <GrFormClose onClick={() => removeTag(tag)} className="cursor-pointer" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    <button onClick={addTip} className="btn btn-primary ">
                        Ajouter
                    </button>
                    <Link to={`/`}>
                        <button className="btn btn-primary btn-outline">Annuler</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateTip;
