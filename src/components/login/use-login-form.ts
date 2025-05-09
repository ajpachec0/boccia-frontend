import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  // 2. Configura React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Manejador de envío usando Sonner toast
  const onSubmit = async (data: LoginForm) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
    });

    if (res?.error) {
      toast.error("Credenciales inválidas");
    } else {
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    onSubmit,
  };
};

// 1. Esquema de validación con Zod
const loginSchema = z.object({
  username: z.string().nonempty("Usuario es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;
