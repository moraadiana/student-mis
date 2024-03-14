import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Edit({ roles, user }) {
    return (
        <PageContainer
            header={{
                title: "Edit User",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Edit User" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.put(
                            route("users.update", user.id),
                            values
                            // {
                            //     onSuccess: () => {
                            //         message.success("User updated successfully");
                            //         router.get(route("users.index"));

                            //     },
                            //     onError: () => {
                            //         message.error("Failed to update user");
                            //         router.get(route("users.index"));
                            //     }
                            // }
                        );
                    }}
                    initialValues={user}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            name="email"
                            label="Email Address"
                            placeholder="abc@gmail.com"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            type="email"
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
                                    message:
                                        "Password must be between 10 and 15 characters",
                                },
                                {
                                    //must contain at least one uppercase letter and one lowercase letter
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{10,15}$/,
                                    message:
                                        "Password must contain at least one uppercase and one lowercase letter",
                                },
                                {
                                    //must contain at least one number
                                    pattern: /^(?=.*\d).{10,15}$/,
                                    message:
                                        "Password must contain at least one number",
                                },
                                {
                                    //must contain at least one special character
                                    pattern:
                                        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,15}$/,
                                    message:
                                        "Password must contain at least one special character",
                                },
                            ]}
                        />
                        <ProFormSelect
                            width="sm"
                            //select a role
                            fieldProps={{
                                mode: "single",
                                options: roles.map((role) => ({
                                    label: role.name,
                                    value: role.id,
                                })),
                            }}
                            name="role_id"
                            label="Role"
                            placeholder="Select a role"
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
