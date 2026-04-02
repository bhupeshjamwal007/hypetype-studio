import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const eventBenefits = [
    'End-to-end event planning and execution',
    'Corporate events, brand activations, and product launches',
    'Creative concept development and theme design',
    'Vendor coordination and on-ground management',
    'Event marketing and audience engagement strategies',
    'Post-event analysis and performance reporting',
];

const eventServices = [
    {
        title: 'Event Strategy & Planning',
        description: 'Build memorable events with clear concepts, timelines, production planning, and seamless execution strategy.',
    },
    {
        title: 'Brand Activations & Launches',
        description: 'Create high-energy experiences for product launches, activations, and live brand moments that people remember.',
    },
    {
        title: 'Production & On-Ground Management',
        description: 'Handle logistics, vendors, coordination, and execution so every event runs smoothly from start to finish.',
    },
];

const EventManagement = () => {
    return (
        <ServicePageTemplate
            accent="#8a5bd6"
            accentEnd="#6f43be"
            accentSoft="#a171ea"
            accentShadow="rgba(83, 41, 149, 0.18)"
            heroTitle="Experiential Events That Leave a Lasting Impact"
            heroDescription="From concept to execution, we design and manage unforgettable events that elevate your brand, engage your audience, and create meaningful real-world connections."
            benefitsTitle="What's Included in Our Event Management"
            benefitsIntro="Seamless events, from concept to execution. Our Event Management covers everything from planning and design to coordination and on-site management, ensuring every detail is handled perfectly so you can enjoy a stress-free, memorable experience."
            benefits={eventBenefits}
            servicesTitle="Our Event Management Services"
            services={eventServices}
            ctaTitle="Ready to Build an Event People Remember?"
            ctaDescription="Let's turn your next event into an experience that strengthens your brand and connects with your audience."
        />
    );
};

export default EventManagement;
