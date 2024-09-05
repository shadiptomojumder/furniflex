import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
} from "@radix-ui/react-icons";

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
];

export const statuses = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "inprogress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "failed",
        label: "Failed",
    },
];

export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: ArrowDownIcon,
    },
    {
        label: "Medium",
        value: "medium",
        icon: ArrowRightIcon,
    },
    {
        label: "High",
        value: "high",
        icon: ArrowUpIcon,
    },
];
