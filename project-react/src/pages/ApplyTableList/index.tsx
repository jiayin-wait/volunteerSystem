import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ManOutlined,
  QuestionCircleOutlined,
  VerticalAlignBottomOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
import React, { useState } from 'react';
import { getApplyList } from '@/services/apply';

const ApplyTableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ApplyListItem>();
  const columns: ProColumns<API.ApplyListItem>[] = [
    {
      title: 'Id',
      width: 80,
      dataIndex: 'id',
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      search: false,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (sex) => {
        let color;
        let text = '';
        if (sex === 0) {
          color = 'default';
          text = '未知';
          return (
            <Tag icon={<QuestionCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (sex === 1) {
          color = 'processing';
          text = '男';
          return (
            <Tag icon={<ManOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (sex === 2) {
          color = 'error';
          text = '女';
          return (
            <Tag icon={<WomanOutlined />} color={color}>
              {text}
            </Tag>
          );
        }
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '电话',
      dataIndex: 'tel',
      search: false,
    },
    {
      title: '报名状态',
      dataIndex: 'apply_status',
      render: (apply_status) => {
        let color;
        let text = '';
        if (apply_status === 0) {
          color = 'default';
          text = '待审核';
          return (
            <Tag icon={<InfoCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 1) {
          color = 'success';
          text = '已审核';
          return (
            <Tag icon={<CheckCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 2) {
          color = 'error';
          text = '未通过';
          return (
            <Tag icon={<CloseCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        }
      },
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      search: false,
    },
    {
      title: '报名活动',
      dataIndex: 'belonging_activity_name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (dom, entity) => [
        <a
          onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}
        >
          查看详情
        </a>,
        <a key="link">审核</a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ApplyListItem>
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        request={getApplyList}
        dateFormatter="string"
        headerTitle="报名列表"
        toolBarRender={() => [<Button key="out" icon={<VerticalAlignBottomOutlined />}>导出数据</Button>]}
      />
      <Drawer
        width={500}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
      >
        {currentRow?.name && (
          <ProDescriptions<API.ApplyListItem>
            column={1}
            title={currentRow?.name + '的报名信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.ApplyListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ApplyTableList;
