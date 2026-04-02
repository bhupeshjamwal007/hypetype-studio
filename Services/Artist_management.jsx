import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const artistBenefits = [
    'Personal brand development and positioning strategy',
    'Influencer marketing and brand collaborations',
    'Social media growth and content strategy',
    'PR, media exposure, and audience building',
    'Contract negotiation and partnership management',
    'Career planning and long-term growth strategy',
];

const artistServices = [
    {
        title: 'Brand Positioning for Talent',
        description: 'Build a clear personal brand that helps artists, creators, and influencers stand out with consistency and purpose.',
    },
    {
        title: 'Collaborations & Partnerships',
        description: 'Secure the right brand deals, partnership opportunities, and booking conversations that align with long-term growth.',
    },
    {
        title: 'Career Growth Strategy',
        description: 'Create structured growth plans covering visibility, audience expansion, media opportunities, and long-term momentum.',
    },
];

const ArtistManagement = () => {
    return (
        <ServicePageTemplate
            accent="#4c82c9"
            accentEnd="#345ea7"
            accentSoft="#5f95dc"
            accentShadow="rgba(31, 70, 132, 0.18)"
            heroTitle="Strategic Artist Management That Builds Influence"
            heroDescription="We help artists, creators, and influencers grow their personal brand, secure opportunities, and build long-term success through strategic management and marketing."
            benefitsTitle="What's Included in Our Artist Management"
            benefitsIntro="Complete support for talent to thrive. Our Artist Management includes brand building, bookings, promotions, and career guidance, ensuring artists grow their presence, maximize opportunities, and focus on their craft."
            benefits={artistBenefits}
            servicesTitle="Our Artist Management Services"
            services={artistServices}
            ctaTitle="Ready to Grow Your Artist Brand with HYPETYPE?"
            ctaDescription="Let's build a powerful artist management strategy that turns influence into long-term opportunity."
        />
    );
};

export default ArtistManagement;
