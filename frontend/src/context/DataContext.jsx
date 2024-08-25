import { createContext, useState } from "react";

export const DataContext = createContext({})

export const DataContextProvider = ({ children }) => {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Full Stack Developer",
            company: "Tech Innovators",
            location: "São Paulo, SP",
            salary: "R$ 7.000 - R$ 10.000",
            lowDesc: "Desenvolver e manter aplicações web utilizando JavaScript, Node.js, e React.",
            longDesc: "Responsável por desenvolver, testar e implementar novas funcionalidades em aplicações web. Trabalhar em colaboração com equipes de design e backend para criar soluções escaláveis e de alta performance. Manter código limpo e documentado, seguindo as melhores práticas do mercado.",
            jobType: "Efetivo",
            benefits: ["Vale Refeição", "Assistência Médica", "Seguro de Vida"],
            workModel: "Remoto",
            candidates: 52,
            createdAt: "2024-10-18"
        },
        {
            id: 2,
            title: "Data Analyst",
            company: "Data Insights",
            location: "Rio de Janeiro, RJ",
            salary: "R$ 5.000 - R$ 8.000",
            lowDesc: "Analisar e interpretar grandes volumes de dados para ajudar na tomada de decisões estratégicas.",
            longDesc: "Realizar a coleta, tratamento e análise de grandes volumes de dados utilizando ferramentas como SQL, Python e Tableau. Desenvolver dashboards e relatórios para acompanhar os principais indicadores de desempenho e fornecer insights acionáveis para diferentes áreas da empresa.",
            jobType: "Efetivo",
            benefits: ["Vale Alimentação", "Assistência Odontológica", "Participação nos Lucros"],
            workModel: "Híbrido",
            candidates: 52,
            createdAt: "2024-10-18"
        },
        {
            id: 3,
            title: "Project Manager",
            company: "Global Solutions",
            location: "Belo Horizonte, MG",
            salary: "R$ 10.000 - R$ 15.000",
            lowDesc: "Gerenciar e coordenar projetos complexos, garantindo a entrega dentro do prazo e do orçamento.",
            longDesc: "Planejar, executar e finalizar projetos de acordo com os prazos, orçamento e escopo definidos. Gerenciar equipes multidisciplinares e stakeholders, identificando riscos e oportunidades para garantir o sucesso do projeto. Realizar a comunicação constante com os clientes e lideranças para alinhamento das expectativas.",
            jobType: "Efetivo",
            benefits: ["Vale Transporte", "Assistência Médica", "Bônus Anual"],
            workModel: "Presencial",
            candidates: 52,
            createdAt: "2024-10-18"
        },
        {
            id: 4,
            title: "UX/UI Designer",
            company: "Creative Studio",
            location: "Curitiba, PR",
            salary: "R$ 6.000 - R$ 9.000",
            lowDesc: "Criar e aprimorar a experiência do usuário em plataformas digitais, focando na interface e usabilidade.",
            longDesc: "Desenvolver wireframes, protótipos e layouts de alta fidelidade para projetos web e mobile. Colaborar com equipes de desenvolvimento para garantir que o design seja implementado conforme planejado. Realizar pesquisas com usuários e testes de usabilidade para validar hipóteses de design e iterar soluções.",
            jobType: "Efetivo",
            benefits: ["Vale Refeição", "Horário Flexível", "Day Off"],
            workModel: "Remoto",
            candidates: 52,
            createdAt: "2024-10-18"
        },
        {
            id: 5,
            title: "Information Security Specialist",
            company: "SecureTech",
            location: "Brasília, DF",
            salary: "R$ 12.000 - R$ 18.000",
            lowDesc: "Garantir a segurança e integridade das informações da empresa, implementando políticas e práticas de segurança.",
            longDesc: "Desenvolver e implementar políticas de segurança da informação alinhadas às melhores práticas do mercado. Monitorar e responder a incidentes de segurança, realizando investigações e propondo soluções para mitigar riscos. Trabalhar com equipes internas para garantir a conformidade com normas e regulamentações de segurança.",
            jobType: "Efetivo",
            benefits: ["Assistência Médica", "Auxílio Home Office", "Seguro de Vida"],
            workModel: "Híbrido",
            candidates: 52,
            createdAt: "2024-10-18"
        }
    ])

    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "Tech Innovators",
            about: "Uma empresa líder em soluções tecnológicas, especializada em desenvolvimento de software inovador para diversos setores."
        },
        {
            id: 2,
            name: "Data Insights",
            about: "Focada em análise de dados, a Data Insights ajuda empresas a tomar decisões estratégicas com base em dados precisos e relevantes."
        },
        {
            id: 3,
            name: "Global Solutions",
            about: "Consultoria global que oferece soluções em gestão de projetos e operações para grandes corporações."
        },
        {
            id: 4,
            name: "Creative Studio",
            about: "Agência de design que cria experiências digitais centradas no usuário, com foco em UX/UI design."
        },
        {
            id: 5,
            name: "SecureTech",
            about: "Especializada em segurança da informação, a SecureTech protege dados sensíveis de empresas com soluções avançadas."
        }
    ])

    const data = {
        jobs,
        setJobs,
        companies,
        setCompanies,
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}