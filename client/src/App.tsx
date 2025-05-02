import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

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
      <Navbar />
      <main>
        <Hero />
        <ScriptureBanner />
        <PastorMessage />
        <OurBeliefs />
        <BibleImageSection />
        <MeetingsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
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
