import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tag } from 'antd';
import Gallery from 'react-grid-gallery';

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

  setCustomTags = i => i.tags.map(t => (
    <div
      key={t.value}
      style={{
        wordWrap: 'break-word',
        display: 'inline-block',
        backgroundColor: 'white',
        height: 'auto',
        fontSize: '75%',
        fontWeight: '600',
        lineHeight: '1',
        padding: '.2em .6em .3em',
        borderRadius: '.25em',
        color: 'black',
        verticalAlign: 'baseline',
        margin: '2px',
      }}
    >
      {t.title}
    </div>
  ));

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

    const IMAGES = [
      {
        src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
        thumbnail: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg',
        thumbnailWidth: 271,
        thumbnailHeight: 320,
        caption: '职称证书',
      },
      {
        src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
        thumbnail: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 190,
        caption: '岗位证书',
      },
      {
        src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
        thumbnail: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 148,
        caption: '身份证',
      },
      {
        src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
        thumbnail: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: '印章',
      },
    ];

    IMAGES.map(i => {
      i.customOverlay = (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            maxHeight: '240px',
            overflow: 'hidden',
            position: 'absolute',
            bottom: '0',
            width: '100%',
            color: 'white',
            padding: '2px',
            fontSize: '90%',
          }}
        >
          <div>{i.caption}</div>
          {i.hasOwnProperty('tags') && this.setCustomTags(i)}
        </div>
      );
      return i;
    });

    return (
      <PageHeaderWrapper
        title={
          <div>
            <span className={styles.headerTitle}>陈亮</span>
            <Tag color="magenta" className={styles.headerTag}>
              有社保
            </Tag>
          </div>
        }
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
      >
        <Card title="个人附件" bordered={false}>
          <div className={styles.imgCardContainer}>
            {IMAGES.length === 0 ? (
              '无附件'
            ) : (
              <Gallery images={IMAGES} enableImageSelection={false} />
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Person;
