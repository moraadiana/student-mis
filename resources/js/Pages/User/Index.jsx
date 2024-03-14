import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({ users }) {
    console.log(users);
    return (
        <>
            <Head title="Users" />
            <PageContainer
                header={{
                    title: "Users",
                    onBack: () => window.history.back(),
                }}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => router.get(route("users.create"))}
                        >
                            Add Administrator
                        </Button>
                    </Space>
                }
            >
                <ProCard>
                    <ProTable
                        headerTitle="Users"
                        dataSource={users?.data}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["users"],
                                data: params,
                            });
                            return {
                                data: users?.data,
                                success: true,
                                total: users?.total,
                            };
                        }}
                        columns={[
                            // {
                            //     title: "Username",
                            //     dataIndex: "username",
                            // },
                            {
                                title: "Email",
                                dataIndex: "email",
                            },
                            {
                                title: "Role",
                                dataIndex: ["role", "name"],
                            },
                            // edit user link

                            {
                                title: "Action",
                                dataIndex: "id",
                                hideInSearch: true,
                                render: (_, record) => (
                                    <Link
                                        href={route("users.edit", record?.id)}
                                    >
                                        Edit
                                    </Link>
                                ),
                            },
                        ]}
                        pagination={{
                            total: users?.total,
                            defaultPageSize: 10,
                        }}
                        rowKey="id"
                        search={false}
                    />
                </ProCard>
            </PageContainer>
        </>
    );
}
