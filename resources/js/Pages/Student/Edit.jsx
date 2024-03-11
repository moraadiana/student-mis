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
export default function Edit({ student, courses}) {
    console.log(student);
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
                        router.put(route("student.update", student.id), values,{
                            onSuccess: () => {
                                message.success("Student updated successfully");
                                router.get(route("student.index"));
                            },
                            onError: () => {
                                message.error("Failed to update student");
                                router.get(route("student.index"));
                            },
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

                        <ProFormDatePicker
                            width="sm"
                            name="dob"
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            rules={[
                                {
                                    required: true,
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
                             initialValue={student.course_id}
                          


                          
                        />
                    </ProForm.Group>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}
