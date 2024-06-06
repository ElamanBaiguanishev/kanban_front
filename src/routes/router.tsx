import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "../pages/Error";
import HomePage from "../pages/home/HomePage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPageLayout from "../pages/task/DashboardPageLayout";
import DashboardIndex from "../pages/task/DashboardIndex";
import TaskAdminPage, { taskAction } from "../pages/task/TaskAdminPage";
import SaasPage from "../pages/task/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import Auth from "../pages/auth/Auth";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import TaskList, { taskLoader } from "../pages/task/TaskPage";
import PrivateMainChat, { privateChatLoader } from "../pages/chat/PrivateChat";
import ChatPage from "../pages/chat/ChatPage";
import Profile from "../pages/profile/Profile";
import ProfileSettings from "../pages/profile/ProfileSettings";
import CalendarComponent from "../pages/calendar/Calendar";
import Conference, { conferenceLoader } from "../pages/chat/Conference";
import CreateChatPage from "../pages/chat/CreateConference";
import EventDate from "../pages/event/EventDate";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'auth',
                element: <Auth />
            },
            {
                path: 'profile/:userId',
                element: <Profile />
            },
            {
                path: '/settings',
                element: <ProfileSettings />
            },
            {
                path: '/calendar',
                element: <CalendarComponent />
            },
            {
                path: "/task",
                element: <DashboardPageLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardIndex />,
                    },
                    {
                        path: "default",
                        element: <ProtectedRoute><TaskList /></ProtectedRoute>,
                        loader: taskLoader,
                    },
                    {
                        path: "admin",
                        element: <TaskAdminPage />,
                        action: taskAction,
                    },
                    {
                        path: "saas",
                        element: <SaasPage />,
                    }
                ]
            },
            {
                path: "/messanger",
                element: <ComponentPageLayout />,
                children: [
                    {
                        path: "chat",
                        element: <PrivateMainChat />,
                        loader: privateChatLoader,
                        children: [
                            {
                                path: ":chatId",
                                element: <ChatPage />
                            }
                        ]
                    },
                    {
                        path: "conference",
                        element: <Conference />,
                        loader: conferenceLoader,
                        children: [
                            {
                                path: "create",
                                element: <CreateChatPage />
                            },
                            {
                                path: ":chatId",
                                element: <ChatPage />
                            }
                        ]
                    }
                ]
            },
            {
                path: "/event/:date",
                element: <EventDate />
            }
        ]
    }
])