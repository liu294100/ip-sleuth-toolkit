
import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { CDNResult } from '@/utils/ipUtils';
import { RefreshCw, Globe, Check, X } from 'lucide-react';

interface CDNTestProps {
  data: CDNResult[] | null;
  loading: boolean;
  error: string | null;
  onTest: () => void;
}

const CDNTest: React.FC<CDNTestProps> = ({ data, loading, error, onTest }) => {
  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            CDN 检测
          </h2>
          <Button
            onClick={onTest}
            disabled={loading}
            variant="outline"
            size="sm"
            icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          >
            {loading ? '检测中...' : '开始检测'}
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
            <p className="text-muted-foreground">CDN 检测中...</p>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">点击"开始检测"来检查内容分发网络</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {data.map((cdn, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  cdn.detected 
                    ? 'border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900/30' 
                    : 'border-border bg-muted/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{cdn.name}</h3>
                  {cdn.detected ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm mt-2 text-muted-foreground">
                  {cdn.detected 
                    ? '检测到此 CDN 服务' 
                    : '未检测到此 CDN 服务'}
                </p>
              </div>
            ))}
          </div>
        )}

        {data && (
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <p>CDN 检测基于请求头和网络特征，可能不总是 100% 准确。</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CDNTest;
