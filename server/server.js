const jsonServer = require("json-server");
const fs = require("fs");
const userData = require("./data/users/users");

const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

server.get("/api/users", (req, res, next) => {
  res.status(200).send(userData.users);
});

server.post("/api/auth/signup", (req, res, next) => {
  const users = updateOrCreate(userData.users, req.body, res)
  const json = JSON.stringify(users)

  fs.writeFile("./server/data/users/users.json", json, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(`Registered user! ${req.body.email}`);
  });

  res.status(200).send(req.body);
})

server.listen(3000, () => {
  console.log("JSON server listening on port 3000");
});

