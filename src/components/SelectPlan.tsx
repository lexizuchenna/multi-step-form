import { SelectPlanProp } from "../types";

function SelectPlan({
  billing,
  setBilling,
  planItems,
  setPlanItems,
}: SelectPlanProp) {
  const handleBilling = () => {
    setBilling((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  const handlePlanItem = (plan: string) => {
    setPlanItems((prev) => {
      const updated = [...prev];
      const index = prev.findIndex((item) => item.plan === plan);

      if (index !== -1) {
        for (let i = 0; i < prev.length; i++) {
          updated[i] = { ...updated[i], isSelected: false };
        }

        updated[index] = { ...updated[index], isSelected: true };
      }

      return updated;
    });
  };

  return (
    <div>
      <div className="plans">
        {planItems.map(({ icon, plan, price, isSelected }) => (
          <div
            className={`plan ${isSelected && "active"}`}
            key={plan}
            onClick={() => handlePlanItem(plan)}
          >
            <div className="icon">
              <img src={icon} alt={plan} />
            </div>
            <div className="text">
              <h3>{plan}</h3>
              <h5>
                {`$${
                  billing === "monthly" ? `${price.mon}/mo` : `${price.yr}/yr`
                }`}
              </h5>
              {billing === "yearly" && <small>2 months free</small>}
            </div>
          </div>
        ))}
      </div>
      <div className="plan-duration">
        <span className={billing === "monthly" ? "active" : ""}>Monthly</span>
        <div
          className={`toggle-container ${billing === "yearly" && "yearly"}`}
          onClick={handleBilling}
        >
          <div className="toggle"></div>
        </div>
        <span className={billing === "yearly" ? "active" : ""}>Yearly</span>
      </div>
    </div>
  );
}

export default SelectPlan;
