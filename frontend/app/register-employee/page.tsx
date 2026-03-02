"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock } from "lucide-react";

export default function RegisterEmployee() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page immediately
        router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0f1e] to-black">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                    <Lock className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Access Restricted</h1>
                <p className="text-gray-400 mb-6">Employee registration is not available.</p>
                <p className="text-sm text-gray-500">Please contact your administrator for employee access.</p>
            </div>
        </div>
    );
}
