import { Tag, Typography } from 'antd'
import React from 'react'
import { ICategory } from 'interfaces'
import { Show } from '@refinedev/antd'
import { useOne, useShow } from '@refinedev/core'
import { Params, useParams } from 'react-router-dom'

const {Title, Text} = Typography
export const PostShow: React.FC = () => {
  const {queryResult} = useShow();
  const {data, isLoading} = queryResult;
  const record = data?.data;

  const {data: categoryData} = useOne<ICategory>({
    resource: "categories",
    id: record?.id || "",
    queryOptions: {
      enabled: !!record?.id
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Category</Title>
      <Text>{categoryData?.data.title}</Text>
    </Show>
  )
}