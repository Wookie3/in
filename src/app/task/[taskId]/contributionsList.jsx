import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Mytasklist({ tasks }) {
  const list = tasks.map((task) => (
    <div className="pt-4 hover:bg-orange-50">
      <div key={task.task_id} className="text-base font-semibold">
        <Link href="/tasks">{task.title}</Link>
      </div>
      <Separator className="mt-4" />
    </div>
  ));
  const no_list = <div> No Tasks </div>;
  return (
    <ScrollArea className="h-96">
      <div className="p-1">{tasks.length > 0 ? list : no_list}</div>
    </ScrollArea>
  );
}
