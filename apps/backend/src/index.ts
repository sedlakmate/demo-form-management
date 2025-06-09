import { createServer } from "./server";

const port = process.env.PORT || 3001;

console.log("Starting backend server...");
console.log("=== Backend Startup ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", port);

const server = createServer();

server.listen(port, () => {
  console.log(`backend running on ${port}`);
});
