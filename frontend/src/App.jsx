import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { DataContextProvider } from "./context/DataContext"
import { AuthProvider } from "./context/AuthContext"

function App() {
    return (
        <DataContextProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </DataContextProvider>
    )
}

export default App
