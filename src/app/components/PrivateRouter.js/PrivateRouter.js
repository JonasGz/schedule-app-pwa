"use client";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRouter = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/register"];

  useEffect(() => {
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [user, pathname, publicRoutes]);
  return user || publicRoutes.includes(pathname) ? children : null;
};

export default PrivateRouter;
