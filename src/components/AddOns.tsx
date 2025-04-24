import { AddOnsProp } from "../types";

function AddOns({ billing, addOns, setAddOns }: AddOnsProp) {
  const handleAddOn = (name: string) => {
    setAddOns((prev) => {
      const updated = [...prev];

      const index = prev.findIndex((addon) => addon.name === name);

      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          isSelected: !updated[index].isSelected,
        };
      }

      return updated;
    });
  };

  return (
    <div>
      <div className="addon-container">
        {addOns.map((addon) => (
          <div
            className={`addon ${addon.isSelected && "active"}`}
            key={addon.name}
            onClick={() => handleAddOn(addon.name)}
          >
            <input
              type="checkbox"
              name={addon.name}
              checked={addon.isSelected}
              readOnly
            />
            <div className="text">
              <div>
                <h3>{addon.name}</h3>
                <span>{addon.desc}</span>
              </div>
              <div>
                <span className="price">
                  {`+$${
                    billing === "monthly"
                      ? `${addon.price.mon}/mo`
                      : `${addon.price.yr}/yr`
                  }`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddOns;
