"use client";

import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { createElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatsCardProps {
title: string;
value: string | number;
iconName: string;
description?: string;
className?: string;
}

const StatsCard = ({
title,
value,
iconName,
description,
className,
}: StatsCardProps) => {
return (
<Card
className={cn(
"group relative isolate overflow-hidden rounded-2xl border border-border/60",
"bg-card shadow-sm",
"transition-all duration-300 ease-out",
"hover:-translate-y-1 hover:border-emerald-500/30",
"hover:shadow-xl hover:shadow-emerald-950/[0.04]",
"dark:hover:shadow-emerald-950/20",
className
)}
>
{/* Subtle decorative accent */} <div
             className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent transition-transform duration-300 group-hover:scale-x-100"
             aria-hidden="true"
         />

```
        {/* Soft background glow */}
        <div
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/[0.04] blur-2xl transition-all duration-500 group-hover:bg-emerald-500/[0.10]"
            aria-hidden="true"
        />

        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {title}
            </CardTitle>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.08] text-emerald-600 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.14] dark:text-emerald-400">
                {createElement(getIconComponent(iconName), {
                    className: "h-5 w-5",
                    "aria-hidden": true,
                })}
            </div>
        </CardHeader>

        <CardContent className="relative space-y-2">
            <div className="break-words text-3xl font-bold tracking-tight text-foreground tabular-nums transition-colors duration-300">
                {value}
            </div>

            {description && (
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                </p>
            )}

            {/* Minimal bottom accent */}
            <div
                className="h-1 w-8 rounded-full bg-emerald-500/20 transition-all duration-300 group-hover:w-14 group-hover:bg-emerald-500/50"
                aria-hidden="true"
            />
        </CardContent>
    </Card>
);
```

};

export default StatsCard;
