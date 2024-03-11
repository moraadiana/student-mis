import { ProCard, ProTable, StatisticCard } from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Statistic } = StatisticCard;

export default function Dashboard({ auth }) 
{
    return (
      <>

        <Head title = "Dashboard"/>
        <ProCard
        title={`Hi ${auth.user.username}`}
        headerBordered
        style={{width: '100%'}}

        />
     </>   
    );
}
