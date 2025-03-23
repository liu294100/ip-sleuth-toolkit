
import React, { useState } from 'react';
import Layout from '@/components/common/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import IPInfo from '@/components/ip/IPInfo';
import DNSTest from '@/components/ip/DNSTest';
import SpeedTest from '@/components/ip/SpeedTest';
import RouteTest from '@/components/ip/RouteTest';
import CDNTest from '@/components/ip/CDNTest';
import AnimatedTabs from '@/components/common/AnimatedTabs';
import { useIPTests } from '@/hooks/useIPTests';
import { Globe, Share, Server, Network, Gauge } from 'lucide-react';

const Index = () => {
  const { 
    tests, 
    loadIPInfo, 
    runDNSTest, 
    runSpeedTest, 
    runRouteTest, 
    runCDNTest,
    runAllTests 
  } = useIPTests();

  const tabs = [
    {
      id: 'ip-info',
      label: 'IP 信息',
      icon: <Globe className="w-4 h-4" />,
      content: (
        <IPInfo 
          data={tests.ipInfo.data} 
          loading={tests.ipInfo.loading} 
          error={tests.ipInfo.error} 
          onRefresh={loadIPInfo} 
        />
      )
    },
    {
      id: 'dns-test',
      label: 'DNS 测试',
      icon: <Server className="w-4 h-4" />,
      content: (
        <DNSTest 
          data={tests.dnsTest.data} 
          loading={tests.dnsTest.loading} 
          error={tests.dnsTest.error} 
          onTest={runDNSTest} 
        />
      )
    },
    {
      id: 'speed-test',
      label: '速度测试',
      icon: <Gauge className="w-4 h-4" />,
      content: (
        <SpeedTest 
          data={tests.speedTest.data} 
          loading={tests.speedTest.loading} 
          inProgress={tests.speedTest.inProgress}
          error={tests.speedTest.error} 
          onTest={runSpeedTest} 
        />
      )
    },
    {
      id: 'route-test',
      label: '路由追踪',
      icon: <Network className="w-4 h-4" />,
      content: (
        <RouteTest 
          data={tests.routeTest.data} 
          loading={tests.routeTest.loading} 
          error={tests.routeTest.error} 
          onTest={runRouteTest} 
        />
      )
    },
    {
      id: 'cdn-test',
      label: 'CDN 检测',
      icon: <Share className="w-4 h-4" />,
      content: (
        <CDNTest 
          data={tests.cdnTest.data} 
          loading={tests.cdnTest.loading} 
          error={tests.cdnTest.error} 
          onTest={runCDNTest} 
        />
      )
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        <section className="text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            由 IP Sleuth 提供的全方位网络检测工具
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-3 animate-slide-up">
            全功能 IP 检测工具
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            检查您的 IP 地址、网络性能、DNS 配置和路由架构，轻松确保您的网络安全和最佳性能。
          </p>
          <div className="mt-8 flex justify-center space-x-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button onClick={runAllTests} size="lg">运行全部测试</Button>
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <AnimatedTabs tabs={tabs} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Card 
            title="安全检查" 
            description="检查您的连接是否安全，避免数据泄露"
            hover
          >
            <p className="text-muted-foreground">
              通过测试 DNS 泄露和代理检测，确保您的网络通信安全。
            </p>
          </Card>
          
          <Card 
            title="性能优化" 
            description="评估您的网络性能并获取改进建议"
            hover
          >
            <p className="text-muted-foreground">
              使用速度测试和路由分析来发现并解决潜在的网络问题。
            </p>
          </Card>
          
          <Card 
            title="精确定位" 
            description="了解您的精确地理位置和网络详情"
            hover
          >
            <p className="text-muted-foreground">
              获取有关您 IP 位置的详细信息，包括国家、地区和 ISP。
            </p>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
