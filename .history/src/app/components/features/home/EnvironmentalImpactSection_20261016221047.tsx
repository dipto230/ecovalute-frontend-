"use client";

import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Recycle,
  TreePine,
  Droplets,
  Zap,
  Globe2,
} from "lucide-react";
import "./environmental-impact.css";

const impactStats = [
  {
    title: "E-Waste Recovered",
    value: "2,450+",
    unit: "kg",
    description: "Electronic waste redirected toward responsible recovery.",
    icon: Recycle,
  },
  {
    title: "Carbon Emissions Avoided",
    value: "1,280+",
    unit: "kg CO₂",
    description: "Estimated emissions avoided through responsible recycling.",
    icon: Leaf,
  },
  {
    title: "Trees Worth of Benefits",
    value: "85+",
    unit: "trees",
    description: "An illustrative equivalent of environmental benefits.",
    icon: TreePine,
  },
  {
    title: "Resources Protected",
    value: "640+",
    unit: "kg",
    description: "Materials potentially recovered for reuse and recycling.",
    icon: Droplets,
  },
];

const sustainabilityGoals = [
  {
    title: "Responsible Recycling",
    description:
      "Help keep discarded electronics away from unsafe disposal practices.",
    icon: Recycle,
  },
  {
    title: "Resource Conservation",
    description:
      "Support the recovery of reusable materials from old electronic devices.",
    icon: Zap,
  },
  {
    title: "A Greener Future",
    description:
      "Encourage more sustainable choices through responsible e-waste management.",
    icon: Globe2,
  },
];

export default function EnvironmentalImpactSection() {
  return (
    <section className="environmental-impact">
      <div className="environmental-impact__container">
        <div className="environmental-impact__heading">
          <span className="environmental-impact__eyebrow">
            <Leaf size={15} />
            Sustainability Matters
          </span>

          <h2>
            Small Actions.
            <span> Lasting Impact.</span>
          </h2>

          <p>
            Every responsibly handled electronic device is a step toward
            reducing waste, recovering valuable resources, and building a
            cleaner future.
          </p>
        </div>

        <div className="environmental-impact__banner">
          <div className="environmental-impact__banner-content">
            <span className="environmental-impact__banner-label">
              OUR ENVIRONMENTAL MISSION
            </span>

            <h3>
              Give your old electronics
              <br />
              a <span>more sustainable future.</span>
            </h3>

            <p>
              Reuse what you can. Recycle what you cannot. Make every device
              count.
            </p>

            <Link
              href="/price-estimation"
              className="environmental-impact__button"
            >
              Estimate Your Device Value
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="environmental-impact__visual" aria-hidden="true">
            <div className="environmental-impact__visual-circle">
              <div className="environmental-impact__visual-inner">
                <Recycle size={76} strokeWidth={1.2} />
              </div>
              <span className="environmental-impact__floating-icon impact-leaf">
                <Leaf size={23} />
              </span>
              <span className="environmental-impact__floating-icon impact-tree">
                <TreePine size={24} />
              </span>
              <span className="environmental-impact__floating-icon impact-globe">
                <Globe2 size={22} />
              </span>
            </div>
          </div>
        </div>

        <div className="environmental-impact__stats-heading">
          <div>
            <span className="environmental-impact__eyebrow">
              <Globe2 size={15} />
              Measuring Our Impact
            </span>
            <h3>Better choices, better outcomes.</h3>
          </div>
          <p>
            Environmental metrics should be calculated from verified platform
            activity and transparent estimation methods.
          </p>
        </div>

        <div className="environmental-impact__stats">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                className="environmental-impact__stat-card"
                key={stat.title}
              >
                <div className="environmental-impact__stat-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <p className="environmental-impact__stat-title">
                  {stat.title}
                </p>

                <div className="environmental-impact__stat-value">
                  <strong>{stat.value}</strong>
                  <span>{stat.unit}</span>
                </div>

                <p className="environmental-impact__stat-description">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="environmental-impact__goals">
          {sustainabilityGoals.map((goal) => {
            const Icon = goal.icon;

            return (
              <article
                className="environmental-impact__goal"
                key={goal.title}
              >
                <span className="environmental-impact__goal-icon">
                  <Icon size={21} />
                </span>

                <div>
                  <h4>{goal.title}</h4>
                  <p>{goal.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="environmental-impact__footer">
          <div className="environmental-impact__footer-icon">
            <Leaf size={22} />
          </div>

          <div>
            <h3>Have an old device? Give it a second life.</h3>
            <p>
              Explore its estimated value and discover a more responsible
              next step.
            </p>
          </div>

          <Link
            href="/marketplace/products"
            className="environmental-impact__footer-link"
          >
            Explore Marketplace
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
