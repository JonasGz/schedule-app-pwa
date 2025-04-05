"use client";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "../Spinner/Spinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/register"];

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
        router.push("/");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <Spinner />
  }
  return user || publicRoutes.includes(pathname) ? children : null;
};

export default PrivateRouter;
