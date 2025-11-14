import axios from "axios";

//function to verify khalti payment
export const verifyKhaltiPayment = async (pidx) => {

  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
    Accept:"application/json",
  };

  const bodyContent = JSON.stringify({ pidx });



  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:");
  }
};

//funtion to initialize khalti payment
export const initializeKhaltiPayment = async (details) => {
  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify({
    ...details,
    purchase_order_id:details.purchase_order_id,
  });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    if(error.response){
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
    }
    else if(error.request){
      console.error("Error request data:", error.request);
    }
    console.error("Error initializing Khalti payment:");
  }
};



