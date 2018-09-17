import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Tag,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import styles from './Person.less';

const { Description } = DescriptionList;

@connect(({ person, loading }) => ({
  person,
  basicInfoLoading: loading.effects['person/fetchBasicInfo'],
  certificateLoading: loading.effects['person/fetchCertificate'],
}))
class Person extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'person/fetchBasicInfo',
    });
    dispatch({
      type: 'person/fetchCertificate',
    });
  }

  render() {

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description>男 | 专科 | 汉族 | 33岁</Description>
        <Description term="入册工龄">5年</Description>
        <Description term="身份证">420581198501180039</Description>
        <Description term="手机号码">13886665321</Description>
      </DescriptionList>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信等级</div>
          <div className={styles.heading}>B级</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信分值</div>
          <div className={styles.heading}>88分</div>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper
        title={
          <div>
            <span className={styles.headerTitle}>陈亮</span>
            <Tag color="magenta" className={styles.headerTag}>有社保</Tag>
          </div>
        }
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
      >
        <Card title="个人附件" style={{ marginBottom: 24 }} bordered={false}>
          <div>个人附件</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Person;
