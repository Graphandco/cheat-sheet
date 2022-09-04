/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import Gravatar from 'react-gravatar';
import { UserAuth } from '../context/AuthContext';

const TipItem = ({ tip, showControl, showAvatar }) => {
    const { user } = UserAuth();

    const deleteTodo = async (id) => {
        if (window.confirm(`Voulez-vous vraiment supprimer le tip ${tip.name} ?`)) {
            await deleteDoc(doc(db, 'tips', id));
        }
    };

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
            <div className="flex align-center justify-between">
                <div className="tip-infos">
                    <h2 className="text-2xl  font-bold">{tip.name}</h2>
                    <span className="badge badge-xs badge-primary">{tip.language}</span>
                </div>
                {showAvatar && (
                    <div className="avatar max-h-10">
                        <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <Gravatar email={tip.userID ? tip.userEmail : 'blahblah@blah.com'} size={40} default="mp" />
                        </div>
                    </div>
                )}
            </div>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {tip.content}
            </SyntaxHighlighter>
            {user.uid === tip.userID && showControl && (
                <button className="btn btn-error btn-xs btn-circle" onClick={() => deleteTodo(tip.id)}>
                    <FaTrash />
                </button>
            )}
        </div>
    );
};

export default TipItem;
