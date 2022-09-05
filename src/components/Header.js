// import Search from './Search';
import { FaPlus } from 'react-icons/fa';
import Profile from './Profile';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="navbar bg-base-300 py-4">
                <div className="flex-1">
                    <Link to="/">
                        <span className="text-2xl font-bold text-primary">MeoCheatSheet</span>
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    {/* <Search /> */}
                    <Profile />
                    <Link to="add-tip">
                        <button className="btn btn-circle btn-sm btn-primary">
                            <FaPlus />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
