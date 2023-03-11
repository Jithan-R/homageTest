/// <reference types="cypress" />

class HomageRegistration {
    selectLocation (locationName) {
        cy.get("#location")
            .contains(locationName)
            .should("contain.text", locationName);
    };

    basicDetails(FirstName, LastName, EmailAddress, Country, PhoneNumber) {
        cy.get("#firstName").type(FirstName);
        cy.get("#lastName").type(LastName);
        cy.get("#email").type(EmailAddress);
        cy.get('.MuiButtonBase-root')
            .click();
        cy.xpath("//span[contains(text(), '"+Country+"')]", {timeout:2000}).click()
        cy.get("#phone").type(PhoneNumber)
    };

    legalAge(SelectionButton) {
        cy.xpath("//span[contains(@class, 'legalAge')]//button[contains(text(), '"+SelectionButton+"')]")
            .click();
    };

    residence(SelectionButton) {
        cy.xpath("//div[@id='countrysg']//child::button[contains(text(), '"+SelectionButton+"')]")
            .click();
    };

    //Sunction to work with Yes & No options in Roles
    experianceSelectior (SelectionButton, selector) {
        cy.xpath("//div[contains(@class, 'yes-no-sg')]//button[contains(text(), '"+SelectionButton+"')]")
            .click()
            .then((experiance) => {
                cy.xpath("//div[@class='h yes-no-sg']/button[contains(text(), 'Yes')]")
                    .then((exp) => {
                    if(experiance = exp) {
                        cy.xpath("//h3[contains(text(), '"+selector+"')]")
                            .should("be.exist")
                            .click();
                        cy.xpath("//span[(text()= 'Patient Care/Healthcare Assistant')]")
                            .click()
                    } else {
                        cy.xpath("//span[contains(text(), '"+selector+"')]")
                            .should("be.exist")
                            .click();
                    }
                });
            });
    };

    jobOppertunity () {
        cy.get("span[class='job-desc-popup-text']")
            .click()
            .then(() => {
                cy.xpath("//div[contains(@class, 'MuiTableContainer-root')]")
                    .should("be.visible")
            })
        cy.xpath("//b[contains(text(), 'Home Care')]").click();
    };

    engagementType () {
        cy.get("span[class='job-types-popup-text']")
            .should("contain.text", "Find out more about the different engagement types")
            .click()
            .then(() => {
                cy.xpath("//div[contains(@class, 'MuiPaper-rounded')]")
                    .should("be.visible")
            });
        cy.xpath("//b[contains(text(), 'Freelance')]").click();
    };

    backgroundCheck (SelectionButton) {
        cy.get("#backgroundCheck").should("contain.text", "Background Check");
        cy.xpath("//span[@id='backgroundCheck']//following-sibling::div[@class='h']/button[contains(text(), '"+SelectionButton+"')]").click();
    };

    declarationName (declarationText) {
        cy.get("#declaration").should("contain.text", "Declaration")
        cy.get("#declarationName").clear().type(declarationText)
        cy.get("input[readonly]").should("be.visible")
    };

    jobKnowButton () {
        cy.xpath("//div[contains(text(), 'Select One')]").click()
        cy.xpath("//li[contains(text(), 'YouTube')]").click()
    };

    declarationCheckBox () {
        cy.get("div[class='h cpf-checkbox mb-0 ']").click();
        cy.get("div[class='h cpf-checkbox mt-3 mb-0 ']").click();
    };

    submitButton () {
        cy.xpath("//button[contains(text(), 'Submit Application')]")
            .should("be.exist")
            .should("contain.text", "Submit Application")
            .click();
    }

    formSubmitVerification () {
        cy.get("div[class='cpf-content cpf-success v']")
            .should("contain.text", "Your application has been submitted!")
            .should("contain.text", "Thank you for your interest in joining Homage. We will get back to you with the results of your application ")
            .should("contain.text", "within 3-5 working days.")
            .should("contain.text", "Find out more about becoming a Homage Care Professional")
    };

    //Wait to verify form submission
    formWait () {
        cy.intercept ("POST", "/api/v3/carepro/apply").as("formWait")
        cy.wait("@formWait").then((res) => {
          expect(res.response.statusCode).to.eq(201);
        });
    };
};

export default HomageRegistration