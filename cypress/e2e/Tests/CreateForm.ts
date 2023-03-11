/// <reference types="cypress" />

import HomageRegistration  from "../../support/Pages/registrationForm";
import commons from "../../support/Commons";

let registrationForm = new HomageRegistration (); 


describe ("Verify the user can successfully create the form", () => {
    let LocationName, FirstName, LastName, EmailAddress, Country;
    let SelectionAswer1, SelectionAswer2;
    let exp1, exp2, exp3, exp4, exp5, role1, role2;
    let Declaration;

    beforeEach(function () {
        cy.fixture("CreateFormData.json").then(function (data) {
            LocationName = data.LocationName;
            FirstName = data.BasicDetails.FirstName;
            LastName = data.BasicDetails.LastName;
            EmailAddress = data.BasicDetails.EmailAddress;
            Country = data.BasicDetails.Country;
            SelectionAswer1 = data.OptionSelector.SelectionAswer1;
            SelectionAswer2 = data.OptionSelector.SelectionAswer2;
            exp1 = data.YearSelector.Experience_1;
            exp2 = data.YearSelector.Experience_2;
            exp3 = data.YearSelector.Experience_3;
            exp4 = data.YearSelector.Experience_4;
            exp5 = data.YearSelector.Experience_5;
            role1 = data.RoleSelector.Role_1;
            role2= data.RoleSelector.Role_2;
            Declaration = data.Declaration;
        });

        cy.visit(Cypress.env('HomageURL'));
    });

    it("TC 01: Verify user able to create the form after giving all the required fields", () => {
        cy.url().should("include", Cypress.env('HomageURL'))
        commons.formVisitVerify();
    });

    it("TC 02: Verify user able to create the form after giving all the required fields", () => {
        registrationForm.selectLocation(LocationName);
        registrationForm.basicDetails(FirstName, LastName, 
            commons.emailCreation(5)+EmailAddress, Country, 
            commons.randomNumberCreation(10));
        registrationForm.legalAge(SelectionAswer1);
        registrationForm.residence(SelectionAswer2);
        registrationForm.experianceSelectior(SelectionAswer1, exp1);
        registrationForm.jobOppertunity();
        registrationForm.engagementType();
        registrationForm.backgroundCheck(SelectionAswer2);
        registrationForm.jobKnowButton();
        registrationForm.declarationName(Declaration);
        registrationForm.declarationCheckBox();
        registrationForm.submitButton();
    });

    it("TC 03: Verify job application is created successfully", () => {
        registrationForm.selectLocation(LocationName);
        registrationForm.basicDetails(FirstName, LastName, 
            commons.emailCreation(5)+EmailAddress, Country, 
            commons.randomNumberCreation(10));
        registrationForm.legalAge(SelectionAswer1);
        registrationForm.residence(SelectionAswer2);
        registrationForm.experianceSelectior(SelectionAswer1, exp1);
        registrationForm.jobOppertunity();
        registrationForm.engagementType();
        registrationForm.backgroundCheck(SelectionAswer2);
        registrationForm.jobKnowButton();
        registrationForm.declarationName(Declaration);
        registrationForm.declarationCheckBox();
        registrationForm.submitButton();
        registrationForm.formWait();
        registrationForm.formSubmitVerification(); //Forme will be verified here once it is submitted
        cy.url().should("include", Cypress.env('HomageURL'));
    });

    it("TC 04: Verify job application creation without filling required fields - This senario tried without Legal Age, Residence, Roles & Job Opportunities", () => {
        cy.url().should("include", Cypress.env('HomageURL'));
        registrationForm.selectLocation(LocationName);
        registrationForm.basicDetails(FirstName, LastName,
            commons.emailCreation(5)+EmailAddress, Country, 
            commons.randomNumberCreation(10));
        registrationForm.engagementType();
        registrationForm.backgroundCheck(SelectionAswer2);
        registrationForm.declarationName(Declaration);
        registrationForm.declarationCheckBox();
        registrationForm.submitButton();
    });

});