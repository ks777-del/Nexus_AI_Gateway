export type ThreatType = "prompt_injection" | "jailbreak" | "pii_leak" | "api_key_exposure" | "malicious_url" | "unsafe_tool" | "credential_leak";

export interface SecurityEvent {
  id: string;
  type: ThreatType;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  blocked: boolean;
  timestamp: number;
  requestId?: string;
  details: Record<string, unknown>;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  enabled: boolean;
  threatType: ThreatType;
  action: "block" | "warn" | "log" | "redact";
  patterns?: string[];
}

export interface SecurityStats {
  totalEvents: number;
  blocked: number;
  byType: Record<ThreatType, number>;
  bySeverity: Record<string, number>;
  recentEvents: SecurityEvent[];
}
