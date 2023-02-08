import React, { memo, useState } from "react";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const CPhoneInput = memo((props) => {
  const [phone, setPhone] = useState("");

  return <PhoneInput initialCountry="us" {...props} />;
});

export default CPhoneInput;
