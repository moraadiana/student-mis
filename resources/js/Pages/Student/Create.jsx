import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormDatePicker,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { message } from "antd";

export default function Create({ user, courses,enrollments }) {
    return (
        <PageContainer
            header={{
                title: "New Student Admission",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="New Student Admission" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.post(route("student.store"), values, {
                            onSuccess: () => {
                                message.success("Student created successfully");
                                router.get(route("student.index"));
                            },
                            onError: () => {
                                message.error("Failed to create student");
                                router.get(route("student.index"));
                            },
                        });
                    }}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            name="fname"
                            label="First Name"
                            placeholder="First Name"
                            rules={[
                                {
                                    required: true,
                                    
                                },
                            ]}
                        />
                        <ProFormText
                            width="sm"
                            name="lname"
                            label="Last Name"
                            placeholder="Last Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />

                        <ProFormText
                            width="sm"
                            name="address"
                            label="Home Address"
                            placeholder="Address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />
                        <ProFormText
                            width="sm"
                            name="contact"
                            label="Contact"
                            placeholder="Contact"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />

                        <ProFormDatePicker
                            width="sm"
                            name="dob"
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            format = "YYYY-MM-DD"
                        />

                        <ProFormSelect
                            width="sm"
                            name="gender"
                            label="Gender"
                            placeholder="Gender"
                            options={[
                                {
                                    label: "Male",
                                    value: "Male",
                                },
                                {
                                    label: "Female",
                                    value: "Female",
                                },
                            ]}
                        />

                        <ProFormText
                            width="sm"
                            name="username"
                            label="Username"
                            placeholder="Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />
                        <ProFormText
                            width="sm"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />

                        <ProFormText.Password
                            width="sm"
                            name="password"
                            label="Password"
                            placeholder="Password"
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
                                mode: "multiple",
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
                            ]}
                        />
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
