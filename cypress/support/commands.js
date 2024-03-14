Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const primeiroNome = "Escola TAT"
    const sobreNome = "Exercício 01"
    const email = "email@exemplo.com"
    const telefone = "(79) 2320-6543"
    const textAjuda = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, odio in volutpat sollicitudin, sem massa vehicula nibh, at semper turpis lectus eu orci. Maecenas euismod dui luctus, venenatis libero ut, dignissim neque. Nunc mollis purus vel est dignissim condimentum. Morbi condimentum, eros efficitur commodo convallis, mauris erat tempus eros, eu tristique mauris orci quis leo. Suspendisse odio libero, blandit nec leo vel, bibendum euismod elit"
    
    cy.get('[id="firstName"]').as('campoPrimeiroNome')
    cy.get('[id="lastName"]').as('campoSobrenome')
    cy.get('[id="email"]').as('campoEmail')
    cy.get('[id="phone"]').as('campoTelefone')
    cy.get('[id="open-text-area"]').as('campoAjudaTexto')
    cy.get('[type="submit"]').as('btnEnviar')

    cy.get('@campoPrimeiroNome').type(primeiroNome)
    cy.get('@campoSobrenome').type(sobreNome)
    cy.get('@campoEmail').type(email)
    cy.get('@campoTelefone').type(telefone)
    cy.get('@campoAjudaTexto').type(textAjuda)
    cy.get('@btnEnviar').click()
})