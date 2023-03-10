import { CheatTips } from '../context/TipsContext';
import StatItem from './StatItem';

const Stats = () => {
    // const { user, isUserAdmin } = UserAuth();
    // const isAdmin = isUserAdmin();
    const { tips } = CheatTips();

    let users = tips.map((tip) => tip.userName);
    let uniqueUsers = [...new Set(users.filter((item) => item !== undefined && item !== null))];

    console.log(uniqueUsers);

    return (
        <>
            <h1 className="text-5xl font-bold text-center py-10">Contributions</h1>
            <div className="users-list">
                {uniqueUsers.map((user) => (
                    <StatItem key={user} tips={tips} user={user} />
                ))}
            </div>
        </>
    );
};

export default Stats;
