import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();
    // const { signIn, signInGoogle } = UserAuth();
    const { googleSignIn } = UserAuth();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     try {
    //         await signIn(email, password);
    //         navigate('/');
    //     } catch (e) {
    //         setError(e.message);
    //         console.log(error);
    //     }
    // };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
        } catch (error) {
            setError(e.message);
            console.log(error);
        }
    };

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-column-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center pb-5">Se connecter</h1>
                        {/* <p className="py-6 text-center">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p> */}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                {/* <input onChange={(e) => setEmail(e.target.value)} type="text" className="input input-bordered" /> */}
                                <input type="text" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mot de passe</span>
                                </label>
                                {/* <input onChange={(e) => setPassword(e.target.value)} type="text" className="input input-bordered" /> */}
                                <input type="text" className="input input-bordered" />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleGoogleSignIn} className="btn btn-primary">
                                    Se connecter avec Google
                                </button>
                            </div>
                            {error && console.log(error)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
