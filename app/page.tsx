import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="relative z-10 flex-1">
        <Hero />
        <ProjectList />
        <Footer />
      </main>
    </PageTransition>
  );
}
