import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import config from "@/config/config";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Verifica a validade do token
            axios.post(`${config.urlAxios}${config.portAxios}/api/auth/validate-token`, { token })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        setUser({ token });
                    } else {
                        localStorage.removeItem("token"); // Remove tokens inválidos
                    }
                })
                .catch(() => {
                    localStorage.removeItem("token");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserLogin = async (email, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/user/login`, { email, password })
            const { token } = response.data
            localStorage.setItem("token", token)
            setUser({ token, email })
            return response;
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    const fetchUserRegister = async (name, email, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/user/register`, { name, email, password })
            const { token } = response.data
            localStorage.setItem("token", token)
            setUser({ token, name, email })
            return response;
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    const fetchCompanyLogin = async (cnpj, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/company/login`, { cnpj, password })
            const { token } = response.data
            localStorage.setItem("token", token)
            setUser({ token, cnpj })
            return response;
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    const fetchCompanyRegister = async (name, cnpj, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/company/register`, { name, cnpj, password })
            const { token } = response.data
            localStorage.setItem("token", token)
            setUser({ token, cnpj, name })
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, fetchUserLogin, fetchUserRegister, fetchCompanyLogin, fetchCompanyRegister, logout }}>
            {children}
        </AuthContext.Provider>
    )
}