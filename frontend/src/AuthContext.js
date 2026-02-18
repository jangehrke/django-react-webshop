import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {api} from "./api/api";
import {useAlert} from "./components/alerts/AlertContext";


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({isAuthenticated: true});
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/token/', {
                email,
                password
            });
            const {access, refresh} = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setUser({isAuthenticated: true});
            showAlert('success', "Successfully logged in!");
            return true;
        } catch (error) {
            showAlert('danger', "Invalid email or password!");
            console.error('Login failed: ', error.response?.data || error);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        showAlert('success', "Successfully logged out!");
    };

    const register = async (email, password, confirmPassword) => {
        try {
            await api.post('/auth/register', {
                email,
                password,
                confirmPassword
            })
            showAlert('success', "Successfully created an account!");
            return await login(email, password)
        } catch (error) {
            showAlert('danger', "Register failed");
            console.error('Register failed: ', error.response?.data || error);
            return false
        }


    }

    const value = {
        user,
        login,
        logout,
        register,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}