import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const UserMenu = () => {
    const { user, logout, signInGoogle, isUserAdmin } = UserAuth();
    const isAdmin = isUserAdmin();

    const navigate = useNavigate();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInGoogle();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('You are logged out');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {user?.photoURL ? <img src={user.photoURL} alt="" /> : <img src="https://fr.seaicons.com/wp-content/uploads/2015/10/dev-icon1.png" />}
                </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                {user && (
                    <>
                        <li>
                            <span className="text-primary pointer-events-none">{user.email}</span>
                        </li>
                        <li>
                            <Link to="account">Voir mon compte</Link>
                        </li>
                        <li>
                            <Link to="my-tips">Voir mes tips</Link>
                        </li>
                        <li>
                            <Link to="contributions">Contributions</Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link to="a-valider">Tips à valider</Link>
                            </li>
                        )}
                        <li>
                            <span onClick={handleLogout}>Se déconnecter</span>
                        </li>
                    </>
                )}
                {!user && (
                    <li>
                        <span onClick={handleGoogleSignIn}>Se connecter</span>
                    </li>
                )}
                {/* <li>
                    <span className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </span>
                </li> */}
            </ul>
        </div>
    );
};

export default UserMenu;
