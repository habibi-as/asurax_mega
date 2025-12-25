// src/components/Bits/LogoLoop.jsx
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import "./LogoLoop.css";

// Smooth animation config
const ANIMATION_CONFIG = { 
  SMOOTH_TAU: 0.25, 
  MIN_COPIES: 2, 
  COPY_HEADROOM: 2 
};

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

/* ------------------------------ */
/* Resize Observer Hook           */
/* ------------------------------ */
const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [callback, elements, dependencies]);
};

/* ------------------------------ */
/* Image Loader Hook              */
/* ------------------------------ */
const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;
    const finish = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };

    images.forEach((img) => {
      if (img.complete) finish();
      else {
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", finish, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", finish);
        img.removeEventListener("error", finish);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

/* ------------------------------ */
/* Animation Loop Hook            */
/* ------------------------------ */
const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  seqHeight,
  isHovered,
  hoverSpeed,
  isVertical
) => {
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    const animate = (timestamp) => {
      if (lastTsRef.current === null) lastTsRef.current = timestamp;

      const dt = Math.max(0, timestamp - lastTsRef.current) / 1000;
      lastTsRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      // Smooth acceleration
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * dt;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    hoverSpeed,
    isVertical,
    trackRef,
  ]);
};

/* ------------------------------ */
/* Main Component                 */
/* ------------------------------ */
const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className,
    style
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === "up" || direction === "down";

    const targetVelocity = useMemo(() => {
      const mag = Math.abs(speed);
      let dir = isVertical 
        ? direction === "up" ? 1 : -1
        : direction === "left" ? 1 : -1;

      return mag * dir * (speed < 0 ? -1 : 1);
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerW = containerRef.current?.clientWidth ?? 0;
      const rect = seqRef.current?.getBoundingClientRect?.();
      const sWidth = rect?.width ?? 0;
      const sHeight = rect?.height ?? 0;

      if (isVertical) {
        const containerH = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current.style.height !== `${containerH}px`)
          containerRef.current.style.height = `${containerH}px`;

        if (sHeight > 0) {
          setSeqHeight(Math.ceil(sHeight));
          const needed = Math.ceil(containerH / sHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
        }
      } else {
        if (sWidth > 0) {
          setSeqWidth(Math.ceil(sWidth));
          const needed = Math.ceil(containerW / sWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
        }
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const cssVars = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = [
      "logoloop",
      isVertical ? "logoloop--vertical" : "logoloop--horizontal",
      fadeOut && "logoloop--fade",
      scaleOnHover && "logoloop--scale-hover",
      className
    ]
      .filter(Boolean)
      .join(" ");

    const onEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);

    const onLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogo = useCallback(
      (item, key) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key}>
              {renderItem(item, key)}
            </li>
          );
        }

        const isNode = "node" in item;

        const content = isNode ? (
          <span className="logoloop__node">{item.node}</span>
        ) : (
          <img
            src={item.src}
            alt={item.alt ?? ""}
            title={item.title}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        );

        return (
          <li className="logoloop__item" key={key}>
            {item.href ? (
              <a href={item.href} className="logoloop__link" target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      },
      [renderItem]
    );

    const listCopies = useMemo(() => 
      Array.from({ length: copyCount }, (_, i) => (
        <ul
          key={`copy-${i}`}
          className="logoloop__list"
          aria-hidden={i > 0}
          ref={i === 0 ? seqRef : undefined}
        >
          {logos.map((logo, idx) => renderLogo(logo, `${i}-${idx}`))}
        </ul>
      ))
    , [copyCount, logos, renderLogo]);

    const containerStyle = {
      width: isVertical ? toCssLength(width) : toCssLength(width) ?? "100%",
      ...cssVars,
      ...style
    };

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        aria-label={ariaLabel}
      >
        <div
          ref={trackRef}
          className="logoloop__track"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {listCopies}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
