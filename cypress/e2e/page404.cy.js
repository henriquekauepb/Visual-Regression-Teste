const paginas = require('../fixtures/wordpress/paginas.json')

describe('Encontrar páginas fora do ar', () => {

  const paginasComProblema = []
  const paginasComFalhaDeCarregamento = []

  paginas.forEach((pagina) => {

    it(`Verificar: ${pagina.id}`, () => {

      cy.visit(pagina.url, {
        failOnStatusCode: false,
        timeout: 30000
      })

      cy.get('body', { timeout: 15000 }).then(($body) => {

        const texto = $body.text()
        const contemErro404 = texto.includes('Oops! Página não encontrada.')

        if (contemErro404) {
          paginasComProblema.push(`${pagina.id} | ${pagina.url}`)
        }

      })

    })

  })

  after(() => {
    cy.writeFile('cypress/results/paginas-404.json', paginasComProblema)
  })

  it('Resumo: páginas com erro 404', () => {

    cy.then(() => {

      cy.log(`Total de páginas com 404: ${paginasComProblema.length}`)
      paginasComProblema.forEach((item) => cy.log(item))

    })

  })

})