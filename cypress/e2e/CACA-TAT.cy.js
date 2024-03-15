/// <reference types="Cypress" />




describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.get('[id="firstName"]').as('campoPrimeiroNome')
        cy.get('[id="lastName"]').as('campoSobrenome')
        cy.get('[id="email"]').as('campoEmail')
        cy.get('[id="phone"]').as('campoTelefone')
        cy.get('[id="open-text-area"]').as('campoAjudaTexto')
        cy.get('[type="submit"]').as('btnEnviar')
      })

    it('Verificar o título da aplicação', () => {
        const titulo = 'Central de Atendimento ao Cliente TAT'
        cy.title().should('be.equal', titulo)
    });

    it('Preenchendo campos obrigatórios e clicando em enviar', () => {
        //arrange
        const primeiroNome = "Escola TAT"
        const sobreNome = "Exercício 01"
        const email = "email@exemplo.com"
        const telefone = "(79) 2320-6543"
        const textAjuda = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, odio in volutpat sollicitudin, sem massa vehicula nibh, at semper turpis lectus eu orci. Maecenas euismod dui luctus, venenatis libero ut, dignissim neque. Nunc mollis purus vel est dignissim condimentum. Morbi condimentum, eros efficitur commodo convallis, mauris erat tempus eros, eu tristique mauris orci quis leo. Suspendisse odio libero, blandit nec leo vel, bibendum euismod elit"

        //action
        cy.get('@campoPrimeiroNome').type(primeiroNome)
        cy.get('@campoSobrenome').type(sobreNome)
        cy.get('@campoEmail').type(email)
        cy.get('@campoTelefone').type(telefone)
        cy.get('@campoAjudaTexto').type(textAjuda)
        cy.contains('button', 'Enviar').click()
        //cy.get('@btnEnviar').click()

        //assert
        cy.get('[class="success"]').should('be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const primeiroNome = "Escola TAT"
        const sobreNome = "Exercício 01"
        const emailErrado = "emailexemplo.com"
        const telefone = "(79) 2320-6543"
        const textAjuda = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, odio in volutpat sollicitudin, sem massa vehicula nibh, at semper turpis lectus eu orci. Maecenas euismod dui luctus, venenatis libero ut, dignissim neque. Nunc mollis purus vel est dignissim condimentum. Morbi condimentum, eros efficitur commodo convallis, mauris erat tempus eros, eu tristique mauris orci quis leo. Suspendisse odio libero, blandit nec leo vel, bibendum euismod elit"

        //action
        cy.get('@campoPrimeiroNome').type(primeiroNome)
        cy.get('@campoSobrenome').type(sobreNome)
        cy.get('@campoEmail').type(emailErrado)
        cy.get('@campoTelefone').type(telefone)
        cy.get('@campoAjudaTexto').type(textAjuda)
        cy.contains('button', 'Enviar').click()
        //cy.get('@btnEnviar').click()

        //assert
        cy.get('[class="error"]').should('be.visible')
    });

    it('Campo do telefone deve continuar vazio, mesmo digitando letras', () => {
        const telefone = 'um número qualquer'

        cy.get('@campoTelefone').type(telefone)

        cy.get('@campoTelefone').should('have.value', '')
        
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const primeiroNome = "Escola TAT"
        const sobreNome = "Exercício 01"
        const emailErrado = "emailexemplo.com"
        const textAjuda = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, odio in volutpat sollicitudin, sem massa vehicula nibh, at semper turpis lectus eu orci. Maecenas euismod dui luctus, venenatis libero ut, dignissim neque. Nunc mollis purus vel est dignissim condimentum. Morbi condimentum, eros efficitur commodo convallis, mauris erat tempus eros, eu tristique mauris orci quis leo. Suspendisse odio libero, blandit nec leo vel, bibendum euismod elit"

        cy.get('@campoPrimeiroNome').type(primeiroNome)
        cy.get('@campoSobrenome').type(sobreNome)
        cy.get('@campoEmail').type(emailErrado)
        cy.get('@campoAjudaTexto').type(textAjuda)
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        //cy.get('@btnEnviar').click()

        cy.get('[class="error"]').should('be.visible')
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const primeiroNome = "Escola TAT"
        const sobreNome = "Exercício 01"
        const email = "email@exemplo.com"
        const telefone = "7923206543"

        cy.get('@campoPrimeiroNome').type(primeiroNome)
        cy.get('@campoSobrenome').type(sobreNome)
        cy.get('@campoEmail').type(email)
        cy.get('@campoTelefone').type(telefone)

        //Assert 1
        cy.get('@campoPrimeiroNome').should('have.value', primeiroNome)
        cy.get('@campoSobrenome').should('have.value', sobreNome)
        cy.get('@campoEmail').should('have.value', email)
        cy.get('@campoTelefone').should('have.value', telefone)
        
        //Action
        cy.get('@campoPrimeiroNome').clear()
        cy.get('@campoSobrenome').clear()
        cy.get('@campoEmail').clear()
        cy.get('@campoTelefone').clear()

        //Assert 2
        cy.get('@campoPrimeiroNome').should('have.value', '')
        cy.get('@campoSobrenome').should('have.value', '')
        cy.get('@campoEmail').should('have.value', '')
        cy.get('@campoTelefone').should('have.value', '')
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        
        //Action
        cy.contains('button', 'Enviar').click()
        //cy.get('@btnEnviar').click()

        //Assert
        cy.get('[class="error"]').should('be.visible')
    });

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

         //assert
         cy.get('[class="success"]').should('be.visible')
    });

    it('Seleciona um produto (YouTube) por seu texto', () => {
        const youtube = 'YouTube'
        
        //Action
        cy.get('#product').select(youtube)

        //Assert
        cy.get('#product').should('have.value', 'youtube')
    });

    it('Seleciona um produto (Blog) por seu índice', () => {
        const indice = 1

        cy.get('#product').select(indice)

        cy.get('#product').should('have.value', 'blog')
    });

    it('Marca o tipo de atendimento "Feedback"', () => {
        
        cy.get('[value="feedback"]').check()
        cy.get('[value="feedback"]').should('be.checked')
    });

    it('Marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]')
         .should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })


        //cy.get('[value="ajuda"]').check()
        //cy.get('[value="ajuda"]').should('be.checked')

        //cy.get('[value="elogio"]').check()
        //cy.get('[value="elogio"]').should('be.checked')

        //cy.get('[value="feedback"]').check()
        //cy.get('[value="feedback"]').should('be.checked')
    });

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('Verifica se a mensagem de telefone obrigatório fica visível ao marcar o check de telefone', () => {
        cy.get('input[type="checkbox"][id="phone-checkbox"]').check()


        cy.get('span[class="phone-label-span required-mark"]').should('be.visible')
    });

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
    });

    it.only('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
        
    });

  
})