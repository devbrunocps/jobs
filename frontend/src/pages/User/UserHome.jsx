// frontend/src/pages/Home.jsx
import InputSearch from '@/components/InputSearch/InputSearch';
import Line from '@/components/Line/Line';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthContext } from '@/context/AuthContext';
import { DataContext } from '@/context/DataContext';
import { Award, Laptop2, LogOut, LucideCircleUser, LucideCircleUserRound, Search, User2Icon, UserCog2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import JobsDetails from '../JobsDetails';
import Profile from '@/components/Profile/Profile';
import Applications from '@/components/Applications/Applications';
import axios from 'axios';
import config from '@/config/config';
import { useToast } from '@/components/hooks/use-toast';

const UserHome = () => {
    const data = useContext(DataContext)
    const auth = useContext(AuthContext)


    const [screen, setScreen] = useState(1)

    const [jobs, setJobs] = useState(data.jobs)
    const [companies, setCompanies] = useState(data.companies)

    const [updateJobs, setUpdateJobs] = useState(false)

    const [searchJob, setSearchJob] = useState("")
    const [searchCompany, setSearchCompany] = useState("")

    const { toast } = useToast();

    const showToast = () => {
        toast({
            title: 'AVISO!',
            description: "Você não possui candidaturas ativas.",
            className: "dark font-mont"
        });
    }

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/jobs`)
            setJobs(response.data)
            data.setJobs(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/companies`)
            setCompanies(response.data)
            data.setCompanies(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchJobs()
        fetchCompanies()
    }, [updateJobs])

    useEffect(() => {
        if (screen == 1) {
            if (searchJob === "") {
                setJobs(data.jobs);
            } else {
                const filteredJobs = data.jobs.filter(job =>
                    job.title.toLowerCase().includes(searchJob.toLowerCase()) ||
                    job.lowDesc.toLowerCase().includes(searchJob.toLowerCase()) ||
                    job.company.toLowerCase().includes(searchJob.toLowerCase())
                );
                setJobs(filteredJobs);
            }
        } else if (screen == 2) {
            if (searchCompany === "") {
                setCompanies(data.companies);
            } else {
                const filteredCompanies = data.companies.filter(company =>
                    company.name.toLowerCase().includes(searchCompany.toLowerCase())
                );
                setCompanies(filteredCompanies);
            }
        }
    }, [data.jobs, data.companies, searchJob, searchCompany, screen]);

    const getMyJobs = async () => {
        try {
            const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/users/jobs/my/${auth.user.email}`);
            auth.setUser({ ...auth.user, applications: response.data })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMyJobs();
    }, [auth.user.email])

    //FUNÇÃO DE CANDIDATURA A VAGA

    const applyToJob = async (jobId) => {
        console.log(jobId)

        try {
            const response = await axios.post(`${config.urlAxios}${config.portAxios}/api/jobs/apply`, { jobId, email: auth.user.email })
            if (response.data.duplicate == true) {
                toast({
                    title: 'AVISO!',
                    description: "Você já está candidatado para esta vaga.",
                    className: "dark font-mont"
                });
                return
            }

            if (response.status === 200) {
                toast({
                    title: 'SUCESSO!',
                    description: "Candidatura enviada com sucesso!",
                    className: "dark font-mont"
                });

                await getMyJobs()
                setUpdateJobs(!updateJobs)
            } else {
                toast({
                    title: 'ERRO!',
                    description: "Ocorreu um erro ao enviar a candidatura.",
                    className: "dark font-mont"
                });
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary-500 py-8 flex flex-col px-48 max-xl:px-32 max-lg:px-20 max-sm:px-6 gap-8 items-center ">
            <header className='w-full flex justify-between items-center'>
                <a href="/" className="flex items-center gap-2">
                    <Laptop2 className="h-6 w-6 max-sm:hidden text-second-100" />
                    <span className="text-lg max-sm:text-md font-semibold font-mont text-second-100">TECJOB</span>
                </a>
                <div className='flex bg-primary-100 p-1 rounded-md'>
                    <button onClick={() => setScreen(1)} className={`px-2 py-1 text-second-100 font-mont text-sm font-medium rounded-sm ${screen == 1 ? "bg-primary-400 hover:bg-primary-400" : "bg-transparent"}`}>VAGAS</button>
                    <button onClick={() => setScreen(2)} className={`px-2 py-1 text-second-100 font-mont text-sm font-medium rounded-sm ${screen == 2 ? "bg-primary-400 hover:bg-primary-00" : "bg-transparent"}`}>EMPRESAS</button>
                </div>
                <div className='flex gap-2 overflow-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <LucideCircleUserRound className='text-second-100 cursor-pointer' size={30} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark font-mont">
                            <DropdownMenuItem asChild>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <button className="flex hover:bg-primary-200 w-full items-center gap-2 px-2 py-[6px]">
                                            <UserCog2 className='text-second-100' size={15} />
                                            <span className='text-sm'>Meu Perfil</span>
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent className="px-4 dark bg-primary-500 font-mont flex flex-col text-second-100">
                                        <Profile />
                                    </SheetContent>
                                </Sheet>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                {auth.user?.applications?.length > 0 ? (
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <button className="flex hover:bg-primary-200 w-full items-center gap-2 px-2 py-[6px]">
                                                <Award className='text-second-100' size={15} />
                                                <span className='text-sm'>Minhas Candidaturas</span>
                                            </button>
                                        </DrawerTrigger>
                                        <DrawerContent className="max-sm:max-h-[85%] h-[85%] dark w-full font-mont flex flex-col items-center text-second-100">
                                            <Applications />
                                        </DrawerContent>
                                    </Drawer>
                                ) : (
                                    <button onClick={showToast} className="flex hover:bg-primary-200 w-full items-center gap-2 px-2 py-[6px]">
                                        <Award className='text-second-100' size={15} />
                                        <span className='text-sm'>Minhas Candidaturas</span>
                                    </button>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => auth.logout()} className="flex gap-2 py-[6px]">
                                <LogOut className='text-second-100' size={15} />
                                <span>Sair</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <Line width="w-full" height="h-[1px]" style="bg-second-100" />

            {screen == 1 &&
                <div className='w-full flex flex-col gap-8'>
                    <div className='flex flex-col'>
                        <span className='font-mont font-bold text-second-100 text-xl'>Vagas de TI</span>
                        <span className='font-mont text-second-300 text-md'> Encontre a sua próxima oportunidade</span>
                    </div>
                    <InputSearch onChange={(ev) => setSearchJob(ev.target.value)} value={searchJob} type="search" icon={<Search className='absolute text-second-100 ml-2' size={15} />} style="w-full px-8 rounded-md text-sm p-2 bg-primary-400 border-[1px] border-neutral-700 outline-none text-second-200 font-mont" placeholder="Pesquisar vagas..." />
                    <div className='w-full grid grid-cols-3 gap-x-4 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                        {jobs.length > 0 ? (
                            jobs.map((element) => {
                                return (
                                    <div key={element.jobs_id} className='w-full rounded-md p-4 flex flex-col justify-between gap-4 bg-primary-400 border-[1px] border-neutral-700 font-mont'>
                                        <div className='flex flex-col'>
                                            <span className='text-white font-bold text-md'>{element.title}</span>
                                            <span className='text-second-200 text-sm'>{element.lowDesc}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className='flex items-center gap-1'>
                                                <LucideCircleUser className='text-second-100' size={16} />
                                                <span className='text-second-100 text-sm'>{element.company}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <User2Icon className='text-second-100' size={16} />
                                                <span className='text-second-100 text-sm'>{element.number_candidates} Candidatos</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <Drawer>
                                                <DrawerTrigger>
                                                    <button className='bg-second-100 border-none text-sm p-2 rounded-md font-medium'>Ver detalhes</button>
                                                </DrawerTrigger>
                                                <DrawerContent className="dark w-screen max-sm:max-h-[90%] flex items-center">
                                                    <JobsDetails job={element} />
                                                </DrawerContent>
                                            </Drawer>
                                            <button onClick={() => applyToJob(element.jobs_id)} className='bg-primary-500 border-[1px] rounded-md border-neutral-700 text-second-100 text-sm p-2'>Candidatar-se</button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='font-mont text-second-100'>NÃO HÁ VAGAS REGISTRADAS.</div>
                        )}
                    </div>
                </div>
            }

            {screen == 2 &&
                <div className='w-full flex flex-col gap-8'>
                    <div className='flex flex-col'>
                        <span className='font-mont font-bold text-second-100 text-xl'>Empresas</span>
                        <span className='font-mont text-second-300 text-md'> Encontre as melhores empresas para você</span>
                    </div>
                    <InputSearch onChange={(ev) => setSearchCompany(ev.target.value)} value={searchCompany} type="search" icon={<Search className='absolute text-second-100 ml-2' size={15} />} style="w-full px-8 rounded-md text-sm p-2 bg-primary-400 border-[1px] border-neutral-700 outline-none text-second-200 font-mont" placeholder="Pesquisar empresas..." />
                    <div className='w-full grid grid-cols-3 gap-x-4 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                        {companies.length > 0 ? (
                            companies.map((element, i) => {
                                return (
                                    <div key={i} className='w-full rounded-md p-4 flex flex-col justify-between gap-4 bg-primary-400 border-[1px] border-neutral-700 font-mont'>
                                        <div className='flex flex-col'>
                                            <span className='text-white font-bold text-md'>{element?.name}</span>
                                            <span className='text-second-200 text-sm'>{element?.about}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <button className='bg-second-100 border-none text-sm p-2 rounded-md font-medium'>Ver vagas</button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='font-mont text-second-100'>NÃO HÁ EMPRESAS REGISTRADAS.</div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default UserHome;
