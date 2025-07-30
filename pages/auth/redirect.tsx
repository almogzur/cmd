// pages/auth/redirect.tsx
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {

  const router = useRouter();
  
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/signin");
        return;
      }

      const role = session.user.role;

      if (role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else if (role === "USER") {
        router.replace("/user/dashboard");
      } else {
        router.replace("/");
      }
    });
  }, [router]);

  return null; // Optional: add loading spinner
}
