import { API } from "./config/woocommerce";

exports.handler = async (event: any) => {
  try {
    const response = await API.get("customers")
    console.log("Customers data:", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.log("Error while processing", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "An error occurred." }),
    };
  }
};
