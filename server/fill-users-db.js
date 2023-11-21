const faker = require('faker');
const fs = require("fs")

const USER_COUNT = 25

const getRandomBoolean = () => Math.random() < 0.7;

const database = { users: [] };

for (let i = 1; i <= USER_COUNT; i++) {
  database.users.push({
    id: i,
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    tel: faker.phone.phoneNumber('##########'),
    website: getRandomBoolean() ? faker.internet.url() : ''
  });
}

const json = JSON.stringify(database);

fs.writeFile("./server/data/users/users.json", json, "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`Filled database.json with mock user data!`);
});
