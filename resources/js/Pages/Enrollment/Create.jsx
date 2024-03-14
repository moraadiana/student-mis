import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormCheckbox,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { message } from "antd";
import moment from "moment";

export default function Create({ students, courses }) {
    return (
        <PageContainer
            header={{
                title: "Student Enrollment",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Student Enrollment " />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.post(route("enrollments.store"), values, {
                            onSuccess: () => {
                                message.success(
                                    "Student enrolled successfully"
                                );
                                router.get(route("students.index"));
                            },
                            onError: () => {
                                message.error("Failed to enroll student");
                                router.get(route("students.index"));
                            },
                        });
                    }}
                >
                    <ProForm.Group>
                        <ProFormSelect
                            width="sm"
                            //select a student
                            fieldProps={{
                                options: students.map((student) => ({
                                    label: student.fname + " " + student.lname,
                                    value: student.id,
                                })),
                            }}
                            name="student_id"
                            label="Student"
                            placeholder="Select student"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />
                        <ProFormSelect
                            width="sm"
                            //select a course
                            fieldProps={{
                                options: courses.map((course) => ({
                                    label: course.name,
                                    value: course.id,
                                })),
                            }}
                            name="course_id"
                            label="Course"
                            placeholder="Select a course"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    //
                                },
                            ]}
                        />
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
