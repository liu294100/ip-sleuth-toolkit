import { useState, useEffect } from 'react';
import { 
  IPInfo, 
  DNSResult, 
  SpeedTestResult, 
  RouteHop, 
  CDNResult,
  fetchIPInfo,
  performDNSTest,
  performSpeedTest,
  performRouteTest,
  detectCDN
} from '@/utils/ipUtils';

interface TestStates {
  ipInfo: {
    data: IPInfo | null;
    loading: boolean;
    error: string | null;
  };
  dnsTest: {
    data: DNSResult[] | null;
    loading: boolean;
    error: string | null;
  };
  speedTest: {
    data: SpeedTestResult | null;
    loading: boolean;
    error: string | null;
    inProgress: boolean;
  };
  routeTest: {
    data: RouteHop[] | null;
    loading: boolean;
    error: string | null;
  };
  cdnTest: {
    data: CDNResult[] | null;
    loading: boolean;
    error: string | null;
  };
}

export const useIPTests = () => {
  const [tests, setTests] = useState<TestStates>({
    ipInfo: {
      data: null,
      loading: false,
      error: null
    },
    dnsTest: {
      data: null,
      loading: false,
      error: null
    },
    speedTest: {
      data: null,
      loading: false,
      error: null,
      inProgress: false
    },
    routeTest: {
      data: null,
      loading: false,
      error: null
    },
    cdnTest: {
      data: null,
      loading: false,
      error: null
    }
  });

  useEffect(() => {
    loadIPInfo();
  }, []);

  const loadIPInfo = async () => {
    setTests(prev => ({
      ...prev,
      ipInfo: {
        ...prev.ipInfo,
        loading: true,
        error: null
      }
    }));

    try {
      const data = await fetchIPInfo();
      setTests(prev => ({
        ...prev,
        ipInfo: {
          data,
          loading: false,
          error: null
        }
      }));
    } catch (err) {
      setTests(prev => ({
        ...prev,
        ipInfo: {
          ...prev.ipInfo,
          loading: false,
          error: 'Failed to fetch IP information'
        }
      }));
    }
  };

  const runDNSTest = async () => {
    setTests(prev => ({
      ...prev,
      dnsTest: {
        ...prev.dnsTest,
        loading: true,
        error: null
      }
    }));

    try {
      const data = await performDNSTest();
      setTests(prev => ({
        ...prev,
        dnsTest: {
          data,
          loading: false,
          error: null
        }
      }));
    } catch (err) {
      setTests(prev => ({
        ...prev,
        dnsTest: {
          ...prev.dnsTest,
          loading: false,
          error: 'DNS test failed'
        }
      }));
    }
  };

  const runSpeedTest = async () => {
    setTests(prev => ({
      ...prev,
      speedTest: {
        ...prev.speedTest,
        loading: true,
        inProgress: true,
        error: null
      }
    }));

    try {
      const data = await performSpeedTest();
      setTests(prev => ({
        ...prev,
        speedTest: {
          data,
          loading: false,
          inProgress: false,
          error: null
        }
      }));
    } catch (err) {
      setTests(prev => ({
        ...prev,
        speedTest: {
          ...prev.speedTest,
          loading: false,
          inProgress: false,
          error: 'Speed test failed'
        }
      }));
    }
  };

  const runRouteTest = async (domain?: string) => {
    setTests(prev => ({
      ...prev,
      routeTest: {
        ...prev.routeTest,
        loading: true,
        error: null
      }
    }));

    try {
      const data = await performRouteTest(domain);
      setTests(prev => ({
        ...prev,
        routeTest: {
          data,
          loading: false,
          error: null
        }
      }));
    } catch (err) {
      setTests(prev => ({
        ...prev,
        routeTest: {
          ...prev.routeTest,
          loading: false,
          error: 'Route test failed'
        }
      }));
    }
  };

  const runCDNTest = async () => {
    setTests(prev => ({
      ...prev,
      cdnTest: {
        ...prev.cdnTest,
        loading: true,
        error: null
      }
    }));

    try {
      const data = await detectCDN();
      setTests(prev => ({
        ...prev,
        cdnTest: {
          data,
          loading: false,
          error: null
        }
      }));
    } catch (err) {
      setTests(prev => ({
        ...prev,
        cdnTest: {
          ...prev.cdnTest,
          loading: false,
          error: 'CDN detection failed'
        }
      }));
    }
  };

  const runAllTests = async () => {
    loadIPInfo();
    runDNSTest();
    runSpeedTest();
    runRouteTest();
    runCDNTest();
  };

  return {
    tests,
    loadIPInfo,
    runDNSTest,
    runSpeedTest,
    runRouteTest,
    runCDNTest,
    runAllTests
  };
};
