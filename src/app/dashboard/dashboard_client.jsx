/* Client Side for Dashboard Page*/

'use client'

import { useState, useEffect, useCallback } from 'react';

import CreateRabbitholeForm from './createrabbithole.jsx';
import Rabbitholelist from './rabbitholelist.jsx';
import Memberlist from './memberlist.jsx';
import Mytasklist from './mytasklist.jsx';
import Searchbar from './searchbar.jsx';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
  
/* import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"


import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator" */


const testdata1 = [
    {
        Name: 'fff 1',
        Descript: "df",
        members: 3
    },
    {
        Name: 'ddd 2',
        Descript: "dfdfdfassfeeeeeeeeeeeeedd",
        members: 15
    },
    {
        Name: 'fdfdfdasf 3',
        Descript: "dfdfdfassfsa",
        members: 23
    },
    {
        Name: 'fddafd 4',
        Descript: "dfdfdfassfsa",
        members: 34
    },
    {
        Name: 'feedfas 5',
        Descript: "dfdfdfassfsadddddddddddddddddddddddddd",
        members: 1
    }

]

const testdata2 = [

]


const members = [
    {
        membership_id: 1,
        username: 'rb 1'
    },
    {
        membership_id: 2,
        username: 'rb 2'
    },
    {
        membership_id: 3,
        username: 'rb 3'
    },
    {
        membership_id: 4,
        username: 'rb 4'
    },
    {
        membership_id: 5,
        username: 'rb 5'
    }
]

const no_members = [
    
]

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



const Dashboard_clientside = ({user}) => {
    const supabase = createClientComponentClient()
    const [filter_rabbitholes, setfilter_rabbitholes] = useState(testdata1);
    const [username, setusername] = useState(null);

    const getProfile = useCallback(async (user) => {
            const { data: profileData, error: profileError } = await supabase
            .from('Profile')
            .select('*')
            .eq('user_id', user.id)
            .single()
    
            if (profileError) {
                console.error(profileError)
            }

            if (profileData) {
                setusername(profileData.username)
              }  
    }, []);

    useEffect(() => {
        getProfile(user, setusername())
      }, [user, getProfile])

    return(
        <>

            {/* My Carrot Block Component */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 items-center m-5">

                <h1 className="text-3xl font-bold tracking-tight col-span-4">Hi, {username} </h1>

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


            {/* Tab Component - 'Rabbit-Hole View' & 'My Tasks' */}
            <Tabs defaultValue="Rabbit-Hole" className="space-y-4 m-5">
                <TabsList className="">
                    <TabsTrigger value="Rabbit-Hole">Rabbit-Hole View</TabsTrigger>
                    <TabsTrigger value="Tasks">My Tasks</TabsTrigger>
                </TabsList>

                {/* Tab - 'Rabbit-Hole View' */}
                <TabsContent value="Rabbit-Hole" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        <Card className="col-span-4">
                            <CardHeader className="flex flex-row justify-between items-center ">
                                <CardTitle>Join A Rabbit Hole</CardTitle>

                                <CreateRabbitholeForm />
                            </CardHeader>

                            <CardContent className="h-96">
                                {/* <Input placeholder="Search" className="w-3/4 pl-4" /> */}

                                {/* {rabbitholelist(testdata2)} */}

                                <Searchbar rabbitholes={testdata1} setfilter_rabbitholes={setfilter_rabbitholes} />
                                <Rabbitholelist testdata={filter_rabbitholes} />
                            </CardContent>
                        </Card>

                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>My Communities</CardTitle>
                            </CardHeader>

                            <CardContent className="pl-4">
                                <h2 className="text-lg italic tracking-tight col-span-4 mb-1"> Admin </h2>
                                <Memberlist members={members}/>
                                
                                <h2 className="text-lg italic tracking-tight col-span-4 my-4 mb-1"> Member </h2>
                                <Memberlist members={no_members}/>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Tab - 'My Tasks' */}
                <TabsContent value="Tasks" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                        <Card className="col-span-1">
                            <CardHeader>
                            <CardTitle>My Proposals</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <Mytasklist tasks={tasks}/> 
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Prioritizations</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <Mytasklist tasks={tasks}/> 
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Contributions</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <Mytasklist tasks={tasks}/> 
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>My Validations</CardTitle>
                            </CardHeader>

                            <CardContent className="h-96">
                                <Mytasklist tasks={tasks}/> 
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

        </>
    );
}

export default Dashboard_clientside;





{/* <Card className="col-span-1">
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
</Card> */}