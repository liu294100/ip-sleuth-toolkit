
import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { SpeedTestResult } from '@/utils/ipUtils';
import { 
  RefreshCw, 
  Download, 
  Upload, 
  Clock, 
  Activity,
  Gauge
} from 'lucide-react';

interface SpeedTestProps {
  data: SpeedTestResult | null;
  loading: boolean;
  inProgress: boolean;
  error: string | null;
  onTest: () => void;
}

const SpeedTest: React.FC<SpeedTestProps> = ({ 
  data, 
  loading, 
  inProgress, 
  error, 
  onTest 
}) => {
  const formatSpeed = (speed: number): string => {
    return speed >= 1000 
      ? `${(speed / 1000).toFixed(2)} Gbps` 
      : `${speed.toFixed(2)} Mbps`;
  };

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            网络速度测试
          </h2>
          <Button
            onClick={onTest}
            disabled={loading || inProgress}
            variant="outline"
            size="sm"
            icon={
              loading || inProgress 
                ? <RefreshCw className="w-4 h-4 animate-spin" /> 
                : <RefreshCw className="w-4 h-4" />
            }
          >
            {loading || inProgress ? '测试中...' : '开始测试'}
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        {(loading || inProgress) && !data && (
          <div className="min-h-[200px] flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <RefreshCw className="w-8 h-8 text-primary animate-spin-slow" />
              <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/20"></div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground">速度测试进行中...</p>
              <p className="text-xs text-muted-foreground mt-1">请等待，测试过程可能需要一些时间</p>
            </div>
          </div>
        )}

        {!loading && !inProgress && !data && !error && (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">点击"开始测试"来测量您的网络速度</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Download className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">下载速度</p>
              <p className="text-2xl font-semibold mt-1">{formatSpeed(data.downloadSpeed)}</p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Upload className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">上传速度</p>
              <p className="text-2xl font-semibold mt-1">{formatSpeed(data.uploadSpeed)}</p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">延迟 (Ping)</p>
              <p className="text-2xl font-semibold mt-1">{data.latency.toFixed(1)} ms</p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">抖动</p>
              <p className="text-2xl font-semibold mt-1">{data.jitter.toFixed(1)} ms</p>
            </div>
          </div>
        )}

        {data && (
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <p>测试服务器: {data.testServer}</p>
              <p>测试时间: {new Date().toLocaleString()}</p>
            </div>
            <p className="mt-1">结果是近似值，实际网络性能可能因网络状况变化而有所不同。</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SpeedTest;
