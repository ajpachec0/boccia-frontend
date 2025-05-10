"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react";
import React from "react";
import { useLoginForm } from "./use-login-form";
import Image from "next/image";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    onSubmit,
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <span className="text-primary ml-2">Sistema de Torneos</span>
        </div>
      </header> */}

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="my-4 flex flex-col items-center ">
          <Image
            src="/logo-bocciasv.png"
            alt="Logo"
            width={150}
            height={28}
            className="mb-4"
          />
          <h1 className="text-primary ml-2 text-4xl font-bold mb-4          ">
            Sistema de Torneos
          </h1>
        </div>
        <Card className="w-full max-w-md border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Nombre de usuario"
                    className="pl-10"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Iniciar sesión</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-4 bg-background">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sistema de Torneos. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
};
