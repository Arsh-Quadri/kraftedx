"use client";
import { useEffect, useRef, useState } from "react";

const BackgroundBalls = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blobs = Array.from({ length: 7 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      radius: 130 + Math.random() * 60,
    }));

    // Select one lead blob that will follow the mouse
    const leadBlob = blobs[Math.floor(Math.random() * blobs.length)];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#6366f1";
      ctx.globalAlpha = 0.85;
      ctx.globalCompositeOperation = "multiply";

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];

        if (b === leadBlob) {
          // Lead blob chases a point slightly behind the mouse
          const offsetX = mouse.current.x - 80;
          const offsetY = mouse.current.y - 80;
          const dx = offsetX - b.x;
          const dy = offsetY - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 1) {
            const followSpeed = 0.15; // strong pull
            b.vx += (dx / dist) * followSpeed * 2;
            b.vy += (dy / dist) * followSpeed * 2;
          }
        } else {
          // Other blobs just float
          b.vx += (Math.random() - 0.5) * 3;
          b.vy += (Math.random() - 0.5) * 3;
        }

        b.x += b.vx;
        b.y += b.vy;

        // Slow down over time (friction)
        b.vx *= 0.95;
        b.vy *= 0.95;

        // Bounce off walls
        if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
        if (b.y < 0 || b.y > canvas.height) b.vy *= -1;

        // Draw
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const mouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 w-full h-full"
        style={{
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
};

export default BackgroundBalls;
