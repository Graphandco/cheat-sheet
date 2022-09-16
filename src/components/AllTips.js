import TipItem from './TipItem';
import { CheatTips } from '../context/TipsContext';

const AllTips = () => {
    const { tips } = CheatTips();
    return (
        <>
            <h1 className="text-5xl font-bold text-center py-10">Tous les tips</h1>
            <div className="tips-list px-5 mt-10">
                {tips.map((tip) => (
                    <TipItem key={tip.id} tip={tip} showAvatar />
                ))}
            </div>
        </>
    );
};

export default AllTips;
