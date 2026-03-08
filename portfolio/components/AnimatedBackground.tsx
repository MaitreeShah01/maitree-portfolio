"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect user's accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let particles: DataPoint[] =[];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Class representing a single data point in our "scatter plot"
    class DataPoint {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = Math.random() * (canvas?.height ?? 0);
        this.size = Math.random() * 2 + 0.5; // Random node size
        this.speedX = (Math.random() - 0.5) * 0.15; // Slow drift
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen edges smoothly
        if (this.x < 0) this.x = canvas?.width ?? 0;
        if (this.x > (canvas?.width ?? 0)) this.x = 0;
        if (this.y < 0) this.y = canvas?.height ?? 0;
        if (this.y > (canvas?.height ?? 0)) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${this.opacity})`; // Soft blue
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles =[];
      // Cap data points on mobile for performance
      const count = window.innerWidth < 768 ? 40 : 120; 
      for (let i = 0; i < count; i++) {
        particles.push(new DataPoint());
      }
    };

    // 1. Draw structured data grid (SQL / Tables metaphor)
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)"; // Very faint
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // 2. Draw moving time-series lines (Trend Analysis metaphor)
    const drawDataStreams = () => {
      const streams =[
        { amplitude: 70, frequency: 0.0015, speed: 0.015, color: "rgba(59, 130, 246, 0.15)", offset: canvas.height * 0.35 }, // Primary Blue
        { amplitude: 50, frequency: 0.0025, speed: 0.02, color: "rgba(139, 92, 246, 0.12)", offset: canvas.height * 0.55 }, // Violet
        { amplitude: 90, frequency: 0.001, speed: 0.01, color: "rgba(56, 189, 248, 0.08)", offset: canvas.height * 0.75 },  // Light Cyan
      ];

      streams.forEach(stream => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          // Calculate sine wave movement over time
          const y = stream.offset + Math.sin(x * stream.frequency + time * stream.speed) * stream.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = stream.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });
    };

    const animate = () => {
      // Clear canvas with a very slight fade effect for smooth rendering
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawDataStreams();

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  },[]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black">
      <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
    </div>
  );
}