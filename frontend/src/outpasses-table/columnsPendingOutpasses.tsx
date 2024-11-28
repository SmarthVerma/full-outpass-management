/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ColumnHostel = {
    id: string
    name: string
    email: string
    dateFrom: string
    dateTo: string
    hostelName: string
    hostelRoom: string
    status: string
    createdTime: string
}

// Define your columns
export const columnsPeningOutpasses: ColumnDef<ColumnHostel>[] = [
    {
        accessorKey: "dateFrom",
        header: "Date From",
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: "dateTo",
        header: "Date To",
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: "hostelName",
        header: "Hostel Name",
    },
    {
        accessorKey: "hostelRoom",
        header: "Hostel Room",
    },
    {
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "createdTime",
        header: ({ column }: { column: any }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created On
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => new Date(getValue() as string).toLocaleString(),
    },
]