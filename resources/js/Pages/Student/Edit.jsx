import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Edit({ student }) {
    return (
        <PageContainer
            header={{
                title: "Edit Student",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Edit Student" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.put(route("student.store"), {
                            ...values,
                        });
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
                            label="Address"
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

                        <ProFormText
                            width="sm"
                            name="dob"
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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