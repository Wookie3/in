"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import submitToDB from "./submitToDB";
import { DatePicker } from "./datePicker";


const ProposalForm = ({user, rabbitHoleId}) => {
  const [state, setState] = useState({
    create_at: "",
    update_at: "",
    description: "",
    deadline: "",
    rewards: "",
    rabbithole_id: rabbitHoleId,
    title: "",
    user_id: user.id,
    effort: "",
    status: "pending",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };
  const handleDeadlineChange = (newDate) => {
    setState((prevProps) => ({
      ...prevProps,
      deadline: newDate,
    }))
  };
  const validateForm = () => { // TODO: add unique validations for each input as needed
    let formIsValid = true;
    let errors = [];
    if (!state.title) {
      formIsValid = false;
      errors.push("Please enter a title.");
    }
    if (!state.description) {
      formIsValid = false;
      errors.push("Please enter a description.");
    }
    if (!state.deadline) {
      formIsValid = false;
      errors.push("Please enter a deadline.");
    }
    if (!state.effort) {
      formIsValid = false;
      errors.push("Please enter an effort.");
    }
    if (!state.rewards) {
      formIsValid = false;
      errors.push("Please enter a reward.");
    }
    if (!state.rabbithole_id) {
      formIsValid = false;
      errors.push("Please enter a rabbithole id.");
    }
    if (!state.user_id) {
      formIsValid = false;
      errors.push("Please enter a user id.");
    }
    if (errors.length > 0) {
    console.log('Form Validation ERROR: ', errors);
    }
    return formIsValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    state.create_at = new Date().toJSON();
    state.update_at = new Date().toJSON();
    state.create_at = state.create_at.replace('T', ' ').replace('.','+00').slice(0, 22); // convert date format to postgres format
    state.update_at = state.update_at.replace('T', ' ').replace('.','+00').slice(0, 22);
    state.deadline = (state.deadline ? new Date(state.deadline).toJSON().replace('T', ' ').replace('.','+00').slice(0, 22) : state.deadline);
        
    // const placeholderState = {
    //   create_at: '2023-11-27T04:51:32+00:00',
    //   update_at: '2023-11-27T04:51:35+00:00',
    //   description: 'Make a navbar component for a blogging website.',
    //   deadline: '2023-12-17T05:51:57+00:00',
    //   rewards: 30,
    //   rabbithole_id: 1,
    //   title: 'Navbar Component',
    //   user_id: '44a1e83e-aea0-4919-90b2-5b8d42499262',
    //   effort: 30
    // };
    // convert date format to postgres format
    // created = created.replace('T', ' ').replace('.','+00').slice(0, 22);
    // updated = updated.replace('T', ' ').replace('.','+00').slice(0, 22);
    //appy to state
    // setState((prevProps) => ({
    //   ...prevProps,
    //   create_at: created,
    //   update_at: updated
    // }));
    
    if (validateForm()) {
      console.log('Form Validated');
      submitToDB(state);
      alert("Form submitted");
    };
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={state.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <Label>Description</Label>
          <Textarea
            placeholder="Type your description here."
            type="text"
            name="description"
            value={state.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="form-control">
            <Label>Deadline</Label>
            <div>
            <DatePicker 
            name="deadline"
            onDateChange={handleDeadlineChange}
            />
            </div>
          </div>
          <div className="form-control">
            <Label>Effort</Label>
            <Input
              type="number"
              name="effort"
              placeholder="Enter effort (hours)"
              value={state.effort}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <Label>Reward</Label>
            <Input
              type="number"
              name="rewards"
              placeholder="Enter rewards (Carrots)"
              value={state.reward}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <Button
          type="submit">Submit Proposal</Button>
        </div>
      </form>
    </div>
  );
};
export default ProposalForm;
