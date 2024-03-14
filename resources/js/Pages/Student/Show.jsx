import { Head, router, usePage } from "@inertiajs/react";
import { Space, Button, Tag, message } from "antd";
import {
    PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea,
    ProFormSelect,
    ProFormDatePicker,
} from "@ant-design/pro-components";
import moment from "moment";

export default function Show({ auth, student, courses }) {
  
    return (
        <>
            <Head title="Show Student" />
            <PageContainer
                header={{
                    title: "Student Details",
                    onBack: () => window.history.back(),
                }}
            >
                <ProCard>
                    <ProDescriptions
                        size="small"
                        bordered
                        column={2}
                        dataSource={student}
                        title="Student Details"
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "fname",
                                render: (_, record) =>
                                    `${record.fname} ${record.lname}`,
                            },
                            {
                                title: "Email",
                                dataIndex: ["user", "email"],
                            },
                            {
                                title: "Phone",
                                dataIndex: "contact",
                            },
                            {
                                title: "Address",
                                dataIndex: "address",
                            },
                            {
                                title: "Gender",
                                dataIndex: "gender",
                            },
                            {
                                title: "Date of Birth",
                                dataIndex: "dob",
                            },
                        ]}
                    />
                </ProCard>

                <ProTable
                    headerTitle="Enrolled Courses"
                    dataSource={student?.courses}
                    toolBarRender={() => [
                        auth.user.role_id == 1 && (
                            <ModalForm
                                title="Enroll Course"
                                trigger={
                                    <Button type="primary">
                                        Enroll Course
                                    </Button>
                                }
                                submitter={{
                                    searchConfig: {
                                        resetText: "Cancel",
                                        submitText: "Submit",
                                    },
                                }}
                                onFinish={async (values) => {
                                    router.post(
                                        route("enrollments.store"),
                                        {
                                            ...values,
                                            student_id: student.id,
                                        },
                                        {
                                            onSuccess: () => {
                                                message.success(
                                                    "Course enrolled successfully"
                                                );
                                                router.get(
                                                    route("students.show")
                                                );
                                            },
                                            onError: (errors) => {
                                                message.error(
                                                    errors.enrollment
                                                );
                                            },
                                        }
                                    );
                                }}
                            >
                                <ProFormSelect
                                    name="course_id"
                                    label="Course"
                                    options={courses.map((course) => ({
                                        label: course.name,
                                        value: course.id,
                                    }))}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a course",
                                        },
                                    ]}
                                />
                                <ProFormDatePicker
                                    name="expiry_date"
                                    label="Expiry Date"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select an expiry date",
                                        },
                                    ]}
                                />
                            </ModalForm>
                        ),
                    ]}
                    columns={[
                        {
                            title: "Course",
                            dataIndex: "name",
                        },
                        {
                            title: "Start Date",
                            dataIndex: "start_date",
                        },
                        {
                            title: "End Date",
                            dataIndex: "end_date",
                        },
                    ]}
                    search={false}
                />
            </PageContainer>
        </>
    );
}
