"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    description: "For general questions and inquiries.",
    value: "support@ecovaluate.com",
    href: "mailto:support@ecovaluate.com",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: MessageCircle,
    title: "Product support",
    description: "Need help with your EcoValuate experience?",
    value: "Tell us what you need",
    href: "#contact-form",
    color: "bg-lime-50 text-lime-700",
  },
  {
    icon: Globe2,
    title: "Our platform",
    description: "Explore our sustainable electronics marketplace.",
    value: "Explore marketplace",
    href: "/marketplace",
    color: "bg-teal-50 text-teal-700",
  },
];

const topics = [
  "General inquiry",
  "AI price estimation",
  "Marketplace support",
  "Selling electronic waste",
  "Partnership opportunity",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General inquiry",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      form.subject || `EcoValuate inquiry: ${form.topic}`,
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`,
    );

    setSubmitted(true);

    window.location.href =
      `mailto:support@ecovaluate.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="overflow-hidden bg-white text-[#17251f]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-white px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24">
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,63,66,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(6,63,66,.055) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        {/* Soft background glows */}
        <div className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-lime-200/30 blur-[110px]" />

        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            We're here to help
          </div>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[82px]">
                Let's start a
                <br />
                <span className="text-emerald-600">
                  conversation.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Questions about e-waste, AI-powered valuation, or our
                marketplace? We'd love to hear from you. Let's make
                your next step a little greener.
              </p>

              <a
                href="#contact-form"
                className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                Get in touch
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-600" />
                  Privacy conscious
                </span>
                <span className="flex items-center gap-2">
                  <Leaf size={15} className="text-emerald-600" />
                  Sustainability first
                </span>
              </div>
            </div>

            {/* White feature card */}
            <div className="relative lg:justify-self-end">
              <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/[0.045] sm:rounded-[32px] sm:p-8 lg:max-w-md">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                    <Sparkles size={24} />
                  </div>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    EcoValuate
                  </span>
                </div>

                <h2 className="relative mt-7 text-2xl font-bold leading-snug tracking-tight text-[#17251f] sm:text-3xl">
                  Good things happen when we connect.
                </h2>

                <p className="relative mt-4 text-sm leading-7 text-slate-600">
                  Whether you're a customer, seller, or future partner,
                  your ideas and questions matter to us.
                </p>

                <div className="my-7 h-px bg-slate-100" />

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Leaf size={19} />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-[#17251f]">
                      A greener future
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      One conversation at a time.
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full border border-emerald-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="relative z-10 -mt-8 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.title}
                href={option.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/[0.05] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${option.color}`}
                  >
                    <Icon size={22} />
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600"
                  />
                </div>

                <h2 className="mt-6 text-lg font-bold text-[#17251f]">
                  {option.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {option.description}
                </p>

                <p className="mt-4 break-words text-sm font-bold text-emerald-700">
                  {option.value}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          {/* Left information */}
          <div className="lg:sticky lg:top-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              Contact our team
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] text-[#17251f] sm:text-5xl">
              Tell us what's
              <span className="text-emerald-600">
                {" "}on your mind.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Share your question, feedback, or idea. Give us a little
              context and we'll help you find the right next step.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <Mail size={20} />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-[#17251f]">
                    Email support
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    support@ecovaluate.com
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Replace this placeholder with your actual support email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-100 bg-lime-50 text-lime-700">
                  <Clock3 size={20} />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-[#17251f]">
                    Our response
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                    We'll get back to you as soon as we can. Response
                    times may vary.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
                  <ShieldCheck size={20} />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-[#17251f]">
                    Your privacy matters
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                    Please share only the information needed to help us
                    understand your inquiry.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 rounded-2xl border border-emerald-100 bg-[#f7fbf8] p-5">
              <div className="flex gap-3">
                <Leaf
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className="text-sm leading-7 text-slate-600">
                  Have an old device? Discover how technology and thoughtful
                  reuse can give it a new opportunity.
                  <Link
                    href="/price-estimation"
                    className="ml-1 font-bold text-emerald-700 hover:underline"
                  >
                    Try AI valuation.
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.035] sm:rounded-[32px] sm:p-9 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={34} />
                </span>

                <h3 className="mt-6 text-2xl font-bold text-[#17251f]">
                  Your email app should open.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  Review the prefilled email and send it to contact our team.
                  If no email app opened, use the email address shown on this
                  page.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  Back to contact form
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black tracking-tight text-[#17251f] sm:text-3xl">
                    Send us a message
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in the details below to prepare your inquiry.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Full name <span className="text-emerald-600">*</span>
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email address <span className="text-emerald-600">*</span>
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      What can we help with?
                    </label>

                    <select
                      id="contact-topic"
                      name="topic"
                      value={form.topic}
                      onChange={(event) =>
                        updateField("topic", event.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    >
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      id="contact-subject"
                      name="subject"
                      maxLength={150}
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      placeholder="A short summary of your inquiry"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Your message <span className="text-emerald-600">*</span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={5}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Tell us a little more about how we can help..."
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm leading-7 text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                      {form.message.length}/5000 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                  >
                    Prepare email
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    This form opens your default email application. It does
                    not submit your message to a server.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[30px] sm:p-9 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
              <MapPin size={22} />
            </span>

            <div>
              <h3 className="text-lg font-bold text-[#17251f]">
                Explore a more sustainable way forward.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Discover electronic products, connect with vendors, and
                explore the EcoValuate experience.
              </p>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#092f27] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            Visit Marketplace
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}