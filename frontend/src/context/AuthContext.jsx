import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import config from "@/config/config";
import { useToast } from "@/components/hooks/use-toast";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const { toast } = useToast()

    useEffect(() => {
        const tokenUser = localStorage.getItem("tokenUser");
        const tokenCompany = localStorage.getItem("tokenCompany");

        if (tokenUser || tokenCompany) {
            const token = tokenUser || tokenCompany;

            axios.post(`${config.urlAxios}${config.portAxios}/api/auth/validate-token`, { token })
                .then(response => {
                    if (response.status === 200) {
                        let name = "";
                        let email = "";
                        let cnpj = "";

                        if (tokenUser) {
                            name = localStorage.getItem("nameUser");
                            email = localStorage.getItem("emailUser");
                        } else if (tokenCompany) {
                            name = localStorage.getItem("nameCompany");
                            cnpj = localStorage.getItem("cnpjCompany");
                        }

                        const about = localStorage.getItem("about");
                        setUser({ token, name, email, cnpj, about });
                    } else {
                        clearLocalStorage();
                    }
                })
                .catch(() => {
                    clearLocalStorage();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const clearLocalStorage = () => {
        localStorage.removeItem("tokenUser");
        localStorage.removeItem("nameUser");
        localStorage.removeItem("emailUser");
        localStorage.removeItem("tokenCompany");
        localStorage.removeItem("nameCompany");
        localStorage.removeItem("cnpjCompany");
        localStorage.removeItem("about");
    };

    const fetchUserLogin = async (email, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/user/login`, { email, password });
            const { token, name, email: userEmail } = response.data;

            localStorage.setItem("tokenUser", token);
            localStorage.setItem("nameUser", name);
            localStorage.setItem("emailUser", userEmail);

            setUser({ token, name, email: userEmail });
            return response;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const fetchUserRegister = async (name, email, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/user/register`, { name, email, password });
            const { token } = response.data;

            localStorage.setItem("tokenUser", token);
            localStorage.setItem("nameUser", name);
            localStorage.setItem("emailUser", email);

            setUser({ token, name, email });
            return response;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const fetchCompanyLogin = async (cnpj, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/company/login`, { cnpj, password });
            const { token, name, cnpj: companyCnpj } = response.data;

            localStorage.setItem("tokenCompany", token);
            localStorage.setItem("nameCompany", name);
            localStorage.setItem("cnpjCompany", companyCnpj);

            setUser({ token, name, cnpj: companyCnpj });
            return response;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const fetchCompanyRegister = async (name, cnpj, password) => {
        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/auth/company/register`, { name, cnpj, password });
            const { token } = response.data;

            localStorage.setItem("tokenCompany", token);
            localStorage.setItem("nameCompany", name);
            localStorage.setItem("cnpjCompany", cnpj);

            setUser({ token, name, cnpj });
            return response;
        } catch (error) {
            toast({
                title: "Falha ao cadastrar",
                description: error.response.data.message,
                duration: 5000,
                className: "dark font-mont text-second-100 text-sm uppercase"
            })
        }
    };

    const logout = () => {
        clearLocalStorage();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchUserLogin, fetchUserRegister, fetchCompanyLogin, fetchCompanyRegister, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
