import { ContextSegment } from "./types";

/**
 * Scores segments by relevance and time decay.
 */
export function prioritizeContext(segments: ContextSegment[]): ContextSegment[] {
  const now = Date.now();
  
  return segments.map(seg => {
    let score = seg.priority;
    
    // Type-based priority boosts
    if (seg.type === "conversation") score += 20;
    if (seg.type === "preference") score += 30;
    if (seg.type === "memory") score += 10;
    
    // Time-based decay for older segments
    if (seg.timestamp) {
      const ageMs = now - seg.timestamp;
      const ageDays = ageMs / (1000 * 60 * 60 * 24);
      if (ageDays > 7) {
        score -= Math.min(20, ageDays); // max decay 20 points
      }
    }
    
    return {
      ...seg,
      priority: Math.max(0, Math.min(100, score))
    };
  });
}
