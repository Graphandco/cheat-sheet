import { useParams } from 'react-router-dom';
import { CheatTips } from '../context/TipsContext';
import TipItem from './TipItem';

const TipSingle = () => {
    const { id } = useParams();
    const { tips } = CheatTips();

    const singleTip = tips.filter((tip) => {
        return tip.id === id ? tip : '';
    });
    return (
        <div className="tips-list px-5 mt-10">
            {singleTip.map((tip) => (
                <TipItem key={tip.id} tip={tip} showAvatar />
            ))}
        </div>
    );
};

export default TipSingle;
