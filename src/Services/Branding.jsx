import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const brandingBenefits = [
    'Strengthen brand recognition and recall',
    'Position your business as a premium choice',
    'Stand out in crowded, competitive markets',
    'Build trust and credibility with your audience',
];

const brandingServices = [
    {
        title: 'Logo Design',
        description: 'Memorable, scalable logo systems and visual identities.',
    },
    {
        title: 'Packaging',
        description: 'High-impact packaging designs that capture attention.',
    },
    {
        title: 'Brochures & Menu Design',
        description: 'Strategically designed brochures and menus that communicate your offerings clearly, elevate brand perception, and influence customer decisions.',
    },
];

const Branding = () => {
    return (
        <div className="branding-page">
            <section className="branding-hero">
                <div className="branding-shell branding-hero-shell">
                    <p className="branding-eyebrow">By HYPETYPE Studio</p>
                    <h1 className="branding-hero-title">Crafting Distinct Brand Identities That Drive Growth</h1>
                    <p className="branding-hero-description">
                        Your brand is more than visuals, it is how your audience perceives, trusts, and chooses you.
                        At Hypetype, we create strategic brand identities that capture attention and build credibility.
                    </p>
                    <Link to="/contact-us" className="branding-primary-cta">Start Your Brand Journey</Link>
                </div>
            </section>

            <section className="branding-section branding-white-section">
                <div className="branding-shell branding-narrow-shell">
                    <h2 className="branding-section-title">Why Strategic Branding Is Essential</h2>
                    <p className="branding-section-copy">
                        In today&apos;s competitive market, a compelling brand identity is essential for standing out. Whether you&apos;re launching something new or growing an established business, your brand should communicate trust, professionalism, and value at every touchpoint.
                    </p>
                    <div className="branding-benefits-grid">
                        {brandingBenefits.map((item) => (
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
                    <h2 className="branding-section-title branding-services-title">Our Branding Services</h2>
                    <div className="branding-services-grid">
                        {brandingServices.map((service) => (
                            <article key={service.title} className="branding-service-card">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-cta-band">
                <div className="branding-shell branding-cta-shell">
                    <h2>Ready to Scale Your Brand with HypeType?</h2>
                    <p>Let&apos;s create a brand identity that sets you apart and drives growth.</p>
                    <Link to="/contact-us" className="branding-primary-cta branding-band-cta">Book a Free Strategy Call</Link>
                </div>
            </section>
        </div>
    );
};

export default Branding;
