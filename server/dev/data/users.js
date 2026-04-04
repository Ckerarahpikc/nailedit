const { faker } = require("@faker-js/faker");

export function createRandomUser() {
  return {
    name: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    status: "client",
    updatedAt: Date.now().toLocaleString(),
    photo: "default.png",
  };
}
