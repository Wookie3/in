/* Scrolling list used for 'My Proposals', 'My Prioritizations', 'My Contributions', 'My Validations' Page Components */


import Link from 'next/link'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

//className="my-4"

//{`/rabbitHole/${rabbitholeid}`}
//Link href={`/task/${rabbitholeid}`}


const proposals = (task) => {

    const taskid = task.proposal_id;

    return(
        <div key={taskid} className='pt-4 hover:bg-orange-50'>
            <div className="text-base font-semibold">
                <Link href={`/taskview/${taskid}`}>{task.title}</Link>
            </div>
        
            <Separator className="mt-4"/>
        </div>
    );
}


const contributions = (task) => {

    const taskid = task.contribution_id;

    return(
        <div key={taskid} className='pt-4 hover:bg-orange-50'>
            <div className="text-base font-semibold">
                <Link href={`/contributionview/${taskid}`}>{task.title}</Link>
            </div>
        
            <Separator className="mt-4"/>
        </div>
    );
}

const validations = (task) => {

    const taskid = task.Contribution.contribution_id;

    return(
        <div key={taskid} className='pt-4 hover:bg-orange-50'>
            <div className="text-base font-semibold">
                <Link href={`/contributionview/${taskid}`}>{task.Contribution.title}</Link>
            </div>
        
            <Separator className="mt-4"/>
        </div>
    );
}

const prioritizations = (task) => {

    const taskid = task.Proposal.proposal_id;

    return(
        <div key={taskid} className='pt-4 hover:bg-orange-50'>
            <div className="text-base font-semibold">
                <Link href={`/taskview/${taskid}`}>{task.Proposal.title}</Link>
            </div>
        
            <Separator className="mt-4"/>
        </div>
    );
}

export default function Mytasklist( {tasks} ) {

    //const taskid = tasks.proposal_id;

    // const list = tasks.map((task) => (
    //     <div className='pt-4 hover:bg-orange-50'>
    //         <div key={taskid} className="text-base font-semibold">
    //             <Link href={`/taskview/${taskid}`}>{task.title}</Link>
    //         </div>
        
    //         <Separator className="mt-4"/>
    //     </div>
    // ));

    const list = tasks.map((task) => {

        let listtype;
        
        if (task.hasOwnProperty('proposal_id')) {
            listtype = proposals(task);
        }
        else if (task.hasOwnProperty('contribution_id')) {
            listtype = contributions(task);
        }
        else if (task.hasOwnProperty('validation_id')) {
            listtype = validations(task);
        }
        else if (task.hasOwnProperty('prioritization_id')) {
            listtype = prioritizations(task);
        }
        else {
            listtype = null;
        }

        return listtype;
    });

    const no_list = <div> No Tasks </div>;

    return (

        <ScrollArea className="h-96">
            <div className="p-1">
                {tasks.length > 0 ? list : no_list}
            </div>
        </ScrollArea>

    );
}
