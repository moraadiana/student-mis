import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({students}) {
   
    return (
        <>
            <Head title=" AllStudents" />
            <PageContainer
                header={{
                    title: "Students",
                    onBack: () => window.history.back(),
                }}

                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => router.get(route("student.create"))}
                        >
                            Add Student
                        </Button>
                    </Space>
                }
            >
                <ProCard>
                    <ProTable
                        headerTitle="Students"
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
                                total: users?.total,
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
                                title: "address",
                                dataIndex: "address",
                                
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
                                        href={route(
                                            "student.edit",
                                            record?.id
                                        )}
                                    >
                                        Edit
                                    </Link>
                                ),
                            },
                        ]}
                        pagination={{
                            pageSize: students?.per_page,
                            total: students?.total,
                            defaultPageSize: 10,
                        }}
                        //return what is being searched in the search bar
                        
                        rowKey="id"
                        search={false}
                    />
                </ProCard>
            </PageContainer>
        </>
    );
}
