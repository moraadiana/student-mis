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
        title={`Hi ${auth.user.email}`}
        headerBordered
        style={{width: '100%'}}

        // add reports use defined in dashboard controller
      


        />
     </>   
    );
}
