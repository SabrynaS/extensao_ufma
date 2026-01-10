import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Inscrição Aprovada",
    description: "Sua inscrição para o Workshop de Python foi aprovada!",
    timestamp: "Há 2 horas",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Nova Oportunidade Disponível",
    description: "Uma nova oportunidade de extensão que corresponde ao seu perfil foi publicada.",
    timestamp: "Há 5 horas",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Prazo de Inscrição Próximo",
    description: "O prazo para inscrição no Seminário de Tecnologia termina em 2 dias.",
    timestamp: "Há 1 dia",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Certificado Gerado",
    description: "Seu certificado de participação está disponível para download.",
    timestamp: "Há 3 dias",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    // Show details
    setSelectedNotification({ ...notification, read: true });
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <AppLayout breadcrumb={["Início", "Notificações"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
            <p className="mt-1 text-muted-foreground">
              Você tem {unreadCount} notificação{unreadCount !== 1 ? "s" : ""} não lida{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline">Marcar tudo como lido</Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.read ? "border-primary/50 bg-primary/5" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getBackgroundColor(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Sem notificações
                </h3>
                <p className="text-muted-foreground">
                  Você está em dia! Nenhuma notificação no momento.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <Card className="w-full max-w-md transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getBackgroundColor(
                      selectedNotification.type
                    )}`}
                  >
                    {getIcon(selectedNotification.type)}
                  </div>
                  <CardTitle className="text-lg">{selectedNotification.title}</CardTitle>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Detalhes</p>
                <p className="text-foreground">{selectedNotification.description}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Data e Hora</p>
                <p className="text-sm text-foreground">{selectedNotification.timestamp}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" onClick={closeModal}>
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
