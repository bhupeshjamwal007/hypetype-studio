import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const brochureIntro = [
    'Brochures and menus are often where people make quick decisions about your offer. If the layout feels cluttered or unclear, even strong products can lose impact.',
    'We design brochure and menu experiences that balance readability, hierarchy, and brand presentation, so the information feels easy to follow and visually polished.',
];

const brochureBenefits = [
    'Clear information design that improves readability and trust',
    'Layouts shaped to support offers, products, and positioning',
    'Premium brochure and menu design for print and digital formats',
    'Consistent visual storytelling across customer-facing material',
];

const brochureServices = [
    {
        title: 'Brochure Design',
        description: 'Craft brochures that communicate your services, products, or company story with stronger clarity and cleaner hierarchy.',
    },
    {
        title: 'Menu Design',
        description: 'Design menus that feel polished, easy to scan, and visually aligned with your restaurant or hospitality brand.',
    },
    {
        title: 'Printed Collateral Systems',
        description: 'Create supporting brochure and menu layouts that make your printed brand material feel more premium and cohesive.',
    },
];

const BrochureMenu = () => {
    return (
        <ServicePageTemplate
            accent="#138d90"
            accentEnd="#0c6e70"
            accentSoft="#1fb2b5"
            accentShadow="rgba(10, 95, 96, 0.18)"
            heroTitle="Brochure & Menu Design That Feels Clear and Premium"
            heroDescription="Whether you are presenting a service, a product, or a dining experience, strong brochure and menu design helps people understand, trust, and decide faster."
            introTitle="Why Brochure & Menu Design Matters"
            introParagraphs={brochureIntro}
            benefitsTitle="Why Brochure & Menu Design Matters"
            benefitsIntro="Well-designed brochures and menus help information feel easier to consume, improve customer confidence, and make your brand look more considered."
            benefits={brochureBenefits}
            servicesTitle="Our Brochure & Menu Design Services"
            services={brochureServices}
            ctaTitle="Ready to Improve Your Printed Brand Experience?"
            ctaDescription="Let's create brochures and menus that look polished, communicate clearly, and support better brand perception."
        />
    );
};

export default BrochureMenu;
