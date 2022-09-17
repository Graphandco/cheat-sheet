/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
// import Gravatar from 'react-gravatar';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const TipItem = ({ tip, showControl, showAvatar }) => {
    const { isUserAdmin } = UserAuth();

    const isAdmin = isUserAdmin();

    const deleteTodo = async (id) => {
        if (window.confirm(`Voulez-vous vraiment supprimer le tip ${tip.name} ?`)) {
            await deleteDoc(doc(db, 'tips', id));
        }
    };

    // console.log(showControl);

    return (
        // <div className="collapse collapse-arrow border border-primary rounded-box mb-2">
        //     <input type="checkbox" className="peer" />
        //     <div className="collapse-title text-xl font-medium">
        //         <span>{tip.name}</span>
        //     </div>
        //     <div className="collapse-content">
        //         <span>{tip.content}</span>
        //     </div>
        // </div>
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
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {tip.content}
            </SyntaxHighlighter>
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
                        <Link to={`/edit-tip/${tip.id}`}>
                            <FaPencilAlt className="cursor-pointer hover:fill-primary" />
                        </Link>
                        <FaTrash className="cursor-pointer hover:fill-primary" onClick={() => deleteTodo(tip.id)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TipItem;
