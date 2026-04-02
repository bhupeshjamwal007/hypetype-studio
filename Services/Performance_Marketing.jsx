import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const performanceBenefits = [
    'Multi-channel ad campaign management across Meta, Google, and more',
    'Conversion rate optimization to turn traffic into paying customers',
    'Marketing automation systems to streamline lead nurturing',
    'A/B testing and continuous campaign optimization for better results',
    'High-converting landing page strategy and development',
    'Transparent, detailed ROI tracking and performance reporting',
];

const performanceServices = [
    {
        title: 'Paid Media Management',
        description: 'Run data-driven campaigns across key ad platforms with tighter targeting, smarter budgets, and stronger results.',
    },
    {
        title: 'Conversion Optimization',
        description: 'Improve campaign efficiency with landing page strategy, testing systems, and funnel improvements focused on ROI.',
    },
    {
        title: 'Reporting & Scale Strategy',
        description: 'Track every key metric with clear performance reporting and growth planning that helps you scale confidently.',
    },
];

const PerformanceMarketing = () => {
    return (
        <ServicePageTemplate
            accent="#2f74d0"
            accentEnd="#1f59aa"
            accentSoft="#4f91ea"
            accentShadow="rgba(28, 70, 135, 0.18)"
            heroTitle="Performance Marketing That Maximizes ROI"
            heroDescription="Data-driven digital marketing campaigns built to generate leads, increase conversions, and scale your revenue. At Hypetype, we focus on what truly matters, measurable growth and profitable results."
            benefitsTitle="What You Get with Our Performance Marketing"
            benefitsIntro="Drive real results, not just clicks. With our Performance Marketing, you get data-driven campaigns, targeted reach, and continuous optimization designed to maximize ROI, generate quality leads, and scale your business faster."
            benefits={performanceBenefits}
            servicesTitle="Our Performance Marketing Services"
            services={performanceServices}
            ctaTitle="Ready to Turn Marketing Spend into Growth?"
            ctaDescription="Let's build a performance marketing engine that delivers stronger conversions, better ROI, and scalable growth."
        />
    );
};

export default PerformanceMarketing;
