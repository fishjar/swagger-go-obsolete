import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({}) => ({}))
class Index extends Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <PageHeaderWrapper title="首页">
        <Card bordered={false}>
          <h1>欢迎光临</h1>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
