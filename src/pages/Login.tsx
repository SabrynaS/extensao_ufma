import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/ui/modal";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  function handleSignIn() {
    navigate("/sign-up");
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleSubmitRecoverPassword(e: React.FormEvent) {
    e.preventDefault();

    toast({
      title: "Recuperação de senha",
      description:
        "Instruções para recuperação de senha foram enviadas para o seu e-mail institucional.",
    });

    handleCloseModal();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = email.trim().toLowerCase();
    console.info("[Login] submitting email:", normalized);
    const ok = await login({ email: normalized, password });
    if (!ok) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <img src="/logoUfma.png" alt="Logo UFMA" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <CardTitle className="text-2xl text-primary">
              Extensão UFMA
            </CardTitle>
            <CardDescription>
              Sistema de Gerenciamento de Extensão
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@ufma.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-red-600">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Acessar Sistema"}
            </Button>

            <div className="flex align-center justify-center gap-1 text-sm">
              <p>Esqueceu sua senha?</p>
              <button
                type="button"
                onClick={handleOpenModal}
                className="text-primary hover:underline transition-colors"
              >
                Recuperar acesso
              </button>
            </div>

            <div className="flex align-center justify-center gap-1 text-sm">
              <p>Ainda não tem uma conta?</p>
              <button
                type="button"
                onClick={handleSignIn}
                className="text-primary hover:underline transition-colors"
              >
                Criar conta
              </button>
            </div>

            <div className="pt-4 border-t">
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/")}
              >
                Ir para tela de Inicio
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          icon={<CheckCircle />}
        >
          <form onSubmit={handleSubmitRecoverPassword}>
            <p>Digite seu e-mail institucional para recuperar sua senha.</p>
            <Input
              id="recovery-email"
              type="email"
              placeholder="Digite seu e-mail institucional"
              required
            />
            <div className="flex flex-row items-center justify-center gap-4">
              <Button type="submit" className="mt-4 w-2/4">
                Enviar
              </Button>
              <Button
                type="button"
                onClick={handleCloseModal}
                className="mt-4 w-2/4"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Login;
