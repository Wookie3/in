"use client"

import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCopy, View, Carrot } from "lucide-react";


export const columns = [
  {
    accessorKey: "title",
    header: "Title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Deadline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      const formatted = new Date(deadline).toDateString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "effort",
    header: "Effort",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-right">Effort</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Time in hours</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const effort = row.getValue("effort");
      return <div className="text-right font-medium">{effort}</div>;
    },
  },
  {
    accessorKey: "Profile",
    header: "Proposer",
    header: () => <div className="text-center">Proposer</div>,
    cell: ({ row }) => {
      const profile = row.getValue("Profile");
      return <div className="text-right font-medium">{profile.username}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "rewards",
    header: "Rewards",
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-left">
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  <Carrot />
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rewards</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const rewards = parseFloat(row.getValue("rewards"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal",
        // style: "currency",
        // currency: "USD",
      }).format(rewards);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "view",
    cell: ({ row }) => {
      const proposal = row.original;
      const taskLink = `/taskview/${proposal.proposal_id}`;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={taskLink}>
              <Button
                className="p-2"
                variant="ghost"
                // onClick={() => router.push(taskLink)}
              >
                <View />
              </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <div>View proposal</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "copy",
    cell: ({ row }) => {
      const proposal = row.original;
      return (
        <div className="">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="p-2"
                variant="ghost"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `Title: ${proposal.title},
Description: ${proposal.description},
ID: ${proposal.proposal_id},
Reward: ${proposal.rewards},
Status: ${proposal.status},
Deadline: ${proposal.deadline},
Effort: ${proposal.effort}`
                  )
                }
              >
                <ClipboardCopy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>Copy to clipboard</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
      );
    },
  },
];
