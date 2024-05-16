import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/profile');
                if (data) {
                    console.log('User data:', data); // Log user data to check role
                    setUser(data);
                } else {
                    navigate('/login');
                }
            } catch {
                console.log('Error when setting user');
            }
        };
    
        fetchUser();
    }, [user]);
    

    const logout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
        
    );
}

export const useUser = () => useContext(UserContext); // Export a custom hook for accessing the user context
