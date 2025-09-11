import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLoggedIn } from "../../_helpers/checkUserLoggedIn";
import { getUserInfo } from "../../_helpers/getUserInfo";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const navigate = useNavigate();

	useEffect(() => {
        const loggedIn = checkUserLoggedIn();
		if(loggedIn){
			let role = getUserInfo('role_name');
			if(!role){
				navigate('/sign-up-as');
			}
		}
    }, [ ]);

    return <div>{children}</div>;
};

export default AuthLayout;

