import { Link, usePage } from "@inertiajs/react";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import {
    LogoutOutlined,
    DashboardFilled,
    FileDoneOutlined,
    CheckSquareOutlined,
    DatabaseOutlined,
} from "@ant-design/icons";
import { message } from "antd";

//import bulkstreamlogo from "../assets/bulkstream-logo-small.png";
export default function Authenticated({ children }) {
    const { flash, auth } = usePage().props;
    {
        const { flash, auth } = usePage().props;
        if (flash) {
            flash.success
                ? message.success(flash.success)
                : flash.error
                ? message.error(flash.error)
                : null;
        }
    }
    const user = auth.user;
    return (
        <ProLayout
            layout="mix"
            title=" Student Management Portal"
            // logo={bulkstreamlogo}
            avatarProps={{
                src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
                size: "small",
                title: user?.email,

                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        icon: <LogoutOutlined />,
                                        label: (
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                            >
                                                Logout
                                            </Link>
                                        ),
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            menuDataRender={() => [
                {
                    path: route("dashboard"),
                    name: "Dashboard",
                    icon: <DashboardFilled />,
                },

                {
                    path: route("students.index"),
                    name: "Students",
                    icon: <FileDoneOutlined />,
                },
                {
                    path: "/courses",
                    name: "Courses",
                    icon: <CheckSquareOutlined />,
                    children: [
                        {
                            path: route("courses.index"),
                            name: "All Courses ",
                        },
                        {
                            path: route("enrollments.index"),
                            name: "Course Enrollments ",
                            hideInMenu: user.role_id === 2,
                        },
                    ],
                },
                {
                    path: "/admin",
                    name: "Administration",
                    icon: <DatabaseOutlined />,
                    // hideInMenu: user.role_id === 2,
                    // visible for admin only

                    hideInMenu: user.role_id === 2,

                    children: [
                        {
                            path: route("users.index"),
                            name: "User Accounts",
                        },
                    ],
                },
            ]}
            menuItemRender={(item, dom) => <Link href={item.path}>{dom}</Link>}
        >
            {children}
        </ProLayout>
    );
}
