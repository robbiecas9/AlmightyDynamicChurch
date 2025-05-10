import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type AnimationOptions = {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: boolean;
  start?: string;
  markers?: boolean;
};

export function useGSAPAnimation<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);
  
  const animate = (options: AnimationOptions = {}) => {
    if (!elementRef.current) return;
    
    const {
      opacity = 0,
      y = 50,
      x = 0,
      scale = 1,
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      scrollTrigger = false,
      start = 'top 80%',
      markers = false,
    } = options;
    
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease,
    };
    
    if (scrollTrigger) {
      animationProps.scrollTrigger = {
        trigger: elementRef.current,
        start,
        markers,
        toggleActions: 'play none none none',
      };
    }
    
    gsap.fromTo(
      elementRef.current,
      { opacity, y, x, scale },
      animationProps
    );
  };
  
  const animateChildren = (childSelector: string, options: AnimationOptions = {}) => {
    if (!elementRef.current) return;
    
    const children = elementRef.current.querySelectorAll(childSelector);
    
    const {
      opacity = 0,
      y = 30,
      x = 0,
      scale = 1,
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      stagger = 0.1,
      scrollTrigger = false,
      start = 'top 80%',
      markers = false,
    } = options;
    
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease,
    };
    
    if (scrollTrigger) {
      animationProps.scrollTrigger = {
        trigger: elementRef.current,
        start,
        markers,
        toggleActions: 'play none none none',
      };
    }
    
    gsap.fromTo(
      children,
      { opacity, y, x, scale },
      animationProps
    );
  };
  
  const clearAnimations = () => {
    if (elementRef.current) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === elementRef.current) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(elementRef.current);
    }
  };
  
  useEffect(() => {
    return () => {
      clearAnimations();
    };
  }, []);
  
  return { elementRef, animate, animateChildren, clearAnimations };
}
