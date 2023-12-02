/* -- Dashboard Page - Server-Side -- */


import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//import { cn } from "@/lib/utils"

import Dashboard_clientside from "./dashboard_client.jsx";

import CreateRabbitholeForm from './createrabbithole.jsx';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

//Collects list of rabbitholes from database
const getRabbitholes = async (supabase) => {

    const { data: rabbitholes, error: rabbitholeError } = await supabase
        .from('Rabbit-hole')
        .select(`rabbithole_id, group_name, description, Membership(count)`)
        .eq('is_active', true)

    if (rabbitholeError) {
        console.error(rabbitholeError)
    }

    if (rabbitholes) {
        return rabbitholes
    }
}


//Dashboard Server-Side
const Dashboard = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const initialRabbitholes = await getRabbitholes(supabase);




    return (

        <>
            <Dashboard_clientside user={user} initialRabbitholes={initialRabbitholes}/>
        </>
        
    )
};
export default Dashboard;


{/* <div>
<h1>Dashboard</h1>
<p>All the Rabbit Holes that you belong to here.</p>
<Link href="/rabbitHole/42">
    RabbitHole
</Link>
</div> 
            <div className="grid gap-2">
                <Input id="email" type="email" placeholder="m@example.com" />
            </div>

*/}

{/* <>
<div>

    <div>
    <h1 className="text-3xl font-bold tracking-tight m-5">Hi, {user.email} </h1>
    </div>


    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 m-5">
        

    <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Carrot Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>

    <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Join A Rabbit Hole</CardTitle>
          </CardHeader>
          <CardContent className="w-3/4 pl-4">
            <Input placeholder="Search" />
          </CardContent>
    </Card>

    <Card className="col-span-2">
          <CardHeader>
            <CardTitle>My Communities</CardTitle>
          </CardHeader>
          <CardContent className="w-3/4 pl-4">
            <p>Admin</p>
            <p>Member</p>
          </CardContent>
    </Card>



    </div>

   


</div>
</> */}


{/* <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 items-center m-5">

                <h1 className="text-3xl font-bold tracking-tight col-span-4">Hi, {user.email} </h1>

                <Card className="w-64 h-28 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            My Carrot Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$ 45,231.89</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="Rabbit-Hole" className="space-y-4 m-5">
                <TabsList className="">
                    <TabsTrigger value="Rabbit-Hole">Rabbit-Hole View</TabsTrigger>
                    <TabsTrigger value="Tasks">My Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="Rabbit-Hole" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        <Card className="col-span-4">
                            <CardHeader className="flex flex-row justify-between items-center ">
                                <CardTitle>Join A Rabbit Hole</CardTitle>

                                <CreateRabbitholeForm />
                            </CardHeader>

                            <CardContent className="h-96">
                                <Input placeholder="Search" className="w-3/4 pl-4" />

                                {rabbithole()}
                            </CardContent>
                        </Card>

                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>My Communities</CardTitle>
                            </CardHeader>

                            <CardContent className="pl-4">
                                <p>Admin</p>
                                <p>Member</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="Tasks" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Proposals</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <p>Proposals</p>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Prioritizations</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <p>Prioritizations</p>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Contributions</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <p>Contributions</p>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Validations</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <p>Validations</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

        </> */}