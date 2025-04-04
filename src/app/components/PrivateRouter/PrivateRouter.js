"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/register"];
  const [authentication, setAuthentication] = useState(null);

  useEffect(() => {
    if (!loading) {
      setAuthentication(user);
      if (!user && !publicRoutes.includes(pathname)) {
        router.push("/");
      }
    }
  }, [user, loading, pathname, publicRoutes]);

  if (loading) {
    return <h3>Carregando...</h3>;
  }
  return authentication || publicRoutes.includes(pathname) ? children : null;
};

export default PrivateRouter;
