
import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { RouteHop } from '@/utils/ipUtils';
import { RefreshCw, Network } from 'lucide-react';

interface RouteTestProps {
  data: RouteHop[] | null;
  loading: boolean;
  error: string | null;
  onTest: () => void;
}

const RouteTest: React.FC<RouteTestProps> = ({ data, loading, error, onTest }) => {
  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center">
            <Network className="w-5 h-5 mr-2" />
            路由追踪
          </h2>
          <Button
            onClick={onTest}
            disabled={loading}
            variant="outline"
            size="sm"
            icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          >
            {loading ? '测试中...' : '开始测试'}
          </Button>
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
          </div>
        )}

        {!loading && !data && !error && (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">点击"开始测试"来追踪网络路由</p>
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
