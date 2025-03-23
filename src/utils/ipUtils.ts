
import axios from 'axios';

export interface IPInfo {
  ip: string;
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  asn?: string;
  org?: string;
  timezone?: string;
  isProxy?: boolean;
}

export interface DNSResult {
  resolver: string;
  resolvedIp: string;
  latency: number;
}

export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  jitter: number;
  testServer: string;
}

export interface RouteHop {
  hop: number;
  ip: string;
  host?: string;
  latency: number;
}

export interface CDNResult {
  name: string;
  detected: boolean;
  headers?: Record<string, string>;
}

export interface Website {
  name: string;
  url: string;
  category: string;
  online?: boolean;
  latency?: number | null;
  ip?: string;
  location?: string;
}

// Fetch IP information
export const fetchIPInfo = async (): Promise<IPInfo> => {
  try {
    // For demo purposes we'll use a public API
    const response = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = response.data.ip;
    
    // Now get detailed info about the IP
    const detailsResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    
    return {
      ip: ipAddress,
      country: detailsResponse.data.country_name,
      countryCode: detailsResponse.data.country_code,
      region: detailsResponse.data.region,
      city: detailsResponse.data.city,
      latitude: detailsResponse.data.latitude,
      longitude: detailsResponse.data.longitude,
      isp: detailsResponse.data.org,
      asn: detailsResponse.data.asn,
      org: detailsResponse.data.org,
      timezone: detailsResponse.data.timezone,
      isProxy: false // Most free APIs don't provide this info
    };
  } catch (error) {
    console.error("Error fetching IP info:", error);
    // Return minimal information in case of error
    return {
      ip: "Unknown",
      country: "Error fetching data"
    };
  }
};

// Simulate DNS test (in a real app, you'd use actual DNS queries)
export const performDNSTest = async (): Promise<DNSResult[]> => {
  // Simulated DNS resolvers
  const resolvers = [
    { name: "Google DNS", ip: "8.8.8.8" },
    { name: "Cloudflare", ip: "1.1.1.1" },
    { name: "Quad9", ip: "9.9.9.9" },
    { name: "OpenDNS", ip: "208.67.222.222" }
  ];
  
  // Simulate getting results
  const results: DNSResult[] = resolvers.map(resolver => ({
    resolver: resolver.name,
    resolvedIp: "192.168.1." + Math.floor(Math.random() * 100),
    latency: Math.floor(Math.random() * 100) + 10
  }));
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return results;
};

// Simulate speed test
export const performSpeedTest = async (): Promise<SpeedTestResult> => {
  // Simulate network activities and timing
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return {
    downloadSpeed: Math.random() * 100 + 10, // Mbps
    uploadSpeed: Math.random() * 50 + 5, // Mbps
    latency: Math.floor(Math.random() * 100) + 5, // ms
    jitter: Math.random() * 10, // ms
    testServer: "speedtest-" + ["tokyo", "singapore", "london", "new-york"][Math.floor(Math.random() * 4)] + ".example.com"
  };
};

// Simulate route tracing
export const performRouteTest = async (): Promise<RouteHop[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const hops: RouteHop[] = [];
  const hopCount = Math.floor(Math.random() * 8) + 5; // 5-12 hops
  
  for (let i = 1; i <= hopCount; i++) {
    const octet3 = Math.floor(Math.random() * 255);
    const octet4 = Math.floor(Math.random() * 255);
    
    hops.push({
      hop: i,
      ip: `10.0.${octet3}.${octet4}`,
      host: i === hopCount ? "destination-server.example.com" : `router-${i}.example.com`,
      latency: Math.floor(Math.random() * 50) + i * 5
    });
  }
  
  return hops;
};

// Simulate CDN detection
export const detectCDN = async (): Promise<CDNResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const cdns = [
    { name: "Cloudflare", detected: Math.random() > 0.5 },
    { name: "Akamai", detected: Math.random() > 0.7 },
    { name: "Fastly", detected: Math.random() > 0.8 },
    { name: "CloudFront", detected: Math.random() > 0.6 },
    { name: "Google Cloud CDN", detected: Math.random() > 0.7 }
  ];
  
  return cdns;
};

// Ping website to test connectivity
export const pingWebsite = async (website: Website): Promise<Website> => {
  try {
    const startTime = Date.now();
    
    // Set a timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await axios.get(website.url, {
      timeout: 5000,
      signal: controller.signal,
      validateStatus: () => true // Accept any status code as valid
    });
    
    clearTimeout(timeoutId);
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    // Extract server IP from the response (if available in headers)
    // This is a simplification; real IP detection would require server-side support
    const serverIp = response.headers['x-server-ip'] || '203.0.113.' + Math.floor(Math.random() * 255);
    
    // Generate a simulated location based on the website's category
    let location = website.category === '国内' ? 
      ['北京', '上海', '广州', '深圳', '杭州'][Math.floor(Math.random() * 5)] :
      ['纽约', '伦敦', '东京', '新加坡', '悉尼'][Math.floor(Math.random() * 5)];
    
    return {
      ...website,
      online: true,
      latency,
      ip: serverIp,
      location
    };
  } catch (error) {
    console.error(`Error pinging ${website.url}:`, error);
    return {
      ...website,
      online: false,
      latency: null,
      ip: undefined,
      location: undefined
    };
  }
};
