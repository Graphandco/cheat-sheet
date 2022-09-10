import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TipPending = () => {
    const { tips } = CheatTips();

    const validateTip = async (id) => {
        await updateDoc(doc(db, 'tips', id), {
            verified: true,
        });
        notify();
    };

    const tipsToValidate = tips.filter((tip) => {
        return tip.verified === false ? tip : '';
    });

    const notify = () =>
        toast.success('Tip validé', {
            position: 'bottom-right',
            autoClose: 1000,
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
            <h1 className="text-5xl font-bold text-center py-10">Tips à valider</h1>
            <div className="tips">
                <div className="tips-list px-5 ">
                    <div className="stats shadow bg-primary text-primary-content mb-5">
                        <div className="stat">
                            <div className="stat-title text-black opacity-100">Tip{tipsToValidate.length > 1 ? 's' : ''} en attente de validation</div>
                            <div className="stat-value">{tipsToValidate.length}</div>
                        </div>
                    </div>

                    {tipsToValidate.map((tip) => (
                        <>
                            <TipItem key={tip.id} tip={tip} showAvatar />
                            <button onClick={() => validateTip(tip.id)} className="btn btn-primary mb-10 -mt-[30px] block">
                                Valider le tip
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TipPending;
