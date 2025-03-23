
import React from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { IPInfo as IPInfoType } from '@/utils/ipUtils';
import { MapPin, Globe, Info, RefreshCw } from 'lucide-react';

interface IPInfoProps {
  data: IPInfoType | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const IPInfo: React.FC<IPInfoProps> = ({ data, loading, error, onRefresh }) => {
  if (loading) {
    return (
      <Card className="min-h-[200px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin-slow" />
          <p className="text-muted-foreground">获取 IP 信息中...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="min-h-[200px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={onRefresh} variant="outline" icon={<RefreshCw className="w-4 h-4" />}>
            重试
          </Button>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">没有 IP 信息可用</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <h2 className="text-2xl font-semibold">{data.ip}</h2>
            </div>
            {data.isp && (
              <p className="text-muted-foreground mt-1">{data.isp}</p>
            )}
          </div>
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm"
            icon={<RefreshCw className="w-4 h-4" />}
            className="mt-4 sm:mt-0"
          >
            刷新
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              地理位置
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {data.country && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">国家/地区:</span>
                  <span className="font-medium">{data.country} {data.countryCode && `(${data.countryCode})`}</span>
                </div>
              )}
              {data.region && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">省份/地区:</span>
                  <span className="font-medium">{data.region}</span>
                </div>
              )}
              {data.city && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">城市:</span>
                  <span className="font-medium">{data.city}</span>
                </div>
              )}
              {data.timezone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">时区:</span>
                  <span className="font-medium">{data.timezone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Info className="w-4 h-4 mr-2" />
              网络信息
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {data.asn && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ASN:</span>
                  <span className="font-medium">{data.asn}</span>
                </div>
              )}
              {data.org && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">组织:</span>
                  <span className="font-medium">{data.org}</span>
                </div>
              )}
              {typeof data.isProxy !== 'undefined' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">代理/VPN:</span>
                  <span className={`font-medium ${data.isProxy ? 'text-yellow-500' : 'text-green-500'}`}>
                    {data.isProxy ? '是' : '否'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {data.latitude && data.longitude && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                地图位置
              </h3>
              <div className="text-xs text-muted-foreground">
                {data.latitude}, {data.longitude}
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-muted/20 h-[200px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">地图将在这里显示</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IPInfo;
