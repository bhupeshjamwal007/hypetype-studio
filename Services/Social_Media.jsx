import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../components/ServiceTemplate.css';
import CARiDCaseStudyPreview from '../assets/brochures/previews/CARiD.jpg';
import FBVictoriaPreview from '../assets/brochures/previews/FB-Victoria.jpg';
import TrendsavvyCaseStudyPreview from '../assets/brochures/previews/Trendsavvy-Case-Study.jpg';

const CARiDCaseStudyPdf = '/brochures/CARiD-Case-Study_compressed.pdf';
const FBVictoriaPdf = '/brochures/FB-Victoria.pdf';
const TrendsavvyCaseStudyPdf = '/brochures/Trendsavvy-Case-Study.pdf';


const socialBenefits = [
    'Strengthen brand recognition and recall',
    'Position your business as a premium choice',
    'Stand out in crowded, competitive markets',
    'Build trust and credibility with your audience',
    'Create meaningful emotional connections',
    'Increase customer retention and lifetime value',
];

const socialServices = [
    {
        title: 'Content Creation & Strategy',
        description: 'High-quality posts, reels, and creatives tailored to your brand voice and audience to maximize engagement and reach.',
    },
    {
        title: 'Community Management',
        description: 'Active audience engagement through comments, messages, and interactions that build trust and loyalty.',
    },
    {
        title: 'Performance Tracking & Analytics',
        description: 'Detailed reporting with insights on reach, engagement, and conversions to continuously improve performance.',
    },
    {
        title: 'Content Planning & Scheduling',
        description: 'Strategic content calendars aligned with your goals, ensuring consistent and timely posting across platforms.',
    },
];

const processSteps = [
    {
        step: '01',
        title: 'Audit & Insights',
        description: 'We analyze your current social media performance, competitors, and audience behavior to uncover growth opportunities.',
    },
    {
        step: '02',
        title: 'Strategy & Planning',
        description: 'We build a customized social media strategy, including content pillars, posting schedules, and KPIs aligned with your goals.',
    },
    {
        step: '03',
        title: 'Content Production',
        description: 'Our team creates engaging, high-performing creatives including posts, reels, and stories designed to capture attention.',
    },
    {
        step: '04',
        title: 'Publishing & Engagement',
        description: 'We schedule and publish content at optimal times while actively engaging with your audience to build relationships.',
    },
    {
        step: '05',
        title: 'Optimize & Scale',
        description: 'We track performance, analyze data, and continuously refine strategies to improve reach, engagement, and conversions.',
    },
];

const platforms = [
    { name: 'Instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
    { name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg' },
    { name: 'LinkedIn', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    { name: 'Twitter', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg' },
    { name: 'YouTube', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' },
    { name: 'TikTok', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg' },
    { name: 'Pinterest', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png' },
    { name: 'Snapchat', icon: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg' },
];

const discoverServices = [
    {
        title: 'Logo Design',
        description: 'A logo is the visual identity of a brand, combining creativity and strategy to communicate its values, personality, and message at a glance.',
        icon: 'LD',
    },
    {
        title: 'Packaging',
        description: 'Packaging is more than just protection, it is a powerful tool that presents a product, communicates its value, and attracts customers.',
        icon: 'PK',
    },
    {
        title: 'Performance Marketing',
        description: 'ROI-focused campaigns optimized for conversions and business growth.',
        icon: 'PM',
    },
    {
        title: 'Web & Apps Development',
        description: 'Custom digital experiences built to improve usability, performance, and business growth.',
        icon: 'WD',
    },
    {
        title: 'Commercial & Ads',
        description: 'High-impact advertising content built to grab attention and turn viewers into customers.',
        icon: 'CA',
    },
    {
        title: 'Artist Management',
        description: 'Strategic artist management that builds visibility, authority, and long-term opportunities.',
        icon: 'AM',
    },
    {
        title: 'Event Management',
        description: 'Memorable event experiences designed to engage audiences and strengthen your brand presence.',
        icon: 'EM',
    },
];

const workItems = [
    {
        src: '/images/social-1.jpeg',
        title: 'Perfect Meats',
        instagramUrl: 'https://www.instagram.com/perfectmeats_?igsh=MW40dmI2MDJyYW15eg==',
    },
    {
        src: '/images/social-2.jpeg',
        title: 'Northern Resturant Consulting',
        instagramUrl: 'https://www.instagram.com/northernrestaurantconsulting?igsh=bHczNnV2cHVxNTMx',
    },
    {
        src: '/images/social-3.jpeg',
        title: 'Holistic True Advice',
        instagramUrl: 'https://www.instagram.com/holistictrueadvice?igsh=MWFieWdkamV2ZG5jZA==',
    },
    {
        src: '/images/social-4.jpeg',
        title: 'Rakshak Puri',
        instagramUrl: 'https://www.instagram.com/rakshakpuri_menswear?igsh=MWZuem9rOXdzdnZyZA=',
    },
    {
        src: '/images/social-5.jpeg',
        title: 'Chamak By Saloni Sabharwal',
        instagramUrl: 'https://www.instagram.com/chamakbysaloni?igsh=MTQ4cXFwcjhnZDRxcQ==',
    },
    {
        src: '/images/social-6.jpeg',
        title: 'Soado',
        instagramUrl: 'https://www.instagram.com/soado.jammu?igsh=N3Joazh0MHVkOWZo',
    },
    {
        src: '/images/social-7.jpeg',
        title: 'Label Nidhi Aggarwal',
        instagramUrl: 'https://www.instagram.com/labelnidhiaggarwal?igsh=OWVnZWZsZXZ3cXBk',
    },
];

const workPdfs = [
    { label: 'CARiD Case Study', url: CARiDCaseStudyPdf, previewUrl: CARiDCaseStudyPreview },
    { label: 'FB-Victoria', url: FBVictoriaPdf, previewUrl: FBVictoriaPreview },
    { label: 'Trendsavvy-Case-Study', url: TrendsavvyCaseStudyPdf, previewUrl: TrendsavvyCaseStudyPreview },
];

const getLoopedItems = (items, startIndex, count) => {
    if (!items.length) return [];
    return Array.from({ length: count }, (_, offset) => items[(startIndex + offset) % items.length]);
};

const SocialMedia = () => {
    const visibleDiscoverCards = 3;
    const visibleCarouselCards = 4;
    const [discoverIndex, setDiscoverIndex] = useState(0);
    const [workIndex, setWorkIndex] = useState(0);
    const maxDiscoverIndex = Math.max(0, discoverServices.length - visibleDiscoverCards);

    const activeDiscoverServices = useMemo(
        () => discoverServices.slice(discoverIndex, discoverIndex + visibleDiscoverCards),
        [discoverIndex]
    );
    const visibleWorkItems = useMemo(
        () => getLoopedItems(workItems, workIndex, visibleCarouselCards),
        [workIndex]
    );

    const handleDiscoverPrevious = () => {
        setDiscoverIndex((current) => (current <= 0 ? maxDiscoverIndex : current - 1));
    };

    const handleDiscoverNext = () => {
        setDiscoverIndex((current) => (current >= maxDiscoverIndex ? 0 : current + 1));
    };
    const handleWorkPrevious = () => {
        setWorkIndex((current) => (current - 1 + workItems.length) % workItems.length);
    };
    const handleWorkNext = () => {
        setWorkIndex((current) => (current + 1) % workItems.length);
    };

    return (
        <div
            className="branding-page social-page"
            style={{
                '--service-accent': '#f08b3f',
                '--service-accent-end': '#dd6e20',
                '--service-accent-soft': '#ff9d53',
                '--service-accent-shadow': 'rgba(146, 79, 21, 0.18)',
            }}
        >
            <section className="branding-hero">
                <div className="branding-shell branding-hero-shell">
                    <p className="branding-eyebrow">By HYPETYPE Studio</p>
                    <h1 className="branding-hero-title">Top Social Media Marketing Agency for Scalable Growth</h1>
                    <p className="branding-hero-description">
                        Looking to grow your brand online? Hypetype delivers performance-driven social media marketing services designed to increase engagement, build authority, and drive real business results.
                    </p>
                    <Link to="/contact-us" className="branding-primary-cta">Start Your Brand Journey</Link>
                </div>
            </section>

            <section className="branding-section branding-muted-section">
                <div className="branding-shell branding-narrow-shell">
                    <h2 className="branding-section-title">Why Choose Hypetype for Social Media Marketing?</h2>
                    <div className="branding-section-copy branding-section-copy-stack">
                        <p>At Hypetype, we understand that social media is more than just posting content, it is about building meaningful connections and driving measurable growth. Our social media marketing strategies are designed to help brands stand out, engage the right audience, and convert attention into revenue.</p>
                        <p>From content creation and community engagement to performance tracking and optimization, we manage your entire social media ecosystem with a results-first approach.</p>
                        <p>Whether you&apos;re a startup or an established business, we help you scale your presence with data-driven strategies that deliver consistent growth.</p>
                    </div>
                </div>
            </section>

            <section className="branding-section branding-white-section">
                <div className="branding-shell branding-narrow-shell">
                    <h2 className="branding-section-title">Why Choose Our Social Media Management</h2>
                    <p className="branding-section-copy">
                        Turn your social media into a powerful growth engine. Our Social Media Management blends creative storytelling, data-driven strategy, and consistent execution to build a strong online presence that truly connects. We don&apos;t just post, we engage, attract, and convert your audience into loyal fans, helping your brand stand out and grow faster than ever.
                    </p>
                    <div className="branding-benefits-grid">
                        {socialBenefits.map((item) => (
                            <div key={item} className="branding-benefit-item">
                                <span className="branding-benefit-icon" aria-hidden="true">&#10003;</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-muted-section branding-services-section social-services-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">Our Social Media Services</h2>
                    <div className="branding-services-grid social-services-grid">
                        {socialServices.map((service) => (
                            <article key={service.title} className="branding-service-card social-service-card">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section work-section-container">
                <div className="branding-shell">
                    <h2 className="branding-section-title work-title">Our Work</h2>
                    <div className="logo-image-wrapper">
                        <div className="carousel-shell">
                            <button type="button" className="carousel-arrow" aria-label="Previous work items" onClick={handleWorkPrevious}>&larr;</button>
                            <div className="work-image-grid">
                                {visibleWorkItems.map((item, index) => (
                                    <div
                                        key={`${item.src}-${workIndex}-${index}`}
                                        className="logo-card social-work-card is-visible"
                                    >
                                        <img src={item.src} alt={`${item.title} social media work`} />
                                        <a
                                            href={item.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-work-link"
                                            aria-label={`${item.title} on Instagram`}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                                                alt=""
                                                aria-hidden="true"
                                                className="social-work-instagram-icon"
                                            />
                                            <span>{item.title}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="carousel-arrow" aria-label="Next work items" onClick={handleWorkNext}>&rarr;</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="branding-section branding-white-section brochures-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title work-title">Case Study</h2>
                    <div className="pdf-grid">
                        {workPdfs.map((pdf) => (
                            <article key={pdf.url} className="pdf-card">
                                <img src={pdf.previewUrl} alt={`${pdf.label} preview`} className="pdf-preview-image" />
                                <h3 className="pdf-card-title">{pdf.label}</h3>
                                <div className="pdf-card-actions">
                                    <a
                                        href={pdf.url}
                                        download
                                        className="pdf-btn pdf-btn-download"
                                        aria-label={`Download ${pdf.label} brochure`}
                                    >
                                        Download Our Brochure
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-white-section social-process-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">Our Social Media Management Process</h2>
                    <div className="social-process-list">
                        {processSteps.map((step) => (
                            <article
                                key={step.step}
                                className="social-process-card"
                            >
                                <div className="social-process-step">{step.step}</div>
                                <div className="social-process-copy">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-muted-section social-platforms-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">We Manage All Major Platforms</h2>
                    <p className="social-platforms-subtitle">Instagram, Facebook, LinkedIn, Twitter, YouTube, TikTok, and more</p>
                    <div className="social-platforms-grid">
                        {platforms.map((platform) => (
                            <article
                                key={platform.name}
                                className="social-platform-card"
                            >
                                <img src={platform.icon} alt={platform.name} className="social-platform-icon" />
                                <h3>{platform.name}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-white-section social-discover-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">Discover Other <span>Services</span></h2>
                    <p className="social-discover-subtitle">
                        Unlock your brand&apos;s full potential with our innovative strategies. We harness data-driven insights to drive growth, engagement, and conversions.
                    </p>
                    <div className="social-discover-row">
                        <button type="button" className="social-discover-nav" aria-label="Previous services" onClick={handleDiscoverPrevious}>&larr;</button>
                        <div className="social-discover-grid">
                            {activeDiscoverServices.map((service) => (
                                <article
                                    key={service.title}
                                    className="social-discover-card"
                                >
                                    <div className="social-discover-icon" aria-hidden="true">{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </article>
                            ))}
                        </div>
                        <button type="button" className="social-discover-nav" aria-label="Next services" onClick={handleDiscoverNext}>&rarr;</button>
                    </div>
                </div>
            </section>

            <section className="branding-cta-band">
                <div className="branding-shell branding-cta-shell">
                    <h2>Ready to Grow Your Brand on Social Media?</h2>
                    <p>Let&apos;s build a sharper social media presence that strengthens your brand, grows engagement, and drives real results.</p>
                    <Link to="/contact-us" className="branding-primary-cta branding-band-cta">Book a Free Strategy Call</Link>
                </div>
            </section>
        </div>
    );
};

export default SocialMedia;
