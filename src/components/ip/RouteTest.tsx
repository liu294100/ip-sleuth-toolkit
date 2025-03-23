
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Input } from '@/components/ui/input';
import { RouteHop, popularWebsites } from '@/utils/ipUtils';
import { RefreshCw, Network, Globe, Search } from 'lucide-react';

interface RouteTestProps {
  data: RouteHop[] | null;
  loading: boolean;
  error: string | null;
  onTest: (domain?: string) => void;
}

const RouteTest: React.FC<RouteTestProps> = ({ data, loading, error, onTest }) => {
  const [domain, setDomain] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    setSelectedWebsite(null); // Clear selection when typing
  };

  const handleWebsiteSelect = (domain: string) => {
    setDomain(domain);
    setSelectedWebsite(domain);
    onTest(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      onTest(domain);
    }
  };

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center">
            <Network className="w-5 h-5 mr-2" />
            路由追踪
          </h2>
          <Button
            onClick={() => onTest()}
            disabled={loading}
            variant="outline"
            size="sm"
            icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          >
            {loading ? '测试中...' : '随机测试'}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Input 
              placeholder="输入域名进行追踪 (example.com)" 
              value={domain}
              onChange={handleInputChange}
              className="pr-10"
            />
            {domain && (
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setDomain('')}
              >
                ×
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={!domain || loading}
            size="default"
            icon={<Search className="w-4 h-4" />}
          >
            追踪
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-1 mt-1">常用网站：</span>
          {popularWebsites.map((site) => (
            <button
              key={site.domain}
              onClick={() => handleWebsiteSelect(site.domain)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedWebsite === site.domain
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {site.name}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        {loading && !data && (
          <div className="min-h-[200px] flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin-slow" />
            <p className="text-muted-foreground">路由追踪中...</p>
            {domain && <p className="text-xs text-muted-foreground">目标：{domain}</p>}
          </div>
        )}

        {!loading && !data && !error && (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">请输入域名或选择一个网站进行路由追踪</p>
          </div>
        )}

        {data && (
          <div className="mt-4 relative">
            <div className="absolute left-[2rem] top-0 w-0.5 h-full bg-border z-0"></div>
            <div className="space-y-2 relative z-10">
              {data.map((hop, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    index === 0 
                      ? 'bg-green-500' 
                      : index === data.length - 1 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/30'
                  }`}>
                    {index === 0 || index === data.length - 1 ? (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    ) : null}
                  </div>
                  <div className="flex-1 glass-panel p-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-muted-foreground/10 px-2 py-0.5 rounded mr-2">
                            {hop.hop}
                          </span>
                          <span className="font-mono text-sm">{hop.ip}</span>
                        </div>
                        {hop.host && (
                          <p className="text-xs text-muted-foreground mt-1">{hop.host}</p>
                        )}
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className={`inline-flex items-center text-sm ${
                          hop.latency < 30 
                            ? 'text-green-500' 
                            : hop.latency < 100 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`}>
                          {hop.latency} ms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data && (
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <p>路由可能会随时间变化，具体取决于网络拓扑和负载平衡。</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RouteTest;
