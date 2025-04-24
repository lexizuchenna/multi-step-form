export type InputItem = {
  label: string;
  placeholder: string;
  isError: boolean;
};
export type PlanItem = {
  icon: string;
  plan: string;
  price: { mon: number; yr: number };
  isSelected: boolean;
};

export type AddOn = {
  name: string;
  desc: string;
  price: { mon: number; yr: number };
  isSelected: boolean;
};

export interface YourInfoProps {
  inputItems: { label: string; placeholder: string; isError: boolean }[];
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
  formData: {
    name: string;
    "email address": string;
    "phone number": string;
  };
}

export interface SelectPlanProp {
  billing: "monthly" | "yearly";
  setBilling: React.Dispatch<React.SetStateAction<"monthly" | "yearly">>;
  planItems: PlanItem[];
  setPlanItems: React.Dispatch<React.SetStateAction<PlanItem[]>>;
}

export interface AddOnsProp {
  billing: "monthly" | "yearly";
  addOns: AddOn[];
  setAddOns: React.Dispatch<React.SetStateAction<AddOn[]>>;
}

export interface SummaryProp {
  billing: "monthly" | "yearly";
  planItems: PlanItem[];
  addOns: AddOn[];
}
