"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ children, requireAuth = true, redirectTo = "/login" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token && requireAuth) {
          router.push(redirectTo);
          return;
        }

        if (token) {
          // Verify token by calling /auth/me
          await api.get("/auth/me");
          setIsAuthenticated(true);
        } else if (!requireAuth) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token is invalid, clear it and redirect
        localStorage.removeItem("access_token");
        if (requireAuth) {
          router.push(redirectTo);
        } else {
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0f1e] to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && requireAuth) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
