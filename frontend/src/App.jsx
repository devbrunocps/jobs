import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { DataContextProvider } from "./context/DataContext"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "./components/ui/toaster"

function App() {
    return (
        <DataContextProvider>
            <AuthProvider>
                <ToastProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                </ToastProvider>
            </AuthProvider>
        </DataContextProvider>
    )
}

export default App
