import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button } from "antd";

export default function Index({ enrollment, courses, students }) {
    //group students by course

    console.log(students);
    return (
        <>
            <Head title="Enrollments" />
            <PageContainer
                header={{
                    title: "Enrolled Students in Courses",
                    onBack: () => window.history.back(),
                }}
            >
                <ProCard>
                    <ProTable
                        headerTitle="Courses"
                        dataSource={courses}
                        request={async (params) => {
                            params.page = params.current;
                            delete params?.current;
                            router.reload({
                                only: ["courses"],
                                data: params,
                            });
                            return {
                                data: courses,
                                success: true,
                                total: courses.total,
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
                        ]}
                        expandable={{
                            expandedRowRender: (record) => (
                                <ProTable
                                    dataSource={record.students}
                                    columns={[
                                        {
                                            title: "Student",
                                            dataIndex: "fname",
                                            render: (_, record) =>
                                                `${record.fname} ${record.lname}`,
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
