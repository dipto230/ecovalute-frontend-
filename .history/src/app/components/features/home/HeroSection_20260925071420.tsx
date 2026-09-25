"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  Laptop,
  Recycle,
  ScanSearch,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

import "./hero.css";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setMouse({
        x,
        y,
      });
    };

    const handleMouseLeave = () => {
      setMouse({
        x: 0,
        y: 0,
      });
    };

    const hero = heroRef.current;

    hero?.addEventListener("mousemove", handleMouseMove);
    hero?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero?.removeEventListener("mousemove", handleMouseMove);
      hero?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const phoneTransform = {
    transform: `
      perspective(1200px)
      rotateX(${mouse.y * -8}deg)
      rotateY(${mouse.x * 10}deg)
      translate3d(${mouse.x * 18}px, ${mouse.y * 18}px, 0)
    `,
  };

  const cardTransform = {
    transform: `
      translate3d(${mouse.x * -25}px, ${mouse.y * -20}px, 0)
    `,
  };

  const laptopTransform = {
    transform: `
      translate3d(${mouse.x * 30}px, ${mouse.y * 25}px, 0)
      rotate(${mouse.x * 4}deg)
    `,
  };

  return (
    <section ref={heroRef} className="ev-hero">
      {/* Background visual layers */}
      <div className="ev-hero-background">
        <div className="ev-grid" />

        <div className="ev-glow ev-glow-one" />
        <div className="ev-glow ev-glow-two" />

        <Image
                  src="/HERO-1.jpg"
                   width={1200}
                    height={800}
          alt=""
          className="ev-bg-image ev-bg-image-one"
        />

        <Image
                  src="/HERO-2.jpg"
                   width={1200}
  height={800}
          alt=""
          className="ev-bg-image ev-bg-image-two"
        />

        <div className="ev-noise" />
      </div>

      {/* Floating particles */}
      <div className="ev-particles" aria-hidden="true">
        <span className="ev-particle particle-1" />
        <span className="ev-particle particle-2" />
        <span className="ev-particle particle-3" />
        <span className="ev-particle particle-4" />
        <span className="ev-particle particle-5" />
        <span className="ev-particle particle-6" />
        <span className="ev-particle particle-7" />
        <span className="ev-particle particle-8" />
      </div>

      <div className="ev-hero-container">
        {/* LEFT SIDE */}
        <div className="ev-hero-content">
          <div className="ev-eyebrow">
            <span className="ev-eyebrow-icon">
              <Recycle size={15} />
            </span>

            <span>E-WASTE MANAGEMENT SYSTEM</span>

            <span className="ev-live-dot" />
            <span className="ev-live-text">AI POWERED</span>
          </div>

          <h1 className="ev-hero-title">
            Give Your
            <span className="ev-title-green"> E-Waste</span>
            <br />
            A <span className="ev-title-outline">New Value.</span>
          </h1>

          <p className="ev-hero-description">
            Turn unwanted electronics into real value with AI-powered
            valuation, smart pricing, and a sustainable marketplace built for
            the future.
          </p>

          <div className="ev-hero-actions">
            <Link href="/marketplace" className="ev-primary-button">
              <span>Sell Your E-Waste</span>

              <span className="ev-button-icon">
                <ArrowRight size={18} />
              </span>
            </Link>

            <Link href="/marketplace" className="ev-secondary-button">
              <span className="ev-secondary-play">
                <ScanSearch size={17} />
              </span>

              <span>Explore Marketplace</span>
            </Link>
          </div>

          <div className="ev-trust-row">
            <div className="ev-trust-item">
              <span className="ev-trust-icon">
                <CheckCircle2 size={15} />
              </span>

              <span>AI Valuation</span>
            </div>

            <div className="ev-trust-item">
              <span className="ev-trust-icon">
                <CheckCircle2 size={15} />
              </span>

              <span>Smart Pricing</span>
            </div>

            <div className="ev-trust-item">
              <span className="ev-trust-icon">
                <CheckCircle2 size={15} />
              </span>

              <span>Eco Friendly</span>
            </div>
          </div>

          <div className="ev-mini-stats">
            <div className="ev-stat">
              <strong>AI</strong>
              <span>Detection</span>
            </div>

            <div className="ev-stat-divider" />

            <div className="ev-stat">
              <strong>24/7</strong>
              <span>Marketplace</span>
            </div>

            <div className="ev-stat-divider" />

            <div className="ev-stat">
              <strong>100%</strong>
              <span>Digital</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ev-visual">
          {/* Decorative orbit */}
          <div className="ev-orbit orbit-one" />
          <div className="ev-orbit orbit-two" />
          <div className="ev-orbit orbit-three" />

          {/* Main circular recycle core */}
          <div className="ev-recycle-core">
            <div className="ev-core-ring">
              <Recycle size={52} strokeWidth={1.4} />
            </div>

            <div className="ev-core-pulse" />
          </div>

          {/* Main 3D phone */}
          <div className="ev-phone-wrapper" style={phoneTransform}>
            <div className="ev-phone-shadow" />

            <div className="ev-phone">
              <div className="ev-phone-frame">
                <div className="ev-phone-screen">
                  <div className="ev-phone-notch" />

                  <div className="ev-phone-header">
                    <span>EcoValuate</span>

                    <span className="ev-phone-status">
                      <span />
                      AI
                    </span>
                  </div>

                  <div className="ev-phone-image-wrap">
                    <Image
                                          src="/HERO-3.jpg"
                                           width={1200}
  height={800}
                      alt="Electronic device"
                      className="ev-phone-image"
                    />

                    <div className="ev-scan-line" />

                    <div className="ev-detected-badge">
                      <CheckCircle2 size={13} />
                      DETECTED
                    </div>
                  </div>

                  <div className="ev-phone-info">
                    <span>DEVICE</span>
                    <strong>Smartphone</strong>
                  </div>

                  <div className="ev-phone-value">
                    <div>
                      <span>ESTIMATED VALUE</span>
                      <strong>₹42,500</strong>
                    </div>

                    <div className="ev-confidence">
                      <span>98%</span>
                      <small>CONFIDENCE</small>
                    </div>
                  </div>

                  <div className="ev-phone-bottom">
                    <span>
                      <Sparkles size={12} />
                      AI ANALYSIS
                    </span>

                    <span>READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI valuation card */}
          <div
            className="ev-ai-card"
            style={cardTransform}
          >
            <div className="ev-ai-card-top">
              <div className="ev-ai-icon">
                <Sparkles size={17} />
              </div>

              <div>
                <span>AI VALUATION</span>
                <strong>Live Estimate</strong>
              </div>

              <span className="ev-ai-live">
                <span />
                LIVE
              </span>
            </div>

            <div className="ev-ai-price">
              <span>₹</span>
              <strong>42,500</strong>
              <small>+12.8%</small>
            </div>

            <div className="ev-ai-progress">
              <span />
            </div>

            <div className="ev-ai-bottom">
              <span>Market match</span>
              <strong>98%</strong>
            </div>
          </div>

          {/* Laptop card */}
          <div
            className="ev-device-card ev-laptop-card"
            style={laptopTransform}
          >
            <div className="ev-device-icon">
              <Laptop size={22} />
            </div>

            <div>
              <strong>Laptop</strong>
              <span>Ready to recycle</span>
            </div>

            <div className="ev-device-check">
              <CheckCircle2 size={15} />
            </div>
          </div>

          {/* Battery floating card */}
          <div className="ev-floating-battery">
            <div className="ev-battery-icon">
              <BatteryCharging size={22} />
            </div>

            <div>
              <strong>Battery</strong>
              <span>Recyclable</span>
            </div>
          </div>

          {/* Smartphone floating icon */}
          <div className="ev-floating-phone">
            <Smartphone size={22} />
          </div>

          {/* CPU floating icon */}
          <div className="ev-floating-chip">
            <Cpu size={21} />
          </div>

          {/* Green energy bolt */}
          <div className="ev-energy">
            <Zap size={19} />
          </div>

          {/* Video preview */}
          <div className="ev-video-card">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="ev-video"
            >
              <source src="/HERO-7.mp4" type="video/mp4" />
            </video>

            <div className="ev-video-overlay" />

            <div className="ev-video-content">
              <span className="ev-video-label">
                <span />
                RECYCLING IN MOTION
              </span>

              <strong>Waste → Value</strong>
            </div>
          </div>

          {/* Small image card */}
          <div className="ev-image-card">
            <Image
                          src="/HERO-4.webp"
                          
              alt="Electronic recycling"
            />

            <div className="ev-image-card-overlay">
              <Recycle size={15} />
              <span>RECYCLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom floating strip */}
      <div className="ev-bottom-strip">
        <div className="ev-bottom-content">
          <div className="ev-bottom-item">
            <span className="ev-bottom-icon">
              <Recycle size={17} />
            </span>

            <div>
              <strong>Responsible Recycling</strong>
              <span>Better for our planet</span>
            </div>
          </div>

          <div className="ev-bottom-line" />

          <div className="ev-bottom-item">
            <span className="ev-bottom-icon">
              <Sparkles size={17} />
            </span>

            <div>
              <strong>AI Powered Valuation</strong>
              <span>Know what it is worth</span>
            </div>
          </div>

          <div className="ev-bottom-line" />

          <div className="ev-bottom-item">
            <span className="ev-bottom-icon">
              <Zap size={17} />
            </span>

            <div>
              <strong>Smart Marketplace</strong>
              <span>Sell with confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second video hidden decorative layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="ev-hidden-video"
        aria-hidden="true"
      >
        <source src="/HERO-8.mp4" type="video/mp4" />
      </video>

      {/* Extra image preload layer */}
      <div className="ev-preload-assets" aria-hidden="true">
      <Image
  src="/HERO-5.jpg"
  alt="EcoValuate electronic waste recycling"
  fill
  className="object-cover"
/>

<Image
  src="/HERO-6.jpg"
  alt="EcoValuate e-waste management"
  fill
  className="object-cover"
/>
      </div>
    </section>
  );
}