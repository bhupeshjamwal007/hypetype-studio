import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const serviceGroups = [
    {
        icon: 'BP',
        title: 'Branding & Packaging',
        description: 'Identity systems, packaging direction, and brand collateral designed to make your business look sharper and feel more premium.',
        to: '/services/branding',
    },
    {
        icon: 'SM',
        title: 'Content & Social Growth',
        description: 'Social media strategy, content planning, and creative production built to increase visibility, engagement, and brand recall.',
        to: '/services/social-media',
    },
    {
        icon: 'AD',
        title: 'Ad Film Production',
        description: 'Commercial shoots, campaign visuals, and storytelling-led production that help your brand stand out across platforms.',
        to: '/services/commercial-and-ads',
    },
    {
        icon: 'PM',
        title: 'Performance Marketing',
        description: 'Conversion-focused campaign systems designed to improve ROI, generate quality leads, and scale your business faster.',
        to: '/services/performance-marketing',
    },
    {
        icon: 'DX',
        title: 'Digital Solutions',
        description: 'Websites, mobile apps, and scalable digital systems that support modern brand growth with strong user experience.',
        to: '/services/web-apps-development',
    },
    {
        icon: 'AE',
        title: 'Artists & Events',
        description: 'Talent growth, brand collaborations, event experiences, and strategic execution built to expand your brand presence.',
        to: '/services/artist-management',
    },
];

const Services = () => {
    return (
        <div className="services-overview-page">
            <section className="services-overview-intro">
                <div className="services-overview-shell">
                    <h1 className="services-overview-title">
                        Full-Service <span>Growth Partner</span>
                    </h1>
                    <p className="services-overview-subtitle">
                        From strategy to execution, we bring branding, performance, content, production, and digital systems together under one studio.
                    </p>

                    <div className="services-overview-grid">
                        {serviceGroups.map((service) => (
                            <Link key={service.title} to={service.to} className="services-overview-card">
                                <div className="services-overview-icon" aria-hidden="true">{service.icon}</div>
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-overview-highlight">
                <div className="services-overview-shell">
                    <div className="services-overview-banner">
                        <h2>Why choose a full-service partner?</h2>
                        <p>
                            One vision. One team. Smoother execution. When strategy, creativity, marketing, and digital production move together, your brand grows with more clarity and less friction.
                        </p>
                    </div>
                </div>
            </section>

            <section className="services-overview-cta">
                <div className="services-overview-shell services-overview-cta-shell">
                    <h2>Ready to build with one team instead of five?</h2>
                    <p>
                        Let&apos;s create a service mix that fits your brand stage, sharpens your message, and drives measurable momentum.
                    </p>
                    <Link to="/contact-us" className="services-overview-cta-button">Book a Free Strategy Call</Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
