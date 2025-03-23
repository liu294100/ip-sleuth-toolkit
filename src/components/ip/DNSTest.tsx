
import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { DNSResult } from '@/utils/ipUtils';
import { RefreshCw, Server } from 'lucide-react';

interface DNSTestProps {
  data: DNSResult[] | null;
  loading: boolean;
  error: string | null;
  onTest: () => void;
}

const DNSTest: React.FC<DNSTestProps> = ({ data, loading, error, onTest }) => {
  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center">
            <Server className="w-5 h-5 mr-2" />
            DNS 测试
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
            <p className="text-muted-foreground">DNS 测试进行中...</p>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">点击"开始测试"来检查 DNS 解析</p>
          </div>
        )}

        {data && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-2 pl-3 font-medium text-muted-foreground">DNS 服务商</th>
                  <th className="text-left pb-2 font-medium text-muted-foreground">解析的 IP</th>
                  <th className="text-right pb-2 pr-3 font-medium text-muted-foreground">延迟</th>
                </tr>
              </thead>
              <tbody>
                {data.map((result, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border/50 hover:bg-muted/40 transition-colors ${
                      index === data.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-3 pl-3">{result.resolver}</td>
                    <td className="py-3 font-mono text-sm">{result.resolvedIp}</td>
                    <td className="py-3 pr-3 text-right">
                      <span className={`inline-flex items-center ${
                        result.latency < 30 
                          ? 'text-green-500' 
                          : result.latency < 70 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        {result.latency} ms
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data && (
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <p>结果只是近似值，实际 DNS 解析可能会因网络环境不同而有所不同。</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DNSTest;
