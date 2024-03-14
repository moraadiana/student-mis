import { ProCard, ProTable, StatisticCard } from "@ant-design/pro-components";
import { Head, router, Link } from "@inertiajs/react";
import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Statistic } = StatisticCard;
export default function Dashboard({
    auth,
    totalStudentsCount,
    totalCoursesCount,
    enrolledCourses,
    allStudents,
    allCourses,
    $allEnrolledCourses,
}) {
    console.log($allEnrolledCourses);
    return (
        <>
            <Head title="Dashboard" />
            {auth.user.role_id === 2 && (
                <ProCard
                    title={`Hi ${auth.user.email} welcome to your profile`}
                    headerBordered
                    style={{ width: "100%" }}
                />
            )}

            {auth.user.role_id === 1 && (
                <ProCard
                    title={`Hi ${auth.user.email} welcome to your profile`}
                    headerBordered
                    style={{ width: "100%" }}
                    tabs={{
                        items: [
                            {
                                key: "1",
                                label: (
                                    <Statistic
                                        layout="vertical"
                                        title="All Students"
                                        value={totalStudentsCount}
                                        total:true
                                        style={{
                                            width: 120,
                                            borderInlineEnd:
                                                "1px solid #f0f0f0",
                                        }}
                                    />
                                ),
                                children: (
                                    <ProTable
                                        size="small"
                                        dataSource={allStudents}
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
                                                        href={route(
                                                            "students.edit",
                                                            record?.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                ),
                                            },
                                        ]}
                                        scroll={{
                                            x: true,
                                        }}
                                        ghost
                                        options={false}
                                        pagination={false}
                                        search={false}
                                    />
                                ),
                            },
                            {
                                key: "2",

                                label: (
                                    <Statistic
                                        layout="vertical"
                                        title="All Courses"
                                        value={totalCoursesCount}
                                        total:true
                                        style={{
                                            width: 120,
                                            borderInlineEnd:
                                                "1px solid #f0f0f0",
                                        }}
                                    />
                                ),
                                children: (
                                    <ProTable
                                        size="small"
                                        dataSource={allCourses}
                                        columns={[
                                            {
                                                title: "Course ID",
                                                dataIndex: "id",
                                            },
                                            {
                                                title: "Course Name",
                                                dataIndex: "name",
                                            },
                                        ]}
                                        scroll={{
                                            x: true,
                                        }}
                                        ghost
                                        options={false}
                                        pagination={false}
                                        search={false}
                                    />
                                ),
                            },

                            {
                                key: "3",
                                label: (
                                    <Statistic
                                        layout="vertical"
                                        title="Enrolled Courses "
                                        value={enrolledCourses}
                                        total:true
                                        style={{
                                            width: 120,
                                            borderInlineEnd:
                                                "1px solid #f0f0f0",
                                        }}
                                    />
                                ),
                                children: (
                                    <ProTable
                                        size="small"
                                        dataSource={$allEnrolledCourses}
                                        columns={[
                                            {
                                                title: "Course Name",
                                                dataIndex: ["course", "name"],
                                            },
                                            {
                                                title: "start Date",
                                                dataIndex: [
                                                    "course",
                                                    "start_date",
                                                ],
                                            },
                                            {
                                                title: "end Date",
                                                dataIndex: [
                                                    "course",
                                                    "end_date",
                                                ],
                                            },
                                        ]}
                                        // Pagination, rowKey, and other settings...

                                        rowKey="id"
                                        search={false}
                                    />
                                ),
                            },
                        ],
                    }}
                />
            )}
        </>
    );
}
