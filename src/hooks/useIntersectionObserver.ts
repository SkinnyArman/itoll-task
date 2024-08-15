import { useState, useEffect, useRef } from "react";

/**
 * useIntersectionObserver hook
 *
 * This hook is used to detect when an element is visible within the viewport and can be used
 * to trigger animations or any other side effects when the element comes into view.
 *
 * @param {number} threshold - A threshold value between 0 and 1 that indicates at what
 * percentage of the target's visibility the observer's callback should be executed.
 * Default is 0.1 (10% visibility).
 *
 * @returns {object} - An object containing:
 *   - isVisible: A boolean that indicates if the element is currently visible within the viewport.
 *   - elementRef: A React ref to be attached to the element that you want to observe.
 */
export function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an intersection observer to observe the element's visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Update the state based on whether the element is intersecting the viewport
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    // Start observing the element when it's mounted
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup: Stop observing the element when the component is unmounted or ref changes
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return { isVisible, elementRef };
}
