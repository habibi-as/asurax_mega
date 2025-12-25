// src/components/Bits/BlurText.jsx
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * BlurText
 * - text: string
 * - animateBy: 'words' | 'chars'
 * - delay: ms between items
 * - direction: 'top' | 'bottom'
 * - stepDuration: seconds per step block
 * - className: container class
 * - easing: framer easing or function
 * - onAnimationComplete: callback when last item finishes
 *
 * Usage:
 * <BlurText text="Isn't this so cool?!" animateBy="words" delay={120} direction="top" className="text-2xl"/>
 */

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

function defaultEasing(t) {
  // smooth ease-out cubic
  return 1 - Math.pow(1 - t, 3);
}

const BlurText = ({
  text = '',
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.12,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = defaultEasing,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  // choose split strategy
  const elements = useMemo(() => (animateBy === 'words' ? text.split(' ') : [...text]), [text, animateBy]);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => (direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -36, scale: 0.98 } : { filter: 'blur(10px)', opacity: 0, y: 36, scale: 0.98 }),
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(6px)', opacity: 0.6, y: direction === 'top' ? -6 : 6, scale: 1.02 },
      { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // container style + subtle per-letter transform origin
  const containerStyle = {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '0.15ch',
    alignItems: 'center'
  };

  return (
    <p ref={ref} className={className} style={containerStyle} aria-hidden={false}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        // micro-variation: staggered scale / slight rotation for hype
        const hype = {
          transformOrigin: 'center',
          display: 'inline-block',
          willChange: 'transform, filter, opacity'
        };

        const content = segment === ' ' ? '\u00A0' : segment;

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={hype}
          >
            {content}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

BlurText.propTypes = {
  text: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string,
  animateBy: PropTypes.oneOf(['words', 'chars']),
  direction: PropTypes.oneOf(['top', 'bottom']),
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  animationFrom: PropTypes.object,
  animationTo: PropTypes.array,
  easing: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  onAnimationComplete: PropTypes.func,
  stepDuration: PropTypes.number
};

export default BlurText;
