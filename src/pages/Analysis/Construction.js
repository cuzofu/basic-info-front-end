import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Table, Card, Tag, Icon } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Ellipsis from '@/components/Ellipsis';

import styles from './Construction.less';

@connect(({ construction, loading }) => ({
  construction,
  engListLoading: loading.effects['construction/fetchEngList'],
  corpListLoading: loading.effects['construction/fetchCorpList'],
}))
class Construction extends Component {

  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'construction/fetchEngList',
      payload: {
        pageSize: 10,
        currentPage: 0,
        sort: 'gjTime',
        direction: 'descend',
      }
    });
    dispatch({
      type: 'construction/fetchCorpList',
      payload: {
        pageSize: 10,
        currentPage: 0,
        sort: 'gjTime',
        direction: 'descend',
      }
    });
  }

  handleEngListChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  handleCorpListChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  render() {

    const {
      construction: {
        engList,
        corpList,
      },
      engListLoading,
      corpListLoading,
    } = this.props;

    const columnsEngList = [
      {
        title: '工程名称',
        dataIndex: 'engName',
        key: 'engName',
        render: (engName, eng) => (
          <div>
            <div className={styles.divMb5}>
              <Ellipsis length={20} tooltip>{engName}</Ellipsis>
            </div>
            <div className={styles.divMt5}>
              {eng.gclx ? (<Tag color="magenta">{eng.gclx}</Tag>) : null}
              {eng.zbfs ? (<Tag color="volcano" className={styles.headerTag}>{eng.zbfs}</Tag>) : null}
            </div>
          </div>
        ),
      },
      {
        title: '投资额',
        dataIndex: 'tzje',
        key: 'tzje',
        render: (investment) => (
          <div>
            <span style={{ backgroundColor: '#FFB90F', padding: '0 5px', borderRadius: '10px', color: 'white' }}>投资额</span>
            <span>{`${investment}万元`}</span>
          </div>
        ),
      },
      {
        title: '规模',
        dataIndex: 'gcmj',
        key: 'gcmj',
        render: (dimensions) => (
          <div>
            <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>工程规模</span>
            <span>{`${dimensions}平方米`}</span>
          </div>
        ),
      },
      {
        title: '预警类型图标',
        dataIndex: 'wglx',
        key: 'alertTypeIcon',
        render: (alertType) => {
          switch (alertType) {
            case '整改通知':
              return (
                <div style={{textAlign: 'center'}}>
                  <Icon type="exclamation-circle" theme="filled" className={styles.yellowAlertIcon} />
                </div>
              );
            case '停工通知':
              return (
                <div style={{textAlign: 'center'}}>
                  <Icon type="close-circle" theme="filled" className={styles.redAlertIcon} />
                </div>
              );
            default:
              return null;
          }
        },
      },
      {
        title: '预警类型',
        dataIndex: 'wglx',
        key: 'alertType',
        render: (alertType) => {
          switch (alertType) {
            case '整改通知':
              return (
                <div>
                  <span className={`${styles.engStatusFont} ${styles.yellowAlert}`}>{alertType}</span>
                </div>
              );
            case '停工通知':
              return (
                <div>
                  <span className={`${styles.engStatusFont} ${styles.redAlert}`}>{alertType}</span>
                </div>
              );
            default:
              return null;
          }
        },
      },
      {
        title: '预警内容',
        dataIndex: 'alertContext',
        key: 'alertContext'
      },
      {
        title: '详情',
        key: 'more',
        render: (_, record) => (
          <div><Link to={{pathname: `/eng/analysis/${record.id}`}}>详情</Link></div>
        ),
      },
    ];

    const columnsCorpList = [
      {
        title: '企业名称',
        dataIndex: 'corpName',
        key: 'corpName',
        render: (corpName, corp) => (
          <div>
            <div className={styles.divMb5}>
              <Ellipsis length={20} tooltip>{corpName}</Ellipsis>
            </div>
            <div className={styles.divMt5}>
              <Tag color="magenta">{corp.corpType}</Tag>
              <Tag color="volcano" className={styles.headerTag}>{corp.regionType}</Tag>
            </div>
          </div>
        ),
      },
      {
        title: '诚信等级',
        dataIndex: 'creditLevel',
        key: 'creditLevel',
        render: (creditLevel) => (
          <span>{`诚信等级 ${creditLevel}级`}</span>
        ),
      },
      {
        title: '诚信分数',
        dataIndex: 'creditScore',
        key: 'creditScore',
        render: (creditScore) => (
          <span>{`诚信分数 ${creditScore}分`}</span>
        ),
      },
      {
        title: '预警类型图标',
        dataIndex: 'alertType',
        key: 'alertTypeIcon',
        render: (alertType) => {
          switch (alertType) {
            case '证书预警':
            case '人员预警':
              return (
                <div style={{textAlign: 'center'}}>
                  <Icon type="exclamation-circle" theme="filled" className={styles.yellowAlertIcon} />
                </div>
              );
            case '诚信扣分':
              return (
                <div style={{textAlign: 'center'}}>
                  <Icon type="close-circle" theme="filled" className={styles.redAlertIcon} />
                </div>
              );
            case '诚信加分':
              return (
                <div style={{textAlign: 'center'}}>
                  <Icon type="check-circle" theme="filled" className={styles.greenAlertIcon} />
                </div>
              );
            default:
              return null;
          }
        },
      },
      {
        title: '预警类型',
        dataIndex: 'alertType',
        key: 'alertType',
        render: (alertType) => {
          switch (alertType) {
            case '诚信加分':
              return (
                <div>
                  <span className={`${styles.engStatusFont} ${styles.greenAlert}`}>{alertType}</span>
                </div>
              );
            case '诚信扣分':
              return (
                <div>
                  <span className={`${styles.engStatusFont} ${styles.redAlert}`}>{alertType}</span>
                </div>
              );
            case '证书预警':
            case '人员预警':
              return (
                <div>
                  <span className={`${styles.engStatusFont} ${styles.yellowAlert}`}>{alertType}</span>
                </div>
              );
            default:
              return null;
          }
        },
      },
      {
        title: '预警内容',
        dataIndex: 'alertContext',
        key: 'alertContext'
      },
      {
        title: '详情',
        key: 'more',
        render: (_, record) => (
          <div><Link to={{pathname: `/corp/analysis/${record.id}`}}>详情</Link></div>
        ),
      },
    ];

    return (
      <GridContent>
        <Card title="工程列表" bodyStyle={{ height: '484px', padding: '5px 16px' }}>
          <Table
            rowKey="id"
            showHeader={false}
            loading={engListLoading}
            dataSource={engList.list}
            pagination={engList.pagination}
            columns={columnsEngList}
            scroll={{ y: 420 }}
            onChange={this.handleEngListChange}
          />
        </Card>
        <Card title="企业列表" bodyStyle={{ height: '484px', padding: '5px 16px' }}>
          <Table
            rowKey="id"
            showHeader={false}
            loading={corpListLoading}
            dataSource={corpList.data}
            pagination={corpList.pagination}
            columns={columnsCorpList}
            scroll={{ y: 420 }}
            onChange={this.handleCorpListChange}
          />
        </Card>
      </GridContent>
    );
  }
}

export default Construction;
