import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceTemplate.css';

const ServicePageTemplate = ({
    accent,
    accentEnd,
    accentSoft,
    accentShadow,
    eyebrow = 'By HYPETYPE Studio',
    heroTitle,
    heroDescription,
    heroCtaLabel = 'Start Your Brand Journey',
    introTitle,
    introParagraphs = [],
    benefitsTitle,
    benefitsIntro,
    benefits = [],
    servicesTitle,
    services = [],
    workVideos = [],
    workImages = [],
    workPdfs = [],
    ctaTitle,
    ctaDescription,
    ctaLabel = 'Book a Free Strategy Call',
}) => {
    const theme = {
        '--service-accent': accent,
        '--service-accent-end': accentEnd,
        '--service-accent-soft': accentSoft,
        '--service-accent-shadow': accentShadow,
    };

    return (
        <div className="branding-page" style={theme}>
            <section className="branding-hero">
                <div className="branding-shell branding-hero-shell">
                    <p className="branding-eyebrow">{eyebrow}</p>
                    <h1 className="branding-hero-title">{heroTitle}</h1>
                    <p className="branding-hero-description">{heroDescription}</p>
                    <Link to="/contact-us" className="branding-primary-cta">{heroCtaLabel}</Link>
                </div>
            </section>

            {introParagraphs.length > 0 && (
                <section className="branding-section branding-white-section">
                    <div className="branding-shell branding-narrow-shell">
                        <h2 className="branding-section-title">{introTitle}</h2>
                        <div className="branding-section-copy branding-section-copy-stack">
                            {introParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="branding-section branding-white-section">
                <div className="branding-shell branding-narrow-shell">
                    <h2 className="branding-section-title">{benefitsTitle}</h2>
                    <p className="branding-section-copy">{benefitsIntro}</p>
                    <div className="branding-benefits-grid">
                        {benefits.map((item) => (
                            <div key={item} className="branding-benefit-item">
                                <span className="branding-benefit-icon" aria-hidden="true">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-muted-section branding-services-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">{servicesTitle}</h2>
                    <div className="branding-services-grid">
                        {services.map((service) => (
                            <article key={service.title} className="branding-service-card">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {(workVideos.length > 0 || workImages.length > 0) && (
                <section className="branding-section work-section-container">
                    <div className="branding-shell">
                        <h2 className="branding-section-title work-title">Our Work</h2>

                        <div className="media-flex-grid">
                            {/* Videos */}
                            {workVideos.map((videoSrc, index) => (
                                <div key={`vid-${index}`} className="media-card">
                                    <video autoPlay muted loop playsInline>
                                        <source src={videoSrc} type="video/mp4" />
                                    </video>
                                </div>
                            ))}

                            {/* Images */}
                            {workImages.map((imgSrc, index) => (
                                <div key={`img-${index}`} className="media-card">
                                    <img src={imgSrc} alt="Work Example" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PDF SECTION */}
            {workPdfs.length > 0 && (
                <section className="branding-section work-section-container">
                    <div className="branding-shell">
                        <div className="pdf-container">
                            {workPdfs.map((pdf, index) => (
                                <a key={index} href={pdf.url} download className="pdf-download-btn">
                                    Download {pdf.label || 'Project PDF'}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            

            <section className="branding-cta-band">
                <div className="branding-shell branding-cta-shell">
                    <h2>{ctaTitle}</h2>
                    <p>{ctaDescription}</p>
                    <Link to="/contact-us" className="branding-primary-cta branding-band-cta">{ctaLabel}</Link>
                </div>
            </section>
        </div>
    );
};

export default ServicePageTemplate;
