import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    toast({
      title: 'Link enviado para email!',
      description: 'Um link de confirmação foi enviado para o seu email institucional.',
    });
  } 

  function handleSignIn() {
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader onSubmit={handleSubmit} className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <img src="/logoUfma.png" alt="Logo UFMA" className="w-8 h-8 object-contain" />
          </div>

          <div>
            <CardTitle className="text-2xl text-primary">
              Extensão UFMA
            </CardTitle>
            <CardDescription>
              Crie sua conta no sistema de extensão
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onClick={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="matricula"
                name="matricula"
                type="number"
                placeholder="Digite sua matrícula"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@ufma.br"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Já possui conta?{" "}
            <button
              type="button"
              onClick={handleSignIn}
              className="text-primary font-medium hover:underline"
            >
              Entrar
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
