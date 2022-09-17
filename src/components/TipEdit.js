import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheatTips } from '../context/TipsContext';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormClose } from 'react-icons/gr';

const TipEdit = () => {
    const { id } = useParams();
    const { tips } = CheatTips();

    const nameRef = useRef(null);
    const contentRef = useRef(null);
    const catRef = useRef(null);

    const navigate = useNavigate();

    const [tipTags, setTipTags] = useState([]);
    const [tipTag, setTipTag] = useState('');

    const updatetip = async (id) => {
        await updateDoc(doc(db, 'tips', id), {
            name: nameRef.current.value,
            content: contentRef.current.value,
            language: catRef.current.value,
            tags: tipTags,
        });
        notify();
        // Notification.requestPermission().then((perm) => {
        //     if (perm === 'granted') {
        //         new Notification('Tip mis à jour');
        //     }
        // });
        setTimeout(() => {
            navigate('/my-tips');
        }, '3000');
    };

    const notify = () =>
        toast.success('Tip mis à jour', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
        });

    const filteredTips = tips.filter((tip) => {
        return id !== tip.id ? '' : id.includes(tip.id);
    });

    useEffect(() => {
        const initialTags = filteredTips.map((tip) => tip.tags);
        const initiateTags = () => {
            if (initialTags[0]) {
                setTipTags(initialTags[0]);
            } else {
                setTipTags([]);
            }
        };
        initiateTags();
    }, []);

    const addTag = () => {
        tipTags.push(tipTag);
        setTipTag('');
    };
    const removeTag = (tagToRemove) => {
        const newArr = tipTags.filter((tagName) => tagName !== tagToRemove);
        setTipTags(newArr);
    };

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
            <h1 className="text-5xl font-bold text-center py-10">Éditer le tip</h1>
            {filteredTips.map((tip) => (
                <div key={tip.id} className="card w-full max-w-lg shadow-2xl bg-base-100 mx-auto">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nom du tip</span>
                            </label>
                            <input
                                ref={nameRef}
                                defaultValue={tip.name}
                                // onChange={(e) => setTipName(e.target.value)}
                                type="text"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contenu du tip</span>
                            </label>
                            <textarea
                                ref={contentRef}
                                defaultValue={tip.content}
                                // onChange={(e) => setTipContent(e.target.value)}
                                type="text"
                                className="input input-bordered"
                            />
                            {/* <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label> */}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Catégorie du tip</span>
                            </label>
                            <select ref={catRef} defaultValue={tip.language} className="select select-bordered w-full max-w-xs">
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
                            {tipTags?.length > 0 && (
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

                        <div className="form-control mt-6 grid grid-cols-2 gap-2">
                            <button onClick={() => updatetip(id)} className="btn btn-primary">
                                Mettre à jour
                            </button>
                            <Link to={`/my-tips`}>
                                <button className="btn btn-primary btn-outline">Annuler</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TipEdit;
