import React from 'react';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Header from './components/Header';
import Login from './components/Login';
import CreateTip from './components/CreateTip';
import { TipsContextProvider } from './context/TipsContext';
import TipEdit from './components/TipEdit';
import MyTips from './components/MyTips';
import TipPending from './components/TipPending';
import Stats from './components/Stats';
import Home from './components/Home';
import AllTips from './components/AllTips';

function App() {
    return (
        <div>
            <AuthContextProvider>
                <TipsContextProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/add-tip"
                            element={
                                <ProtectedRoute>
                                    <CreateTip />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/edit-tip/:id"
                            element={
                                <ProtectedRoute>
                                    <TipEdit />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-tips"
                            element={
                                <ProtectedRoute>
                                    <MyTips />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/contributions"
                            element={
                                <ProtectedRoute>
                                    <Stats />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/a-valider"
                            element={
                                <ProtectedAdminRoute>
                                    <TipPending />
                                </ProtectedAdminRoute>
                            }
                        />
                        <Route
                            path="/all-tips"
                            element={
                                <ProtectedAdminRoute>
                                    <AllTips />
                                </ProtectedAdminRoute>
                            }
                        />
                    </Routes>
                </TipsContextProvider>
            </AuthContextProvider>
        </div>
    );
}
export default App;
