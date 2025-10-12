'use client';

import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // โหลด engine เบาๆ สำหรับ background
    });
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: '#0f172a' } },
      particles: {
        color: { value: '#38bdf8' },
        links: { enable: true, color: '#38bdf8' },
        move: { enable: true, speed: 1 },
        number: { value: 60 },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" options={options} />;
}
