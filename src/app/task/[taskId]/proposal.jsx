import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area"
import Mytasklist from "./contributionsList";

const tasks = [
  {
      task_id: 1,
      title: 'Task 1'
  },
  {
      task_id: 2,
      title: 'Task 2'
  },
  {
      task_id: 3,
      title: 'Task 3'
  },
  {
      task_id: 4,
      title: 'Task 4'
  },
  {
      task_id: 5,
      title: 'Task 5'
  },
  {
      task_id: 5,
      title: 'Task 5'
  },
  {
      task_id: 5,
      title: 'Task 5'
  },
  {
      task_id: 5,
      title: 'Task 5'
  },
]

const Proposal = () => {
  return (
    <div>
      <h1>Proposal title</h1>
      <p>Proposal description</p>
      <p>Accordion with a scollable box inside for contributions list</p>
      <Accordion type="single" collapsible className='w-auto py-2 px-16'>
        <AccordionItem value="contributions">
          <AccordionTrigger className='rounded-lg border-4'>Contributions</AccordionTrigger>
          <AccordionContent>
          <ScrollArea className="h-[400px] w-fit rounded-md border p-4">
            <Mytasklist tasks={tasks} />
  Jokester began sneaking into the castle in the middle of the night and leaving
  jokes all over the place: under the king's pillow, in his soup, even in the
  royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
  then, one day, the people of the kingdom discovered that the jokes left by
  Jokester were so funny that they couldn't help but laugh. And once they
  started laughing, they couldn't stop.



  Jokester began sneaking into the castle in the middle of the night and leaving
  jokes all over the place: under the king's pillow, in his soup, even in the
  royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
  then, one day, the people of the kingdom discovered that the jokes left by
  Jokester were so funny that they couldn't help but laugh. And once they
  started laughing, they couldn't stop.
</ScrollArea>

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default Proposal;