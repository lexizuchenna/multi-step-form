import { SummaryProp } from "../types";

function Summary({ billing, planItems, addOns }: SummaryProp) {
  const currentPlan = planItems.find(({ isSelected }) => isSelected);

  const allAddOns = addOns.filter(({ isSelected }) => isSelected);

  const planPrice =
    billing === "monthly" ? currentPlan?.price.mon : currentPlan?.price.yr;

  const addonPrice = allAddOns.reduce(
    (acc, curr) =>
      acc + (billing === "monthly" ? curr.price.mon : curr.price.yr),
    0
  );

  const totalPrice = addonPrice + (planPrice ?? 0);

  return (
    <div>
      <div className="summary-container">
        <div className="plan-section">
          <div>
            <h3>
              {currentPlan?.plan} ({billing})
            </h3>
            <span>Change</span>
          </div>
          <h3>
            {`$${
              billing === "monthly"
                ? `${currentPlan?.price.mon}/mo`
                : `${currentPlan?.price.yr}/yr`
            }`}
          </h3>
        </div>
        <hr />
        <div className="addon-section">
          {allAddOns.map((addon) => (
            <div className="addon-finish">
              <h5>{addon.name}</h5>
              <span>
                {`+$${
                  billing === "monthly"
                    ? `${addon.price.mon}/mo`
                    : `${addon.price.yr}/yr`
                }`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="total">
        <h4>Total (per {billing === "monthly" ? "month" : "year"})</h4>
        <span>
          {`+$${
            billing === "monthly" ? `${totalPrice}/mo` : `${totalPrice}/yr`
          }`}
        </span>
      </div>
    </div>
  );
}

export default Summary;
