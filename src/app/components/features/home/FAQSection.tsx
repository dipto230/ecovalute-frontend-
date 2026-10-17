
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./faq-section.css";

const faqs = [
  {
    category: "Valuation",
    question: "How does EcoValuate estimate the value of my e-waste?",
    answer:
      "EcoValuate helps you understand the potential value of your electronic devices using available product information, device condition, material recovery estimates, and market references. The final resale or recycling value may vary depending on the device, its components, and current market conditions.",
  },
  {
    category: "AI Technology",
    question: "What is AI-powered e-waste detection?",
    answer:
      "Our AI Detection feature is designed to help identify electronic waste from submitted images or supported inputs. Results depend on image quality and the information available. Always review the detected device details before making a valuation or recycling decision.",
  },
  {
    category: "Marketplace",
    question: "Can I sell my old electronics through EcoValuate?",
    answer:
      "You can explore the EcoValuate marketplace to discover available electronics and participating vendors. Whether a particular device can be listed or sold depends on the platform's supported features, listing requirements, and vendor availability.",
  },
  {
    category: "Recycling",
    question: "Which electronic devices can be recycled?",
    answer:
      "Common e-waste categories include smartphones, laptops, computers, monitors, electronic accessories, and other electrical equipment. Acceptance depends on the category and the recycling partner's capabilities. Check the available categories or contact us if you are unsure about a device.",
  },
  {
    category: "Market Prices",
    question: "Are live metal prices the same as my device's resale value?",
    answer:
      "No. Copper and other commodity prices are market references, not guaranteed resale prices for electronic waste. Actual recovery value depends on material composition, purity, recoverable quantity, processing costs, device condition, and local market demand.",
  },
  {
    category: "Payments & Orders",
    question: "How do orders and payments work?",
    answer:
      "Available order and payment options depend on the listing and the features enabled on EcoValuate. Review the order details and applicable payment instructions before confirming a transaction. Keep your order information for future reference.",
  },
  {
    category: "Privacy & Security",
    question: "Is my personal information safe?",
    answer:
      "EcoValuate provides account and authentication features to help protect access to your account. Use a strong password, never share verification codes, and review the information you submit. Avoid uploading sensitive personal information in device photos.",
  },
  {
    category: "Getting Started",
    question: "Do I need an account to use EcoValuate?",
    answer:
      "You can explore the public pages and available marketplace information without necessarily creating an account. Certain account-specific features or transactions may require registration and login.",
  },
];

const categories = [
  "All questions",
  "Valuation",
  "AI Technology",
  "Marketplace",
  "Recycling",
  "Payments & Orders",
  "Privacy & Security",
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] =
    useState("All questions");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "All questions"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="eco-faq" id="faq">
      <div className="eco-faq__container">
        {/* LEFT INTRO */}
        <div className="eco-faq__intro">
          <div className="eco-faq__eyebrow">
            <span className="eco-faq__eyebrow-icon">
              <Sparkles size={15} />
            </span>
            YOUR QUESTIONS, ANSWERED
          </div>

          <h2 className="eco-faq__heading">
            Everything you need to know about{" "}
            <span>smarter recycling.</span>
          </h2>

          <p className="eco-faq__description">
            New to EcoValuate? Find clear answers about electronic
            waste valuation, AI-powered detection, our marketplace,
            and responsible recycling.
          </p>

          <div className="eco-faq__trust-list">
            <div className="eco-faq__trust-item">
              <span className="eco-faq__trust-icon">
                <CheckCircle2 size={17} />
              </span>
              Transparent valuation guidance
            </div>

            <div className="eco-faq__trust-item">
              <span className="eco-faq__trust-icon">
                <ShieldCheck size={17} />
              </span>
              Account security information
            </div>

            <div className="eco-faq__trust-item">
              <span className="eco-faq__trust-icon">
                <Leaf size={17} />
              </span>
              Responsible e-waste management
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="eco-faq__contact-card">
            <div className="eco-faq__contact-icon">
              <MessageCircle size={23} />
            </div>

            <div className="eco-faq__contact-content">
              <h3>Still have questions?</h3>

              <p>
                We are here to help you find the right answers.
              </p>

              <Link
                href="/contact"
                className="eco-faq__contact-link"
              >
                Contact our team
                <ArrowRight size={16} />
              </Link>
            </div>

            <ArrowDownRight
              className="eco-faq__contact-decoration"
              size={32}
            />
          </div>

          {/* FAQ IMAGES */}
          <div className="eco-faq__images">
            <div className="eco-faq__image-card eco-faq__image-card--main">
              <Image
                src="/FAQ_SECTION_PICTURE_1.png"
                alt="Electronic devices and sustainable e-waste recycling"
                width={600}
                height={420}
                sizes="(max-width: 760px) 55vw, 280px"
                className="eco-faq__image"
              />
            </div>

            <div className="eco-faq__image-card eco-faq__image-card--secondary">
              <Image
                src="/FAQ_SECTION_PICTURE_2.png"
                alt="Secure electronics disposal and digital data protection"
                width={600}
                height={420}
                sizes="(max-width: 760px) 40vw, 220px"
                className="eco-faq__image"
              />
            </div>
          </div>
        </div>

        {/* RIGHT FAQ CONTENT */}
        <div className="eco-faq__content">
          <div className="eco-faq__topline">
            <div>
              <span className="eco-faq__section-label">
                <CircleHelp size={16} />
                FREQUENTLY ASKED QUESTIONS
              </span>

              <p className="eco-faq__count">
                Find answers to common questions about our platform.
              </p>
            </div>

            <span className="eco-faq__count-badge">
              {faqs.length} answers
            </span>
          </div>

          {/* CATEGORY FILTERS */}
          <div
            className="eco-faq__filters"
            aria-label="Filter frequently asked questions"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`eco-faq__filter ${
                  activeCategory === category
                    ? "eco-faq__filter--active"
                    : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(0);
                }}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ACCORDION */}
          <div className="eco-faq__list">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.question}
                  className={`eco-faq__item ${
                    isOpen ? "eco-faq__item--open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="eco-faq__question"
                    id={`eco-faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`eco-faq-answer-${index}`}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                  >
                    <span className="eco-faq__question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="eco-faq__question-text">
                      {faq.question}
                    </span>

                    <span className="eco-faq__chevron">
                      <ChevronDown size={19} />
                    </span>
                  </button>

                  <div
                    id={`eco-faq-answer-${index}`}
                    className="eco-faq__answer"
                    role="region"
                    aria-labelledby={`eco-faq-question-${index}`}
                    hidden={!isOpen}
                  >
                    <div className="eco-faq__answer-inner">
                      <span className="eco-faq__answer-category">
                        {faq.category}
                      </span>

                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* BOTTOM CTA */}
          <div className="eco-faq__bottom-note">
            <span className="eco-faq__bottom-icon">
              <Leaf size={18} />
            </span>

            <p>
              <strong>Better decisions. Less e-waste.</strong>

              <span>
                Every informed choice is a step towards a more
                sustainable future.
              </span>
            </p>

            <Link
              href="/price-estimation"
              className="eco-faq__bottom-link"
            >
              Explore valuation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
