import { SecurityEvent, SecurityPolicy, SecurityStats, ThreatType } from "./types";
import { jailbreakDetector } from "./jailbreakDetector";
import { urlScanner } from "./urlScanner";

export class SecurityCenter {
  private events: SecurityEvent[] = [];
  private policies: Map<ThreatType, SecurityPolicy> = new Map();

  constructor() {
    this.initializeDefaultPolicies();
  }

  private initializeDefaultPolicies() {
    const defaults: SecurityPolicy[] = [
      { id: "pol_1", name: "Block Jailbreaks", enabled: true, threatType: "jailbreak", action: "block" },
      { id: "pol_2", name: "Block Malicious URLs", enabled: true, threatType: "malicious_url", action: "block" },
      { id: "pol_3", name: "Redact PII", enabled: true, threatType: "pii_leak", action: "redact" },
      { id: "pol_4", name: "Block API Keys", enabled: true, threatType: "api_key_exposure", action: "block" },
    ];
    defaults.forEach(p => this.policies.set(p.threatType, p));
  }

  /**
   * Scans a prompt across all enabled security modules.
   */
  public async scanPrompt(prompt: string, requestId?: string): Promise<{ blocked: boolean; redactedPrompt?: string }> {
    let blocked = false;
    let currentPrompt = prompt;

    // Jailbreak check
    const jbPolicy = this.policies.get("jailbreak");
    if (jbPolicy?.enabled) {
      const isJailbreak = jailbreakDetector.detect(currentPrompt);
      if (isJailbreak) {
        this.logEvent("jailbreak", "high", "Detected potential jailbreak attempt", jbPolicy.action === "block", requestId);
        if (jbPolicy.action === "block") blocked = true;
      }
    }

    // URL Scan check
    const urlPolicy = this.policies.get("malicious_url");
    if (urlPolicy?.enabled && !blocked) {
      const maliciousUrls = urlScanner.scan(currentPrompt);
      if (maliciousUrls.length > 0) {
        this.logEvent("malicious_url", "high", `Found malicious URLs: ${maliciousUrls.join(", ")}`, urlPolicy.action === "block", requestId);
        if (urlPolicy.action === "block") blocked = true;
      }
    }

    // Additional integrations (PII, credentials) would go here, utilizing existing guardrails

    return { blocked, redactedPrompt: blocked ? undefined : currentPrompt };
  }

  /**
   * Logs a security event.
   */
  public logEvent(
    type: ThreatType,
    severity: SecurityEvent["severity"],
    description: string,
    blocked: boolean,
    requestId?: string,
    details: Record<string, unknown> = {}
  ): void {
    const event: SecurityEvent = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      description,
      blocked,
      timestamp: Date.now(),
      requestId,
      details,
    };
    
    this.events.unshift(event);
    if (this.events.length > 5000) {
      this.events.pop();
    }
  }

  /**
   * Returns aggregated security statistics.
   */
  public getStats(): SecurityStats {
    const byType = {
      prompt_injection: 0,
      jailbreak: 0,
      pii_leak: 0,
      api_key_exposure: 0,
      malicious_url: 0,
      unsafe_tool: 0,
      credential_leak: 0,
    };
    
    const bySeverity = { low: 0, medium: 0, high: 0, critical: 0 };
    let blockedCount = 0;

    for (const e of this.events) {
      byType[e.type]++;
      bySeverity[e.severity]++;
      if (e.blocked) blockedCount++;
    }

    return {
      totalEvents: this.events.length,
      blocked: blockedCount,
      byType,
      bySeverity,
      recentEvents: this.events.slice(0, 20),
    };
  }

  /**
   * Updates a security policy.
   */
  public updatePolicy(threatType: ThreatType, updates: Partial<SecurityPolicy>): void {
    const existing = this.policies.get(threatType);
    if (existing) {
      this.policies.set(threatType, { ...existing, ...updates });
    }
  }
}

export const securityCenter = new SecurityCenter();
