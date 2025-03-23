
import React from 'react';
import Layout from '@/components/common/Layout';
import Card from '@/components/common/Card';
import { useIsMobile } from '@/hooks/use-mobile';
import ConnectivityTest from '@/components/ip/ConnectivityTest';
import { InfoIcon, Globe, Bot } from 'lucide-react';

const About = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-3 animate-slide-up">
            关于 IP Sleuth
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            强大、快速、精准的网络检测工具集
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            title="网址连通性测试" 
            description="测试常用网站的连通性和响应速度"
            hover={false}
          >
            <ConnectivityTest />
          </Card>

          <Card 
            title="关于我们" 
            description="了解 IP Sleuth 工具包"
            hover={false}
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <InfoIcon className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">全方位网络诊断</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    IP Sleuth 提供全面的网络诊断功能，包括 IP 信息查询、DNS 解析测试、网络速度测试、路由跟踪和 CDN 检测等。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">全球服务器支持</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    我们的测试节点遍布全球，提供准确的全球网络性能数据，帮助用户了解其网络在不同地区的表现。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Bot className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">先进技术支持</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    采用最新的网络检测技术，结合人工智能分析，提供专业、准确的网络诊断结果和优化建议。
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  版本: 1.0.0 | 更新日期: {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  IP Sleuth Toolkit © {new Date().getFullYear()} 保留所有权利
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;
