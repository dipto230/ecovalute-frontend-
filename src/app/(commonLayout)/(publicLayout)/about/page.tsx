
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  { value: "01", label: "A smarter way to recycle", icon: Recycle },
  { value: "02", label: "Technology meets sustainability", icon: Zap },
  { value: "03", label: "Value in every device", icon: TrendingUp },
  { value: "04", label: "A greener tomorrow", icon: Globe2 },
];

const values = [
  {
    number: "01",
    title: "Sustainability First",
    description:
      "We encourage responsible disposal and recycling to help keep electronic waste away from landfills.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Technology for Good",
    description:
      "We use intelligent technology to make electronic waste evaluation more accessible and convenient.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Trust & Transparency",
    description:
      "We believe every user deserves a clear, convenient and transparent experience when selling used electronics.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore our marketplace and discover new possibilities for your unused electronics.",
  },
  {
    number: "02",
    title: "Evaluate",
    description:
      "Use AI-powered valuation to understand the potential value of your electronic device.",
  },
  {
    number: "03",
    title: "Give it a new life",
    description:
      "Connect with the marketplace and help electronics find their next purpose.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#17251f]">
      {/* HERO */}
      <section className="relative px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-emerald-100/50 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-lime-100/40 blur-[90px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Get to know EcoValuate
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
              Waste less.
              <br />
              <span className="text-emerald-600">Value more.</span>
              <br />
              <span className="font-semibold text-[#17251f]/35">
                Live greener.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              We are reimagining the future of electronic waste through
              intelligent technology, responsible recycling, and a marketplace
              that gives unwanted electronics a second chance.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/marketplace"
                className="group inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700"
              >
                Explore Marketplace
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                Our Story
                <ArrowDownRight size={17} />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-700">
                  <Leaf size={17} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-lime-100 text-lime-700">
                  <Recycle size={17} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-teal-100 text-teal-700">
                  <Globe2 size={17} />
                </span>
              </div>
              <span>Better choices. A better planet.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -inset-5 rounded-[40px] bg-emerald-100/70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px] border border-white bg-slate-100 p-2 shadow-2xl shadow-emerald-950/10 sm:rounded-[36px] sm:p-3">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[24px] sm:rounded-[29px]">
                <Image
                  src="/About-us/ABOUT-1.png"
                  alt="EcoValuate and the future of sustainable electronics recycling"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/75 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                    <Leaf size={14} />
                    Sustainability starts here
                  </span>
                  <h2 className="mt-4 max-w-sm text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    Every device deserves a second chance.
                  </h2>
                </div>
              </div>
            </div>

            <div className="absolute -left-3 top-10 hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl sm:flex lg:-left-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Recycle size={23} />
              </span>
              <div>
                <p className="text-sm font-bold">Reuse. Recover. Renew.</p>
                <p className="mt-1 text-xs text-slate-500">
                  A smarter circular future
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:right-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-emerald-600">
                <Sparkles size={21} />
              </span>
              <div>
                <p className="text-sm font-bold">AI-powered value</p>
                <p className="mt-1 text-xs text-slate-500">
                  Technology with a purpose
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION STRIP */}
      <section className="border-y border-slate-100 bg-[#f8fbf8] px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.number} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-600">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-emerald-700">
                    {item.number}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-slate-100 sm:rounded-[36px]">
              <Image
                src="/About-us/ABOUT-2.png"
                alt="Responsible electronic waste collection and recycling"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-5 -right-2 max-w-[230px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:-right-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">
                Our belief
              </p>
              <p className="mt-2 text-lg font-bold leading-snug">
                What is unwanted today can be valuable tomorrow.
              </p>
            </div>
          </div>

          <div className="pt-3 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              Our story
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
              Changing the way the world sees{" "}
              <span className="text-emerald-600">e-waste.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Electronic devices are part of almost every aspect of modern
              life. But when they stop being useful to us, their journey
              shouldn&apos;t end in a drawer, a landfill, or an unsafe
              recycling process.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              EcoValuate is designed to help bridge the gap between unwanted
              electronics and their next opportunity. By bringing together
              intelligent price estimation, a digital marketplace, and
              responsible e-waste practices, we aim to make sustainable
              choices easier for everyone.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Give used electronics a new purpose",
                "Make device valuation more accessible",
                "Encourage responsible recycling habits",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <p className="text-sm font-semibold text-slate-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/price-estimation"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-900"
            >
              Discover AI valuation
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-[#092f27] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Why we exist
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              A little less waste.
              <br />
              A lot more possibility.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/65">
              We want sustainable electronics management to become a natural
              part of everyday life, not a complicated afterthought.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="group rounded-[26px] border border-white/10 bg-white/[0.045] p-7 transition hover:border-emerald-400/40 hover:bg-white/[0.075] sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Target size={25} />
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Our mission
              </p>
              <h3 className="mt-3 text-2xl font-bold">Make sustainability simple.</h3>
              <p className="mt-4 leading-8 text-white/65">
                To make electronic waste valuation, resale, and responsible
                recycling more convenient through accessible technology and
                meaningful connections.
              </p>
            </div>

            <div className="group rounded-[26px] border border-white/10 bg-white/[0.045] p-7 transition hover:border-emerald-400/40 hover:bg-white/[0.075] sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/15 text-lime-300">
                <Globe2 size={25} />
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
                Our vision
              </p>
              <h3 className="mt-3 text-2xl font-bold">A circular digital future.</h3>
              <p className="mt-4 leading-8 text-white/65">
                To contribute to a world where electronic products stay useful
                for longer, valuable materials are recovered, and responsible
                consumption becomes the smarter choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                What drives us
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                Built around better values.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-600">
              The principles behind every experience we design and every
              sustainable choice we encourage.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.number}
                  className="group rounded-[25px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon size={23} />
                    </span>
                    <span className="text-sm font-bold tracking-widest text-slate-300">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {value.description}
                  </p>

                  <div className="mt-7 h-1 w-12 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECYCLING JOURNEY */}
      <section className="bg-[#f5f9f5] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              How it works
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
              From unused tech to{" "}
              <span className="text-emerald-600">new possibilities.</span>
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              A more thoughtful electronics journey starts with a simple
              decision. Here is how EcoValuate helps you take the next step.
            </p>

            <div className="mt-9 space-y-7">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-sm font-black text-emerald-700 shadow-sm">
                      {step.number}
                    </span>
                    {index !== steps.length - 1 && (
                      <span className="mt-2 min-h-8 w-px flex-1 bg-emerald-200" />
                    )}
                  </div>

                  <div className="pb-5">
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[34px] bg-emerald-200/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-2 shadow-xl sm:rounded-[36px] sm:p-3">
              <div className="relative aspect-[4/4.3] overflow-hidden rounded-[22px] sm:rounded-[28px]">
                <Image
                  src="/About-us/ABOUT-3.png"
                  alt="The journey toward responsible electronics recycling"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-7 sm:right-7 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Recycle size={23} />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    Every responsible choice matters.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Better use. Less waste. More opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-slate-100 sm:rounded-[36px]">
              <Image
                src="/About-us/ABOUT-4.png"
                alt="Building a more sustainable future through responsible e-waste management"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-white backdrop-blur-md sm:bottom-7 sm:left-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Our shared responsibility
                </p>
                <p className="mt-1 text-lg font-bold">
                  Progress with purpose.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              The bigger picture
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
              A better future starts with{" "}
              <span className="text-emerald-600">what we do today.</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Electronic waste is more than discarded devices. It is a
              reminder that the way we consume, reuse, and dispose of
              technology matters. Responsible handling can help reduce
              unnecessary waste and preserve valuable materials.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              EcoValuate aims to make that journey easier by connecting
              technology, product value, and more conscious decisions in one
              accessible digital experience.
            </p>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:p-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <Leaf size={23} />
                </span>
                <div>
                  <h3 className="font-bold">Our commitment</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    We promote awareness, smarter reuse, and responsible
                    e-waste management without making unsupported promises
                    about environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-emerald-600 px-6 py-12 text-white sm:rounded-[38px] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-lime-300/15 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
                <Leaf size={14} />
                Your next step starts here
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Ready to give your e-waste a new value?
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/80">
                Discover a smarter way to evaluate, reuse, and trade
                electronics. Make your next device decision a more thoughtful
                one.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/price-estimation"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-emerald-800 transition hover:-translate-y-1 hover:bg-emerald-50"
              >
                Try AI Valuation
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Browse Marketplace
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
