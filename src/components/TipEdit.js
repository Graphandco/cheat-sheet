import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CheatTips } from '../context/TipsContext';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

const TipEdit = () => {
    const { id } = useParams();
    const { tips } = CheatTips();

    // const [tipName, setTipName] = useState('');
    // const [tipContent, setTipContent] = useState('');

    const nameRef = useRef(null);
    const contentRef = useRef(null);

    const updatetip = async (id) => {
        await updateDoc(doc(db, 'tips', id), {
            name: nameRef.current.value,
            content: contentRef.current.value,
        });
    };

    console.log(nameRef.current);

    return (
        <div className="tips-list">
            {tips
                .filter((tip) => {
                    return id !== tip.id ? '' : id.includes(tip.id);
                })
                .map((tip) => (
                    <div key={tip.id} className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col lg:flex-column-reverse">
                            <div className="text-center lg:text-left">
                                <h1 className="text-5xl font-bold text-center pb-5">Éditer le tip</h1>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                                    <div onClick={() => updatetip(id)} className="form-control mt-6">
                                        <button className="btn btn-primary">Mettre à jour</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TipEdit;
