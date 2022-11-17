"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSaltSync(8);
    const password = await bcrypt.hash("123456", salt);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "superadmin",
          email: "septian.uca@gmail.com",
          password: await bcrypt.hash("SeptiaN1234567@", salt),
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          name: "adminDir",
          email: "diradmin@gmail.com",
          password: await bcrypt.hash("SeptiaN1234567@", salt),
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
        },
        {
          name: "admin1",
          email: "admin1.alzahra@gmail.com",
          password: password,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
        },
        {
          name: "admin2",
          email: "admin2.alzahra@gmail.com",
          password: password,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", { id: [1, 2, 3, 4] }, {});
  },
};
