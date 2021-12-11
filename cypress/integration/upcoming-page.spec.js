let movies;
const movieId =  568124;
const movieTitle = 'Encanto' 
let reviews;

const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

  describe("Upcoming Page ", () => {
    before(() => {
      // Get movies from TMDB and store in movies variable.
      cy.request(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`

      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies = response.results
        })

        cy.request(
            `https://api.themoviedb.org/3movie/${movieId}/?api_key=${Cypress.env(
              "TMDB_KEY"
            )}`
          )
            .its("body")
            .then((response) => {
              // console.log(response);
              reviews = response.results;
            });
    })
    beforeEach(() => {
      cy.visit("/movies/upcoming")
    });

    //test to make sure on the correct page
    //url should include 'movies/upcoming'
            //h3 header should say Upcoming Movies
    describe("Base tests", () => {
    it("should be on the upcoming movies page", () => {
        cy.url().should("include", `/movies/upcoming`);
        cy.get("h3").contains("Upcoming Movies");
      });
    });

    describe("Filtering", () => {
        describe("By movie title", () => {
         it("should only display movies with i in the title", () => {
           let searchString = "i";
           let matchingMovies = filterByTitle(movies, searchString);
           console.log(matchingMovies)
           cy.get("#filled-search").clear({force: true}).type(searchString); // Enter m in text box
           cy.get(".MuiCardHeader-content").should(
             "have.length",
             matchingMovies.length
           );
           cy.get(".MuiCardHeader-content").each(($card, index) => {
             cy.wrap($card).find("p").contains(matchingMovies[index].title);
           });
         })
         it("should only display movies with o in the title", () => {
           let searchString = "o";
           let matchingMovies = filterByTitle(movies, searchString);
           cy.get("#filled-search").clear({force: true}).type(searchString); // Enter m in text box
           cy.get(".MuiCardHeader-content").should(
             "have.length",
             matchingMovies.length
           );
           cy.get(".MuiCardHeader-content").each(($card, index) => {
             cy.wrap($card).find("p").contains(matchingMovies[index].title);
           });
         });
         it("should only display movies with XYZ in the title", () => {
            let searchString = "XYZ";
            cy.get("#filled-search").clear({force: true}).type(searchString); // Enter XYZ in text box
            cy.get(".MuiCardHeader-content").should(
                'not.exist'
            )
          })
       })

    });

    describe("By movie genre", () => {
        it("should display movies with the specified genre only", () => {
            //list of genre ids and corresponding categories @ https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
           const selectedGenreId = 53;
           const selectedGenreText = "Thriller";
           const matchingMovies = filterByGenre(movies, selectedGenreId);
           cy.get("#genre-select").click({force: true});
           cy.get("li").contains(selectedGenreText).click();
           cy.get(".MuiCardHeader-content").should(
             "have.length",
             matchingMovies.length
           );
           cy.get(".MuiCardHeader-content").each(($card, index) => {
             cy.wrap($card).find("p").contains(matchingMovies[index].title);
           });
         });

         describe("By movie genre and title", () => {
          it("should display movies with the specified genre and title substring only", () => {
            const selectedGenreId = 878;
            const selectedGenreText = "Science Fiction";
            const genreMatchingMovies = filterByGenre(movies, selectedGenreId);
            let searchString = "no";
            let matchingMovies = filterByTitle(genreMatchingMovies, searchString);
            cy.get("#filled-search").clear({force: true}).type(searchString); // Enter m in text box 
            cy.get("#genre-select").click({force: true});
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
              "have.length",
              matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
          });
        });
       });

    describe("Viewing Movie Details", () => {
    it("should display the movies details on a new page", () => {
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click({force: true});
        cy.get("h3").contains(movieTitle);
        cy.url().should("include", `movies/${movieId}`)
    })
    })
});