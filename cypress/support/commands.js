const compareSnapshotCommand = require('cypress-image-diff-js/command')
compareSnapshotCommand()

Cypress.Commands.add('clickButtonIfExists', (texto) => {
  cy.get('body').then(($body) => {
    const botao = $body.find('button').filter(function () {
      return Cypress.$(this).text().trim() === texto.trim()
    })

    if (botao.length) {
      cy.wrap(botao.first()).click({ force: true })
    }
  })
})

Cypress.Commands.add('removerElemento', (seletor) => {
  cy.get('body').then(($body) => {
    if ($body.find(seletor).length) {
      $body.find(seletor).remove()
    }
  })
})

