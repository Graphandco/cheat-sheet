import React from 'react';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './components/Login';
import TipsList from './components/TipsList';
import CreateTip from './components/CreateTip';
import { TipsContextProvider } from './context/TipsContext';

function App() {
    return (
        <div>
            <AuthContextProvider>
                <TipsContextProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<TipsList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-tip" element={<CreateTip />} />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </TipsContextProvider>
            </AuthContextProvider>
        </div>
    );
}
export default App;
