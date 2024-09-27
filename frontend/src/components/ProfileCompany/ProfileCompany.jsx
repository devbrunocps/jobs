import { DataContext } from '@/context/DataContext'
import React, { useContext, useState } from 'react'
import { Label } from '../ui/label'
import { SheetClose, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Separator } from '../ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import config from '@/config/config'
import axios from 'axios'

const ProfileCompany = ({ company, onCompanyUpdate }) => {
    const [name, setName] = useState(company?.name)
    const [about, setAbout] = useState(company?.about)
    const [collaborators, setCollaborators] = useState(company?.collaborators)
    const [foundation, setFoundation] = useState(company?.foundation)
    const [location, setLocation] = useState(company?.location)
    const [phone, setPhone] = useState(company?.phone)

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const updatedCompany = {
            name,
            about,
            collaborators,
            foundation,
            location,
            phone,
        }

        try {
            await axios.put(`${config.urlAxios}${config.portAxios}/api/companies/${company.cnpj}`, updatedCompany)
            onCompanyUpdate(updatedCompany);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <SheetHeader className="flex flex-col">
                <SheetTitle>PERFIL DA EMPRESA</SheetTitle>
                <SheetDescription>Gerencie suas informações</SheetDescription>
            </SheetHeader>

            <Separator />

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full flex-col gap-1'>
                        <label className='text-second-100 uppercase text-sm' htmlFor='about'>NOME DA EMPRESA</label>
                        <input value={name} onChange={(ev) => setName(ev.target.value)} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='text' id='name' required />
                    </div>
                    <div className='flex w-full flex-col gap-1'>
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
                    <div className='flex w-full flex-col gap-1'>
                        <label className='text-second-100 uppercase text-sm' htmlFor='about'>ANO DE FUNDAÇÃO</label>
                        <input value={foundation} onChange={(ev) => setFoundation(ev.target.value)} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='number' id='about' required />
                    </div>
                </div>
                <div className='flex gap-4 w-full'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <label className='text-second-100 uppercase text-sm' htmlFor='about'>LOCAL</label>
                        <input onChange={(ev) => setLocation(ev.target.value)} value={location} className='bg-primary-400 outline-none border-[1px] text-sm border-neutral-700 rounded-md p-2' type='text' id='about' required />
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
                <SheetClose>
                    <div className='flex w-full justify-end'>
                        <button className='bg-primary-400 text-xs py-2 px-3  w-full border-[1px] border-neutral-700 rounded-md font-regular text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>ATUALIZAR</button>
                    </div>
                </SheetClose>
            </form>
        </div >
    )
}

export default ProfileCompany