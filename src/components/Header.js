// import Search from './Search';
import { FaPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Header = () => {
    const { user } = UserAuth();
    return (
        <header>
            <div className="navbar bg-base-300 py-4 px-5">
                <div className="flex-1">
                    <Link to="/">
                        <span className="text-2xl font-bold text-primary">MeoCheatSheet</span>
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    {/* <Search /> */}
                    <UserMenu />
                    {user && (
                        <Link to="add-tip">
                            <button className="btn btn-circle btn-sm btn-primary">
                                <FaPlus />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
