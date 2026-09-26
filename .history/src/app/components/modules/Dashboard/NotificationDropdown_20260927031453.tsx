"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    user_id: "user-1",
    title: "New Product Order",
    message:
      "A new order has been placed for your product. Please check the order details.",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },

  {
    id: "2",
    user_id: "user-1",
    title: "Order Status Updated",
    message:
      "Your order status has been updated. Please check your order details.",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },

  {
    id: "3",
    user_id: "user-1",
    title: "System Notification",
    message:
      "The system will undergo scheduled maintenance. Some services may be temporarily unavailable.",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },

  {
    id: "4",
    user_id: "user-1",
    title: "New User Registered",
    message:
      "A new user has registered on the platform.",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

const NotificationDropdown = () => {
  const unreadCount = MOCK_NOTIFICATIONS.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
              variant="destructive"
            >
              <span className="text-[10px]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>

          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-2"
            >
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <ScrollArea className="h-75">
          {MOCK_NOTIFICATIONS.length > 0 ? (
            MOCK_NOTIFICATIONS.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer flex-col items-start gap-2 p-3"
              >
                <div className="flex w-full items-start gap-3">
                  {/* Notification Icon */}
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      notification.is_read
                        ? "bg-muted"
                        : "bg-primary/10"
                    }`}
                  >
                    <Bell
                      className={`h-4 w-4 ${
                        notification.is_read
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                    />
                  </div>

                  {/* Notification Content */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {notification.title}
                      </p>

                      {!notification.is_read && (
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {notification.message}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.created_at, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer justify-center text-center">
          View All Notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;