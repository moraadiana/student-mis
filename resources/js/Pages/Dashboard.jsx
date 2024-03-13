import { ProCard, ProTable, StatisticCard } from "@ant-design/pro-components";
import { Head, router, Link } from "@inertiajs/react";
import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Statistic } = StatisticCard;
export default function Dashboard({
    auth,
    totalStudentsCount,
    totalCoursesCount,
    enrolledCourses,
    allStudents,
    allCourses,
    allEnrollments,
    
}) {
  console.log(allEnrollments);
    return (
        <>
            <Head title="Dashboard" />
            {auth.user.role_id === 2 &&(
            <ProCard 
            title={`Hi ${auth.user.email}`}
            subTitle="Welcome to your Dashboard"
            headerBordered
            style={{ width: "100%" }}
            />
            )}

  {auth.user.role_id === 1 &&(
            <ProCard
                title={`Hi ${auth.user.email}`}
                subTitle="Welcome to your Dashboard"
                headerBordered
                style={{ width: "100%" }}
                
              
                tabs={{
                    items: [
                        {
                            key: "1",
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="All Students"
                                    value={totalStudentsCount}
                                    total:true
                                    style={{
                                        width: 120,
                                        borderInlineEnd: "1px solid #f0f0f0",
                                    }}
                                />
                            ),
                            children: (
                                <ProTable
                                    size="small"
                                    dataSource={allStudents}
                                    columns={[
                                        {
                                            title: "Student ID",
                                            dataIndex: "id",
                                        },
                                        {
                                            title: "First Name",
                                            dataIndex: "fname",
                                        },
                                        {
                                            title: "Last Name",
                                            dataIndex: "lname",
                                        },
                                        {
                                            title: " Home Address",
                                            dataIndex: "address",
                                        },
                                        {
                                            title: "Email",
                                            dataIndex: ["user", "email"],
                                        },
                                        {
                                            title: "Contact",
                                            dataIndex: "contact",
                                        },
                                        {
                                            title: "Date of Birth",
                                            dataIndex: "dob",
                                        },
                                        {
                                            title: "Gender",
                                            dataIndex: "gender",
                                        },

                                        {
                                            title: "Action",
                                            hideInSearch: true,
                                            render: (_, record) => (
                                                <Link
                                                    href={route(
                                                        "student.edit",
                                                        record?.id
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            ),
                                        },
                                    ]}
                                    scroll={{
                                        x: true,
                                    }}
                                    ghost
                                    options={false}
                                    pagination={false}
                                    search={false}
                                />
                            ),
                        },
                        {
                            key: "2",
                            
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="All Courses"
                                    value={totalCoursesCount}
                                    total:true
                                    style={{
                                        width: 120,
                                        borderInlineEnd: "1px solid #f0f0f0",
                                    }}
                                />
                            ),
                            children: (
                              <ProTable
                              size="small"
                              dataSource={allCourses}
                              columns={
                                [
                                    {
                                        title: "Course ID",
                                        dataIndex: "id",
                                    },
                                    {
                                        title: "Course Name",
                                        dataIndex: "name",
                                    },
                                    {
                                        title: "Course Description",
                                        dataIndex: "description",
                                    },
                                    {
                                        title: "Action",
                                        hideInSearch: true,
                                        render: (_, record) => (
                                            <Link
                                                href={route(
                                                    "course.edit",
                                                    record?.id
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        ),

                              }
                                  ]}
                               
                               scroll={{
                                x: true,
                            }}
                            ghost
                            options={false}
                            pagination={false}
                            search={false}
                                
                              />

                            )
                        },

                        {
                            key: "3",
                            label: (
                              <Statistic
                                  layout="vertical"
                                  title="Course Enrollments"
                                  value={enrolledCourses}
                                  total:true
                                  style={{
                                      width: 120,
                                      borderInlineEnd: "1px solid #f0f0f0",
                                  }}
                              />
                          ),
                            children: (
                              <ProTable
                              size="small"
                              dataSource={allCourses}
                              
                                  columns={[
                           
                                    {
                                        title: "Course ID",
                                        dataIndex: "id",
                                    },
                                    {
                                        title: "Course Name",
                                        dataIndex: "name",
                                    },
                                    {
                                        title: "start Date",
                                        dataIndex: "start_date",
        
                                    },
                                    {
                                        title: "end Date",
                                        dataIndex: "end_date",
                                    },
        
                                   
                                ]}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <ProTable
                                            
                                            dataSource={record.students}
                                            columns={[
                                                {
                                                    title: "Student",
                                                     // join fname and lname of student
                                                     dataIndex: "fname", 
                                                     render: (_, record) => `${record.fname} ${record.lname}`,
        
        
                                                    
                                                },
                                                {
                                                title: "Action",
                                                hideInSearch: true,
                                                render: (_, record) => (
                                                    <Link
                                                        href={route(
                                                            "student.edit",
                                                            record?.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                ),
                                            },
                                            ]}
                                            rowKey="id"
                                            search={false}
                                            pagination={false}
                                            options={false}
                                            bordered
                                        />
                                    ),
                                }}
                                // Pagination, rowKey, and other settings...
                               
                                rowKey="id"
                                search={false}
                              />
                            )
                        },
                    ],
                }}

            />
  )}
        </>
    );
}
