const Employee = require("../../src/models/employeeModel");

describe("Employee Model - Unit Tests", () => {
  it("should require first name", async () => {
    const employee = new Employee({ lastName: "Doe", position: "Engineer", salary: 5000 });

    let err;
    try {
      await employee.validate();
    } catch (error) {
      err = error;
    }

    expect(err.errors.firstName).toBeDefined();
  });

  it("should not allow negative salary", async () => {
    const employee = new Employee({ firstName: "John", lastName: "Doe", position: "Engineer", salary: -1000 });

    let err;
    try {
      await employee.validate();
    } catch (error) {
      err = error;
    }

    expect(err.errors.salary).toBeDefined();
  });
});
