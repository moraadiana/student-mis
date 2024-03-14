import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({ students, user }) {
    return (
        <>
            <Head title=" All Students" />
            <PageContainer
                header={{
                    title: "Students",
                    onBack: () => window.history.back(),
                }}
                
                
                extra={ 
                    //button only viewed by user with admin role
                    user.role.id == 1 &&(
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => router.get(route("students.create"))}
                        >
                            Add Student
                        </Button>

                       
                    </Space>)
                }
            >
                <ProCard>
                    <ProTable
                        // headerTitle="Personal Details"
                        dataSource={students?.data}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["students"],
                                data: params,
                            });
                            return {
                                data: students?.data,
                                success: true,
                                total: students?.total,
                            };
                        }}
                        columns={[
                            {
                                title: "Student ID",
                                dataIndex: "id",
                            },
                            {
                                title: "First Name",
                                dataIndex: "fname",
                            },
                            {
                                title: "Last Name",
                                dataIndex: "lname",
                            },
                            {
                                title: " Home Address",
                                dataIndex: "address",
                            },
                            {
                                title: "Email",
                                dataIndex: ["user", "email"],
                            },
                            {
                                title: "Contact",
                                dataIndex: "contact",
                            },
                            {
                                title: "Date of Birth",
                                dataIndex: "dob",
                            },
                            {
                                title: "Gender",
                                dataIndex: "gender",
                            },

                            {
                                title: "Action",
                                hideInSearch: true,
                                render: (_, record) => (
                                    <Link
                                        href={route("students.edit", record?.id)}
                                    >
                                        Edit
                                    </Link>
                                ),
                            },
                            {
                                title: "Action",
                                hideInSearch: true,
                                render: (_, record) => (
                                    <Link
                                        href={route(
                                            "students.show", record?.id

                                        )}
                                    >
                                        View
                                    </Link>
                                )
                            }
                        ]}
                        pagination={{
                            pageSize: students?.per_page,
                            total: students?.total,
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
