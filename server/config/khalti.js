import axios from "axios";

//function to verify khalti payment
export const verifyKhaltiPayment = async (pidx) => {

  // console.log("pidx",pidx)
  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
    Accept:"application/json",
  };

  // console.log("Header",headersList);
  const bodyContent = JSON.stringify({ pidx });


  // console.log("bodyCOntent",bodyContent);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    const response = await axios.request(reqOptions);
  // console.log("verifying data",response.data.total_amount);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:");
    // throw error;
  }
};

//funtion to initialize khalti payment
export const initializeKhaltiPayment = async (details) => {
  // console.log("khalti initialce");
  const headersList = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify({
    ...details,
    purchase_order_id:details.purchase_order_id,
  });
  // console.log("body content",bodyContent);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  // console.log("options", reqOptions);
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
