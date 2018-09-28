import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '升思科技',
          title: '升思科技',
          href: 'http://www.jsgl.com.cn/',
          blankTarget: true,
        },
        {
          key: '宜昌智慧住建',
          title: '宜昌智慧住建',
          href: 'http://www.ycjsjg.net/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 湖北升思科技股份有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
