describe("Log Page ", () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')          //vist the url
    });
  
    it("should successsfully log in", () => {
      cy.wait(3000)
      cy.get('button').eq(0).click()
      cy.get('a').click()
      cy.get('input').eq(0).type('20096422@mail.wit.ie')   //type the user name in the field
      cy.get('input').eq(1).type('123qwe') 
      cy.get('button').eq(10).click()  //click the button    
    })
    
  
  });