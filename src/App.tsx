const ACCENT_BLUE = "#93c5fd";

import { useEffect, useState } from "react";
import { SolutionsOverview, SolutionsPage } from "./Solutions";
import {
  motion,
  AnimatePresence,
} from "motion/react";
import {
  ArrowUpRight,
  ShieldCheck,
  Check,
  Sun,
  Moon,
  Film,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { ContentPage, HomeStrengths, SiteNavbar } from "./ContentPages";
import siteContent from "./site-content.json";
import solutions from "./solutions-data";
import Hero from "./Hero";
import { FeaturedSpaces } from "./Spaces";
import { findSpace } from "./spaces-data";
import { WhatWeOffer, HomeProductsPreview } from "./HomeOfferings";
import Footer from "./Footer";
import { automationServices } from "./automation-data";
import { catalogProducts, productGroups, resolveProduct } from "./product-data";
import { projectCategories } from "./project-data";
import { lightingServices } from "./lighting-data";
import Certificates from "./Certificates";




const scenes = [
  {
    name: "Good Morning",
    icon: Sun,
    brightness: 85,
    temperature: "24°C",
    curtains: "Open",
    description: "Wake up to gradually brightening lights, opening curtains, and comfortable room temperatures.",
  },
  {
    name: "Movie Time",
    icon: Film,
    brightness: 15,
    temperature: "22°C",
    curtains: "Closed",
    description: "Dim the lights, close the curtains, and activate your entertainment system.",
  },
  {
    name: "Away Mode",
    icon: ShieldCheck,
    brightness: 0,
    temperature: "23°C",
    curtains: "Closed",
    description: "Switch off selected lights and appliances while activating compatible security features.",
  },
  {
    name: "Good Night",
    icon: Moon,
    brightness: 5,
    temperature: "25°C",
    curtains: "Closed",
    description: "Create a peaceful atmosphere with automated lighting, curtains, and climate settings.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#1d4ed8]">
      <span className="h-px w-7 bg-[#93c5fd]" />
      {children}
    </div>
  );
}

function SceneExperience() {
  const [active, setActive] = useState(0);
  const scene = scenes[active];

  return (
    <section className="overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal className="text-center">
          <div className="flex justify-center"><Eyebrow>Experience Automation</Eyebrow></div>
          <h2 className="luxury-heading mt-7 text-4xl font-semibold md:text-6xl">
            One Touch. <span className="blue-text">Endless Possibilities.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600">
            Explore how personalized automation scenes transform the
            atmosphere of your home.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {scenes.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActive(index)}
                className={`flex items-center gap-3 border px-5 py-4 text-xs transition-all duration-300 ${
                  active === index
                    ? "border-[#93c5fd] bg-[#93c5fd] text-black"
                    : "border-slate-300/15 text-slate-600 hover:border-[#93c5fd]/60"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid overflow-hidden border border-slate-300/10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="photo-surface relative min-h-[440px] overflow-hidden">
            <img src="/lighting-home.png" alt="Living room with warm architectural lighting for the interactive scene preview" className="absolute inset-0 h-full w-full object-cover" />
            <motion.div
              animate={{ opacity: 0.82 - scene.brightness / 150 }}
              transition={{ duration: 1.1 }}
              className="absolute inset-0 bg-black"
            />
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1d4ed8]">Live Scene Preview</span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={scene.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="luxury-heading mt-3 text-4xl"
                >
                  {scene.name}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#eef4fb] p-8 md:p-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#1d4ed8]">Your Environment</span>
            <p className="mt-5 min-h-14 text-sm leading-7 text-slate-600">{scene.description}</p>

            <div className="mt-9 space-y-8">
              <div>
                <div className="mb-3 flex justify-between text-xs">
                  <span className="text-slate-600">Lighting Intensity</span>
                  <span>{scene.brightness}%</span>
                </div>
                <div className="h-1 bg-slate-900/10">
                  <motion.div
                    animate={{ width: `${scene.brightness}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-[#93c5fd]"
                  />
                </div>
              </div>
              <div className="flex justify-between border-b border-slate-300/10 pb-5 text-sm">
                <span className="text-slate-600">Room Temperature</span>
                <span>{scene.temperature}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#1d4ed8]">
                <Check size={16} /> Scene preview active
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          Interactive concept preview. Actual capabilities depend on installed devices.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-[#FFFFFF] py-28 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:px-12 lg:grid-cols-2">
        <div>
          <Reveal><Eyebrow>Begin Your Journey</Eyebrow></Reveal>
          <Reveal>
            <h2 className="luxury-heading mt-7 text-5xl font-semibold leading-tight md:text-7xl">
              Your Smart Home Journey<br /><span className="text-[#1e3a8a]">Starts Here.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-md text-sm leading-8 text-slate-600">
              Experience intelligent automation designed to make everyday living effortless. Connect with us to discuss your project.
            </p>
          </Reveal>
          <div className="mt-12 space-y-5 text-sm text-slate-600">
            <p>Company: Siddheshwar Smart Technologies</p><p>Business Hours: To be added</p>
            <p className="flex items-center gap-4"><Mail size={18} color={ACCENT_BLUE} /> Email: To be added</p>
            <p className="flex items-center gap-4"><Phone size={18} color={ACCENT_BLUE} /> Phone: To be added</p>
            <p className="flex items-center gap-4"><MapPin size={18} color={ACCENT_BLUE} /> Address: To be added</p>
          </div>
        </div>

        <Reveal>
          <form
            className="consultation-form"
            aria-labelledby="consultation-title"
            onSubmit={event => { event.preventDefault(); setSubmitted(true); }}
          >
            <h3 id="consultation-title">Request a Consultation</h3>
            <p className="consultation-intro">Tell us a little about your project.</p>
            <p className="consultation-required">Fields marked <span aria-hidden="true">*</span> are required.</p>
            <div className="consultation-fields">
              {[
                { label: 'Full Name', type: 'text', name: 'full-name', autoComplete: 'name', placeholder: 'Your full name' },
                { label: 'Email Address', type: 'email', name: 'email-address', autoComplete: 'email', placeholder: 'you@example.com' },
                { label: 'Mobile Number', type: 'tel', name: 'mobile-number', autoComplete: 'tel', placeholder: 'Your mobile number' },
                { label: 'Project Location', type: 'text', name: 'project-location', autoComplete: 'address-level2', placeholder: 'City or project area' },
              ].map(field => <label key={field.name} className="consultation-field" htmlFor={`consultation-${field.name}`}><span>{field.label} <span aria-hidden="true">*</span></span><input id={`consultation-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} required /></label>)}
              <label className="consultation-field consultation-wide" htmlFor="consultation-property-type"><span>Property Type <span aria-hidden="true">*</span></span><select id="consultation-property-type" name="property-type" required defaultValue=""><option value="" disabled>Select property type</option><option>Villa / Independent House</option><option>Apartment</option><option>Office / Commercial</option><option>Hotel / Hospitality</option><option>Other</option></select></label>
              <label className="consultation-field consultation-wide" htmlFor="consultation-interest"><span>Interested Service or Product <span aria-hidden="true">*</span></span><select id="consultation-interest" name="interested-service" required defaultValue={new URLSearchParams(window.location.search).get('interest') || ''}>
                <option value="" disabled>Select a service or product</option>
                {new URLSearchParams(window.location.search).get('interest') && <option>{new URLSearchParams(window.location.search).get('interest')}</option>}
                <optgroup label="Home Automation">{automationServices.map(service => <option key={service.slug}>{service.title}</option>)}</optgroup>
                <optgroup label="Products">{catalogProducts.map(product => <option key={product.slug}>{product.title}</option>)}</optgroup>
                <optgroup label="Solutions">{solutions.map(solution => <option key={solution.slug}>{solution.title}</option>)}</optgroup>
              </select></label>
              <label className="consultation-field consultation-wide" htmlFor="consultation-requirements"><span>Project Requirements <small>(optional)</small></span><textarea id="consultation-requirements" name="project-requirements" rows={4} placeholder="Tell us about your space and what you have in mind." /></label>
            </div>
            <button type="submit" className="consultation-submit">Request a Consultation <ArrowUpRight size={19} /></button>
            {submitted && <p role="status" className="mt-5 text-sm leading-7 text-[#1e3a8a]">This is a demo form. Connect a backend or email service to receive enquiries.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const space = path.startsWith('/spaces/') ? findSpace(path.slice('/spaces/'.length)) : undefined;
  const isSolutions = path === '/solutions' || path.startsWith('/solutions/');
  const slug = path.startsWith('/solutions/') ? path.slice('/solutions/'.length) : undefined;
  const page = siteContent.find(p => p.path === path);
  const service = path.startsWith('/home-automation/') ? automationServices.find(s => s.slug === path.slice('/home-automation/'.length)) : undefined;
  const productCategory = path.startsWith('/products/') ? productGroups.find(c => c.slug === path.slice('/products/'.length)) ?? resolveProduct(path.slice('/products/'.length)) : undefined;
  const projectCategory = path.startsWith('/projects/') ? projectCategories.find(c => c.slug === path.slice('/projects/'.length)) : undefined;
  const lightingService = path.startsWith('/lighting/') ? lightingServices.find(s => s.slug === path.slice('/lighting/'.length)) : undefined;
  useEffect(() => {
    document.title = (path === '/privacy-policy' ? 'Privacy Policy' : path === '/spaces' ? 'Spaces We Transform' : space?.title ?? (isSolutions ? 'Solutions' : lightingService?.title ?? projectCategory?.title ?? productCategory?.title ?? service?.title ?? page?.name ?? 'Page not found')) + ' | Siddheshwar Smart Technologies';
  }, [path, space, isSolutions, page, service, productCategory, projectCategory, lightingService]);
  return <><SiteNavbar /><main>{isSolutions ? <SolutionsPage slug={slug} /> : path !== '/' ? <><ContentPage path={path} />{path === '/contact' && <Contact />}</> : <><Hero /><WhatWeOffer /><HomeProductsPreview /><SolutionsOverview home /><FeaturedSpaces /><SceneExperience /><HomeStrengths /><Certificates /><Contact /></>}</main><Footer /></>;
}
