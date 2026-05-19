
import PricingCard from "./PricingCard";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";


export default function Plans() {

 const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (

    <section className="py-24 md:py-48 px-4 bg-vibrant relative overflow-hidden">
      {/* Geometric Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto">
          <RevealText className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6">ESCOLHA SEU <span className="neon-text">PLANO</span></h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Soluções escaláveis para cada etapa do seu negócio digital.</p>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard
              name="Starter"
              price="80,90"
              oldPrice="120,00"
              variant={["bestSeller", "discount6Meses"]}
              features={[
                "1 Página",
                "Landing Page Responsiva",
                "Hospedagem em Vercel, GitHub Pages ou Cloudflare Pages",
                "Integração com WhatsApp",
                "Formulário de Contato",
                "SEO Básico",
                "Certificado SSL",
                "Suporte Básico"
              ]}
              delay={0.1}
            />
            <PricingCard
              name="Premium"
              price="250,00"
              variant={["popular"]}
              features={[
                "Até 3 Páginas",
                "Plataformas Modernas (WordPress/Bubble)",
                "Hospedagem Gerenciada",
                "Domínio Personalizado",
                "Integração Social Medias",
                "Formulários Avançados",
                "Otimização de Performance",
                "Suporte Intermediário"
              ]}
              delay={0.2}
            />
            <PricingCard
              name="Ultra"
              price="590,00"
              features={[
                "Estrutura Avançada",
                "Painel Administrativo por CMS",
                "Configuração WordPress Completa",
                "Integração com Gestão",
                "Design e UX Estratégico",
                "Suporte Prioritário",
                "Manutenção Avançada"
              ]}
              delay={0.3}
            />
            <PricingCard
              name="Business Lite"
              price="1.100,90"
              features={[
                "Estrutura Empresarial Completa",
                "Hospedagem Premium Gerenciada",
                "Soluções Modernas & Omnichannel",
                "Integração com Recursos de IA",
                "Automação Inteligente",
                "Implementação de E-commerce",
                "SEO Avançado",
                "Suporte e Manutenção Máxima"
              ]}
              delay={0.4}
            />
            {/* Container Information */  }
            <div className="container-pricing col-span-full">
              <div className="text-zinc-500 text-sm font-light text-center mt-12 flex flex-col gap-2">
                <p>
                  Planos com desconto valendo até 6 meses, o valor integral será cobrado a partir do 7º mês.
                  <span className="text-gray-700"> Preços em reais (R$)</span> e válidos apenas para pagamento no Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};