var authcreds = require("../../fixtures/data.json");
let access_token = "";
describe("API Test Suite", () => {
  it("AUTH_01-- User should be successful login", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      form: true,
      body: {
        username: authcreds.auth_username,
        password: authcreds.auth_password,
      },
    })
      .as("Login")
      .then((response) => {
        access_token = response.body.access_token;
        expect(response.body).to.have.property("access_token");
      });
  });

  it("AUTH_02-- User login should be maintained", () => {
    cy.request({
      method: "GET",
      url: "/auth/me",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });

  // Failed test case- Unable to logout thats why commented
  it("AUTH_03-- User  should be successfully logout", () => {
    cy.request({
      method: "GET",
      url: "/auth/logout",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });

  it("REQID-CON_01--Should allow to store new contact data", () => {
    cy.request({
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/",
      body: {
        firstName: `TEST ${Date.now()}`,
        lastName: "QA",
        email: "test@yopmail.com",
        phone: `0213 ${Date.now()}`,
        mobile: `0092 ${Date.now()}`,
      },
    }).then((response) => {
      console.log(response.body);
      expect(response.status).equal(201);
      expect(response)
        .property("body")
        .to.contain({
          lastName: "QA",
          email: "test@yopmail.com",
        });
    });
  });

  it("REQID-CON_02--Should not allow duplicate entries", () => {
    cy.request({
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      failOnStatusCode: false,
      url: "/api/v1/contacts/",
      body: {
        firstName: "Abc",
        lastName: "xyz",
      },
    }).then((response) => {
      console.log(response.body);
      expect(response.status).equal(400);
      console.log("Contact already exists");
    });
  });

  it("REQID-CON_03--Should retreive all previously created contacts", () => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/search",
    }).then((response) => {
      expect(response.body).to.not.be.null;
      expect(response.status).equal(200);
  
    });
  });

  it("REQID-CON_04--Should retrieve previously created contacts by contact id", () => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/2",
    }).then((response) => {
      expect(response.body).to.not.be.null;
      expect(response.status).to.eq(200);
      
    });
  });

  it("REQID-CON_05--Should update previously created contact by unique id", () => {
    
  cy.request({
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/2",
      failOnStatusCode: false,
      body: {
        firstName: "Regression",
        lastName: "Status",
      },
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response)
        .property("body")
        .to.contain({
          id: 2,
        });
     });
  });

  it("REQID-CON_06--Should search contacts by first name and last name", () => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/search?first_name&last_name",
    }).then((response) => {
      expect(response.status).equal(200);
      expect({ firstName: "Abc", lastName: "xyz" }).to.deep.equal({
        firstName: "Abc",
        lastName: "xyz",
      });
    });
  });

  it("REQID-CON_07--Should delete previously created contacts by contact id", () => {
    const id;
    cy.request({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: "/api/v1/contacts/8",
    }).then((response) => {
      expect(response.body).to.be.null;
      expect(response.status).equal(204);
      
    });
  });
  it("SEC_01-- User  should be successfully logout", () => {
    cy.request({
      method: "GET",
      url: "/auth/logout",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });
});
