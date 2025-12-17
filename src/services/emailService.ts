import { AdminUser } from "../data/mockData";

export const emailService = {
  sendInitialCredentials: async (user: AdminUser) => {
    // mock: apenas loga, preserve a ideia de envio de e-mail
    await new Promise((r) => setTimeout(r, 200));
    /* exemplo de conteúdo enviado:
       Para: user.email
       Assunto: Credenciais iniciais - Extensão UFMA
       Corpo: Olá {user.name}, suas credenciais: usuário = {user.email}, senha = [temporária]
    */
    // use console para inspeção no ambiente dev
    // eslint-disable-next-line no-console
    console.info("[mock email] initial credentials sent to", user.email, { user });
    return true;
  },
};