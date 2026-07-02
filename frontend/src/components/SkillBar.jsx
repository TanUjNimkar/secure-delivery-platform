import React, { useEffect, useRef, useState } from "react";

export default function SkillBar({ skill, level }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-item-top">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}