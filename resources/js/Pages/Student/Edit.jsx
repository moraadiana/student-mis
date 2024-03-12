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
export default function Edit({ student, courses, user, auth }) {
    return (
        <PageContainer
            header={{
                title: "Update Student Details",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Update Student Details" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.put(
                            route("student.update", student.id),
                            values,
                            {
                                onSuccess: () => {
                                    message.success(
                                        "Student updated successfully"
                                    );
                                    router.get(route("student.index"));
                                },
                                onError: () => {
                                    message.error("Failed to update student");
                                    router.get(route("student.index"));
                                },
                            }
                        );
                    }}
                    initialValues={student}
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
                            label="Home "
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
                                },
                            ]}
                            format="YYYY-MM-DD" // Specify the date format
                            // disable future dates and current date
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

                        {auth.user.role_id === 1 && (
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
                                    {
                                       //cannot add course if current course is not expired
                                        validator: (_, value) => {
                                            if (
                                                !value.includes(
                                                    student.current_course_id
                                                )
                                            ) {
                                                return Promise.reject(
                                                    new Error(
                                                        "Cannot add or remove course if current course is not expired"
                                                    )
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                              
                                // set initial values as they are in the database for this student
                                initialValue={student.enrollments.map(
                                    (enrollment) => enrollment.course_id
                                )}
                            />
                        )}
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
