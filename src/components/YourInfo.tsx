import { YourInfoProps } from "../types";

type formNames = "name" | "email address" | "phone number";

function YourInfo({ inputItems, handleInput, formData }: YourInfoProps) {
  return (
    <div>
      <form>
        {inputItems.map((input) => (
          <fieldset key={input.placeholder}>
            <div>
              <label htmlFor={input.label}>{input.label}</label>
              <span className={input.isError ? "show" : ""}>
                This field is required
              </span>
            </div>
            <input
              type="text"
              name={input.label}
              placeholder={input.placeholder}
              value={formData[input.label as formNames]}
              onChange={handleInput}
            />
          </fieldset>
        ))}
      </form>
    </div>
  );
}

export default YourInfo;
