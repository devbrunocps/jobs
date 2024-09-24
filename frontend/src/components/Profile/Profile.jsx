import React, { useContext, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SheetClose, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { LogOutIcon, User2 } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import config from '@/config/config';
import { Textarea } from '../ui/textarea';

const Profile = () => {
    const auth = useContext(AuthContext)

    const [name, setName] = useState(auth.user.name)
    const [email, setEmail] = useState(auth.user.email)
    const [about, setAbout] = useState(auth.user.about)

    const handleSave = async () => {
        try {
            await axios.put(`${config.urlAxios}${config.portAxios}/api/users/${email}`, { email, name, about })
            localStorage.setItem("name", name)
            localStorage.setItem("about", about)
            auth.user.name = name
            auth.user.about = about
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='w-full flex flex-col gap-4'>
            <SheetHeader>
                <SheetTitle>Perfil do Usuário</SheetTitle>
                <SheetDescription>Gerencie suas informações e configurações</SheetDescription>
            </SheetHeader>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                        <AvatarFallback><User2 /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium">{auth.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{auth.user.email}</p>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="space-y-6">
                <h4 className="font-medium text-sm">INFORMAÇÕES PESSOAIS</h4>
                <div className='flex flex-col gap-4'>
                    <div className="flex flex-col relative">
                        <Label className="absolute bg-primary-500 px-1 text-xs -top-2 left-4" htmlFor="name">NOME</Label>
                        <Input className="py-5" onChange={(ev) => setName(ev.target.value)} id="name" value={name} />
                    </div>
                    <div className="flex flex-col relative">
                        <Label className="absolute bg-primary-500 px-1 text-xs -top-2 left-4 z-50" htmlFor="email">E-MAIL</Label>
                        <Input className="py-5" id="email" value={email} disabled />
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col relative">
                <Label className="absolute bg-primary-500 px-1 text-xs -top-2 left-4 z-50" htmlFor="about">SOBRE MIM</Label>
                <Textarea onChange={(ev) => setAbout(ev.target.value)} className="py-2 scroll-style resize-none" id="about" value={about} maxLength={250} />
            </div>
            <Separator />
            <div className="flex items-center justify-center">
                <SheetClose className='text-green-500 border-green-500 border-[1px] w-full py-[7px] rounded-md text-sm font-medium transition duration-300 hover:bg-green-700 hover:border-green-700 hover:text-white' onClick={handleSave}>SALVAR</SheetClose>
            </div>
            <Separator />
            <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => auth.logout()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Sair
                </Button>
            </div>

        </div>
    )
}

export default Profile