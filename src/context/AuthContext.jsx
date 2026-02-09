import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProfileData(token);
    } else {
      setUserData(null);
    }
  }, [token]);

  async function getProfileData(token) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.message === "success") {
        setUserData(data.user);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ token: token, setToken, userData, getProfileData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
