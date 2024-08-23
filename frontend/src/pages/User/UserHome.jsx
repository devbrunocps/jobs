// frontend/src/pages/Home.jsx
import InputSearch from '@/components/InputSearch/InputSearch';
import Line from '@/components/Line/Line';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AuthContext } from '@/context/AuthContext';
import { Laptop2, LogOut, LucideCircleUser, Search, UserCog2 } from 'lucide-react';
import React, { useContext, useState } from 'react';

const UserHome = () => {
    const auth = useContext(AuthContext)
    console.log(auth)

    const [screen, setScreen] = useState(1)

    const [searchJob, setSearchJob] = useState()

    return (
        <div className="w-full min-h-screen bg-primary-400 py-8 flex flex-col px-48 gap-8 items-center ">
            <header className='w-full flex justify-between items-center'>
                <a href="/" className="flex items-center gap-2">
                    <Laptop2 className="h-6 w-6 text-second-100" />
                    <span className="text-lg font-semibold font-mont text-second-100">JOBS IT</span>
                </a>
                <div className='flex bg-primary-100 p-1 rounded-md'>
                    <button onClick={() => setScreen(1)} className={`px-2 py-1 text-second-100 font-mont text-sm font-medium rounded-sm ${screen == 1 ? "bg-primary-400 hover:bg-primary-400" : "bg-transparent"}`}>VAGAS</button>
                    <button onClick={() => setScreen(2)} className={`px-2 py-1 text-second-100 font-mont text-sm font-medium rounded-sm ${screen == 2 ? "bg-primary-400 hover:bg-primary-00" : "bg-transparent"}`}>EMPRESAS</button>
                </div>
                <div className='flex gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <LucideCircleUser className='text-second-100 cursor-pointer' size={30} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark font-mont ">
                            <DropdownMenuItem className="flex gap-2">
                                <UserCog2 className='text-second-100' size={15} />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => auth.logout()} className="flex gap-2">
                                <LogOut className='text-second-100' size={15} />
                                <span>Sair</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <Line width="w-full" height="h-[0.1px]" style="bg-second-100" />

            {screen == 1 && <div className='w-full'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <span className='font-mont font-bold text-second-100 text-xl'>Vagas de TI</span>
                        <span className='font-mont text-second-300 text-md'> Encontre a sua próxima oportunidade</span>
                    </div>
                    <InputSearch onChange={(ev) => setSearchJob(ev.target.value)} value={searchJob} icon={<Search className='absolute text-second-100 ml-2' size={15} />} style="w-full px-8 rounded-md text-sm p-2 bg-primary-500 border-[1px] border-neutral-700 outline-none text-second-200 font-mont" placeholder="Pesquisar vagas..." />

                </div>
            </div>}
        </div>
    );
};

export default UserHome;
