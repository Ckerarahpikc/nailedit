import dotenv from "dotenv";
dotenv.config();

console.log("test:", process.env.URL_API);

export default async function testApi() {
  const res = await fetch("");
}
