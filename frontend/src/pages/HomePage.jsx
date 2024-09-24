import React from 'react'
import { Laptop2 } from 'lucide-react'
import Background from "@/assets/image.jpg"

const HomePage = () => {
    return (
        <div className="flex min-h-screen w-[100vw] flex-col bg-background dark text-white font-mont">
            <img src={Background} alt="" className='fixed w-full filter brightness-[10%] bg-contain'/>
            <header className="relative top-0 z-50 bg-background px-4 py-3 shadow-sm md:px-6 lg:px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2" prefetch={false}>
                        <Laptop2 className="h-6 w-6" />
                        <span className="text-lg font-semibold">TECJOB</span>
                    </a>
                    <div className="flex items-center gap-4">
                        <a
                            href="/user/login"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            prefetch={false}
                        >
                            Candidatos
                        </a>
                        <a
                            href="/company/login"
                            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            prefetch={false}
                        >
                            Empresas
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-1 z-50">
                <section className="container mx-auto py-12 md:py-24 lg:py-32">
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Encontre o candidato ou a empresa perfeita
                            </h1>
                            <p className="text-muted-foreground md:text-xl">
                                TECJOB é a plataforma líder em conectar os melhores talentos com empresas líderes no mercado de TI.
                                Junte-se a nós hoje e leve sua carreira ou sua empresa para outro patamar.
                            </p>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <a
                                    href="/user/login"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    prefetch={false}
                                >
                                    Candidatos
                                </a>
                                <a
                                    href="/company/login"
                                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    prefetch={false}
                                >
                                    Empresas
                                </a>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </main>
            <footer className="z-50 bg-background py-6 text-center text-xs text-muted-foreground">
                <div className="container mx-auto">&copy; 2024 TECJOB. Todos os direitos reservados.</div>
            </footer>
        </div>
    )
}

export default HomePage