
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import "./sustainability-newsletter.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SustainabilityNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!API_BASE_URL) {
      setStatus("error");
      setMessage(
        "Newsletter service is not configured yet. Please try again later.",
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, "")}/api/v1/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: normalizedEmail }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Unable to subscribe right now. Please try again.",
        );
      }

      setStatus("success");
      setMessage(
        result?.message ||
          "Thanks for subscribing! Stay tuned for a greener future.",
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="sustainability-newsletter"
      aria-labelledby="sustainability-newsletter-title"
    >
      <div className="sustainability-newsletter__container">
        {/* Left content */}
        <div className="sustainability-newsletter__content">
          <div className="sustainability-newsletter__eyebrow">
            <span className="sustainability-newsletter__eyebrow-icon">
              <Leaf size={15} aria-hidden="true" />
            </span>
            <span>THE GREEN CIRCLE</span>
          </div>

          <h2
            id="sustainability-newsletter-title"
            className="sustainability-newsletter__title"
          >
            Small Updates.
            <br />
            <span>Big Impact.</span>
          </h2>

          <p className="sustainability-newsletter__description">
            Join our sustainability community and discover smarter ways to
            recycle electronics, reduce e-waste, and build a greener future.
          </p>

          <form
            className="sustainability-newsletter__form"
            onSubmit={handleSubscribe}
            noValidate
          >
            <label
              className="sustainability-newsletter__input-wrapper"
              htmlFor="sustainability-newsletter-email"
            >
              <Mail
                className="sustainability-newsletter__input-icon"
                size={19}
                aria-hidden="true"
              />

              <input
                id="sustainability-newsletter-email"
                className="sustainability-newsletter__input"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                disabled={isSubmitting}
                aria-invalid={status === "error"}
                aria-describedby={
                  message ? "sustainability-newsletter-message" : undefined
                }
              />
            </label>

            <button
              className="sustainability-newsletter__button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="sustainability-newsletter__spinner"
                    aria-hidden="true"
                  />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {message && (
            <p
              id="sustainability-newsletter-message"
              className={`sustainability-newsletter__message sustainability-newsletter__message--${status}`}
              role={status === "error" ? "alert" : "status"}
            >
              {status === "success" ? (
                <CheckCircle2 size={17} aria-hidden="true" />
              ) : status === "error" ? (
                <ShieldCheck size={17} aria-hidden="true" />
              ) : null}

              <span>{message}</span>
            </p>
          )}

          <div className="sustainability-newsletter__trust">
            <span className="sustainability-newsletter__trust-icon">
              <ShieldCheck size={16} aria-hidden="true" />
            </span>

            <span>
              No spam, ever. Just meaningful steps toward sustainability.
            </span>
          </div>

          <div className="sustainability-newsletter__highlights">
            <div className="sustainability-newsletter__highlight">
              <span className="sustainability-newsletter__highlight-icon">
                <Leaf size={17} aria-hidden="true" />
              </span>
              <span>Eco-friendly tips</span>
            </div>

            <div className="sustainability-newsletter__highlight">
              <span className="sustainability-newsletter__highlight-icon">
                <Sparkles size={17} aria-hidden="true" />
              </span>
              <span>Green innovations</span>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="sustainability-newsletter__visual">
          <div className="sustainability-newsletter__image-frame">
            <Image
              src="/NEWS_LETTER_SECTION.png"
              alt="EcoValuate sustainability newsletter illustration about responsible electronic waste recycling"
              width={600}
              height={600}
              className="sustainability-newsletter__image"
              sizes="(max-width: 760px) 100vw, 45vw"
            />
          </div>

          <div className="sustainability-newsletter__image-caption">
            <span className="sustainability-newsletter__caption-icon">
              <Leaf size={18} aria-hidden="true" />
            </span>

            <div>
              <p className="sustainability-newsletter__caption-title">
                A greener tomorrow
              </p>
              <p className="sustainability-newsletter__caption-description">
                One mindful choice at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
