describe('Smoke Test', () => {

  let paginas

  before(() => {
    cy.fixture('wordpress/paginas.json').then((dados) => {
      paginas = dados
    })
  })

  it('Validar se todas as páginas estão acessíveis', () => {

    const erros = []

    paginas.forEach((pagina) => {

      cy.request({
        url: pagina.url,
        failOnStatusCode: false
      }).then((response) => {

        cy.log(`${pagina.nome} - HTTP ${response.status}`)

        if (response.status !== 200) {
          erros.push(`${pagina.id} | ${pagina.url} | HTTP ${response.status}`)
        }

      })

    })

    cy.then(() => {
      expect(erros, `Páginas com erro:\n${erros.join('\n')}`).to.be.empty
    })

  })

})