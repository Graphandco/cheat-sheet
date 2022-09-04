import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
const Profile = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

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
                    <Gravatar email={user ? user.email : 'blahblah@blah.com'} size={30} default="mp" />
                </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                {user && (
                    <>
                        <li>
                            <span>{user.email}</span>
                        </li>
                        <li>
                            <Link to="account">Voir mon compte</Link>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Se déconnecter</span>
                        </li>
                    </>
                )}
                {!user && (
                    <li>
                        <Link to="login">Se connecter</Link>
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

export default Profile;
