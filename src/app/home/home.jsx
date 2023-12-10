import React, { useMemo } from "react";
import Link from 'next/link';
import ButtonPrimary from "./ButtonPrimary";
import Image from 'next/image'

const features = [
    "Powerfull online protection.",
    "Internet without borders.",
    "Supercharged VPN",
    "No specific time limits."
  ]

  const carrot = require('./carrot.png').default;
const Main = ({
  listUser = [
    {
      name: "Users",
      number: "390",
      icon: "/assets/Icon/heroicons_sm-user.svg",
    },
    {
      name: "Locations",
      number: "20",
      icon: "/assets/Icon/gridicons_location.svg",
    },
    {
      name: "Server",
      number: "50",
      icon: "/assets/Icon/bx_bxs-server.svg",
    },
  ],
}) => {
 

  return (
    <div className="max-w-screen-xl mt- px-8 xl:px-23 mx-auto" id="about">
      
        <div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
         
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              <strong>Incented Protocol</strong> - Empowering Communities and DAOs.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
            A user-friendly platform for effortless task coordination and incentivization. Users can suggest, prioritize, and actively participate, earning equitable rewards. Tailored roles for community members, administrators, and super administrators guarantee streamlined fund allocation across diverse communities.             </p>
            <Link href='/signup'> <ButtonPrimary>Get Started</ButtonPrimary> </Link>
          </div>
          <div className="flex w-full" style={{ placeContent: 'center' }}>
            <div >
              <Image 
                src={carrot}
                alt="Carrot in the office"
                quality={100}
                width={312}
                className="mx-auto"
               
              /> 
            </div>
          </div>
        </div>
    
      <div>
      <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            We Provide Many Features You Can Use
          </h3>
          <p className="my-2 text-black-500">
            You can explore the features that we provide with fun and have their
            own functions each feature.
          </p>
         
          <ul className="text-black-500 self-start list-inside ml-8">
  {/* User Registration and Onboarding */}
  <div
    key="registration-onboarding"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ User Registration and Onboarding</li>
  </div>

  {/* Dashboard */}
  <div
    key="dashboard"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Dashboard</li>
  </div>

  {/* Task Management */}
  <div
    key="task-management"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Task Management</li>
  </div>

  {/* Task Review and Approval */}
  <div
    key="task-review-approval"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Task Review and Approval</li>
  </div>

  {/* Reward System Display */}
  <div
    key="reward-system-display"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Reward System Display</li>
  </div>

  {/* Wallet Management */}
  <div
    key="wallet-management"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Wallet Management</li>
  </div>

  {/* Treasury Overview */}
  <div
    key="treasury-overview"
    className="relative circle-check custom-list"
    whilehover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    }}
  >
    <li>✓ Treasury Overview</li>
  </div>

  {/* Staking Interface */}
 
</ul><br></br>
</div>
    </div>
  );
};

export default Main;