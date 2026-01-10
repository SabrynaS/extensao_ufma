export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <img src="/logoUfma.png" alt="Logo UFMA" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <span className="text-lg font-bold text-card-foreground">
                Extensão UFMA
              </span>
            </div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Sistema integrado de gestão de atividades extensionistas da
            Universidade Federal do Maranhão.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Universidade Federal do Maranhão. Todos
            os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
