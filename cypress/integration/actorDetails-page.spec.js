let actorId = 15555; // Piper Lisa Perabo
let actor;
let reviews;
let images;

describe("Actor Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((actorDetails) => {
        actor = actorDetails;
        return actorDetails.id;
      });
    
      cy.request(
        `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${Cypress.env(
          "TMDB_KEY"
        )}`
      ) 
      .its("body")
      .then((actorImages) => {
        images = actorImages;
        return actorImages.id;
      });
  });
  beforeEach(() => {
    cy.visit(`/actors/${actor.id}`);
  });
  describe("Base tests", () => {
    it("should display actor's biography in the page header", () => {
      cy.get("h3").contains('Biography');
    });

    it("should display the actor's details", () => {
        cy.get("h3").next().contains('Piper Lisa Perabo');
        cy.get("ul")
        });
    });

});
