"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Loader from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMe, logout } from "@/lib/api/clientApi";

const PRIVATE_PREFIXES = ["/profile", "/notes"];

function isPrivatePath(pathname: string) {
  return PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setIsChecking(true);

      try {
        const sessionUser = await checkSession();

        if (!sessionUser) {
          clearIsAuthenticated();

          if (isPrivatePath(pathname)) {
            try {
              await logout();
            } catch {}
            router.replace("/sign-in");
          }

          return;
        }

        const me = await getMe();
        if (!cancelled) setUser(me);
      } catch {
        clearIsAuthenticated();

        if (isPrivatePath(pathname)) {
          router.replace("/sign-in");
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isChecking && isPrivatePath(pathname)) {
    return <Loader />;
  }

  return <>{children}</>;
}
