import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "O que é o sistema de Extensão UFMA?",
    answer:
      "O Sistema de Extensão UFMA é uma plataforma integrada para gerenciar atividades extensionistas da Universidade Federal do Maranhão. Ele conecta alunos, professores e coordenadores em um espaço único para publicação, gerenciamento e participação em oportunidades de extensão.",
  },
  {
    question: "Como me inscrevo em uma oportunidade?",
    answer:
      "Para se inscrever em uma oportunidade, primeiro você precisa fazer login no sistema. Acesse o menu 'Oportunidades', encontre a oportunidade de seu interesse e clique no botão 'Inscrever-se'. Se você não tem uma conta, clique em 'Criar Conta' para se cadastrar.",
  },
  {
    question: "Como faço para criar uma conta?",
    answer:
      "Clique no botão 'Entrar' no canto superior direito, depois em 'Criar Conta'. Preencha seus dados pessoais, informações de contato e escolha uma senha segura. Após preencher todos os campos obrigatórios, clique em 'Registrar' para criar sua conta.",
  },
  {
    question: "Como acompanho minhas solicitações?",
    answer:
      "Faça login em sua conta e acesse o painel 'Minhas Solicitações' no menu principal. Lá você poderá ver o status de todas as suas inscrições em oportunidades, incluindo pendentes, aprovadas ou rejeitadas.",
  },
  {
    question: "Como obtenho um certificado de participação?",
    answer:
      "Após participar de uma atividade de extensão, o coordenador da atividade gerará seu certificado. Você poderá acessar todos os seus certificados na seção 'Certificados' do seu painel. Você também pode validar certificados de terceiros usando a ferramenta de validação no site.",
  },
  {
    question: "Posso editar minha inscrição após enviar?",
    answer:
      "Sim, enquanto sua inscrição estiver com status 'Pendente', você poderá editar suas informações. Após ser aprovada ou rejeitada, a inscrição não poderá mais ser editada. Se necessário, você pode criar uma nova inscrição.",
  },
  {
    question: "Quais são as diferenças entre os tipos de usuários?",
    answer:
      "O sistema possui 4 tipos de usuários: Alunos (participam de oportunidades), Docentes (gerenciam grupos de pesquisa/extensão), Coordenadores (aprovam inscrições e gerenciam oportunidades) e Administradores (gerenciam o sistema). Cada tipo tem diferentes permissões e funcionalidades.",
  },
  {
    question: "Como faço para recuperar minha senha?",
    answer:
      "Na página de login, clique em 'Esqueceu sua senha?'. Insira o email associado à sua conta. Você receberá um email com instruções para resetar sua senha. Acesse o link e crie uma nova senha segura.",
  },
  {
    question: "O sistema é seguro? Meus dados estão protegidos?",
    answer:
      "Sim, o sistema utiliza criptografia SSL/TLS para proteger a comunicação entre seu navegador e o servidor. Suas informações pessoais são armazenadas de forma segura e nunca são compartilhadas com terceiros sem sua autorização.",
  },
  {
    question: "Preciso de ajuda ou tenho um problema. O que faço?",
    answer:
      "Se encontrar algum problema ou tiver dúvidas adicionais, entre em contato com o departamento de Extensão da UFMA através do email extensao@ufma.br ou visite o campus para falar com um coordenador. Você também pode abrir um ticket de suporte diretamente no sistema.",
  },
];

export function Help() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Centro de Ajuda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais frequentes sobre o sistema
            de Extensão UFMA.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent transition-colors text-left"
                >
                  <h3 className="font-semibold text-foreground pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-border bg-muted/50">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato com nosso time de suporte para obter ajuda
              adicional.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
    
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/")}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Help;
