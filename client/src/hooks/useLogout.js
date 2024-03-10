// useLogout.js
import { useContext } from "react";
import { useUserContext } from './useUserContext';

const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = () => {
        // Dispatch action to clear access token
        dispatch({ type: 'CLEAR_ACCESSTOKEN' });

        // Redirect to home page
        window.location.href = '/'; // Assuming '/' is your home page URL
    };

    return logout;
};

export default useLogout;
