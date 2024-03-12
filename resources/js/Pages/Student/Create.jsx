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
import moment from "moment";

export default function Create({ user, courses, enrollments }) {
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
                            label="Phone Number"
                            placeholder="Contact"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    pattern: /^[0-9]+$/,

                                    message: "Contact must be a number",
                                },
                                {
                                    len: 10,
                                    message:
                                        "Contact must be a 10 digits number",
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
                                {
                                    //must be less than current date
                                    validator: (_, value) => {
                                        if (value > moment().startOf("day")) {
                                            return Promise.reject(
                                                new Error(
                                                    "Date of Birth must be less than current date"
                                                )
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                    
                                }
                            ]}
                            format="YYYY-MM-DD"
                            
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
                            disabledDate={(current) => {
                                return (
                                    current && current > moment().startOf("day")
                                );
                            }}
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

                                {
                                    type: "email",
                                    message:
                                        "Please enter a valid email address",
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

                                {
                                    min: 10,
                                    max: 15,
                                    message: "Password must be between 10 and 15 characters",
                                },
                                {
                                    //must contain at least one uppercase letter and one lowercase letter
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{10,15}$/,
                                    message: "Password must contain at least one uppercase and one lowercase letter",

                                },
                                {
                                    //must contain at least one number
                                    pattern: /^(?=.*\d).{10,15}$/,
                                    message: "Password must contain at least one number",
                                },
                                {
                                    //must contain at least one special character
                                    pattern: /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,15}$/,
                                    message: "Password must contain at least one special character",
                                }



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
