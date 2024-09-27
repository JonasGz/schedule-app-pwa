import { AuthProvider } from "../../contexts/AuthContext";
import { TaskProvider } from "../../contexts/TaskContext";
import "./globals.scss";
import RegisterServiceWorker from "./register-service-worker";

export const metadata = {
  title: "Schedule App",
  description: "Create by P4N4SONIC",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TaskProvider>{children}</TaskProvider>
        </AuthProvider>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
