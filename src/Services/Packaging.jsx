import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const packagingIntro = [
    'Packaging is often the first physical interaction someone has with your brand. It has to protect the product, communicate value, and make the experience feel worth choosing.',
    'We design packaging with a balance of shelf appeal, brand clarity, and functional structure, so your product feels polished before it is even opened.',
];

const packagingBenefits = [
    'Packaging systems designed to stand out faster',
    'Shelf-ready layouts that balance beauty with clarity',
    'Brand storytelling translated into structure, layout, and detail',
    'Premium visual presentation that supports customer confidence',
];

const packagingServices = [
    {
        title: 'Product Packaging Design',
        description: 'Create packaging that captures attention quickly while reinforcing your brand message and product promise.',
    },
    {
        title: 'Label & Layout Systems',
        description: 'Develop polished information hierarchies and label structures so packaging feels clean, organized, and easier to trust.',
    },
    {
        title: 'Retail Display Direction',
        description: 'Shape packaging visuals that improve recall, strengthen shelf presence, and elevate how your product is perceived.',
    },
];

const Packaging = () => {
    return (
        <ServicePageTemplate
            accent="#138d90"
            accentEnd="#0c6e70"
            accentSoft="#1fb2b5"
            accentShadow="rgba(10, 95, 96, 0.18)"
            heroTitle="Packaging Design That Elevates Product Perception"
            heroDescription="Great packaging does more than protect a product. It shapes first impressions, increases desirability, and helps your brand look stronger on the shelf and online."
            introTitle="Why Packaging Design Is Powerful"
            introParagraphs={packagingIntro}
            benefitsTitle="Why Packaging Design Matters"
            benefitsIntro="Packaging plays a direct role in how people judge quality, credibility, and value. When designed well, it becomes a real conversion asset."
            benefits={packagingBenefits}
            servicesTitle="Our Packaging Design Services"
            services={packagingServices}
            ctaTitle="Ready to Make Your Packaging More Distinctive?"
            ctaDescription="Let's design packaging that feels premium, communicates clearly, and helps your product win attention faster."
        />
    );
};

export default Packaging;
