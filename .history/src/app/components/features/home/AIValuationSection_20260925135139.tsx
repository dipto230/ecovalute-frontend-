"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  ScanLine,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./ai-valuation.css";

type ScanStage = "idle" | "uploading" | "scanning" | "analyzed";

export default function AIValuationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stage, setStage] = useState<ScanStage>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setMouse({
        x: x * 18,
        y: y * 18,
      });
    };

    const handleMouseLeave = () => {
      setMouse({
        x: 0,
        y: 0,
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
    setStage("uploading");

    window.setTimeout(() => {
      setStage("scanning");
    }, 900);

    window.setTimeout(() => {
      setStage("analyzed");
    }, 2800);
  };

  const resetScanner = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setStage("idle");
  };

  const isScanning = stage === "uploading" || stage === "scanning";
  const isAnalyzed = stage === "analyzed";

  return (
    <section
      ref={sectionRef}
      className="ai-valuation-section"
      id="ai-valuation"
    >
      <div className="ai-valuation-grid" />

      <div className="ai-valuation-orb ai-valuation-orb-one" />
      <div className="ai-valuation-orb ai-valuation-orb-two" />

      <div className="ai-valuation-container">
        <div className="ai-valuation-header">
          <div className="ai-section-eyebrow">
            <span className="ai-eyebrow-dot" />
            AI POWERED VALUATION
          </div>

          <h2>
            What is your
            <span> e-waste worth?</span>
          </h2>

          <p>
            Upload a photo of your old electronic device and let EcoValuate
            analyze it, identify the device, understand its condition and
            estimate its potential value.
          </p>
        </div>

        <div className="ai-valuation-layout">
          <div className="ai-valuation-copy">
            <div className="ai-copy-line">
              <span className="ai-copy-number">01</span>

              <div>
                <h3>Upload your device</h3>
                <p>
                  Take a clear photo of your smartphone, laptop, monitor or
                  other electronic device.
                </p>
              </div>
            </div>

            <div className="ai-copy-line">
              <span className="ai-copy-number">02</span>

              <div>
                <h3>AI detects the device</h3>
                <p>
                  EcoValuate analyzes the uploaded image and extracts useful
                  device information.
                </p>
              </div>
            </div>

            <div className="ai-copy-line">
              <span className="ai-copy-number">03</span>

              <div>
                <h3>Get an estimated value</h3>
                <p>
                  The analysis can help you understand the possible resale or
                  recovery value of your e-waste.
                </p>
              </div>
            </div>

            <label className="ai-upload-button">
              <Upload size={18} />

              <span>
                {stage === "idle"
                  ? "Upload Device Image"
                  : stage === "analyzed"
                    ? "Analyze Another Device"
                    : "Analyzing Device..."}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={isScanning}
              />

              <ArrowRight size={17} />
            </label>

            <div className="ai-trust-row">
              <div>
                <CheckCircle2 size={15} />
                AI assisted
              </div>

              <div>
                <CheckCircle2 size={15} />
                Smart analysis
              </div>

              <div>
                <CheckCircle2 size={15} />
                Sustainable choice
              </div>
            </div>
          </div>

          <div
            className="ai-scanner-scene"
            style={
              {
                "--mouse-x": `${mouse.x}px`,
                "--mouse-y": `${mouse.y}px`,
              } as React.CSSProperties
            }
          >
            <div className="ai-scanner-shadow" />

            <div className="ai-orbit ai-orbit-one" />
            <div className="ai-orbit ai-orbit-two" />
            <div className="ai-orbit ai-orbit-three" />

            <div className="ai-floating-label ai-floating-label-top">
              <Sparkles size={14} />
              <span>AI VISION</span>
            </div>

            <div className="ai-floating-label ai-floating-label-bottom">
              <Cpu size={14} />
              <span>DEVICE ANALYSIS</span>
            </div>

            <div className="ai-device-card">
              <div className="ai-device-glow" />

              <div className="ai-device-topbar">
                <div className="ai-device-brand">
                  <span className="ai-status-dot" />
                  ECOVALUATE AI
                </div>

                <div className="ai-device-live">
                  <span />
                  LIVE
                </div>
              </div>

              <div className="ai-device-screen">
                {!preview ? (
                  <div className="ai-default-device">
                    <div className="ai-phone">
                      <div className="ai-phone-camera" />
                      <div className="ai-phone-screen">
                        <Sparkles size={34} />
                        <span>SCAN</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ai-uploaded-device">
                    <Image
                      src={preview}
                      alt="Uploaded electronic device"
                      fill
                      sizes="(max-width: 768px) 80vw, 420px"
                      className="ai-uploaded-image"
                      unoptimized
                    />
                  </div>
                )}

                <div className="ai-corner ai-corner-tl" />
                <div className="ai-corner ai-corner-tr" />
                <div className="ai-corner ai-corner-bl" />
                <div className="ai-corner ai-corner-br" />

                {isScanning && (
                  <>
                    <div className="ai-scan-line" />

                    <div className="ai-scanning-text">
                      <ScanLine size={16} />
                      {stage === "uploading"
                        ? "UPLOADING..."
                        : "AI ANALYZING..."}
                    </div>
                  </>
                )}

                {isAnalyzed && (
                  <div className="ai-analysis-complete">
                    <CheckCircle2 size={18} />
                    ANALYSIS COMPLETE
                  </div>
                )}
              </div>

              <div className="ai-device-footer">
                <div>
                  <span>STATUS</span>

                  <strong>
                    {stage === "idle"
                      ? "READY TO SCAN"
                      : stage === "uploading"
                        ? "UPLOADING"
                        : stage === "scanning"
                          ? "ANALYZING"
                          : "ANALYZED"}
                  </strong>
                </div>

                <div className="ai-device-icon">
                  <BrainCircuit size={19} />
                </div>
              </div>
            </div>

            {isAnalyzed && (
              <div className="ai-result-card">
                <div className="ai-result-header">
                  <div>
                    <span>DEVICE DETECTED</span>
                    <strong>Smartphone</strong>
                  </div>

                  <div className="ai-result-check">
                    <CheckCircle2 size={18} />
                  </div>
                </div>

                <div className="ai-result-divider" />

                <div className="ai-result-grid">
                  <div>
                    <span>CONDITION</span>
                    <strong>Excellent</strong>
                  </div>

                  <div>
                    <span>CONFIDENCE</span>
                    <strong>98%</strong>
                  </div>
                </div>

                <div className="ai-price-box">
                  <div>
                    <span>ESTIMATED VALUE</span>
                    <strong>₹42,500</strong>
                  </div>

                  <Zap size={22} />
                </div>

                <Link href="/marketplace" className="ai-result-button">
                  Explore Marketplace
                  <ArrowRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={resetScanner}
                  className="ai-reset-button"
                >
                  Scan another device
                </button>
              </div>
            )}

            {!preview && (
              <div className="ai-mini-card ai-mini-card-left">
                <BrainCircuit size={17} />
                <div>
                  <span>AI MODEL</span>
                  <strong>VISION ANALYSIS</strong>
                </div>
              </div>
            )}

            {!preview && (
              <div className="ai-mini-card ai-mini-card-right">
                <div className="ai-mini-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <span>ACCURACY</span>
                  <strong>98.2%</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ai-bottom-strip">
          <div className="ai-bottom-item">
            <span>01</span>
            <div>
              <strong>UPLOAD</strong>
              <small>Device image</small>
            </div>
          </div>

          <div className="ai-bottom-line" />

          <div className="ai-bottom-item">
            <span>02</span>
            <div>
              <strong>DETECT</strong>
              <small>AI identification</small>
            </div>
          </div>

          <div className="ai-bottom-line" />

          <div className="ai-bottom-item">
            <span>03</span>
            <div>
              <strong>ANALYZE</strong>
              <small>Condition check</small>
            </div>
          </div>

          <div className="ai-bottom-line" />

          <div className="ai-bottom-item">
            <span>04</span>
            <div>
              <strong>VALUE</strong>
              <small>Estimated worth</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}