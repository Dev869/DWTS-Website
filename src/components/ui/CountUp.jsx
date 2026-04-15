import { useState, useEffect, useRef } from "react";

export default function CountUp({ value, duration = 1500, className = "" }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse the target: extract number and surrounding text
  const match = String(value).match(/^([^0-9]*)([\d.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const isDecimal = match ? match[2].includes(".") : false;
  const decimalPlaces = isDecimal ? (match[2].split(".")[1] || "").length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || !numericTarget) {
      if (hasAnimated && !numericTarget) setDisplay(String(value));
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;

      setDisplay(
        `${prefix}${isDecimal ? current.toFixed(decimalPlaces) : Math.round(current)}${suffix}`
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, numericTarget, duration, prefix, suffix, isDecimal, decimalPlaces, value]);

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? display : "\u00A0"}
    </span>
  );
}
