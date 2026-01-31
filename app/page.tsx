import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 flex-1">
      <Hero />
      <ProjectList />
      <Footer />
    </main>
  );
}
