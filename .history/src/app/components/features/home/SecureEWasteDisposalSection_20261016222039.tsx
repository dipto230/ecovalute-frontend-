"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Recycle,
  BatteryWarning,
  CheckCircle2,
  Smartphone,
  Laptop,
  HardDrive,
  Leaf,
} from "lucide-react";
import "./secure-ewaste-disposal.css";

const disposalSteps = [
  {
    number: "01",
    title: "Assess Your Device",
    description:
      "Identify the device type, its condition, and whether it can be reused, repaired, or recycled.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Protect Your Data",
    description:
      "Back up important files, sign out of accounts, remove linked devices, and securely erase personal data.",
    icon: LockKeyhole,
  },
  {
    number: "03",
    title: "Choose Responsible Disposal",
    description:
      "Find a suitable reuse or recycling option and check the provider's credentials and handling process.",
    icon: Recycle,
  },
  {
    number: "04",
    title: "Keep Batteries Safe",
    description:
      "Separate batteries only when designed to be removable. Never puncture, crush, or place lithium batteries in household waste.",
    icon: BatteryWarning,
  },
];

const safetyFeatures = [
  {
    title: "Data Privacy First",
    description:
      "Protect personal information before selling, donating, or recycling a device.",
    icon: ShieldCheck,
  },
  {
    title: "Responsible Recycling",
    description:
      "Prefer verified recycling facilities that follow applicable environmental and safety requirements.",
    icon: Recycle,
  },
  {
    title: "Safer Battery Handling",
    description:
      "Keep damaged, swollen, or leaking batteries away from heat and follow local hazardous-waste guidance.",
    icon: BatteryWarning,
  },
];

export default function SecureEWasteDisposalSection() {
  return (
    <section className="secure-disposal">
      <div className="secure-disposal__container">
        <div className="secure-disposal__intro">
          <span className="secure-disposal__eyebrow">
            <ShieldCheck size={16} />
            Secure & Responsible Disposal
          </span>

          <h2>
            Your Data Matters.
            <br />
            <span>Our Planet Does Too.</span>
          </h2>

          <p>
            Disposing of old electronics should protect both your personal
            information and the environment. Make informed choices before your
            next device gets a second life.
          </p>
        </div>

        <div className="secure-disposal__hero">
          <div className="secure-disposal__hero-content">
            <div className="secure-disposal__hero-badge">
              <LockKeyhole size={15} />
              Think Before You Dispose
            </div>

            <h3>
              Dispose smarter.
              <br />
              <span>Protect what matters.</span>
            </h3>

            <p>
              A few careful steps can help reduce data exposure, prevent
              unsafe handling, and support responsible electronics recovery.
            </p>

            <div className="secure-disposal__hero-checks">
              <span>
                <CheckCircle2 size={17} />
                Personal data protection
              </span>
              <span>
                <CheckCircle2 size={17} />
                Responsible disposal choices
              </span>
              <span>
                <CheckCircle2 size={17} />
                Safer battery handling
              </span>
            </div>

            <Link
              href="/price-estimation"
              className="secure-disposal__primary-button"
            >
              Assess Your Device
              <ArrowRight size={17} />
            </Link>
          </div>

          <div
            className="secure-disposal__hero-art"
            aria-hidden="true"
          >
            <div className="secure-disposal__orbit secure-disposal__orbit--outer" />
            <div className="secure-disposal__orbit secure-disposal__orbit--inner" />

            <div className="secure-disposal__device secure-disposal__device--laptop">
              <Laptop size={65} strokeWidth={1.3} />
            </div>

            <div className="secure-disposal__device secure-disposal__device--phone">
              <Smartphone size={42} strokeWidth={1.4} />
            </div>

            <div className="secure-disposal__shield">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>

            <div className="secure-disposal__art-tag">
              <Leaf size={15} />
              Better for tomorrow
            </div>
          </div>
        </div>

        <div className="secure-disposal__features">
          {safetyFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="secure-disposal__feature-card"
                key={feature.title}
              >
                <div className="secure-disposal__feature-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>

        <div className="secure-disposal__process">
          <div className="secure-disposal__process-heading">
            <span className="secure-disposal__eyebrow">
              <Recycle size={15} />
              Your Safe Disposal Checklist
            </span>

            <h3>Four steps to dispose responsibly.</h3>

            <p>
              Follow these practical precautions before passing on an old
              electronic device.
            </p>
          </div>

          <div className="secure-disposal__steps">
            {disposalSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  className="secure-disposal__step"
                  key={step.number}
                >
                  <div className="secure-disposal__step-top">
                    <span className="secure-disposal__step-number">
                      {step.number}
                    </span>

                    <span className="secure-disposal__step-icon">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                  </div>

                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="secure-disposal__warning">
          <div className="secure-disposal__warning-icon">
            <BatteryWarning size={23} />
          </div>

          <div className="secure-disposal__warning-copy">
            <h4>Important: damaged batteries need extra care.</h4>
            <p>
              If a battery is swollen, hot, leaking, or damaged, stop using
              the device. Do not charge, puncture, or dismantle it. Keep it
              away from flammable materials if safe to do so, and contact an
              appropriate battery recycling or hazardous-waste service for
              instructions.
            </p>
          </div>
        </div>

        <div className="secure-disposal__bottom-cta">
          <div className="secure-disposal__bottom-icon">
            <HardDrive size={25} />
          </div>

          <div className="secure-disposal__bottom-copy">
            <h3>Give your old electronics a better next step.</h3>
            <p>
              Explore device valuation or browse available products on
              EcoValuate.
            </p>
          </div>

          <div className="secure-disposal__bottom-actions">
            <Link
              href="/marketplace/products"
              className="secure-disposal__secondary-button"
            >
              Explore Marketplace
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}