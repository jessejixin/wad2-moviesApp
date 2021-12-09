let movies;
const movieId =  335983; // The movie Venom id
let reviews;

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
    // Get movie reviews
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((response) => {
        // console.log(response);
        reviews = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });  
  describe("From the home page", () => {
    it("should navigate to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click({force: true});
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });
  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("should allow navigation to the Favourites page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(7).click({force: true});
        cy.url().should("include", `/favorites`);
        cy.get("h3").contains("Favorite Movies");
      });
    });
    describe(
      "when the viewport is a mobile",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("should allow navigation to the Favourites page from the dropdown menu", () => {
          cy.get("header").find("button").eq(7).click({force: true},{ multiple: true });
          // cy.get("li").eq(7).click({force: true},{ multiple: true });
          cy.url().should("include", `/favorites`);
          cy.get("h3").contains("Favorite Movies");
        });
      });
    });
    describe("From the Favorites page", () => {
        beforeEach(() => {
          cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
          cy.get("button[aria-label='add to favorites']").eq(1).click({force: true});
          cy.get("header").find(".MuiToolbar-root").find("button").eq(7).click({force: true});
        });
        it("should navigate to the movies detail page and change the browser URL", () => {
          cy.get(".MuiCardActions-root").eq(0).contains("More Info").click({force: true});
          cy.url().should("include", `/movies/${movies[0].id}`);
          cy.get("h3").contains(movies[0].title);
        });
      });
      describe("The forward/backward links", () => {
        beforeEach(() => {
          cy.get(".MuiCardActions-root").eq(0).contains("More Info").click({force: true});
        });
        it("should navigate backward and forward between the movies detail page and the Discover page.", () => {
          cy.get("button[aria-label='go back'").click({force: true});
          cy.get("h3").contains("Discover Movies");
          cy.url().should("not.include", `/movies/${movies[0].id}`);
          cy.get("button[aria-label='go forward'").click({force: true});
          cy.url().should("include", `/movies/${movies[0].id}`);
          cy.get("h3").contains(movies[0].title);
        });
      });
    describe("forward/backward links test", () => {
      beforeEach(() => {
        cy.get("button[aria-label='add to favorites']").eq(0).click({force: true});
        cy.get("button[aria-label='add to favorites']").eq(1).click({force: true});
        cy.get("header").find(".MuiToolbar-root").find("button").eq(7).click({force: true});
      });
      it("should navigate backward and forward between the favourites page and the movies detail page.", () => {
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click({force: true});
        cy.get("button[aria-label='go back'").click({force: true});
        cy.get("h3").contains("Favorite Movies");
        cy.url().should("not.include", `/movies/${movies[0].id}`);
        cy.get("button[aria-label='go forward'").click({force: true});
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get("h3").contains(movies[0].title);
      });
    });
});
