export class JailbreakDetector {
  private readonly patterns = [
    /ignore all previous instructions/i,
    /you are now (DAN|do anything now)/i,
    /bypass system/i,
    /pretend you are an evil/i,
    /forget everything/i,
    /system prompt leakage/i,
    /print your initial instructions/i
  ];

  /**
   * Detects common jailbreak patterns in the prompt.
   * Returns true if a jailbreak attempt is suspected.
   */
  public detect(prompt: string): boolean {
    if (!prompt) return false;
    
    // Very basic pattern matching for demonstration
    for (const pattern of this.patterns) {
      if (pattern.test(prompt)) {
        return true;
      }
    }
    
    return false;
  }
}

export const jailbreakDetector = new JailbreakDetector();
