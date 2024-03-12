import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button } from "antd";

export default function Index({ enrollment, courses }) {
    //group students by course
    
    console.log(courses)
    return (
        <>
            <Head title="Enrollments" />
            <PageContainer
                header={{
                    title: "Enrolled Students in Courses",
                    onBack: () => window.history.back(),
                }}
                // extra={
                //     <Space>
                //         <Button
                //             type="primary"
                //             onClick={() =>
                //                 router.get(route("enrollment.create"))
                //             }
                //         >
                //             Enroll Student
                //         </Button>
                //     </Space>
                // }
            >
                   <ProCard>
                    <ProTable
                        headerTitle="Enrollment"
                        dataSource={enrollment?.data}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["enrollment"],
                                data: params,
                            });
                            return {
                                data: enrollment?.data,
                                success: true,
                                total: enrollment?.total,
                            };
                        }}
                        columns={[
                            {
                                title: "Course",
                                dataIndex: "course",
                                render: (_, record) => `${record.course.name}`,
                                
                                
                            },

                           
                        ]}
                        expandable={{
                            expandedRowRender: (record) => (
                                <ProTable
                                    
                                    dataSource={courses.find(course => course.id === record.course.id)?.students}
                                    columns={[
                                        {
                                            title: "Student",
                                            dataIndex: "fname",
                                            render: (_, student) => `${student.fname} ${student.lname}`,
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
                                    rowKey="id"
                                    search={false}
                                    pagination={false}
                                    options={false}
                                    bordered
                                />
                            ),
                        }}
                        // Pagination, rowKey, and other settings...
                        pagination={{
                            pageSize: enrollment?.per_page,
                            total: enrollment?.total,
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
