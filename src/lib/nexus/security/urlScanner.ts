export class UrlScanner {
  // Very simplistic list of "bad" domains/patterns for demonstration
  private readonly suspiciousDomains = [
    "evil.com",
    "phishing-site.net",
    "malware-download.org",
  ];

  private readonly urlRegex = /(https?:\/\/[^\s]+)/g;

  /**
   * Scans text for malicious URLs.
   * Returns an array of detected malicious URLs.
   */
  public scan(text: string): string[] {
    if (!text) return [];

    const foundUrls = text.match(this.urlRegex) || [];
    const malicious: string[] = [];

    for (const url of foundUrls) {
      try {
        const parsedUrl = new URL(url);
        const domain = parsedUrl.hostname.toLowerCase();
        
        // Check against suspicious list
        if (this.suspiciousDomains.some(bad => domain.includes(bad))) {
          malicious.push(url);
        }
      } catch (e) {
        // Invalid URL structure, ignore or flag depending on strictness
      }
    }

    return malicious;
  }
}

export const urlScanner = new UrlScanner();
