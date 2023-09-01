"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const woocommerce_1 = require("./config/woocommerce");
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield woocommerce_1.API.get("customers");
        console.log("Customers data:", response.data);
        const createdCustomers = [];
        for (const customerData of response.data) {
            const createdCustomer = yield db_1.prisma.customer.create({
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
    }
    catch (error) {
        console.log("Error while processing", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "An error occurred." }),
        };
    }
});
