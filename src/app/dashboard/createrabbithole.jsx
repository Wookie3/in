/* Form for Creating a New Rabbit Hole */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CreateRabbitholeForm() {

    return (
      <Dialog>
        
        <DialogTrigger asChild>
          <Button variant="outline">+ Create Rabbit-Hole</Button>
        </DialogTrigger>
        
        <DialogContent className="md:max-w-[640px] max-h-80%">
          
          <DialogHeader>
            <DialogTitle>Create Rabbit-Hole</DialogTitle>
            <DialogDescription>
              Enter info to setup a new rabbit hole. Click Submit when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="Name">Name</Label>
              <Input id="name" placeholder="Title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="Description">Description</Label>
              <Input id="description" />
            </div>

            <div className="grid gap-2 grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="Description" className="">Prioritization Reward </Label>
                <Input id="priort_reward" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Description">Validation Reward </Label>
                <Input id="val_reward" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Description">Protocol Fee </Label>
                <Input id="proto_fee" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        
        </DialogContent>
      </Dialog>
    );
}