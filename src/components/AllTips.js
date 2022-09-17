import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';

const AllTips = () => {
    const { tips } = CheatTips();
    return (
        <>
            <h1 className="text-5xl font-bold text-center py-10">Tous les tips</h1>
            <div className="w-64 shadow bg-primary text-primary-content ml-5 rounded-md mb-3 md:mb-0">
                <div className="stat">
                    <div className="stat-title text-black opacity-100">Nombre de tip{tips.length > 1 ? 's' : ''}</div>
                    <div className="stat-value">{tips.length}</div>
                </div>
            </div>
            <div className="tips-list px-5 mt-10">
                {tips.map((tip) => (
                    <TipItem key={tip.id} tip={tip} showAvatar />
                ))}
            </div>
        </>
    );
};

export default AllTips;
