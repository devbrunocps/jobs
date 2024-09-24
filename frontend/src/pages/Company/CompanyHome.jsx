import FirstAccess from '@/components/Companies/FirstAccess';
import Line from '@/components/Line/Line.jsx';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import config from '@/config/config';
import { AuthContext } from '@/context/AuthContext';
import { DataContext } from '@/context/DataContext';
import axios from 'axios';
import { Laptop2, UserCircle2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';  // Importe o Sheet
import { Input } from '@/components/ui/input';

const CompanyHome = () => {
    const data = useContext(DataContext);
    const auth = useContext(AuthContext);

    const [firstAccess, setFirstAccess] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const getFirstAccess = async () => {
            try {
                const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/companies/${data.formatCnpj(auth.user.cnpj)}`);
                setFirstAccess(response.data[0].first_access);
                setCompany(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };

        getFirstAccess();
    }, []);

    useEffect(() => {
        if (company?.company_id) {
            fetchJobs();
        }
    }, [company]);

    const fetchJobs = async () => {
        if (company?.company_id) {
            try {
                const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/jobs/company/${company.company_id}`);
                setJobs(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const isFirstAccess = firstAccess === 1;

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        jobType: 'Efetivo',
        workModel: 'Remoto',
        benefits: [''],
        salary: '',
        longDesc: '',
        lowDesc: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'benefits') {
            const benefitsArray = value.split(',').map((benefit) => benefit.trim());
            setFormData((prev) => ({ ...prev, benefits: benefitsArray }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${config.urlAxios}${config.portAxios}/api/companies/${data.formatCnpj(auth.user.cnpj)}`);
            const updatedFormData = {
                ...formData,
                company_id: response.data[0].company_id,
                company: response.data[0].company
            };
            await axios.post(`${config.urlAxios}${config.portAxios}/api/jobs`, updatedFormData);

            // Chama a função para buscar as vagas novamente
            fetchJobs();

            // Reseta o formulário
            setFormData({
                title: '',
                location: '',
                jobType: 'Efetivo',
                workModel: 'Remoto',
                benefits: [''],
                salary: '',
                longDesc: '',
                lowDesc: '',
            });
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div className={`w-full min-h-screen bg-primary-500 flex flex-col px-48 max-xl:px-32 max-lg:px-20 max-sm:px-6 gap-8 items-center ${firstAccess ? "justify-center py-0" : "py-8"}`}>
            {isFirstAccess && <FirstAccess setFirstAccess={setFirstAccess} />}

            {!isFirstAccess && (
                <>
                    <header className='w-full flex justify-between items-center'>
                        <a href="/" className="flex items-center gap-2">
                            <Laptop2 className="h-6 w-6 text-second-100" />
                            <span className="text-lg font-semibold font-mont text-second-100">TECJOB</span>
                        </a>

                        <UserCircle2 className="text-second-100 cursor-pointer" size={30} />
                    </header>

                    <div className='w-full py-4 flex justify-between gap-2'>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold text-second-100 font-mont uppercase'>Portal de vagas - {auth.user.name}</h1>
                            <p className='text-md font-mont text-second-300'>Você está na página da empresa</p>
                        </div>

                        {/* Adicionando o Sheet do Shadcn UI */}
                        <div className='w-full flex justify-end items-center gap-2'>
                            <Sheet >
                                <SheetTrigger asChild>
                                    <button className='bg-green-700 text-second-100 font-mont text-sm font-medium p-3 rounded-md uppercase'>
                                        Anunciar vaga
                                    </button>
                                </SheetTrigger>
                                <SheetContent className="flex flex-col dark text-second-100 overflow-auto scroll-style font-mont">
                                    <SheetHeader>
                                        <SheetTitle className="text-xl font-mont uppercase">Anunciar nova vaga</SheetTitle>
                                        <SheetDescription className="font-mont text-sm">Preencha as informações necessárias para anunciar uma nova vaga.</SheetDescription>
                                    </SheetHeader>
                                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-2">
                                            <label>Título da Vaga</label>
                                            <Input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Local</label>
                                            <Input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Tipo de Trabalho</label>
                                            <select
                                                name="jobType"
                                                value={formData.jobType}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400 p-3 rounded-md"
                                            >
                                                <option value="efetivo">Efetivo</option>
                                                <option value="estagio">Estágio</option>
                                                <option value="aprendiz">Aprendiz</option>
                                                <option value="trainee">Trainee</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Modelo de Trabalho</label>
                                            <select
                                                name="workModel"
                                                value={formData.workModel}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400 p-3 rounded-md"
                                            >
                                                <option value="remoto">Remoto</option>
                                                <option value="presencial">Presencial</option>
                                                <option value="hibrido">Híbrido</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Benefícios (separe com vírgulas)</label>
                                            <Input
                                                type="text"
                                                name="benefits"
                                                value={formData.benefits.join(', ')} // Mostra os benefícios como uma string
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Salário</label>
                                            <Input
                                                type="text"
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Descrição Resumida</label>
                                            <textarea
                                                name="lowDesc"
                                                value={formData.lowDesc}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400 p-3 rounded-md"
                                                maxLength={250}
                                                rows="3"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label>Descrição Completa</label>
                                            <textarea
                                                name="longDesc"
                                                value={formData.longDesc}
                                                onChange={handleChange}
                                                className="font-mont text-second-100 bg-primary-400 p-3 rounded-md"
                                                maxLength={250}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="bg-blue-600 text-second-100 p-3 rounded-md">Enviar</button>
                                    </form>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </>
            )}

            <Line style="w-[50%] h-[1px] bg-primary-100" />

            <div className='flex w-full justify-between'>
                {jobs.length > 0 && (
                    <div className='w-[40%] flex flex-col items-center gap-4'>
                        <span className='text-center text-lg font-mont font-semibold text-second-200'>VAGAS PUBLICADAS</span>
                        <Carousel className="dark text-second-100 flex justify-center max-w-xl">
                            <CarouselContent className="w-full flex justify-start ml-0 gap-16">
                                {jobs.map((job) => (
                                    <CarouselItem key={job.jobs_id} className='z-50 w-[28vw] rounded-md p-8 flex flex-col justify-between items-center gap-4 bg-primary-400 border-[1px] border-neutral-700 font-mont'>
                                        <UserCircle2 className="text-neutral-400 h-14 w-14" />
                                        <h3 className="text-lg font-mont font-semibold text-second-100 uppercase">{job.title}</h3>
                                        <span className="text-sm text-second-300">{job.lowDesc}</span>
                                        <span className="text-sm text-second-200">Candidatos: <span className='bg-primary-400 p-2 rounded-md shadow-lg font-medium text-sm'>{job.number_candidates} candidatos</span></span>
                                        <span className="text-sm text-second-200">Data de publicação: <span className='bg-primary-400 p-2 rounded-md shadow-lg font-medium text-sm'>{data.formatDate(job.createdAt)}</span></span>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext />
                            <CarouselPrevious />
                        </Carousel>
                    </div>
                )}

                {company && (
                    <div className='w-[40%] flex flex-col items-center gap-4'>
                        <span className='text-center text-lg font-mont font-semibold text-second-200'>SOBRE A EMPRESA</span>
                        <div className='w-full flex flex-col gap-5 bg-primary-300 p-4 rounded-lg border-[1px] border-neutral-700'>
                            <span className='text-lg font-mont font-semibold text-second-100 uppercase'>{company.name}</span>
                            <span className='text-md text-second-300 font-mont'>{company.about}</span>
                            <span className='text-md font-mont text-second-200'>Número de colaboradores: <span className='bg-primary-400 p-2 rounded-md shadow-lg font-medium text-sm'>{company.collaborators} colaboradores</span></span>
                            <span className='text-md font-mont text-second-200'>Ano de fundação: <span className='bg-primary-400 p-2 rounded-md shadow-lg font-medium text-sm'>{company.foundation}</span></span>
                            <span className='text-md font-mont text-second-200'>Localização: <span className='bg-primary-400 p-2 rounded-md shadow-lg font-medium text-sm'>{company.location}</span></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyHome;
