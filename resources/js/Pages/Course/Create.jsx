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
                        const { name} = values;
                        // check if course already exists
                        const existingCourse = courses.find((course) => course.name === name);
                        if (existingCourse) {
                            message.error("Course already exists");
                            return;
                        }

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
                                {
                                    //should be greater than today 
                                    validator: (_, value) => {
                                        if (value < new Date()) {
                                            return Promise.reject("Start date should be greater than today");
                                        }
                                        return Promise.resolve();

                                    }
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
                                {
                                    //should be greater than start date
                                    validator: (_, value) => {
                                        if (value < new Date()) {
                                            return Promise.reject("End date should be greater than start date");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            format="YYYY-MM-DD"
                        />

                       
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
