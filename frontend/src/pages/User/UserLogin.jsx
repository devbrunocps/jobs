import { AuthContext } from "@/context/AuthContext"
import { useContext, useState } from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Laptop2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const UserLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const { fetchUserLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (email, password) {
            const response = await fetchUserLogin(email, password)
            if (response && response.status === 200) {
                navigate('/user')
            } else {
                setAlertMessage(response.data?.message || "Algo deu errado. Tente novamente.")
                setAlert(true)
            }
        } else {
            setAlertMessage("Preencha todos os campos obrigatórios.")
            setAlert(true)
        }
    }

    return (
        <div className="dark text-second-100 font-mont flex min-h-[100dvh] items-center justify-center bg-background gap-12 px-4 py-12 sm:px-6 lg:px-8">
            <a href="/" className="flex absolute top-8 left-8 items-center gap-2">
                <Laptop2 className="h-6 w-6" />
                <span className="text-lg font-semibold">JOBS IT</span>
            </a>
            <Card className="w-full flex flex-col justify-center max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Insira seu email e senha para acessar sua conta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input onChange={(ev) => setEmail(ev.target.value)} value={email} id="email" type="email" placeholder="exemplo@email.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input onChange={(ev) => setPassword(ev.target.value)} value={password} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={handleSubmit} className="w-full">Entrar</Button>
                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            Ainda não tem uma conta?{" "}
                            <a href="/user/register" className="font-medium text-primary hover:text-primary/90 cursor-pointer">
                                Criar conta
                            </a>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            {alert && (
                <AlertDialog open={alert} onOpenChange={setAlert}>
                    <AlertDialogTrigger />
                    <AlertDialogContent className="dark font-mont ">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-second-100">Erro no Login</AlertDialogTitle>
                            <AlertDialogDescription>
                                {alertMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button onClick={() => setAlert(false)}>Fechar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}

export default UserLogin