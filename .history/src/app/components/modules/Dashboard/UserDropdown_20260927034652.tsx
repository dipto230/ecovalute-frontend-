
import { UserInfo } from "@/src/types/user.types";

import { Key, LogOut, User } from "lucide-react";

import Link from "next/link";

import { Button } from "../../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          />
        }
      >
        <span className="text-sm font-semibold">
          {userInfo.name.charAt(0).toUpperCase()}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {userInfo.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {userInfo.email}
            </p>

            <p className="text-xs text-primary capitalize">
              {userInfo.role
                .toLowerCase()
                .replace("_", " ")}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={
            <Link href="/my-profile">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link href="/change-password">
              <Key className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </Link>
          }
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {}}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

