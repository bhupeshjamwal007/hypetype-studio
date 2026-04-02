import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const webBenefits = [
    'Custom website development tailored to your business goals',
    'High-performance iOS and Android mobile applications',
    'Progressive web apps (PWAs) for fast, app-like experiences',
    'Scalable e-commerce platforms optimized for conversions',
    'Cloud-based architecture for speed, security, and flexibility',
    'Ongoing support, maintenance, and performance optimization',
];

const webServices = [
    {
        title: 'Custom Website Development',
        description: 'Build responsive, fast, and conversion-focused websites designed around your brand, goals, and customer journey.',
    },
    {
        title: 'Mobile App Development',
        description: 'Create high-performance iOS and Android apps that deliver polished user experiences and long-term product value.',
    },
    {
        title: 'E-commerce & Scalable Platforms',
        description: 'Launch modern digital platforms with strong performance, flexible architecture, and room to grow as your business scales.',
    },
];

const WebAppsDevelopment = () => {
    return (
        <ServicePageTemplate
            accent="#2da36b"
            accentEnd="#207d52"
            accentSoft="#46bb83"
            accentShadow="rgba(26, 104, 68, 0.18)"
            heroTitle="Scalable Web & App Solutions for Modern Brands"
            heroDescription="We design and develop high-performance websites and mobile applications that deliver seamless user experiences, boost engagement, and support long-term business growth."
            benefitsTitle="What's Included in Our Development Services"
            benefitsIntro="From custom websites to scalable mobile applications, our development services are built to deliver speed, usability, and long-term growth for modern brands."
            benefits={webBenefits}
            servicesTitle="Our Web & App Development Services"
            services={webServices}
            ctaTitle="Ready to Build Digital Products That Scale?"
            ctaDescription="Let's create websites and applications that look premium, perform smoothly, and support real business growth."
        />
    );
};

export default WebAppsDevelopment;
