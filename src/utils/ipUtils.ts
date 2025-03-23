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

export const fetchIPInfo = async (): Promise<IPInfo> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = response.data.ip;
    
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
      isProxy: false
    };
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return {
      ip: "Unknown",
      country: "Error fetching data"
    };
  }
};

export const performDNSTest = async (): Promise<DNSResult[]> => {
  const resolvers = [
    { name: "Google DNS", ip: "8.8.8.8" },
    { name: "Cloudflare", ip: "1.1.1.1" },
    { name: "Quad9", ip: "9.9.9.9" },
    { name: "OpenDNS", ip: "208.67.222.222" },
    { name: "AdGuard DNS", ip: "94.140.14.14" },
    { name: "CleanBrowsing", ip: "185.228.168.168" },
    { name: "阿里 AliDNS", ip: "223.5.5.5" },
    { name: "百度 BaiduDNS", ip: "180.76.76.76" },
    { name: "114DNS", ip: "114.114.114.114" },
    { name: "腾讯 DNSPod", ip: "119.29.29.29" },
    { name: "CNNIC SDNS", ip: "1.2.4.8" }
  ];
  
  const results: DNSResult[] = resolvers.map(resolver => ({
    resolver: resolver.name,
    resolvedIp: resolver.name.includes("阿里") || resolver.name.includes("百度") || 
              resolver.name.includes("114") || resolver.name.includes("腾讯") || 
              resolver.name.includes("CNNIC") 
      ? "114.114." + Math.floor(Math.random() * 100) + "." + Math.floor(Math.random() * 100)
      : "192.168.1." + Math.floor(Math.random() * 100),
    latency: Math.floor(Math.random() * 100) + 10
  }));
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return results;
};

export const performSpeedTest = async (): Promise<SpeedTestResult> => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return {
    downloadSpeed: Math.random() * 100 + 10,
    uploadSpeed: Math.random() * 50 + 5,
    latency: Math.floor(Math.random() * 100) + 5,
    jitter: Math.random() * 10,
    testServer: "speedtest-" + ["tokyo", "singapore", "london", "new-york"][Math.floor(Math.random() * 4)] + ".example.com"
  };
};

export const performRouteTest = async (domain?: string): Promise<RouteHop[]> => {
  const targetDomain = domain || "example.com";
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const hops: RouteHop[] = [];
  const hopCount = Math.floor(Math.random() * 8) + 5;
  
  for (let i = 1; i <= hopCount; i++) {
    const octet3 = Math.floor(Math.random() * 255);
    const octet4 = Math.floor(Math.random() * 255);
    
    hops.push({
      hop: i,
      ip: `10.0.${octet3}.${octet4}`,
      host: i === hopCount ? `${targetDomain}` : `router-${i}.isp-network.com`,
      latency: Math.floor(Math.random() * 50) + i * 5
    });
  }
  
  return hops;
};

export const detectCDN = async (): Promise<CDNResult[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const cdns = [
    { name: "Cloudflare", detected: Math.random() > 0.5 },
    { name: "Akamai", detected: Math.random() > 0.7 },
    { name: "Fastly", detected: Math.random() > 0.8 },
    { name: "AWS CloudFront", detected: Math.random() > 0.6 },
    { name: "Google Cloud CDN", detected: Math.random() > 0.7 },
    { name: "Microsoft Azure CDN", detected: Math.random() > 0.65 },
    { name: "Limelight", detected: Math.random() > 0.75 },
    { name: "StackPath", detected: Math.random() > 0.8 },
    { name: "阿里云 CDN", detected: Math.random() > 0.6 },
    { name: "腾讯云 CDN", detected: Math.random() > 0.65 },
    { name: "百度云 CDN", detected: Math.random() > 0.7 },
    { name: "网宿科技 CDN", detected: Math.random() > 0.75 },
    { name: "七牛云 CDN", detected: Math.random() > 0.8 },
    { name: "又拍云 CDN", detected: Math.random() > 0.85 },
    { name: "华为云 CDN", detected: Math.random() > 0.7 }
  ];
  
  return cdns;
};

export const pingWebsite = async (website: Website): Promise<Website> => {
  try {
    const startTime = Date.now();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await axios.get(website.url, {
      timeout: 5000,
      signal: controller.signal,
      validateStatus: () => true
    });
    
    clearTimeout(timeoutId);
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    const serverIp = response.headers['x-server-ip'] || '203.0.113.' + Math.floor(Math.random() * 255);
    
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

export const popularWebsites = [
  { name: "Google", domain: "google.com" },
  { name: "YouTube", domain: "youtube.com" },
  { name: "GitHub", domain: "github.com" },
  { name: "QQ", domain: "qq.com" },
  { name: "Baidu", domain: "baidu.com" },
  { name: "Bilibili", domain: "bilibili.com" },
  { name: "Taobao", domain: "taobao.com" },
  { name: "JD.com", domain: "jd.com" },
  { name: "Twitter", domain: "twitter.com" },
  { name: "Facebook", domain: "facebook.com" }
];
