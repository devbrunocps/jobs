import { createContext, useState } from "react";

export const DataContext = createContext({})

export const DataContextProvider = ({ children }) => {

    // -------------------  STATES  ------------------------ //

    const [jobs, setJobs] = useState([

    ])

    const [companies, setCompanies] = useState([

    ])

    // --------------------  PROCESSING -------------------- //

    const formatCnpj = (cnpj) => {
        return cnpj.replace(/\D/g, '');
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR')
    }

    // -------------------  CONTEXT --------------------- //

    const data = {
        jobs,
        setJobs,
        companies,
        setCompanies,
        formatCnpj,
        formatDate,
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}