import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({course}) {
   console.log(course);
    return (
        <>
            <Head title="Courses" />
            <PageContainer
                header={{
                    title: "Courses",
                    onBack: () => window.history.back(),
                }}

                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => router.get(route("course.create"))}
                        >
                            Add Course
                        </Button>
                    </Space>
                }
            >
                <ProCard>
                    <ProTable
                        headerTitle="Courses"
                        dataSource={course?.data}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["course"],
                                data: params,
                            });
                            return {
                                data:course?.data,
                                success: true,
                                total: course?.total,
                            };
                        }}
                        columns={[
                           
                            {
                                title: "Course ID",
                                dataIndex: "id",
                            },
                            {
                                title: "Course",
                                dataIndex: "course",
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
                            
                                {
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
                            pageSize: course?.per_page,
                            total: course?.total,
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
