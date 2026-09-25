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
  ShieldCheck,
  Activity,
} from "lucide-react";
import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

import "./ai-valuation.css";

type ScanStage = "idle" | "uploading" | "scanning" | "analyzed";

export default function AIValuationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const uploadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysisTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [stage, setStage] = useState<ScanStage>("idle");
  const [preview, setPreview] = useState<string | null>(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  /* -------------------------------------------------------
     Mouse parallax
  ------------------------------------------------------- */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 10;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 10;

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

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /* -------------------------------------------------------
     Cleanup
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) {
        clearTimeout(uploadTimerRef.current);
      }

      if (analysisTimerRef.current) {
        clearTimeout(analysisTimerRef.current);
      }

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* -------------------------------------------------------
     Upload
  ------------------------------------------------------- */

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload an image smaller than 10MB.");
      return;
    }

    if (uploadTimerRef.current) {
      clearTimeout(uploadTimerRef.current);
    }

    if (analysisTimerRef.current) {
      clearTimeout(analysisTimerRef.current);
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
    setStage("uploading");

    uploadTimerRef.current = setTimeout(() => {
      setStage("scanning");
    }, 850);

    analysisTimerRef.current = setTimeout(() => {
      setStage("analyzed");
    }, 3000);

    event.target.value = "";
  };

  /* -------------------------------------------------------
     Reset
  ------------------------------------------------------- */

  const resetScanner = () => {
    if (uploadTimerRef.current) {
      clearTimeout(uploadTimerRef.current);
    }

    if (analysisTimerRef.current) {
      clearTimeout(analysisTimerRef.current);
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setStage("idle");
  };

  const isScanning =
    stage === "uploading" || stage === "scanning";

  const isAnalyzed = stage === "analyzed";

  const sceneStyle = {
    "--mouse-x": `${mouse.x}px`,
    "--mouse-y": `${mouse.y}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="ai-valuation"
      className="ai-valuation-section"
    >
      {/* Background */}
      <div className="ai-background-grid" />

      <div className="ai-background-glow ai-glow-one" />
      <div className="ai-background-glow ai-glow-two" />

      <div className="ai-valuation-container">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="ai-valuation-header">
          <div className="ai-section-eyebrow">
            <span className="ai-eyebrow-icon">
              <Sparkles size={13} />
            </span>

            <span>AI POWERED VALUATION</span>

            <span className="ai-eyebrow-line" />
          </div>

          <h2>
            Give your old device
            <span> a second value.</span>
          </h2>

          <p>
            Upload a photo of your electronic device and let
            EcoValuate intelligently identify it, understand its
            condition and estimate its potential value.
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="ai-valuation-layout">
          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div className="ai-valuation-copy">
            <div className="ai-copy-intro">
              <span>HOW IT WORKS</span>

              <h3>
                Turn e-waste into
                <br />
                <strong>useful value.</strong>
              </h3>
            </div>

            {/* STEP 01 */}

            <div className="ai-copy-line">
              <div className="ai-copy-number">
                <span>01</span>
              </div>

              <div className="ai-copy-content">
                <div className="ai-step-icon">
                  <Upload size={16} />
                </div>

                <div>
                  <h4>Upload your device</h4>

                  <p>
                    Take a clear photo of your smartphone,
                    laptop, monitor or other electronic device.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 02 */}

            <div className="ai-copy-line">
              <div className="ai-copy-number">
                <span>02</span>
              </div>

              <div className="ai-copy-content">
                <div className="ai-step-icon">
                  <BrainCircuit size={16} />
                </div>

                <div>
                  <h4>AI detects the device</h4>

                  <p>
                    Our vision system analyzes the image and
                    extracts useful device information.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 03 */}

            <div className="ai-copy-line">
              <div className="ai-copy-number">
                <span>03</span>
              </div>

              <div className="ai-copy-content">
                <div className="ai-step-icon">
                  <Zap size={16} />
                </div>

                <div>
                  <h4>Get an estimated value</h4>

                  <p>
                    Understand the possible resale or recovery
                    value of your electronic device.
                  </p>
                </div>
              </div>
            </div>

            {/* UPLOAD BUTTON */}

            <label
              className={`ai-upload-button ${
                isScanning ? "is-disabled" : ""
              }`}
            >
              <span className="ai-upload-icon">
                <Upload size={17} />
              </span>

              <span className="ai-upload-text">
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

              <span className="ai-upload-arrow">
                <ArrowRight size={17} />
              </span>
            </label>

            {/* TRUST */}

            <div className="ai-trust-row">
              <div>
                <ShieldCheck size={15} />
                <span>Secure analysis</span>
              </div>

              <div>
                <CheckCircle2 size={15} />
                <span>AI assisted</span>
              </div>

              <div>
                <Activity size={15} />
                <span>Smart valuation</span>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT AI VISUAL
          ==================================================== */}

          <div
            className="ai-scanner-scene"
            style={sceneStyle}
          >
            {/* Ambient glow */}

            <div className="ai-scene-glow" />

            {/* Perspective grid */}

            <div className="ai-scene-grid" />

            {/* Orbit rings */}

            <div className="ai-orbit ai-orbit-one" />
            <div className="ai-orbit ai-orbit-two" />
            <div className="ai-orbit ai-orbit-three" />

            {/* Top label */}

            <div className="ai-floating-label ai-label-top">
              <span className="ai-label-icon">
                <Sparkles size={13} />
              </span>

              <div>
                <small>AI SYSTEM</small>
                <strong>VISION ENGINE</strong>
              </div>
            </div>

            {/* Accuracy */}

            {!preview && (
              <div className="ai-floating-label ai-label-right">
                <div className="ai-accuracy-icon">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <small>CONFIDENCE</small>
                  <strong>98.2%</strong>
                </div>
              </div>
            )}

            {/* =================================================
                MAIN DEVICE CONSOLE
            ================================================== */}

            <div
              className={`ai-device-console ${
                isScanning ? "is-scanning" : ""
              } ${isAnalyzed ? "is-analyzed" : ""}`}
            >
              {/* Console top */}

              <div className="ai-console-top">
                <div className="ai-console-brand">
                  <span className="ai-live-dot" />

                  <span>ECOVALUATE</span>

                  <small>AI</small>
                </div>

                <div className="ai-console-status">
                  <span />

                  {stage === "idle"
                    ? "READY"
                    : stage === "uploading"
                      ? "UPLOADING"
                      : stage === "scanning"
                        ? "ANALYZING"
                        : "COMPLETE"}
                </div>
              </div>

              {/* Main scanner */}

              <div className="ai-device-screen">
                {/* Image */}

                {!preview ? (
                  <div className="ai-default-device">
                    <div className="ai-device-shadow" />

                    <div className="ai-phone">
                      <div className="ai-phone-camera">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="ai-phone-screen">
                        <div className="ai-phone-logo">
                          <Sparkles size={28} />
                        </div>

                        <strong>AI VISION</strong>

                        <span>
                          PLACE DEVICE
                        </span>

                        <div className="ai-phone-scan-line" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ai-uploaded-device">
                    <Image
                      src={preview}
                      alt="Uploaded electronic device"
                      fill
                      sizes="(max-width: 768px) 90vw, 540px"
                      className="ai-uploaded-image"
                      unoptimized
                    />

                    <div className="ai-image-overlay" />
                  </div>
                )}

                {/* Scanner frame */}

                <div className="ai-scanner-frame">
                  <span className="frame-tl" />
                  <span className="frame-tr" />
                  <span className="frame-bl" />
                  <span className="frame-br" />
                </div>

                {/* Scan line */}

                {isScanning && (
                  <>
                    <div className="ai-scan-beam" />

                    <div className="ai-scanning-pill">
                      <ScanLine size={15} />

                      <span>
                        {stage === "uploading"
                          ? "UPLOADING IMAGE"
                          : "AI ANALYZING DEVICE"}
                      </span>

                      <i />
                    </div>
                  </>
                )}

                {/* Complete */}

                {isAnalyzed && (
                  <div className="ai-complete-pill">
                    <CheckCircle2 size={16} />

                    <span>ANALYSIS COMPLETE</span>
                  </div>
                )}

                {/* Corner coordinates */}

                <div className="ai-coordinate ai-coordinate-tl">
                  X: 024
                </div>

                <div className="ai-coordinate ai-coordinate-br">
                  Y: 098
                </div>
              </div>

              {/* Console bottom */}

              <div className="ai-console-bottom">
                <div>
                  <small>ANALYSIS STATUS</small>

                  <strong>
                    {stage === "idle"
                      ? "System ready"
                      : stage === "uploading"
                        ? "Uploading image..."
                        : stage === "scanning"
                          ? "Processing device..."
                          : "Device successfully analyzed"}
                  </strong>
                </div>

                <div className="ai-console-chip">
                  <BrainCircuit size={16} />
                  <span>AI</span>
                </div>
              </div>
            </div>

            {/* =================================================
                LEFT FLOATING CARD
            ================================================== */}

            {!preview && (
              <div className="ai-data-card ai-data-card-left">
                <div className="ai-data-icon">
                  <Cpu size={17} />
                </div>

                <div>
                  <small>DETECTION MODEL</small>
                  <strong>VISION ANALYSIS</strong>
                </div>
              </div>
            )}

            {/* =================================================
                BOTTOM FLOATING CARD
            ================================================== */}

            {!preview && (
              <div className="ai-data-card ai-data-card-bottom">
                <div className="ai-mini-progress">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <small>PROCESSING</small>
                  <strong>REAL-TIME</strong>
                </div>
              </div>
            )}

            {/* =================================================
                RESULT CARD
            ================================================== */}

            {isAnalyzed && (
              <div className="ai-result-card">
                <div className="ai-result-top">
                  <div>
                    <span>DEVICE DETECTED</span>

                    <strong>Smartphone</strong>
                  </div>

                  <div className="ai-result-success">
                    <CheckCircle2 size={18} />
                  </div>
                </div>

                <div className="ai-result-line" />

                <div className="ai-result-stats">
                  <div>
                    <small>CONDITION</small>
                    <strong>Excellent</strong>
                  </div>

                  <div>
                    <small>CONFIDENCE</small>
                    <strong>98%</strong>
                  </div>
                </div>

                <div className="ai-result-price">
                  <div>
                    <small>ESTIMATED VALUE</small>

                    <strong>₹42,500</strong>
                  </div>

                  <div className="ai-price-icon">
                    <Zap size={18} />
                  </div>
                </div>

                <Link
                  href="/marketplace"
                  className="ai-result-button"
                >
                  Explore Marketplace
                  <ArrowRight size={15} />
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