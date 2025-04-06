import { AuthProvider } from "../../contexts/AuthContext";
import { TaskProvider } from "../../contexts/TaskContext";
import "./globals.scss";
import RegisterServiceWorker from "./register-service-worker";

export const metadata = {
  title: "Schedule App - Agende sua tarefas!",
  description: "Create by P4N4SONIC",
  manifest: "/manifest.json",
  themeColor: "#502f7e",
  icons: {
    icon: "/icons/192x192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1e88e5" />
      <body>
        <AuthProvider>
          <TaskProvider>{children}</TaskProvider>
        </AuthProvider>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
