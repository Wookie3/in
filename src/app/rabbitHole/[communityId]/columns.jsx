"use client";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


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
    header: () => <div className="text-right">Effort</div>,
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
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rewards
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
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
    id: "actions",
    cell: ({ row }) => {
      const proposal = row.original;
      const link = `/taskview/${proposal.proposal_id}`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Options</DropdownMenuLabel> */}
            <DropdownMenuItem>
              <Link href={link}>View proposal details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem variant="distructive" onClick={() => handleDeleteProposal(proposal.proposal_id)}>
              Delete Proposal
            </DropdownMenuItem> */}
            <DropdownMenuItem
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
              Copy to clipboard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
