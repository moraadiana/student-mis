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
export default function Edit({ courses }) {
    console.log(courses);
    return (
        <PageContainer
            header={{
                title: "Edit course",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Edit course" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        router.put(
                            route("courses.update", courses.id),
                            values,
                            {
                                onSuccess: () => {
                                    message.success(
                                        "Course updated successfully"
                                    );
                                    router.get(route("enrollments.index"));
                                },
                                onError: () => {
                                    message.error("Failed to update course");
                                    router.get(route("enrollments.index"));
                                },
                            }
                        );
                    }}
                    initialValues={courses}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            rules={[{ required: true }]}
                        />
                        <ProFormDatePicker
                            width="sm"
                            name="start_date"
                            label="Start Date"
                            placeholder="Start Date"
                            rules={[{ required: true }]}
                            dataFormat="YYYY-MM-DD"
                        />

                        <ProFormDatePicker
                            width="sm"
                            name="end_date"
                            label="End Date"
                            placeholder="End Date"
                            rules={[{ required: true }]}
                            dataFormat="YYYY-MM-DD"
                        />
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
