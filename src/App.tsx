import { useState } from "react";

import YourInfo from "./components/YourInfo";
import SelectPlan from "./components/SelectPlan";
import AddOns from "./components/AddOns";
import Summary from "./components/Summary";
import Finish from "./components/Finish";

import { AddOn, InputItem, PlanItem } from "./types";

function App() {
  const [state, setState] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const [formData, setFormData] = useState({
    name: "",
    "email address": "",
    "phone number": "",
  });

  const [inputItems, setInputItems] = useState<InputItem[]>([
    { label: "name", placeholder: "e.g. Stephen King", isError: false },
    {
      label: "email address",
      placeholder: "e.g. stephenking@lorem.com",
      isError: false,
    },
    {
      label: "phone number",
      placeholder: "e.g. +1 234 567 890",
      isError: false,
    },
  ]);

  const [planItems, setPlanItems] = useState<PlanItem[]>([
    {
      icon: "/assets/images/icon-arcade.svg",
      plan: "Arcade",
      price: { mon: 9, yr: 90 },
      isSelected: false,
    },
    {
      icon: "/assets/images/icon-advanced.svg",
      plan: "Advanced",
      price: { mon: 12, yr: 120 },
      isSelected: false,
    },
    {
      icon: "/assets/images/icon-pro.svg",
      plan: "Pro",
      price: { mon: 15, yr: 150 },
      isSelected: false,
    },
  ]);

  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      name: "Online service",
      desc: "Access to multiplayer games",
      price: { mon: 1, yr: 10 },
      isSelected: false,
    },
    {
      name: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: { mon: 2, yr: 20 },
      isSelected: false,
    },
    {
      name: "Customizable Profile",
      desc: "Custom theme on your profile",
      price: { mon: 2, yr: 20 },
      isSelected: false,
    },
  ]);

  function getComponent() {
    switch (state) {
      case 1:
        return (
          <YourInfo
            inputItems={inputItems}
            handleInput={handleInput}
            formData={formData}
          />
        );
      case 2:
        return (
          <SelectPlan
            billing={billing}
            setBilling={setBilling}
            planItems={planItems}
            setPlanItems={setPlanItems}
          />
        );
      case 3:
        return (
          <AddOns billing={billing} addOns={addOns} setAddOns={setAddOns} />
        );
      case 4:
        return (
          <Summary billing={billing} planItems={planItems} addOns={addOns} />
        );
      case 5:
        return <Finish />;
      default:
        return <Finish />;
    }
  }

  const headerInfo = {
    1: {
      h1: "Personal info",
      h3: "Please provide your name, email address, and phone number.",
    },
    2: {
      h1: "Select your plan",
      h3: "You have the option of monthly or yearly billing.",
    },
    3: {
      h1: "Pick add-ons",
      h3: "Add-ons help enhance your gaming experience.",
    },
    4: {
      h1: "Finishing up",
      h3: "Double-check everything looks OK before confirming.",
    },
  };

  const menuItems = [
    { id: 1, heading: "your info" },
    { id: 2, heading: "select plan" },
    { id: 3, heading: "add-ons" },
    { id: 4, heading: "summary" },
  ];

  const handleNextState = () => {
    if (state === 1) {
      const updated = [...inputItems];

      Object.entries(formData).map(([key, value]) => {
        const index = updated.findIndex(({ label }) => label === key);
        if (value === "") {
          updated[index] = {
            ...updated[index],
            isError: true,
          };
        } else {
          updated[index] = {
            ...updated[index],
            isError: false,
          };
        }
      });

      setInputItems(updated);

      if (updated.length && updated.find(({ isError }) => isError)) {
        return;
      } else {
        setState((prev) => (prev + 1) as 2);
      }
    } else {
      setState((prev) =>
        prev === 5 ? prev : ((prev + 1) as 1 | 2 | 3 | 4 | 5)
      );
    }
  };
  const handlePrevState = () =>
    setState((prev) => (prev === 1 ? prev : ((prev - 1) as 1 | 2 | 3 | 4 | 5)));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="container">
      <aside className="sidebar">
        <ul>
          {menuItems.map((menu) => (
            <li key={menu.heading}>
              <span
                className={`icon ${
                  menu.id === state || (menu.id === 4 && state === 5)
                    ? "active"
                    : ""
                }`}
              >
                {menu.id}
              </span>
              <div>
                <span className="step">{`step ${menu.id}`}</span>
                <span className="head">{menu.heading}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        {state !== 5 && (
          <header>
            <h1>{headerInfo[state].h1}</h1>
            <h3>{headerInfo[state].h3}</h3>
          </header>
        )}
        {getComponent()}
        {state !== 5 && (
          <footer>
            <button
              className={state === 1 ? "hidden" : ""}
              onClick={handlePrevState}
            >
              Go back
            </button>
            <button
              className={state === 4 ? "finish" : ""}
              onClick={handleNextState}
            >
              {state !== 4 ? "Next Step" : "Confirm"}
            </button>
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;
