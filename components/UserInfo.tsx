//Server component

import { ExtendedUser } from "@/next-auth";
import { CardHeader, Card, CardContent } from "./ui/card";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
};

export const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    console.log(user)
    return(
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                {label}
                </p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm fort-medium">ID</p>
                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm fort-medium">Name</p>
                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm fort-medium">Email </p>
                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm fort-medium">Role</p>
                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm fort-medium">Two Factor Authentication</p>
                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}