import React, { useContext, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { Laptop2 } from 'lucide-react'
import axios from 'axios'
import config from '@/config/config'
import { AuthContext } from '@/context/AuthContext'
import { DataContext } from '@/context/DataContext'

const FirstAccess = ({setFirstAccess}) => {
    const data = useContext(DataContext)
    const auth = useContext(AuthContext)

    const [about, setAbout] = useState('')
    const [collaborators, setCollaborators] = useState('1-10')
    const [foundation, setFoundation] = useState(null)
    const [local, setLocal] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        // Validações
        const validation = [about, collaborators, foundation, local, phone]

        if (validation.forEach(item => item === '' || item === null)) {
            alert('Todos os campos são obrigatórios')
            return
        }

        console.log(auth)

        const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/companies/complete-register`, {
            about,
            collaborators,
            foundation,
            local,
            phone,
            cnpj: data.formatCnpj(auth.user.cnpj),
            firstAccess: false
        })

        if (response.status === 200) {
            alert('Cadastro realizado com sucesso!')
            setAbout("")
            setCollaborators("1-10")
            setFoundation(null)
            setLocal("")
            setPhone("")

            setFirstAccess(false)
        } else {
            alert('Houve um erro ao realizar o cadastro. Tente novamente.')
        }
    }

    return (
        <Card className="dark font-mont">
            <a href="/" className="flex absolute top-8 left-8 items-center gap-2" prefetch={false}>
                <Laptop2 className="h-6 w-6" />
                <span className="text-lg font-semibold">TECJOB</span>
            </a>
            <CardHeader>
                <CardTitle>COMPLETE O CADASTRO DA EMPRESA</CardTitle>
                <CardDescription>Preencha todas as informações para completar o cadastro de sua empresa</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <div className='flex w-1/2 flex-col gap-1'>
                            <label className='text-second-100 uppercase text-sm' htmlFor='about'>NÚMERO DE FUNCIONÁRIOS</label>
                            <Select onValueChange={setCollaborators} defaultValue='1-10'>
                                <SelectTrigger className="bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2">{collaborators}</SelectTrigger>
                                <SelectContent className="dark font-mont text-sm">
                                    <SelectItem value="1-10">1-10</SelectItem>
                                    <SelectItem value="11-50">11-50</SelectItem>
                                    <SelectItem value="51-100">51-100</SelectItem>
                                    <SelectItem value="101-500">101-500</SelectItem>
                                    <SelectItem value="501-999">501-999</SelectItem>
                                    <SelectItem value="999+">999+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex w-1/2 flex-col gap-1'>
                            <label className='text-second-100 uppercase text-sm' htmlFor='about'>ANO DE FUNDAÇÃO</label>
                            <input value={foundation} onChange={(ev) => setFoundation(ev.target.value)} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='number' id='about' required />
                        </div>
                    </div>
                    <div className='flex gap-4 w-full'>
                        <div className='flex flex-col w-1/2 gap-1'>
                            <label className='text-second-100 uppercase text-sm' htmlFor='about'>LOCAL</label>
                            <input onChange={(ev) => setLocal(ev.target.value)} value={local} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='text' id='about' required />
                        </div>
                        <div className='flex flex-col w-1/2 gap-1'>
                            <label className='text-second-100 uppercase text-sm' htmlFor='about'>TELEFONE</label>
                            <input onChange={(ev) => setPhone(ev.target.value)} value={phone} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='tel' id='about' required />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-second-100 uppercase text-sm' htmlFor='about'>Fale um pouco sobre a empresa</label>
                        <textarea value={about} onChange={(ev) => setAbout(ev.target.value)} className='bg-primary-400 min-h-28 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='text' id='about' required />
                    </div>
                    <div className='flex w-full justify-end'>
                        <button className='bg-primary-400 text-xs py-2 px-3 border-[1px] border-neutral-700 rounded-md font-regular text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>FINALIZAR CADASTRO</button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default FirstAccess