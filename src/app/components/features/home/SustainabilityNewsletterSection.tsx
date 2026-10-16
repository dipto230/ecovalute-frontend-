"use client";

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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      if (!API_BASE_URL) {
        throw new Error(
          "Newsletter service is not configured yet. Please try again later."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/v1/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: normalizedEmail }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Subscription failed. Please try again."
        );
      }

      setStatus("success");
      setMessage(
        data?.message ||
          "You're on the list! Look out for sustainability updates in your inbox."
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sustainability-newsletter">
      <div className="sustainability-newsletter__container">
        <div className="sustainability-newsletter__card">
          <div className="sustainability-newsletter__content">
            <span className="sustainability-newsletter__eyebrow">
              <Sparkles size={15} />
              THE GREENER INBOX
            </span>

            <h2>
              Good news for you.
              <br />
              <span>Better news for the planet.</span>
            </h2>

            <p className="sustainability-newsletter__description">
              Get practical e-waste recycling tips, sustainability insights,
              and responsible electronics updates delivered straight to your
              inbox.
            </p>

            <div className="sustainability-newsletter__benefits">
              <span>
                <CheckCircle2 size={17} />
                Simple recycling tips
              </span>
              <span>
                <CheckCircle2 size={17} />
                Sustainable tech insights
              </span>
              <span>
                <CheckCircle2 size={17} />
                Useful updates, not inbox clutter
              </span>
            </div>

            {status === "success" ? (
              <div
                className="sustainability-newsletter__feedback sustainability-newsletter__feedback--success"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 size={20} />
                <div>
                  <strong>Thanks for joining us!</strong>
                  <p>{message}</p>
                </div>
              </div>
            ) : (
              <form
                className="sustainability-newsletter__form"
                onSubmit={handleSubscribe}
              >
                <label
                  className="sustainability-newsletter__input-wrap"
                  htmlFor="sustainability-newsletter-email"
                >
                  <Mail size={19} />
                  <input
                    id="sustainability-newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setMessage("");
                      }
                    }}
                    required
                    maxLength={254}
                    disabled={loading}
                    aria-invalid={status === "error"}
                    aria-describedby={
                      status === "error"
                        ? "sustainability-newsletter-message"
                        : undefined
                    }
                  />
                </label>

                <button
                  className="sustainability-newsletter__submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="sustainability-newsletter__spinner" size={18} />
                      Subscribing
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p
                    id="sustainability-newsletter-message"
                    className="sustainability-newsletter__error"
                    role="alert"
                  >
                    {message}
                  </p>
                )}
              </form>
            )}

            <div className="sustainability-newsletter__privacy">
              <ShieldCheck size={15} />
              <span>
                Your email should be used only according to our privacy policy.
                Unsubscribe options should be included in newsletter emails.
              </span>
            </div>
          </div>

          <div
            className="sustainability-newsletter__visual"
            aria-hidden="true"
          >
            <div className="sustainability-newsletter__visual-orbit sustainability-newsletter__visual-orbit--outer" />
            <div className="sustainability-newsletter__visual-orbit sustainability-newsletter__visual-orbit--inner" />

            <div className="sustainability-newsletter__leaf-card">
              <div className="sustainability-newsletter__leaf-icon">
                <Leaf size={54} strokeWidth={1.35} />
              </div>

              <span className="sustainability-newsletter__leaf-caption">
                SMALL STEPS
              </span>
              <strong>Greener living, one email at a time.</strong>
            </div>

            <div className="sustainability-newsletter__floating sustainability-newsletter__floating--mail">
              <Mail size={22} />
            </div>

            <div className="sustainability-newsletter__floating sustainability-newsletter__floating--leaf">
              <Leaf size={22} />
            </div>

            <div className="sustainability-newsletter__visual-dot sustainability-newsletter__visual-dot--one" />
            <div className="sustainability-newsletter__visual-dot sustainability-newsletter__visual-dot--two" />
          </div>
        </div>

        <div className="sustainability-newsletter__bottom">
          <span>
            <Leaf size={15} />
            A more sustainable future starts with better choices.
          </span>
          <span className="sustainability-newsletter__brand">
            EcoValuate
          </span>
        </div>
      </div>
    </section>
  );
}