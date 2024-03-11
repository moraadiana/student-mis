import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { message } from "antd";

export default function Create({ courses }) {
    return (
        <PageContainer
            header={{
                title: "Create Course",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Create Course" />
            <ProCard>
                <ProForm
                    onFinish={async (values) => {
                        console.log(values);
                        router.post(route("course.store"), values,
                        {
                            onSuccess: () => {
                                message.success("Course created successfully");
                                router.get(route("course.index"));
                            },
                            onError: () => {
                                message.error("Failed to create course");
                                router.get(route("course.index"));
                            },
                        })
                        ;

                    }}
                >
                    <ProForm.Group>
                        <ProFormText
                            name="name"
                            label="Course Name"
                            placeholder="Course Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        />

                        <ProFormDatePicker
                            name="start_date"
                            label="Start Date"
                            placeholder="Start Date"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            format="YYYY-MM-DD"
                        />

                        <ProFormDatePicker
                            name="end_date"
                            label="End Date"
                            placeholder="End Date"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            format="YYYY-MM-DD"
                        />

                        {/* <ProFormDateRangePicker // Use RangePicker for start and end dates
                            name={["start_date", "end_date"]}
                            label="Select Dates"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            dataFormat="YYYY-MM-DD"
                        /> */}
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}