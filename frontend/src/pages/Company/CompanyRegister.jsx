import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Laptop2 } from "lucide-react"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { DataContext } from "@/context/DataContext"

const CompanyRegister = () => {
    const data = useContext(DataContext)
    
    const [name, setName] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { fetchCompanyRegister } = useContext(AuthContext)

    const formatCNPJ = (ev) => {
        // Remove todos os caracteres que não são dígitos
        const cleanedValue = ev.target.value.replace(/\D/g, '');

        // Formata o CNPJ
        const formattedValue = cleanedValue
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");

        setCnpj(formattedValue);
    }

    const handleSubmit = async () => {
        if (name, cnpj, password, confirmPassword) {
            const cnpjFormatted = data.formatCnpj(cnpj)
            if (password === confirmPassword) {
                const result = await fetchCompanyRegister(name, cnpjFormatted, password)
                console.log(result)
            } else {
                alert("As senhas não conferem.")
            }
        } else {
            alert("Todos os campos são obrigatórios.")
        }
    }

    return (
        <div className="dark text-second-100 font-mont flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <a href="/" className="flex absolute top-8 left-8 items-center gap-2" prefetch={false}>
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
                        <Label htmlFor="name">NOME DA EMPRESA</Label>
                        <Input onChange={(ev) => setName(ev.target.value)} value={name} id="name" type="name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input onChange={formatCNPJ} value={cnpj} id="cnpj" type="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" maxLength={18} required />
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
                            <a href="/company/login" className="font-medium text-primary hover:text-primary/90 cursor-pointer" prefetch={false}>
                                Fazer login
                            </a>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CompanyRegister