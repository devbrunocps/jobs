import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Laptop2 } from "lucide-react"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const UserRegister = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const { fetchUserRegister } = useContext(AuthContext)

    const handleSubmit = async () => {
        if (name, email, password, confirmPassword) {
            if (password === confirmPassword) {
                const result = await fetchUserRegister(name, email, password)
                setAlertMessage(result.data.message)
                setAlert(true)
                setEmail("")
                setName("")
                setPassword("")
                setConfirmPassword("")
            } else {
                setAlertMessage("As senhas não conferem.")
                setAlert(true)
            }
        } else {
            setAlertMessage("Preencha todos os campos obrigatórios.")
            setAlert(true)
        }
    }

    return (
        <div className="dark text-second-100 font-mont flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <a href="/" className="flex absolute top-8 left-8 items-center gap-2">
                <Laptop2 className="h-6 w-6" />
                <span className="text-lg font-semibold">TECJOB</span>
            </a>
            <Card className="w-full flex flex-col justify-center max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Cadastro</CardTitle>
                    <CardDescription>Preencha os campos abaixo para criar sua conta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input onChange={(ev) => setName(ev.target.value)} value={name} id="name" type="text" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input onChange={(ev) => setEmail(ev.target.value)} value={email} id="email" type="email" placeholder="exemplo@email.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input onChange={(ev) => setPassword(ev.target.value)} value={password} id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Confirmação de senha</Label>
                        <Input onChange={(ev) => setConfirmPassword(ev.target.value)} value={confirmPassword} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={handleSubmit} className="w-full">Cadastrar</Button>
                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            Já tem uma conta?{" "}
                            <a href="/user/login" className="font-medium text-primary hover:text-primary/90 cursor-pointer">
                                Fazer login
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
                            <AlertDialogTitle className="text-second-100">INFORMAÇÃO</AlertDialogTitle>
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

export default UserRegister