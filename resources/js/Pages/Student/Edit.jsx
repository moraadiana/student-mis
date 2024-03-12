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
export default function Edit({ student, courses, user }) {
    console.log(user.role_id === 1);
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
                                },
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
                        />

                        {user.role_id === 1 && (
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
                                rules={[{ required: true }]}
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
