import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Activities from "./components/Activities";
import Certificates from "./components/Certificates";

function App() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Activities />
      <Certificates />
    </main>
  );
}

export default App;
