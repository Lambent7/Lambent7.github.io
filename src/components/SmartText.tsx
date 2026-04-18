import { useMemo, useEffect, useState, useRef } from 'react';
import { prepare, layout } from '@chenglou/pretext';

interface SmartTextProps {
  text: string;
  font: string;
  className?: string;
}

export function SmartText({ text, font, className = '' }: SmartTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Pre-calculate the heavy text segments and metrics
  const prepared = useMemo(() => {
    try {
      return prepare(text, font);
    } catch (e) {
      // Graceful fallback if pretext fails unexpectedly
      return null;
    }
  }, [text, font]);

  // Update width on resize
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setWidth(Math.floor(entry.contentRect.width));
        }
      }
    });
    observer.observe(containerRef.current);
    
    // Initial measurement
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width > 0) {
      setWidth(Math.floor(rect.width));
    }
    
    return () => observer.disconnect();
  }, []);

  // Hot path layout calculation
  const layoutHeight = useMemo(() => {
    if (!prepared || width === 0) return null;
    try {
      // We estimate line height heuristically, though standard pretext might require it explicitly or implicitly
      // We will pass an approximate line height based on typical font metrics (1.5x)
      const fontSizeMatch = font.match(/(\d+)px/);
      const size = fontSizeMatch ? parseInt(fontSizeMatch[1], 10) : 16;
      // Depending on the version of @chenglou/pretext, the layout footprint might differ slightly.
      return layout(prepared, width, size * 1.5).height;
    } catch {
      return null;
    }
  }, [prepared, width, font]);

  return (
    <div ref={containerRef} className={`w-full ${className}`} style={{ font }}>
      <div 
        style={{ 
          height: layoutHeight !== null ? `${layoutHeight}px` : 'auto',
          overflow: 'hidden'
        }}
      >
        {text}
      </div>
    </div>
  );
}
