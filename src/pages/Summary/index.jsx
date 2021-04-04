import React, { useEffect, useState, useRef, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Input, Button, Space, Tag } from 'antd';
import { useIntl, connect, history } from 'umi';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import moment from 'moment';
import styles from './index.less';

const Index = (props) => {
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let textInput = useRef(null);
  const {
    dispatch,
    loading,
    home: { countries },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'home/fetchSummary',
    });
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            textInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => textInput.select(), 100);
      }
    },
    render: (text) => {
      if (searchedColumn === dataIndex) {
        return (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        );
      }
      return text;
    },
  });

  const columns = useMemo(
    () => [
      {
        title: formatMessage({ id: 'summary.countries' }),
        dataIndex: 'Country',
        key: 'Country',
        sorter: (a, b) => a.Country > b.Country,
        ...getColumnSearchProps('Country'),
        width: '20%',
      },
      {
        title: formatMessage({ id: 'summary.date' }),
        key: 'Date',
        dataIndex: 'Date',
        render: (text) => moment(text).format('MM/DD/YYYY'),
        width: '10%',
      },
      {
        title: formatMessage({ id: 'summary.totalConfirmed' }),
        dataIndex: 'TotalConfirmed',
        key: 'TotalConfirmed',
        render: (text) => numeral(text).format('0,0'),
        width: '14%',
        align: 'right',
      },
      {
        title: formatMessage({ id: 'summary.newConfirmed' }),
        dataIndex: 'NewConfirmed',
        key: 'NewConfirmed',
        render: (text) => <Tag color={'error'}>{numeral(text).format('0,0')}</Tag>,
        width: '14%',
        align: 'right',
      },
      {
        title: formatMessage({ id: 'summary.newRecovered' }),
        dataIndex: 'NewRecovered',
        key: 'NewRecovered',
        render: (text) => <Tag color={'success'}>{numeral(text).format('0,0')}</Tag>,
        width: '14%',
        align: 'right',
      },
      {
        title: formatMessage({ id: 'summary.totalRecovered' }),
        key: 'TotalRecovered',
        dataIndex: 'TotalRecovered',
        render: (text) => numeral(text).format('0,0'),
        width: '14%',
        align: 'right',
      },
      {
        title: formatMessage({ id: 'summary.totalDeaths' }),
        key: 'TotalDeaths',
        dataIndex: 'TotalDeaths',
        render: (text) => numeral(text).format('0,0'),
        width: '14%',
        align: 'right',
      },
    ],
    [searchText],
  );

  return (
    <PageContainer>
      <Table
        className={styles.summary}
        columns={columns}
        dataSource={countries}
        loading={loading['home/fetchSummary']}
        onRow={({ Slug }) => ({
          onClick: () => {
            history.push({ pathname: `/summary/${Slug || 'world'}` });
          },
        })}
      />
    </PageContainer>
  );
};

export default connect(({ home, loading }) => ({ home, loading: loading.effects }))(Index);
