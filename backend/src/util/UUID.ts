import { route_types } from "../types/route_type";

const UUIDFunction: route_types.urlFuncType = {
  generateUUID() {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    return Number(`${timestamp}${randomNum}`); // Combine timestamp and random number
  },
};

export default UUIDFunction;
