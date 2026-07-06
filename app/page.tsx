import Header from "@/components/Header";
import ScrollEcg from "@/components/ScrollEcg";
import Hero from "@/components/Hero";
import Videos from "@/components/Videos";
import Milestone from "@/components/Milestone";
import Procedures from "@/components/Procedures";
import About from "@/components/About";
import Publications from "@/components/Publications";
import Appointments from "@/components/Appointments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollEcg />
      <Header />
      <main>
        <Hero />
        <Videos />
        <Milestone />
        <Procedures />
        <About />
        <Publications />
        <Appointments />
      </main>
      <Footer />
    </>
  );
}
