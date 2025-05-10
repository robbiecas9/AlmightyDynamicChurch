import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Stagger animation for elements that should reveal one after another
export const staggerReveal = (elements: HTMLElement[], delay = 0.2, stagger = 0.1) => {
  gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    stagger,
    ease: 'power2.out',
  });
};

// Fade in animation for single elements
export const fadeIn = (element: HTMLElement, delay = 0, duration = 0.8) => {
  gsap.from(element, {
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out',
  });
};

// Fade in up animation for single elements
export const fadeInUp = (element: HTMLElement, delay = 0, duration = 0.8, distance = 50) => {
  gsap.from(element, {
    opacity: 0,
    y: distance,
    duration,
    delay,
    ease: 'power2.out',
  });
};

// Slide in animation from left or right
export const slideIn = (element: HTMLElement, fromRight = false, delay = 0, duration = 0.8) => {
  gsap.from(element, {
    opacity: 0,
    x: fromRight ? 100 : -100,
    duration,
    delay,
    ease: 'power2.out',
  });
};

// Scale up animation for emphasis
export const scaleUp = (element: HTMLElement, delay = 0, duration = 0.8) => {
  gsap.from(element, {
    opacity: 0,
    scale: 0.8,
    duration,
    delay,
    ease: 'back.out(1.5)',
  });
};

// Scroll-triggered animations
export const scrollReveal = (element: HTMLElement, delay = 0) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay,
    ease: 'power2.out',
  });
};

// Scroll-triggered stagger animations for multiple elements
export const scrollStaggerReveal = (elements: HTMLElement[], container: HTMLElement, delay = 0, stagger = 0.1) => {
  gsap.from(elements, {
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    stagger,
    ease: 'power2.out',
  });
};

// Text reveal animation for headings
export const textReveal = (element: HTMLElement, delay = 0) => {
  // Split text into words
  const text = element.innerHTML;
  element.innerHTML = '';
  
  const words = text.split(' ');
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.innerHTML = word + ' ';
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    element.appendChild(span);
    
    gsap.from(span, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: delay + index * 0.1,
      ease: 'power2.out',
    });
  });
};

// Hero background parallax effect
export const heroParallax = (element: HTMLElement) => {
  gsap.to(element, {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Initialize all scroll animations
export const initScrollAnimations = () => {
  // Add any global scroll animation initialization here
  console.log('GSAP scroll animations initialized');
};
