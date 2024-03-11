import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";

export default function Index({ enrollment,student , course }) {
    console.log(enrollment);
    return (
        <>
            <Head title="Enrollments" />
            <PageContainer
                header={{
                    title: "Enrollments",
                    onBack: () => window.history.back(),
                }}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                router.get(route("enrollment.create"))
                            }
                        >
                            Enroll
                        </Button>
                    </Space>
                }
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
                                dataIndex: ["course", "name"],
                            },
                            {
                                title: "Student",
                                dataIndex: "student", 
                                render: (student) => `${student.fname} ${student.lname}`
                            },

                            {
                                title: "Action",
                                dataIndex: "id",
                                hideInSearch: true,
                                render: (_, record) => (
                                    <Link
                                        href={route("course.edit", record?.id)}
                                    >
                                        Edit
                                    </Link>
                                ),
                            },
                        ]}
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
