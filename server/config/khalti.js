import axios from "axios";

//function to verify khalti payment
export const verifyKhaltiPayment = async (pidx) => {
  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRECT_KEY}`,
    "Content-Type": "application/json",
    Accept:"application/json",
  };
  const bodyContent = JSON.stringify({ pidx, });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    const response = await axios.request(reqOptions);
  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:");
    // throw error;
  }
};

//funtion to initialize khalti payment
export const initializeKhaltiPayment = async (details) => {
  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRECT_KEY}`,
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify(details);
  // console.log("body content",bodyContent);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  console.log("options", reqOptions);
  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error initializing Khalti payment:");
  }
};
