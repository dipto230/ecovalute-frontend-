"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  Cpu,
  Leaf,
  Recycle,
  ScanLine,
  Sparkles,
  Upload,
} from "lucide-react";

import "./ewaste-story.css";

const stories = [
  {
    id: "01",
    label: "THE PROBLEM",
    title: "It was once useful.",
    description:
      "A motherboard. An old television. A forgotten electronic device. When technology reaches the end of its first life, we often see waste — but there can still be value inside.",
    visual: "image",
    src: "/HERO-5.jpg",
    icon: Cpu,
    accent: "old",
  },
  {
    id: "02",
    label: "DISCOVER",
    title: "Don't throw it away.",
    description:
      "Bring your unused electronics to EcoValuate. Upload a photo and tell us what you have. Your device gets a digital identity before it becomes another piece of waste.",
    visual: "image",
    src: "/HERO-6.jpg",
    icon: Upload,
    accent: "discover",
  },
  {
    id: "03",
    label: "AI DETECTION",
    title: "Let AI see what's inside.",
    description:
      "EcoValuate can analyze the uploaded device and help identify its type, condition and potential value — turning a physical object into useful digital information.",
    visual: "video",
    src: "/HERO-7.mp4",
    icon: BrainCircuit,
    accent: "ai",
  },
  {
    id: "04",
    label: "NEW LIFE",
    title: "From waste to a new path.",
    description:
      "Once the device is understood, it can move toward the right next step — reuse, marketplace value or responsible recycling and material recovery.",
    visual: "video",
    src: "/HERO-8.mp4",
    icon: Recycle,
    accent: "recycle",
  },
];

export default function EWasteStorySection() {
  const [activeStory, setActiveStory] = useState(0);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    storyRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStory(index);
          }
        },
        {
          threshold: 0.45,
          rootMargin: "-10% 0px -10% 0px",
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const active = stories[activeStory];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="ewaste-story"
      aria-label="How EcoValuate works"
    >
      {/* Background decoration */}
      <div className="story-grid" />
      <div className="story-glow story-glow-one" />
      <div className="story-glow story-glow-two" />

      <div className="story-container">
        {/* Header */}
        <div className="story-header">
          <div className="story-eyebrow">
            <span className="story-eyebrow-dot" />
            THE ECO VALUATE STORY
          </div>

          <h2>
            Don&apos;t let technology
            <span> become waste.</span>
          </h2>

          <p>
            See what happens when an old electronic device gets a second
            chance.
          </p>

          <div className="story-scroll-hint">
            <ArrowDown size={15} />
            <span>Scroll to discover</span>
          </div>
        </div>

        {/* Main cinematic area */}
        <div className="story-layout">
          {/* Left story timeline */}
          <div className="story-timeline">
            <div className="story-line">
              <div
                className="story-line-progress"
                style={{
                  height: `${((activeStory + 1) / stories.length) * 100}%`,
                }}
              />
            </div>

            {stories.map((story, index) => {
              const Icon = story.icon;

              return (
                <div
                  key={story.id}
                  ref={(element) => {
                    storyRefs.current[index] = element;
                  }}
                  className={`story-step ${
                    activeStory === index ? "is-active" : ""
                  }`}
                >
                  <div className="story-step-marker">
                    {activeStory === index ? (
                      <Icon size={17} strokeWidth={2} />
                    ) : (
                      <span>{story.id}</span>
                    )}
                  </div>

                  <div className="story-step-content">
                    <div className="story-step-label">
                      {story.label}
                    </div>

                    <h3>{story.title}</h3>

                    <p>{story.description}</p>

                    {index === 0 && (
                      <div className="story-mini-tags">
                        <span>Old Electronics</span>
                        <span>Unused Devices</span>
                        <span>Hidden Value</span>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="story-action-preview">
                        <Upload size={15} />
                        <span>UPLOAD YOUR DEVICE</span>
                        <ArrowRight size={15} />
                      </div>
                    )}

                    {index === 2 && (
                      <div className="story-ai-preview">
                        <div className="ai-scan-icon">
                          <ScanLine size={18} />
                        </div>

                        <div>
                          <strong>AI ANALYSIS</strong>
                          <span>Identifying electronic component...</span>
                        </div>

                        <Sparkles size={17} />
                      </div>
                    )}

                    {index === 3 && (
                      <div className="story-recycle-preview">
                        <div>
                          <CheckCircle2 size={17} />
                          <span>Reuse</span>
                        </div>

                        <div>
                          <CheckCircle2 size={17} />
                          <span>Marketplace</span>
                        </div>

                        <div>
                          <CheckCircle2 size={17} />
                          <span>Recycle</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky cinematic visual */}
          <div className="story-visual-wrap">
            <div className="story-visual-sticky">
              {/* Top floating status */}
              <div className="story-status">
                <span className="status-pulse" />
                <span>ECOVALUATE SYSTEM</span>
                <span className="status-id">
                  {active.id} / {String(stories.length).padStart(2, "0")}
                </span>
              </div>

              {/* Main visual */}
              <div
                className={`story-visual story-visual-${active.accent}`}
              >
                {active.visual === "image" ? (
                  <Image
                    key={active.src}
                    src={active.src}
                    alt={active.title}
                    fill
                    sizes="(max-width: 900px) 92vw, 52vw"
                    className="story-media"
                  />
                ) : (
                  <video
                    key={active.src}
                    className="story-media story-video"
                    src={active.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}

                <div className="story-media-overlay" />

                {/* scan effect */}
                {activeStory === 2 && (
                  <div className="story-scan">
                    <div className="scan-line" />

                    <div className="scan-corner scan-corner-tl" />
                    <div className="scan-corner scan-corner-tr" />
                    <div className="scan-corner scan-corner-bl" />
                    <div className="scan-corner scan-corner-br" />

                    <div className="scan-text">
                      <ScanLine size={14} />
                      SCANNING ELECTRONICS
                    </div>
                  </div>
                )}

                {/* AI floating card */}
                {activeStory === 2 && (
                  <div className="visual-ai-card">
                    <div className="visual-ai-header">
                      <BrainCircuit size={17} />
                      <span>AI DETECTION</span>
                      <span className="live-dot">LIVE</span>
                    </div>

                    <div className="visual-ai-device">
                      <span>DEVICE</span>
                      <strong>Electronic Component</strong>
                    </div>

                    <div className="visual-ai-row">
                      <span>ANALYSIS</span>

                      <div className="ai-progress">
                        <span />
                      </div>
                    </div>

                    <div className="visual-ai-footer">
                      <span>IDENTIFYING...</span>
                      <Sparkles size={14} />
                    </div>
                  </div>
                )}

                {/* Upload card */}
                {activeStory === 1 && (
                  <div className="visual-upload-card">
                    <div className="upload-card-icon">
                      <Upload size={19} />
                    </div>

                    <div>
                      <strong>UPLOAD DEVICE</strong>
                      <span>Start with a photo</span>
                    </div>

                    <ArrowRight size={17} />
                  </div>
                )}

                {/* Recycle card */}
                {activeStory === 3 && (
                  <div className="visual-recycle-card">
                    <div className="recycle-icon">
                      <Recycle size={23} />
                    </div>

                    <div>
                      <strong>GIVE IT ANOTHER LIFE</strong>
                      <span>Reuse · Recover · Recycle</span>
                    </div>
                  </div>
                )}

                {/* First scene card */}
                {activeStory === 0 && (
                  <div className="visual-waste-card">
                    <div className="waste-card-icon">
                      <CircleDot size={19} />
                    </div>

                    <div>
                      <strong>END OF FIRST LIFE</strong>
                      <span>But not the end of its value.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom visual navigation */}
              <div className="story-visual-footer">
                <div className="visual-progress">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to story ${index + 1}`}
                      className={activeStory === index ? "active" : ""}
                      onClick={() => {
                        storyRefs.current[index]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    />
                  ))}
                </div>

                <span>
                  {active.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="story-bottom">
          <div className="story-bottom-icon">
            <Leaf size={21} />
          </div>

          <div>
            <span>THE IDEA BEHIND ECOVALUATE</span>
            <strong>
              Your old electronics deserve a better destination.
            </strong>
          </div>

          <ArrowRight className="story-bottom-arrow" size={21} />
        </div>
      </div>
    </section>
  );
}