/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const StatItem = ({ tips, user }) => {
    const filteredTips = tips.filter((tip) => {
        // return tip.userName?.toLowerCase() == user && tip.verified === true ? tip : '';
        return tip.userName?.toLowerCase() == user.toLowerCase() && tip.verified === true ? tip : '';
    });
    filteredTips.sort();
    const percent = Math.round((filteredTips.length / tips.length) * 100);
    console.log(user);

    return (
        <div className="stat-item mx-10 mb-5 py-2 px-5">
            <div className="stat-user">
                {user?.photoURL && <img src={user.photoURL} alt="" />}
                {user && user}
            </div>
            <progress className="progress progress-primary w-56 bg-white/20" value={percent} max="100"></progress>
            <div className="user-number">
                {filteredTips.length} tips sur {tips.length}, soit {percent}%
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                {filteredTips.map((tip) => (
                    // <div key={tip}>{tip.name}</div>
                    <Link key={tip} to={`/tip/${tip.id}`}>
                        <div className="text-primary underline">{tip.name}</div>
                    </Link>
                ))}
            </div>

            {/* <div tabIndex={0} className="collapse collapse-arrow inline-block">
                <div className="collapse-title">Tips ajoutés</div>
                <div className="collapse-content">
                    {filteredTips.map((tip) => (
                        // <div key={tip}>{tip.name}</div>
                        <div key={tip} className="badge badge-primary">
                            {tip.name}
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <div className="stat-length">{Math.round((filteredTips.length / tips.length) * 100)}</div> */}
        </div>
    );
};

export default StatItem;
