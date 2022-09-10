/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { isUserAdmin } = UserAuth();
    const isAdmin = isUserAdmin();

    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedAdminRoute;
