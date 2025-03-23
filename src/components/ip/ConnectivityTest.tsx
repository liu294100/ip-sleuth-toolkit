
import React, { useState, useEffect } from 'react';
import { pingWebsite, Website } from '@/utils/ipUtils';
import Button from '@/components/common/Button';
import { RefreshCw, Wifi, WifiOff, Clock, Signal, MapPin } from 'lucide-react';

const ConnectivityTest: React.FC = () => {
  const [results, setResults] = useState<Website[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const websites: Website[] = [
    { name: 'IPIP.net', url: 'https://ipip.net', category: '国内' },
    { name: 'IP138.com', url: 'https://ip138.com', category: '国内' },
    { name: 'ipchaxun.com', url: 'https://ipchaxun.com', category: '国内' },
    { name: 'speedtest.cn', url: 'https://speedtest.cn', category: '国内' },
    { name: 'IP.SB', url: 'https://ip.sb', category: '国外' },
    { name: 'ip-api.com', url: 'https://ip-api.com', category: '国外' },
    { name: 'Sukka IPDB', url: 'https://ip.skk.moe', category: '国外' },
    { name: 'IPInfo.io', url: 'https://ipinfo.io', category: '国外' },
  ];

  const runTests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await Promise.all(
        websites.map(async (site) => {
          const result = await pingWebsite(site);
          return result;
        })
      );
      
      setResults(results);
    } catch (err) {
      setError('连通性测试失败，请稍后再试');
      console.error('Connectivity test error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const renderStatus = (status: boolean, latency: number | null) => {
    if (loading) return <Signal className="h-5 w-5 text-muted-foreground animate-pulse" />;
    
    if (status) {
      return (
        <div className="flex items-center space-x-2">
          <Wifi className="h-5 w-5 text-green-500" />
          {latency !== null && (
            <span className="text-xs font-medium">
              {latency} ms
            </span>
          )}
        </div>
      );
    } else {
      return <WifiOff className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">
          测试各网站的连通性和响应时间
        </div>
        <Button
          onClick={runTests}
          disabled={loading}
          variant="outline"
          size="sm"
          icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        >
          {loading ? '测试中...' : '刷新'}
        </Button>
      </div>
      
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-2 py-2 font-medium text-sm">
          <div>分类</div>
          <div>网站</div>
          <div>状态</div>
          <div>IP地址</div>
          <div>位置</div>
        </div>
        
        {results.length > 0 ? (
          results.map((site, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 py-2 text-sm border-t border-border"
            >
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                  {site.category}
                </span>
              </div>
              <div className="truncate">{site.name}</div>
              <div>{renderStatus(site.online!, site.latency)}</div>
              <div className="truncate">{site.ip || '-'}</div>
              <div className="truncate flex items-center">
                {site.location ? (
                  <>
                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{site.location}</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
            </div>
          ))
        ) : loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 py-2 text-sm border-t border-border animate-pulse"
            >
              <div className="h-5 bg-muted rounded w-12"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded w-24"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            暂无数据，请点击刷新按钮进行测试
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectivityTest;
