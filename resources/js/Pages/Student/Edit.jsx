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
                            route("students.update", student.id),
                            values,
                            {
                                onSuccess: () => {
                                    message.success(
                                        "Student updated successfully"
                                    );
                                    router.get(route("students.index"));
                                },
                                onError: () => {
                                    message.error("Failed to update student");
                                    router.get(route("students.index"));
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
                            label="Home  Address"
                            placeholder="ex. Nairobi"
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
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
