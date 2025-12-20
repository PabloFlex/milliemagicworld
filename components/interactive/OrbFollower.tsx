"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Point = {
  x: number;
  y: number;
};

const ease = 0.08;
const anchorEase = 0.05;
const idleDelay = 480;
const activeRadius = 22;
const idleRadius = 10;
const orbitSpeedActive = 0.14;
const orbitSpeedIdle = 0.045;
const trailLength = 12;

const initialOrbitAngle = Math.random() * Math.PI * 2;
const LIGHT_THRESHOLD = 185;

export default function OrbFollower() {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);
  const pointerRef = useRef<Point | null>(null);
  const anchorRef = useRef<Point>({ x: 0, y: 0 });
  const currentRef = useRef<Point>({ x: 0, y: 0 });
  const orbitAngleRef = useRef(initialOrbitAngle);
  const wanderTargetRef = useRef<Point | null>(null);
  const isActiveRef = useRef(false);
  const lightSurfaceRef = useRef(false);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const centerPoint = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    pointerRef.current = centerPoint;
    anchorRef.current = centerPoint;
    currentRef.current = centerPoint;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const randomAround = (origin: Point) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 160;
      const target = {
        x: origin.x + Math.cos(angle) * distance,
        y: origin.y + Math.sin(angle) * distance,
      };
      return {
        x: clamp(target.x, 48, window.innerWidth - 48),
        y: clamp(target.y, 48, window.innerHeight - 48),
      };
    };

    const parseRGB = (input: string) => {
      const match = input.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      if (!match) return null;
      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        alpha: match[4] !== undefined ? parseFloat(match[4]) : 1,
      };
    };

    const calcLuminance = (color: ReturnType<typeof parseRGB>) => {
      if (!color) return null;
      return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    };

    const getBackgroundLuminance = (x: number, y: number) => {
      let element = document.elementFromPoint(x, y) as HTMLElement | null;
      while (element) {
        const parsed = parseRGB(getComputedStyle(element).backgroundColor);
        if (parsed && parsed.alpha > 0.05) {
          return calcLuminance(parsed);
        }
        element = element.parentElement;
      }
      return calcLuminance(parseRGB(getComputedStyle(document.body).backgroundColor));
    };

    const beginIdleWander = () => {
      const origin = pointerRef.current ?? centerPoint;
      wanderTargetRef.current = randomAround(origin);
    };

    const handleMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      wanderTargetRef.current = null;
      isActiveRef.current = true;
      setIsActive(true);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        isActiveRef.current = false;
        setIsActive(false);
        beginIdleWander();
      }, idleDelay);
    };

    const animate = () => {
      const pointer = pointerRef.current ?? centerPoint;

      if (wanderTargetRef.current) {
        const wander = wanderTargetRef.current;
        const drift = {
          x: pointer.x + (wander.x - pointer.x) * 0.01,
          y: pointer.y + (wander.y - pointer.y) * 0.01,
        };
        pointerRef.current = drift;
        if (Math.hypot(drift.x - wander.x, drift.y - wander.y) < 8) {
          wanderTargetRef.current = randomAround(drift);
        }
      }

      const anchor = anchorRef.current;
      const pointerTarget = pointerRef.current ?? pointer;
      anchor.x += (pointerTarget.x - anchor.x) * anchorEase;
      anchor.y += (pointerTarget.y - anchor.y) * anchorEase;

      orbitAngleRef.current += isActiveRef.current
        ? orbitSpeedActive
        : orbitSpeedIdle;
      const radius = isActiveRef.current ? activeRadius : idleRadius;
      const offsetX = Math.cos(orbitAngleRef.current) * radius;
      const offsetY = Math.sin(orbitAngleRef.current * 0.8) * radius * 0.7;

      const targetPosition = {
        x: anchor.x + offsetX,
        y: anchor.y + offsetY,
      };

      const current = currentRef.current;
      current.x += (targetPosition.x - current.x) * ease;
      current.y += (targetPosition.y - current.y) * ease;

      setPosition({ x: current.x, y: current.y });
      setTrail((prev) => {
        const next = [{ x: current.x, y: current.y }, ...prev];
        return next.slice(0, trailLength);
      });

      const lum = getBackgroundLuminance(current.x, current.y);
      if (lum !== null) {
        const lightSurface = lum > LIGHT_THRESHOLD;
        if (lightSurface !== lightSurfaceRef.current) {
          lightSurfaceRef.current = lightSurface;
          setIsOnLightBackground(lightSurface);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const orbStyle: CSSProperties = {
    transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)`,
  };
  const orbStateClasses = `${isActive ? "fairy-orb--active" : "fairy-orb--idle"} ${
    isOnLightBackground ? "fairy-orb--light" : "fairy-orb--dark"
  }`;
  const trailClassName = `fairy-trail ${
    isOnLightBackground ? "fairy-trail--light" : "fairy-trail--dark"
  }`;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className={trailClassName}>
        {trail.map((point, index) => (
          <span
            key={index}
            className="fairy-trail__dot"
            style={{
              transform: `translate3d(${point.x - 10}px, ${point.y - 10}px, 0)`,
              opacity: (trailLength - index) / trailLength,
            }}
          />
        ))}
      </div>
      <div className="fairy-wrapper" style={orbStyle}>
        <div className={`fairy-orb ${orbStateClasses}`}>
          <span className="fairy-core" />
          <span className="fairy-glow" />
        </div>
      </div>
    </div>
  );
}
