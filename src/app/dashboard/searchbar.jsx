/* Create search bar component as seen in 'Join a Rabbit-Hole' Page Component*/


import { Input } from "@/components/ui/input"

export default function Searchbar(searchprops) {

    const inputsearch = (event) => {
        const input = event.target.value.toLowerCase();
        const new_listing = searchprops.rabbitholes.filter(rh => rh.group_name.toLowerCase().includes(input));
        searchprops.setfilter_rabbitholes(new_listing);
    }

    return(
        <>
            <Input placeholder="Search" className="w-3/4 pl-4" onChange={inputsearch} />
        </>
    );
}
