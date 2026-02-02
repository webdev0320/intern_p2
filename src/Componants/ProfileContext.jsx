import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("user_id");
    if(userId){
        useEffect(() => {
            const fetchProfile = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/?id=${localStorage.getItem("user_id")}`
                    );
                    const data = await response.json();
                    setProfile(data);
                } catch (err) {
                    console.error("Profile fetch failed", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        }, []);
    }
    return (
        <ProfileContext.Provider value={{ profile, setProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
