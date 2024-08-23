import { createContext, useState } from "react";

export const DataContext = createContext({})

export const DataContextProvider = ({ children }) => {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Product 1",
            subtitle: "100",
        },
    ])

    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "Company 1",
        }
    ])

    const data = {
        jobs,
        setJobs,
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}