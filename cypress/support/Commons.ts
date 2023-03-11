/// <reference types="Cypress" />

class commons {
  static emailCreation(length) {
    let result = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charLength = char.length;
    for (let i = 0; i < length; i++) {
      result += char.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  };

  static randomNumberCreation (length) {
    return Math.floor(Math.pow(10, length-1) 
      + Math.random() * 9 * Math.pow(10, length-1));
  };

  static formVisitVerify () {
    cy.get("#root")
      .should("contain.text", "Care where you are")
      .should("contain.text", "Build a meaningful")
      .should("contain.text", "career and touch")
      .should("contain.text", "the lives of others");
  }
};

export default commons;
