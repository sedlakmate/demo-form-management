import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`backend running on ${port}`);
});
