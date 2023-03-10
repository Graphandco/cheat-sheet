import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { GrFormClose } from 'react-icons/gr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTip = () => {
    const [tipName, setTipName] = useState('');
    const [tipContent, setTipContent] = useState('');
    const [tipLanguage, setTipLanguage] = useState('');
    const [tipTags, setTipsTags] = useState([]);
    const [tipTag, setTipTag] = useState('');
    const [isTipValid, setIsTipValid] = useState(false);

    const { user, isUserAdmin } = UserAuth();
    const isAdmin = isUserAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        isAdmin && setIsTipValid(true);
    }, []);

    const addTip = async (e) => {
        e.preventDefault(e);
        if (tipName === '') {
            alert('Merci de saisir un nom');
            return;
        }
        await addDoc(collection(db, 'tips'), {
            name: tipName,
            content: tipContent,
            language: tipLanguage,
            tags: tipTags,
            userID: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            photoURL: user.photoURL,
            verified: isTipValid,
            // created: serverTimestamp(),
            createdAt: new Date(),
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTipName('');
        Notification.requestPermission().then((perm) => {
            if (perm === 'granted') {
                new Notification('Tip ajouté');
            }
        });
        notify();
        setTimeout(() => {
            navigate('/');
        }, '3000');
    };

    const addTag = () => {
        tipTags.push(tipTag.toLowerCase());
        setTipTag('');
    };

    const removeTag = (tagToRemove) => {
        const newArr = tipTags.filter((tagName) => tagName !== tagToRemove);
        setTipsTags(newArr);
    };
    const notify = () =>
        toast.success('Tip ajouté! En attente de validation', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
        });

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <h1 className="text-5xl font-bold text-center py-10">Ajouter un tip</h1>
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 mx-auto ">
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
                            <option defaultValue>Sélectionnez...</option>
                            <option value="php">PHP</option>
                            <option value="css">CSS</option>
                            <option value="javascript">Javascript</option>
                            <option value="prestashop">Prestashop</option>
                            <option value="meosis">Meosis (no code)</option>
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
        </>
    );
};

export default CreateTip;
