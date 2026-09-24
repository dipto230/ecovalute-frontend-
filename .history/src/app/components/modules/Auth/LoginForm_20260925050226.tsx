
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
import { useEffect, useState } from "react";
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

  /* ============================================================= */
  /* CURSOR POSITION */
  /* ============================================================= */

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* ============================================================= */
  /* LOGIN MUTATION */
  /* ============================================================= */

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) =>
      loginAction(payload, redirectPath),
  });

  /* ============================================================= */
  /* FORM */
  /* ============================================================= */

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
    <main className="relative min-h-screen overflow-hidden bg-[#063f42] text-slate-900">
      {/* ========================================================= */}
      {/* CURSOR FOLLOWING SPOTLIGHT */}
      {/* ========================================================= */}

      <div
        className={`
          pointer-events-none
          fixed
          z-[60]
          hidden
          size-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-300/10
          blur-[80px]
          lg:block
        `}
        style={{
          left: `calc(50% + ${mousePosition.x * 180}px)`,
          top: `calc(50% + ${mousePosition.y * 180}px)`,
          transition:
            "left 700ms cubic-bezier(0.22, 1, 0.36, 1), top 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* ========================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left glow */}

        <div
          className={`
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-400/10
            blur-[120px]
            animate-[blob_10s_ease-in-out_infinite]
          `}
        />

        {/* Bottom right glow */}

        <div
          className={`
            absolute
            -bottom-40
            -right-40
            h-[600px]
            w-[600px]
            rounded-full
            bg-lime-400/10
            blur-[130px]
            animate-[blob_12s_ease-in-out_infinite_reverse]
          `}
        />

        {/* Center glow */}

        <div
          className={`
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-emerald-300/10
            blur-[100px]
            animate-[glowPulse_7s_ease-in-out_infinite]
          `}
        />

        {/* Floating particles */}

        <div
          className={`
            absolute
            left-[8%]
            top-[20%]
            h-3
            w-3
            rounded-full
            bg-emerald-300/50
            animate-[particle_5s_ease-in-out_infinite]
          `}
        />

        <div
          className={`
            absolute
            left-[42%]
            top-[12%]
            h-2
            w-2
            rounded-full
            bg-green-300/40
            animate-[particle_6s_ease-in-out_infinite_1s]
          `}
        />

        <div
          className={`
            absolute
            right-[10%]
            top-[25%]
            h-3
            w-3
            rounded-full
            bg-lime-300/50
            animate-[particle_7s_ease-in-out_infinite_2s]
          `}
        />

        <div
          className={`
            absolute
            bottom-[18%]
            left-[45%]
            h-2
            w-2
            rounded-full
            bg-emerald-300/40
            animate-[particle_5s_ease-in-out_infinite_2s]
          `}
        />
      </div>

      {/* ========================================================= */}
      {/* MAIN */}
      {/* ========================================================= */}

      <div className="relative z-10 min-h-screen lg:p-5">
        <div
          className={`
            grid
            min-h-screen
            overflow-hidden
            lg:min-h-[calc(100vh-40px)]
            lg:grid-cols-[1.05fr_0.95fr]
            lg:rounded-[28px]
          `}
        >
          {/* ===================================================== */}
          {/* LEFT SIDE — HERO */}
          {/* ===================================================== */}

          <section
            className={`
              relative
              order-2
              min-h-[650px]
              overflow-hidden
              lg:order-1
              lg:min-h-0
            `}
          >
            {/* ================================================= */}
            {/* HERO IMAGE */}
            {/* ================================================= */}

            <Image
              src="/e-waste-login.png"
              alt="E-waste recycling and sustainable technology"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={`
                object-cover
                scale-[1.03]
                transition-transform
                duration-1000
              `}
              style={{
                transform: `
                  scale(1.03)
                  translate3d(
                    ${mousePosition.x * -5}px,
                    ${mousePosition.y * -5}px,
                    0
                  )
                `,
                transition:
                  "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* ================================================= */}
            {/* DARK TEAL OVERLAY */}
            {/* ================================================= */}

            <div
              className={`
                absolute
                inset-0
                bg-gradient-to-br
                from-[#00383b]/95
                via-[#064b45]/70
                to-[#0b5c48]/45
              `}
            />

            {/* Bottom gradient */}

            <div
              className={`
                absolute
                inset-x-0
                bottom-0
                h-[60%]
                bg-gradient-to-t
                from-[#022f32]
                via-[#033b39]/65
                to-transparent
              `}
            />

            {/* Green ambient glow */}

            <div
              className={`
                absolute
                -left-20
                bottom-20
                h-80
                w-80
                rounded-full
                bg-emerald-400/20
                blur-[100px]
                animate-[glowPulse_6s_ease-in-out_infinite]
              `}
            />

            {/* ================================================= */}
            {/* HERO CONTENT */}
            {/* ================================================= */}

            <div
              className={`
                relative
                z-10
                flex
                min-h-[650px]
                flex-col
                justify-between
                p-7
                sm:p-10
                lg:min-h-full
                lg:p-12
                xl:p-14
              `}
            >
              {/* ================================================= */}
              {/* BRAND */}
              {/* ================================================= */}

              <div className="animate-[cardEnter_.7s_ease-out]">
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      relative
                      flex
                      size-16
                      shrink-0
                      items-center
                      justify-center
                    `}
                  >
                    <div
                      className={`
                        absolute
                        inset-0
                        rounded-full
                        bg-emerald-400/20
                        blur-xl
                        animate-[glowPulse_5s_ease-in-out_infinite]
                      `}
                    />

                    <div
                      className={`
                        relative
                        flex
                        size-14
                        items-center
                        justify-center
                        rounded-[18px]
                        bg-gradient-to-br
                        from-lime-300
                        to-emerald-400
                        text-[#063f42]
                        shadow-xl
                        shadow-emerald-900/30
                        animate-[leafFloat_5s_ease-in-out_infinite]
                      `}
                    >
                      <Leaf
                        className="size-8"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Eco
                      <span className="text-lime-300">
                        Valuate
                      </span>
                    </h2>

                    <p className="mt-0.5 text-sm font-medium tracking-wide text-white/75">
                      Give E-Waste a Second Life
                    </p>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* HERO TEXT */}
              {/* ================================================= */}

              <div
                className={`
                  max-w-[650px]
                  animate-[heroText_1s_ease-out]
                `}
              >
                <div
                  className={`
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-300/20
                    bg-emerald-950/30
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-emerald-100
                    backdrop-blur-md
                    transition-all
                    duration-500
                    hover:border-emerald-300/40
                    hover:bg-emerald-900/40
                  `}
                >
                  <Recycle className="size-4 text-lime-300" />

                  <span>Smart E-Waste Marketplace</span>

                  <span
                    className={`
                      size-1.5
                      rounded-full
                      bg-lime-300
                      animate-pulse
                    `}
                  />
                </div>

                <h1
                  className={`
                    text-4xl
                    font-bold
                    leading-[1.08]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    xl:text-6xl
                  `}
                >
                  Turn Your Old Devices
                  <br />

                  <span
                    className={`
                      bg-gradient-to-r
                      from-lime-300
                      via-emerald-300
                      to-green-300
                      bg-clip-text
                      text-transparent
                    `}
                  >
                    into New Opportunities
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                  Buy, Sell and Recycle E-Waste with Confidence.
                  <br />
                  A smarter marketplace for a cleaner, greener
                  tomorrow.
                </p>

                {/* ================================================= */}
                {/* FEATURES */}
                {/* ================================================= */}

                <div
                  className={`
                    mt-8
                    flex
                    flex-wrap
                    items-center
                    gap-y-5
                  `}
                >
                  {/* Feature 1 */}

                  <div
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      pr-6
                      transition-transform
                      duration-500
                      hover:-translate-y-1
                    `}
                  >
                    <div
                      className={`
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-lime-300/30
                        bg-lime-300/10
                        text-lime-300
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:bg-lime-300/20
                      `}
                    >
                      <Recycle className="size-6" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Sell Your
                      </p>

                      <p className="text-sm text-white/70">
                        Old Devices
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-10 w-px bg-white/20 sm:block" />

                  {/* Feature 2 */}

                  <div
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      px-6
                      transition-transform
                      duration-500
                      hover:-translate-y-1
                    `}
                  >
                    <div
                      className={`
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-emerald-300/30
                        bg-emerald-300/10
                        text-emerald-300
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:bg-emerald-300/20
                      `}
                    >
                      <ShieldCheck className="size-6" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Get Fair
                      </p>

                      <p className="text-sm text-white/70">
                        Value
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-10 w-px bg-white/20 sm:block" />

                  {/* Feature 3 */}

                  <div
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      pl-6
                      transition-transform
                      duration-500
                      hover:-translate-y-1
                    `}
                  >
                    <div
                      className={`
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-lime-300/30
                        bg-lime-300/10
                        text-lime-300
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:bg-lime-300/20
                      `}
                    >
                      <Leaf className="size-6" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Support a
                      </p>

                      <p className="text-sm text-white/70">
                        Greener Planet
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* BOTTOM QUOTE */}
              {/* ================================================= */}

              <div
                className={`
                  flex
                  items-center
                  gap-3
                  animate-[floatCard_6s_ease-in-out_infinite]
                `}
              >
                <div
                  className={`
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-lime-300/15
                    text-lime-300
                  `}
                >
                  <Leaf className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    “Reduce E-Waste
                  </p>

                  <p className="text-sm text-white/80">
                    Build a Sustainable Future”
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* SPARKLE */}
            {/* ================================================= */}

            <div
              className={`
                absolute
                right-8
                top-24
                z-20
                animate-[sparkle_3s_ease-in-out_infinite]
              `}
              style={{
                transform: `
                  translate3d(
                    ${mousePosition.x * 10}px,
                    ${mousePosition.y * 10}px,
                    0
                  )
                `,
                transition:
                  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Sparkles className="size-7 text-lime-300/70" />
            </div>
          </section>

          {/* ===================================================== */}
          {/* RIGHT SIDE — LOGIN */}
          {/* ===================================================== */}

          <section
            className={`
              order-1
              flex
              min-h-screen
              items-center
              justify-center
              bg-[#f7faf8]
              px-5
              py-8
              sm:px-8
              lg:order-2
              lg:min-h-0
              lg:px-12
              xl:px-16
            `}
          >
            <Card
              className={`
                relative
                w-full
                max-w-[650px]
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_25px_80px_-25px_rgba(15,23,42,0.18)]
                transition-shadow
                duration-500
                hover:shadow-[0_35px_100px_-25px_rgba(15,23,42,0.22)]
                animate-[cardEnter_.7s_ease-out]
              `}
              style={{
                transform: `
                  translate3d(
                    ${mousePosition.x * 2}px,
                    ${mousePosition.y * 2}px,
                    0
                  )
                `,
                transition:
                  "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Top Green Line */}

              <div
                className={`
                  absolute
                  left-0
                  right-0
                  top-0
                  h-1
                  bg-gradient-to-r
                  from-emerald-500
                  via-green-500
                  to-lime-400
                `}
              />

              {/* Decorative leaf */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-5
                  -top-5
                  opacity-10
                  animate-[leafFloat_7s_ease-in-out_infinite]
                `}
              >
                <Leaf className="size-28 rotate-12 text-emerald-500" />
              </div>

              <CardHeader className="px-7 pb-4 pt-9 sm:px-10 sm:pt-11">
                {/* ================================================= */}
                {/* REGISTER */}
                {/* ================================================= */}

                <div
                  className={`
                    mb-12
                    flex
                    items-center
                    justify-end
                    gap-2
                    text-sm
                  `}
                >
                  <span className="text-slate-500">
                    New here?
                  </span>

                  <Link
                    href="/register"
                    className={`
                      group
                      inline-flex
                      items-center
                      gap-1.5
                      font-semibold
                      text-emerald-600
                      transition-colors
                      hover:text-emerald-700
                    `}
                  >
                    Create an account

                    <ArrowRight
                      className={`
                        size-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      `}
                    />
                  </Link>
                </div>

                {/* ================================================= */}
                {/* TITLE */}
                {/* ================================================= */}

                <div>
                  <CardTitle
                    className={`
                      text-3xl
                      font-bold
                      tracking-tight
                      text-[#123442]
                      sm:text-4xl
                    `}
                  >
                    Welcome Back
                  </CardTitle>

                  <CardDescription className="mt-2 text-base text-slate-500">
                    Login to your EcoValuate account
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-7 pb-8 sm:px-10">
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
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
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
                              transition-all
                              duration-300
                              hover:bg-transparent
                              hover:text-emerald-600
                              hover:scale-110
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

                  {/* ================================================= */}
                  {/* REMEMBER + FORGOT */}
                  {/* ================================================= */}

                  <div
                    className={`
                      flex
                      items-center
                      justify-between
                      gap-4
                    `}
                  >
                    <label
                      className={`
                        group
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        text-sm
                        text-slate-600
                      `}
                    >
                      <input
                        type="checkbox"
                        className={`
                          size-5
                          rounded-md
                          border-slate-300
                          text-emerald-600
                          accent-emerald-600
                          transition-all
                          duration-200
                          focus:ring-emerald-500
                          group-hover:scale-105
                        `}
                      />

                      <span>Remember me</span>
                    </label>

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

                  {/* ================================================= */}
                  {/* SERVER ERROR */}
                  {/* ================================================= */}

                  {serverError && (
                    <Alert
                      variant="destructive"
                      className={`
                        border-red-200
                        bg-red-50
                        text-red-600
                        animate-[errorShake_.4s_ease-out]
                      `}
                    >
                      <AlertDescription>
                        {serverError}
                      </AlertDescription>
                    </Alert>
                  )}

             

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
                          group
                          relative
                          h-12
                          w-full
                          overflow-hidden
                          rounded-xl
                          border-0
                          bg-gradient-to-r
                          from-emerald-600
                          via-green-600
                          to-emerald-600
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-emerald-600/20
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:scale-[1.01]
                          hover:shadow-2xl
                          hover:shadow-emerald-600/30
                          active:translate-y-0
                          active:scale-[0.98]
                        `}
                      >
                    

                        <span
                          className={`
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            w-1/3
                            -translate-x-[180%]
                            skew-x-[-20deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/25
                            to-transparent
                            transition-transform
                            duration-700
                            group-hover:translate-x-[450%]
                          `}
                        />

                        <span className="relative z-10">
                          Login
                        </span>

                        <ArrowRight
                          className={`
                            relative
                            z-10
                            ml-2
                            size-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          `}
                        />
                      </AppSubmitButton>
                    )}
                  </form.Subscribe>
                </form>

               

                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>

                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-slate-400">
                      or
                    </span>
                  </div>
                </div>

              

                <Button
                  variant="outline"
                  className={`
                    group
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
                    hover:shadow-md
                  `}
                  onClick={() => {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_API_BASE_URL;

                    window.location.href = `${baseUrl}/auth/login/google`;
                  }}
                >
               

                  <svg
                    className={`
                      mr-2
                      size-5
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
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

           

              <CardFooter
                className={`
                  flex-col
                  justify-center
                  gap-3
                  border-t
                  border-slate-100
                  bg-slate-50/70
                  px-7
                  py-5
                `}
              >
                <div
                  className={`
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-500
                  `}
                >
                  <ShieldCheck className="size-4 text-emerald-500" />

                  <span>
                    Your data is safe and protected with us
                  </span>
                </div>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>

    

      <style jsx global>{`
        @keyframes imageFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(0.3deg);
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

        @keyframes heroText {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          25% {
            transform: translate3d(25px, -18px, 0) scale(1.04);
          }

          50% {
            transform: translate3d(-15px, 25px, 0) scale(0.98);
          }

          75% {
            transform: translate3d(18px, 10px, 0) scale(1.03);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.12);
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
            opacity: 0.35;
          }

          25% {
            transform: scale(0.85) rotate(-8deg);
            opacity: 0.55;
          }

          50% {
            transform: scale(1.3) rotate(12deg);
            opacity: 1;
          }

          75% {
            transform: scale(0.95) rotate(4deg);
            opacity: 0.6;
          }
        }

        @keyframes leafFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(4deg);
          }
        }

        @keyframes errorShake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          50% {
            transform: translateX(5px);
          }

          75% {
            transform: translateX(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
};

export default LoginForm;

