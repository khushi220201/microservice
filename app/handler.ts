import { prisma } from "./config/db";
import { API } from "./config/woocommerce";

exports.handler = async (event: any) => {
  try {
    const response = await API.get("customers");
    console.log("Customers data:", response.data);
    const createdCustomers = [];
    for (const customerData of response.data) {
      const createdCustomer = await prisma.customer.create({
        data: {
          id: customerData.id,
          date_created: new Date(customerData.date_created),
          date_created_gmt: new Date(customerData.date_created_gmt),
          date_modified: new Date(customerData.date_modified),
          date_modified_gmt: new Date(customerData.date_modified_gmt),
          email: customerData.email,
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          role: customerData.role,
          username: customerData.username,
          is_paying_customer: customerData.is_paying_customer,
          avatar_url: customerData.avatar_url,
          meta_data: customerData.meta_data,
        },
      });
      createdCustomers.push(createdCustomer);
    }

    console.log("Created Customers:", createdCustomers);

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
