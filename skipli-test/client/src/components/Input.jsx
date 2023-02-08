import { memo } from "react";

const Input = (props) => {
  const { label } = props;
  return (
    <div>
      <div className="mb-1 ml-1 font-semibold">{label || "Label"}</div>
      <input
        {...props}
        className="border-[1px] rounded-md m-1 border-gray-500 p-1"
      />
    </div>
  );
};

export default memo(Input);
