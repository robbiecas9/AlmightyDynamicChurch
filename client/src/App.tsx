import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/admin/Dashboard";

// Layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Main sections
import Hero from "@/components/sections/Hero";
import ScriptureBanner from "@/components/sections/ScriptureBanner";
import PastorMessage from "@/components/sections/PastorMessage";
import OurBeliefs from "@/components/sections/OurBeliefs";
import BibleImageSection from "@/components/sections/BibleImageSection";
import MeetingsSection from "@/components/sections/MeetingsSection";
import ContactSection from "@/components/sections/ContactSection";

function HomePage() {
  return (
    <div className="font-body text-dark bg-light">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <section className="relative">
        <Hero />
      </section>

      <section>
        <ScriptureBanner />
      </section>

      <section>
        <PastorMessage />
      </section>

      <section>
        <OurBeliefs />
      </section>

      <section>
        <BibleImageSection />
      </section>

      <section>
        <MeetingsSection />
      </section>

      <section>
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
}

function AdminPage() {
  return (
    <div className="font-body text-dark bg-light min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <div className="pt-24">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
