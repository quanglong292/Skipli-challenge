import { useEffect, useState } from "react";

// Components
import { Button, Input } from "antd";
import { submitPhoneAPI } from "../api/user";
import PhoneInput from "../components/PhoneInput";
import { usePhoneValidation } from "react-international-phone";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  // const [count, setCount] = useState(60);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [input, setInput] = useState({
    phone: "",
    code: "",
  });
  const [validate, setValidate] = useState({
    isAllValid: true,
  });

  const handleValidate = () => {
    const { isValid, lengthMatch } = usePhoneValidation(input.phone, {
      prefix: "+",
      charAfterDialCode: " ",
      defaultMaskMinPhoneLength: 10,
    });

    const isAllValid = isValid && lengthMatch;

    setValidate({ ...validate, isAllValid });

    return isAllValid;
  };

  const handleGetMessage = (validate) => {
    const { areaCodeMatch, lengthMatch } = validate;
    if (!areaCodeMatch) return "Area code not match!";
    if (!lengthMatch) return "Phone length not match!";

    return "";
  };

  const handleLogin = () => {
    if (code && input.code && code === input.code) {
      localStorage.setItem("auth", input.phone.split(" ").join(""));
      navigate("/search");
    }
  };

  const handleGetCode = async () => {
    setLoading(true);

    if (!handleValidate()) return;

    try {
      const { code } = await submitPhoneAPI({
        phone: input.phone.split(" ").join(""),
      });
      // console.log("handleGetCode", code);
      if (code) setCode(code);
      window.alert(`My Twilio account is trial please use this code ${code}`)
    } catch (err) {}
    setLoading(false);
  };

  const handleOnChange = (value, path) => {
    console.log("handleChange", value);
    setInput({ ...input, [path]: value });
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-slate-500 w-full h-screen flex justify-center items-center">
      <div>
        <div className="phone flex items-center">
          <PhoneInput onChange={(value) => handleOnChange(value, "phone")} />
          {/* <input type="text" id="phone" /> */}
          <Button
            onClick={handleGetCode}
            className="ml-1"
            type="secondary"
            loading={loading}
          >
            Get code
          </Button>
        </div>
        <p className="text-xs text-gray-300 italic m-0">
          Example (+84): 8292xxxxxx
        </p>
        {!validate?.isAllValid && (
          <p className="text-red-600 m-0 font-bold italic">
            {handleGetMessage(validate ?? {})}
          </p>
        )}
        <div className="code mt-2">
          <Input
            onInput={(e) => handleOnChange(e.target.value, "code")}
            type="text"
            placeholder={"Access code"}
            className="mb-2"
          />
          <Button disabled={!Boolean(input.code.length === 6)} onClick={handleLogin} className="mt-2" type="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
