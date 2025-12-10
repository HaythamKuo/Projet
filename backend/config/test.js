import crypto, { randomBytes } from "crypto";

const test = crypto.randomBytes(16).toString("hex");

console.log(test);
