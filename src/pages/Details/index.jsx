import React, { useEffect, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tag } from 'antd';
import { useIntl, connect } from 'umi';
import numeral from 'numeral';
import moment from 'moment';
import VirtualTable from '@/components/VirtualTable';

const Details = (props) => {
  const { formatMessage } = useIntl();

  const {
    dispatch,
    loading,
    match: { params },
    home: { country },
  } = props;

  const fetchType =
    params.id === 'world' ? 'home/fetchDetailsByWorld' : 'home/fetchDetailsByCountry';

  useEffect(() => {
    dispatch({
      type: fetchType,
      payload: {
        country: params.id,
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        title: formatMessage({ id: 'summary.countries' }),
        key: 'Country',
        dataIndex: 'Country',
      },
      {
        title: formatMessage({ id: 'summary.date' }),
        key: 'Date',
        dataIndex: 'Date',
        render: (text) => moment(text).format('MM/DD/YYYY'),
      },
      {
        title: formatMessage({ id: 'summary.newConfirmed' }),
        dataIndex: 'NewConfirmed',
        key: 'NewConfirmed',
        render: (text) => <Tag color={'error'}>{numeral(text).format('0,0')}</Tag>,
      },
      {
        title: formatMessage({ id: 'summary.newRecovered' }),
        dataIndex: 'NewRecovered',
        key: 'NewRecovered',
        render: (text) => <Tag color={'success'}>{numeral(text).format('0,0')}</Tag>,
      },
      {
        title: formatMessage({ id: 'summary.totalDeaths' }),
        key: 'NewDeaths',
        dataIndex: 'NewDeaths',
        render: (text) => numeral(text).format('0,0'),
      },
    ],
    [],
  );

  return (
    <PageContainer>
      <VirtualTable
        loading={loading[fetchType]}
        columns={columns}
        dataSource={country}
        scroll={{
          y: 560,
          x: '100vw',
        }}
      />
    </PageContainer>
  );
};

export default connect(({ home, loading }) => ({ home, loading: loading.effects }))(Details);
