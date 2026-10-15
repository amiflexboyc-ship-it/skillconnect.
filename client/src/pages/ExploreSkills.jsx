import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Palette,
  Smartphone,
  Server,
  ShoppingCart,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Search,
  Sparkles,
} from 'lucide-react';

const skillCategories = [
  {
    category: 'Full-Stack Web Development',
    icon: Code,
    description: 'Modern front-end SPAs, scalable backends, database architecture, and microservices.',
    skills: ['React.js', 'Node.js', 'Next.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'GraphQL'],
    expertsCount: 1840,
    openJobs: 412,
  },
  {
    category: 'UI/UX & Product Design',
    icon: Palette,
    description: 'Design systems, Figma wireframing, high-fidelity prototypes, user research, and branding.',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'Wireframing', 'Brand Identity', 'Adobe XD'],
    expertsCount: 920,
    openJobs: 215,
  },
  {
    category: 'Mobile App Engineering',
    icon: Smartphone,
    description: 'Cross-platform and native mobile apps with smooth animations and offline persistence.',
    skills: ['React Native', 'Flutter', 'iOS / Swift', 'Android / Kotlin', 'Expo', 'Mobile UI/UX', 'Push Notifications'],
    expertsCount: 750,
    openJobs: 180,
  },
  {
    category: 'Cloud DevOps & Infrastructure',
    icon: Server,
    description: 'CI/CD automated pipelines, container orchestration, AWS, Docker, Kubernetes, and Linux server tuning.',
    skills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD Pipelines', 'Linux', 'Terraform', 'Nginx', 'Redis'],
    expertsCount: 610,
    openJobs: 195,
  },
  {
    category: 'E-Commerce & Digital Storefronts',
    icon: ShoppingCart,
    description: 'Headless commerce, custom Shopify themes, WooCommerce, payment gateways, and WhatsApp funnels.',
    skills: ['Shopify', 'WooCommerce', 'Stripe', 'WhatsApp Checkout', 'Liquid', 'Inventory Sync', 'Conversion Optimization'],
    expertsCount: 530,
    openJobs: 140,
  },
  {
    category: 'AI & Machine Learning Solutions',
    icon: Cpu,
    description: 'Generative AI applications, custom LLM fine-tuning, automated intelligent workflows, and Python bots.',
    skills: ['Python', 'OpenAI API', 'LangChain', 'TensorFlow', 'NLP', 'Computer Vision', 'Data Science'],
    expertsCount: 420,
    openJobs: 160,
  },
  {
    category: 'Cybersecurity & Pentesting',
    icon: Shield,
    description: 'Vulnerability assessment, code security audits, ethical hacking, and data protection compliance.',
    skills: ['Penetration Testing', 'OWASP Top 10', 'API Security', 'Network Security', 'Cryptography', 'Audit Reports'],
    expertsCount: 310,
    openJobs: 85,
  },
  {
    category: 'Architecture & System Design',
    icon: Layers,
    description: 'Distributed systems, event-driven architectures, database sharding, and high-concurrency design.',
    skills: ['System Architecture', 'Microservices', 'Kafka', 'WebSockets', 'Scalability Audits', 'API Gateway'],
    expertsCount: 290,
    openJobs: 95,
  },
];

const ExploreSkills = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = skillCategories.filter((cat) => {
    const term = searchTerm.toLowerCase();
    return (
      cat.category.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term) ||
      cat.skills.some((s) => s.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Comprehensive Talent Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Skills & Disciplines
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Browse world-class capabilities across full-stack engineering, design systems, cloud DevOps, and AI. Find the exact expertise your project requires.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by skill name, framework, or discipline..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#1E293B] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="card-premium space-y-5 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.category}
                      </h3>
                      <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                        {item.expertsCount} Verified Experts • {item.openJobs} Open Jobs
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.skills.map((skill, sIdx) => (
                    <Link
                      key={sIdx}
                      to={`/freelancers?skill=${encodeURIComponent(skill)}`}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <Link
                  to={`/freelancers?skill=${encodeURIComponent(item.skills[0])}`}
                  className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Hire {item.skills[0]} Experts <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/find-jobs?category=${encodeURIComponent(item.category)}`}
                  className="font-semibold text-yellow-400 hover:text-yellow-300"
                >
                  View Jobs →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreSkills;
