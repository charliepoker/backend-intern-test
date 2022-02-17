let app = require("../app");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
const chai = require("chai");

chai.use(chaiHttp);
describe("Home Route", () => {
  it("Main page content", function (done) {
    chai
      .request(app)
      .get("/home")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Weclome to my Api");
        done();
      });
  });
});

describe("Register User", function () {
  it("It should throw 400 on registering without details", async () => {
    const registerDetails = {};
    chai
      .request(app)
      .post("/users/auth/signup")
      .send(registerDetails)
      .then(function (res) {
        expect(res).to.have.status(400);
      });
  });

  it("it should create new user with details", async () => {
    const registerDetails = {
      firstName: "charlie",
      lastName: "poker",
      email: "example@example.com",
      phoneNumber: "8976364788",
    };
    chai
      .request(app)
      .post("/users/auth/signup")
      .send(function (res) {
        expect(res).to.have.status(200);
        res.body.data.should.be.an("object");
      });
  });

  it("it should be return an object when user created", async () => {
    const registerDetails = {
      firstName: "charlie",
      lastName: "poker",
      email: "example@example.com",
      phoneNumber: "8976364788",
    };
    chai
      .request(app)
      .post("/users/auth/signup")
      .send(function (res) {
        res.body.data.should.be.an("object");
      });
  });
});

describe("Login User", () => {
  it("It should throw 400 on registering without details", async () => {
    const registerDetails = {};
    chai
      .request(app)
      .post("/users/auth/signup")
      .send(registerDetails)
      .then(function (res) {
        expect(res).to.have.status(400);
      });
  });
  it("It should login user", async () => {
    const registerDetails = {};
    chai
      .request(app)
      .post("/users/auth/login")
      .send(registerDetails)
      .then(function (res) {
        expect(res).to.have.property("token");
      });
  });
});
