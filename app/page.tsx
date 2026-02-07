import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getOrganizationSchema,
  getWebApplicationSchema,
  getFAQSchema,
  getHowToWriteApplicationSchema,
  getHowToBuildCVSchema,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebApplicationSchema()} />
      <JsonLd data={getFAQSchema()} />
      <JsonLd data={getHowToWriteApplicationSchema()} />
      <JsonLd data={getHowToBuildCVSchema()} />
      <main>
        <Header />
        <Hero />
        <Marquee />
        <HowItWorks />
        <Features />
        <SocialProof />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
