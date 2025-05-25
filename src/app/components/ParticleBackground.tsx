"use client";

import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = {
      particleCountOnClick: 200,
      maxParticles: 500,
      particleBaseRadius: 2.0,
      particleRadiusVariation: 3.0,
      particleLifespanMin: 100,
      particleLifespanMax: 200,
      particleInitialSpeedMin: 1.5,
      particleInitialSpeedMax: 4.0,
      particleFriction: 0.98,
      hueStart: 190,
      hueRange: 150,
      trailAlpha: 0.15,
      mouseParticleGlowFactor: 4,
      particleGlowFactor: 1.5,
      targetFPS: 120,
    };

    const mouse = { x: undefined, y: undefined };
    const particlePool = [];
    let activeParticleCount = 0;
    let nextAvailableParticleIndex = 0;
    let lastFrameTime = 0;
    const frameInterval = 1000 / config.targetFPS;

    class Particle {
      isActive: boolean;
      x: number;
      y: number;
      isMouseFollower: boolean;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      initialLife: number;
      hue: number;
      saturation: number;
      lightness: number;
      baseOpacity: number;
      currentOpacity: number;
      currentRadius: number;

      constructor() {
        this.isActive = false;
      }

      reset(x: number, y: number, isMouseFollower = false) {
        this.isActive = true;
        this.x = x;
        this.y = y;
        this.isMouseFollower = isMouseFollower;

        if (this.isMouseFollower) {
          this.radius = 3.5;
          this.hue = (config.hueStart + config.hueRange * 0.7) % 360;
          this.saturation = 98;
          this.lightness = 78;
          this.baseOpacity = 0.95;
          this.vx = 0;
          this.vy = 0;
          this.life = Infinity;
          this.initialLife = Infinity;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * (config.particleInitialSpeedMax - config.particleInitialSpeedMin) + config.particleInitialSpeedMin;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          
          this.radius = config.particleBaseRadius + Math.random() * config.particleRadiusVariation;
          this.life = config.particleLifespanMin + Math.random() * (config.particleLifespanMax - config.particleLifespanMin);
          this.initialLife = this.life;
          
          this.hue = (config.hueStart + Math.random() * config.hueRange) % 360;
          this.saturation = 75 + Math.random() * 25;
          this.lightness = 60 + Math.random() * 20;
          this.baseOpacity = 0.75 + Math.random() * 0.25;
        }
        this.currentOpacity = this.baseOpacity;
        this.currentRadius = this.radius;
      }

      update() {
        if (!this.isActive) return;

        if (this.isMouseFollower) {
          if (mouse.x !== undefined) {
            this.vx = (mouse.x - this.x) * 0.28;
            this.vy = (mouse.y - this.y) * 0.28;
            this.x += this.vx;
            this.y += this.vy;
          }
          return;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= config.particleFriction;
        this.vy *= config.particleFriction;

        this.life--;
        const lifeRatio = Math.max(0, this.life / this.initialLife);
        this.currentOpacity = this.baseOpacity * lifeRatio;
        this.currentRadius = this.radius * (0.4 + lifeRatio * 0.6);

        if (this.life <= 0 || this.currentOpacity <= 0.01) {
          this.isActive = false;
          activeParticleCount--;
        }
      }

      draw() {
        if (!this.isActive || this.currentOpacity <= 0.01 || this.currentRadius <= 0.1) return;

        ctx.beginPath();
        
        const coreRadius = this.currentRadius;
        const glowRadius = coreRadius * (this.isMouseFollower ? config.mouseParticleGlowFactor : config.particleGlowFactor);
        
        const gradient = ctx.createRadialGradient(this.x, this.y, coreRadius * 0.1, this.x, this.y, glowRadius);
        
        const colorStopZero = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.currentOpacity})`;
        const colorStopOne = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`;
                
        gradient.addColorStop(0, colorStopZero);
        gradient.addColorStop(0.4, colorStopZero);
        gradient.addColorStop(1, colorStopOne);

        ctx.fillStyle = gradient;
        
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }

    const mouseParticle = new Particle();

    function initialize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlePool.length = 0;
      for (let i = 0; i < config.maxParticles; i++) {
        particlePool.push(new Particle());
      }
      activeParticleCount = 0;
      nextAvailableParticleIndex = 0;
      
      mouseParticle.reset(canvas.width / 2, canvas.height / 2, true);
    }

    function spawnParticleBloom(spawnX: number, spawnY: number, count: number) {
      let spawned = 0;
      for (let i = 0; i < count; i++) {
        if (activeParticleCount >= config.maxParticles) break;

        const particle = particlePool[nextAvailableParticleIndex];
        if (particle && !particle.isActive) {
          particle.reset(spawnX, spawnY);
          activeParticleCount++;
          spawned++;
        }
        
        nextAvailableParticleIndex = (nextAvailableParticleIndex + 1) % config.maxParticles;

        if (spawned <= i && activeParticleCount < config.maxParticles) {
          for(let j = 0; j < config.maxParticles; j++) {
            const pSearch = particlePool[j];
            if(!pSearch.isActive) {
              pSearch.reset(spawnX, spawnY);
              activeParticleCount++;
              spawned++;
              nextAvailableParticleIndex = (j + 1) % config.maxParticles;
              break;
            }
          }
        }
        if (spawned <= i && activeParticleCount >= config.maxParticles) break;
      }
    }

    function animate(currentTime: number) {
      requestAnimationFrame(animate);

      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameInterval && lastFrameTime !== 0) {
        return;
      }
      lastFrameTime = currentTime - (deltaTime % frameInterval);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(7, 7, 23, ${config.trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'lighter';
      
      mouseParticle.update();
      mouseParticle.draw();

      for (let i = 0; i < particlePool.length; i++) {
        const p = particlePool[i];
        if (p.isActive) {
          p.update();
          p.draw();
        }
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseParticle.x = mouse.x !== undefined ? mouse.x : canvas.width / 2;
      mouseParticle.y = mouse.y !== undefined ? mouse.y : canvas.height / 2;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleClick = (event: MouseEvent) => {
      spawnParticleBloom(event.clientX, event.clientY, config.particleCountOnClick);
    };

    initialize();
    requestAnimationFrame(animate);
    spawnParticleBloom(350, 250, config.particleCountOnClick);

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}; 