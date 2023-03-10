/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaTrash, FaPencilAlt, FaRegClone, FaShareAlt } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TipItem = ({ tip, showControl, showAvatar }) => {
    const { isUserAdmin } = UserAuth();

    const isAdmin = isUserAdmin();

    const deleteTodo = async (id) => {
        if (window.confirm(`Voulez-vous vraiment supprimer le tip ${tip.name} ?`)) {
            await deleteDoc(doc(db, 'tips', id));
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(tip.content);
        notifyCopyCode();
    };
    const shareCode = () => {
        navigator.clipboard.writeText(`${window.location.host}/tip/${tip.id}`);
        notifyCopyLink();
    };
    const notifyCopyCode = () => {
        toast.success('Code copié !', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
        });
    };
    const notifyCopyLink = () => {
        toast.success('Lien copié !', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <div className="bg-white/5 rounded-md mb-10 px-10 py-5">
                <div className="flex align-center justify-between mb-5">
                    <div className="tip-infos flex items-center gap-1">
                        <img className="mr-2" src={`../svg/${tip.language}.svg`} alt={tip.language} />
                        <h2 className="text-2xl font-bold">{tip.name}</h2>
                    </div>
                    {showAvatar && (
                        <div className="avatar max-h-10 w-12">
                            <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {tip.photoURL ? (
                                    // <Gravatar email={tip.userEmail} size={40} default="mp" />
                                    <img className="react-gravatar" src={tip.photoURL} />
                                ) : (
                                    <img className="react-gravatar" src="https://fr.seaicons.com/wp-content/uploads/2015/10/dev-icon1.png" />
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                        {tip.content}
                    </SyntaxHighlighter>
                    <div className="absolute right-3 bottom-3 flex gap-2">
                        <div className="tooltip" data-tip="Copier le code">
                            <FaRegClone className="hover:fill-primary cursor-pointer" onClick={copyCode} />
                        </div>
                        <div className="tooltip" data-tip="Partager le code">
                            <FaShareAlt className="hover:fill-primary cursor-pointer" onClick={shareCode} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                    {tip.tags && (
                        <div className="tags-list">
                            {tip.tags.map((tag) => (
                                <button key={tag} className="btn btn-xs border-none mr-2 pointer-events-none">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                    {(showControl || isAdmin) && (
                        <div className="tip-controls flex justify-end gap-3">
                            <div className="tooltip" data-tip="Éditer le tip">
                                <Link to={`/edit-tip/${tip.id}`}>
                                    <FaPencilAlt className="cursor-pointer hover:fill-primary" />
                                </Link>
                            </div>
                            <div className="tooltip" data-tip="Supprimer le tip">
                                <FaTrash className="cursor-pointer hover:fill-primary" onClick={() => deleteTodo(tip.id)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TipItem;
