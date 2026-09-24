
"use client";

import { loginAction } from "@/src/app/(commonLayout)/(authRouteGroup)/login/_action";
import {
  ILoginPayload,
  loginZodSchema,
} from "@/src/zod/auth.validation";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { Button } from "../../ui/button";
import { Alert, AlertDescription } from "../../ui/alert";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) =>
      loginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Login failed");
          return;
        }
      } catch (error: any) {
        console.log(`Login failed: ${error.message}`);
        setServerError(`Login failed: ${error.message}`);
      }
    },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf8] text-slate-900">
      {/* ========================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large green glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-[120px] animate-[blob_10s_ease-in-out_infinite]" />

        {/* Right green glow */}
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-lime-200/30 blur-[130px] animate-[blob_12s_ease-in-out_infinite_reverse]" />

        {/* Center glow */}
        <div className="absolute left-[45%] top-[30%] h-72 w-72 rounded-full bg-green-100/50 blur-[100px] animate-pulse" />

        {/* Floating circles */}
        <div className="absolute left-[8%] top-[20%] h-3 w-3 rounded-full bg-emerald-400/50 animate-[particle_5s_ease-in-out_infinite]" />

        <div className="absolute left-[42%] top-[12%] h-2 w-2 rounded-full bg-green-500/40 animate-[particle_6s_ease-in-out_infinite_1s]" />

        <div className="absolute right-[10%] top-[25%] h-3 w-3 rounded-full bg-lime-400/50 animate-[particle_7s_ease-in-out_infinite_2s]" />

        <div className="absolute bottom-[18%] left-[45%] h-2 w-2 rounded-full bg-emerald-500/40 animate-[particle_5s_ease-in-out_infinite_2s]" />
      </div>

      {/* ========================================================= */}
      {/* SUBTLE GRID */}
      {/* ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* ========================================================= */}
      {/* MAIN */}
      {/* ========================================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ===================================================== */}
          {/* LEFT SIDE — LOGIN */}
          {/* ===================================================== */}

          <section className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <Card
              className={`
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/80
                bg-white/90
                shadow-[0_25px_80px_-25px_rgba(15,23,42,0.18)]
                backdrop-blur-xl
                animate-[cardEnter_.7s_ease-out]
              `}
            >
              {/* Top green line */}

              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400" />

              <CardHeader className="space-y-5 px-7 pt-9 text-center">
                {/* Logo */}

                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20">
                  <Recycle className="size-7" />
                </div>

                <div>
                  <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome Back
                  </CardTitle>

                  <CardDescription className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Sign in to continue managing your e-waste
                    marketplace.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-7 pb-7">
                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form
                  method="POST"
                  action="#"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  className="space-y-5"
                >
                  {/* EMAIL */}

                  <form.Field
                    name="email"
                    validators={{
                      onChange: loginZodSchema.shape.email,
                    }}
                  >
                    {(field) => (
                      <AppField
                        field={field}
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                      />
                    )}
                  </form.Field>

                  {/* PASSWORD */}

                  <form.Field
                    name="password"
                    validators={{
                      onChange: loginZodSchema.shape.password,
                    }}
                  >
                    {(field) => (
                      <AppField
                        field={field}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="cursor-pointer"
                        append={
                          <Button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                (value) => !value
                              )
                            }
                            variant="ghost"
                            size="icon"
                            className={`
                              mr-1
                              text-slate-400
                              hover:bg-transparent
                              hover:text-emerald-600
                            `}
                          >
                            {showPassword ? (
                              <EyeOff
                                className="size-4"
                                aria-hidden="true"
                              />
                            ) : (
                              <Eye
                                className="size-4"
                                aria-hidden="true"
                              />
                            )}
                          </Button>
                        }
                      />
                    )}
                  </form.Field>

                  {/* FORGOT PASSWORD */}

                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className={`
                        text-sm
                        font-medium
                        text-emerald-600
                        transition-colors
                        hover:text-emerald-700
                        hover:underline
                        underline-offset-4
                      `}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* SERVER ERROR */}

                  {serverError && (
                    <Alert
                      variant="destructive"
                      className={`
                        border-red-200
                        bg-red-50
                        text-red-600
                      `}
                    >
                      <AlertDescription>
                        {serverError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* LOGIN BUTTON */}

                  <form.Subscribe
                    selector={(s) =>
                      [s.canSubmit, s.isSubmitting] as const
                    }
                  >
                    {([canSubmit, isSubmitting]) => (
                      <AppSubmitButton
                        isPending={
                          isSubmitting || isPending
                        }
                        pendingLabel="Logging In..."
                        disabled={!canSubmit}
                        className={`
                          h-12
                          w-full
                          border-0
                          rounded-xl
                          bg-gradient-to-r
                          from-emerald-500
                          via-green-500
                          to-emerald-600
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-emerald-500/20
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:shadow-xl
                          hover:shadow-emerald-500/30
                          active:translate-y-0
                        `}
                      >
                        <span>Sign In</span>

                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </AppSubmitButton>
                    )}
                  </form.Subscribe>
                </form>

                {/* ================================================= */}
                {/* DIVIDER */}
                {/* ================================================= */}

                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>

                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* ================================================= */}
                {/* GOOGLE */}
                {/* ================================================= */}

                <Button
                  variant="outline"
                  className={`
                    h-12
                    w-full
                    rounded-xl
                    border-slate-200
                    bg-white
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-emerald-200
                    hover:bg-emerald-50
                    hover:text-slate-900
                  `}
                  onClick={() => {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_API_BASE_URL;

                    window.location.href = `${baseUrl}/auth/login/google`;
                  }}
                >
                  {/* Google Icon */}

                  <svg
                    className="mr-2 size-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />

                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />

                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  Continue with Google
                </Button>
              </CardContent>

              {/* ================================================= */}
              {/* FOOTER */}
              {/* ================================================= */}

              <CardFooter
                className={`
                  flex-col
                  gap-3
                  justify-center
                  border-t
                  border-slate-100
                  bg-slate-50/70
                  px-7
                  py-5
                `}
              >
                <p className="text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className={`
                      font-semibold
                      text-emerald-600
                      transition-colors
                      hover:text-emerald-700
                      hover:underline
                      underline-offset-4
                    `}
                  >
                    Create an account
                  </Link>
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="size-3.5 text-emerald-500" />

                  Secure & protected login
                </div>
              </CardFooter>
            </Card>
          </section>

          {/* ===================================================== */}
          {/* RIGHT SIDE — E-WASTE HERO IMAGE */}
          {/* ===================================================== */}

          <section className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[620px]">
              {/* ================================================= */}
              {/* GREEN GLOW */}
              {/* ================================================= */}

              <div
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  h-[430px]
                  w-[430px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-emerald-200/40
                  blur-[100px]
                  animate-pulse
                `}
              />

              {/* ================================================= */}
              {/* IMAGE */}
              {/* ================================================= */}

              <div
                className={`
                  relative
                  animate-[imageFloat_6s_ease-in-out_infinite]
                `}
              >
                <div
                  className={`
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white
                    bg-white
                    p-2
                    shadow-[0_30px_80px_-20px_rgba(22,101,52,0.30)]
                  `}
                >
                  <Image
                    src="/e-waste-login.png"
                    alt="E-waste recycling and sustainable technology"
                    width={1200}
                    height={900}
                    priority
                    className={`
                      aspect-[4/3]
                      w-full
                      rounded-[26px]
                      object-cover
                    `}
                  />

                  {/* Image overlay */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-2
                      rounded-[26px]
                      bg-gradient-to-t
                      from-emerald-950/25
                      via-transparent
                      to-transparent
                    `}
                  />
                </div>
              </div>

              {/* ================================================= */}
              {/* FLOATING CARD — RECYCLING */}
              {/* ================================================= */}

              <div
                className={`
                  absolute
                  -left-5
                  top-10
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/80
                  bg-white/90
                  px-4
                  py-3
                  shadow-xl
                  shadow-emerald-900/10
                  backdrop-blur-xl
                  animate-[floatCard_5s_ease-in-out_infinite]
                  sm:-left-8
                `}
              >
                <div
                  className={`
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                  `}
                >
                  <Recycle className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Sustainable
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    Recycle Better
                  </p>
                </div>
              </div>

              {/* ================================================= */}
              {/* FLOATING CARD — ECO */}
              {/* ================================================= */}

              <div
                className={`
                  absolute
                  -bottom-5
                  -right-3
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/80
                  bg-white/90
                  px-4
                  py-3
                  shadow-xl
                  shadow-emerald-900/10
                  backdrop-blur-xl
                  animate-[floatCard_6s_ease-in-out_infinite_1s]
                  sm:-right-8
                `}
              >
                <div
                  className={`
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-lime-100
                    text-lime-600
                  `}
                >
                  <Leaf className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Eco Future
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    Keep Earth Green
                  </p>
                </div>
              </div>

              {/* ================================================= */}
              {/* SMALL SPARKLE */}
              {/* ================================================= */}

              <div className="absolute -right-2 top-16 animate-[sparkle_3s_ease-in-out_infinite] sm:-right-5">
                <Sparkles className="size-7 text-emerald-400" />
              </div>

              {/* ================================================= */}
              {/* HERO TEXT */}
              {/* ================================================= */}

              <div className="mt-10 text-center lg:text-left">
                {/* Brand */}

                <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Recycle className="size-5" />
                  </div>

                  <span className="text-lg font-bold tracking-tight text-slate-800">
                    Eco<span className="text-emerald-600">Valuate</span>
                  </span>
                </div>

                <h1
                  className={`
                    text-4xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-slate-900
                    sm:text-5xl
                  `}
                >
                  Give old tech
                  <br />

                  <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 bg-clip-text text-transparent">
                    a new purpose.
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 lg:mx-0">
                  Turn unused electronics into value while helping
                  create a cleaner and more sustainable future.
                </p>

                {/* Feature badges */}

                <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    Smart Valuation
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                    <Recycle className="size-4 text-emerald-500" />
                    Easy Recycling
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                    <Leaf className="size-4 text-emerald-500" />
                    Eco Friendly
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ANIMATIONS */}
      {/* ========================================================= */}

      <style jsx global>{`
        @keyframes imageFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-10px) rotate(0.4deg);
          }
        }

        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }

          33% {
            transform: translate(30px, -20px) scale(1.05);
          }

          66% {
            transform: translate(-20px, 25px) scale(0.95);
          }
        }

        @keyframes particle {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.3;
          }

          50% {
            transform: translateY(-25px);
            opacity: 0.8;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }

          50% {
            transform: scale(1.25) rotate(15deg);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default LoginForm;

