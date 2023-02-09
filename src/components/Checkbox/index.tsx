import React, { useCallback, useState } from "react";

type Props = {
  value: string;
  changeChecked?: (isChecked: boolean) => void;
};

const Checkbox: React.FC<Props> = ({ value, changeChecked }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(() => {
    changeChecked?.(!checked);
    setChecked(!checked);
  }, [changeChecked, checked]);

  return (
    <div className="flex items-center my-2">
      <input
        id={`${value}-checkbox`}
        type="checkbox"
        checked={checked}
        className="default:ring-2 checked:bg-blue-500"
        onChange={handleChange}
      />
      <label
        className="ml-2 text-gray-500 font-light text-sm"
        htmlFor={`${value}-checkbox`}
      >
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
