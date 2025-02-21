import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../redux/store'; // Adjust the path to your store
import { checkUserLoggedIn } from "../_helpers/checkUserLoggedIn";
import { setUserRedux } from '../redux/userSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[]; // List of roles allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.user);
	//console.log('ProtectedRoute user', user);
	// Check if the user is logged in
	const loggedIn = checkUserLoggedIn();
    if (!loggedIn) {
        // Redirect to the login page if the user is not logged in
        return <Navigate to="/sign-in" replace />;
    }

	if (!user) {
        const localUser = localStorage.getItem('user');
        if (localUser) {
            const parsedUser = JSON.parse(localUser);
            dispatch(setUserRedux(parsedUser)); // Update Redux state
        } else {
            console.error('User not found in Redux or localStorage!');
            return <Navigate to="/sign-in" replace />;
        }
    }

	let userRole = user?.role_name || '';
	//console.log('ProtectedRoute userRole', userRole);
	//console.log('ProtectedRoute allowedRoles', allowedRoles);
    if (!allowedRoles.includes(userRole)) {
        // Redirect to home if the user doesn't have the right role
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;