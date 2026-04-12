import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const advantageItems = [
    { icon: '📖', title: 'Conversion Storytelling' },
    { icon: '⚡', title: 'Agile Execution' },
    { icon: '📊', title: 'ROI Strategy' },
    { icon: '🎨', title: 'High-Impact Creative' },
    { icon: '🤝', title: 'Founder Attention' },
];

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <section className="about-hero-editorial">
                <div className="about-container-center">
                    <div className="about-pill-tag">About HypeType</div>
                    <span className="about-brand-tagline">Brand Growth Studio</span>
                    <h1 className="about-main-heading">
                        Where Performance Marketing
                        <br />
                        <span className="about-italic-serif">Drives Real Growth</span>
                    </h1>
                    <p className="about-hero-subtext">
                        Your brand deserves more than visibility-we build stratergies that convert attention into measurable buisness result.
                    </p>
                </div>
            </section>

            <section className="about-who-we-are-section">
                <div className="about-container-narrow">
                    <h2 className="about-section-title">Who We Are</h2>
                    <div className="about-who-we-are-content">
                        <p className="about-lead-text">
                            HypeType is a results-driven digital marketing agency built for brands that refuse to settle for average.
                            We operate at the intersection of data, creativity, and performance, where every decision is backed by
                            insights and every campaign is built to scale.
                        </p>
                        <p className="about-body-text">
                            We specialize in growth-first marketing, combining high-impact creative, precision targeting,
                            and conversion-focused strategies that turn traffic into revenue. Our mission is to bridge the
                            gap between pure storytelling and measurable business growth.
                        </p>
                    </div>
                    <div className="about-minimal-quote">
                        <p>&quot;We&apos;re not just your agency-we&apos;re your growth partner.&quot;</p>
                    </div>
                </div>
            </section>

            <section className="about-advantage-section">
                <div className="about-container-center">
                    <h2 className="about-advantage-heading">The Hypetype Advantage</h2>
                    <span className="about-small-tagline">What Sets Us Apart.</span>
                    <p className="about-advantage-subheading">
                        Our goal is simple: to help brands grow faster, communicate better, and leave a lasting impression.
                    </p>
                    <div className="about-advantage-grid">
                        {advantageItems.map((item) => (
                            <article key={item.title} className="about-advantage-card">
                                <div className="about-card-icon" aria-hidden="true">{item.icon}</div>
                                <h3>{item.title}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-final-cta">
                <div className="about-container-center">
                    <h2 className="about-cta-heading">
                        Ready to Scale Your Brand with <span className="about-elegant-italic">HypeType?</span>
                    </h2>
                    <p className="about-cta-subtext">Let&apos;s build a high-performance marketting engine tailored to your buisness goals.</p>
                    <div className="about-cta-buttons">
                        <Link to="/contact-us" className="about-btn-primary">Book a Free Stratergy Call</Link>
                        <Link to="/" className="about-btn-secondary">Explore Our Work</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
