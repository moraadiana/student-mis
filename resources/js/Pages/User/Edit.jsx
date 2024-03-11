import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Edit({ roles, user }) {
    console.log (user);
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
                                route("user.update", user.id),values,
                                {
                                    onSuccess: () => {
                                        message.success("User updated successfully");
                                        router.get(route("student.index"));
                                    },
                                    onError: () => {
                                        message.error("Failed to update user");
                                        router.get(route("student.index"));
                                    },
                                }
                                
                            
                            );
                        }}
                        initialValues={user}
                    >
                    <ProForm.Group>
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
