import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClinicalTicker from "@/components/ClinicalTicker";
import Procedures from "@/components/Procedures";
import About from "@/components/About";
import Milestone from "@/components/Milestone";
import Videos from "@/components/Videos";
import Publications from "@/components/Publications";
import Appointments from "@/components/Appointments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-frost">
        <Hero />
        <ClinicalTicker />
        <Procedures />
        <About />
        <Milestone />
        <Videos />
        <Publications />
        <Appointments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
