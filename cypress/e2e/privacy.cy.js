/// <reference types="Cypress" />

describe('Página da política de privacidade', function(){

    it('Verifica o título da página', () => {
        const titulo = 'Central de Atendimento ao Cliente TAT - Política de privacidade'
        cy.visit('./src/privacy.html')

        cy.title().should('be.equal', titulo)

    });
})