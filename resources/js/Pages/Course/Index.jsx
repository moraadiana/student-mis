import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({courses, user}) {
   console.log(courses);
    return (
        <>
            <Head title="Courses" />
            <PageContainer
                header={{
                    title: "Courses",
                    onBack: () => window.history.back(),
                }}

                extra={
                    user.role_id === 1 && (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => router.get(route("course.create"))}
                        >
                            Add Course
                        </Button>
                    </Space>
                    )
                }
            >
                <ProCard>
                    <ProTable
                        headerTitle="Courses"
                        dataSource={courses?.data}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["courses"],
                                data: params,
                            });
                            return {
                                data:courses?.data,
                                success: true,
                                total: courses?.total,
                            };
                        }}
                        columns={[
                           
                            {
                                title: "Course ID",
                                dataIndex: "id",
                            },
                            {
                                title: "Course Name",
                                dataIndex: "name",
                            },
                            {
                                title: "start Date",
                                dataIndex: "start_date",

                            },
                            {
                                title: "end Date",
                                dataIndex: "end_date",
                            },
                            // edit user link
                            
                            user.role_id === 1 && { 
                                    title: "Action",
                                    dataIndex: "id",
                                    hideInSearch: true,
                                    render: (_, record) => (
                                        <Link
                                            href={route(
                                                "course.edit",
                                                record?.id
                                            )}
                                        >
                                            Edit
                                        </Link>
                                    ),
                                },
                            

                        ]}
                        pagination={{
                            pageSize: courses?.per_page,
                            total: courses?.total,
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
