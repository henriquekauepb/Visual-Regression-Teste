// cypress/e2e/layout-regressao.cy.js

const paginas = require('../fixtures/wordpress/paginas.json')

describe('Layout - Regressão pós-atualização', () => {

    const errosDeJsIgnorados = []

    paginas.forEach((pagina) => {

        it(`Comparar: ${pagina.id}`, () => {

            cy.on('uncaught:exception', (err) => {
                const padroesConhecidos = ['mask is not a function']

                if (padroesConhecidos.some((trecho) => err.message.includes(trecho))) {
                    errosDeJsIgnorados.push(`${pagina.id} | ${pagina.url} | ${err.message}`)
                    return false
                }
            })

            cy.visit(pagina.url, { failOnStatusCode: false })

            cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto;')

            cy.get('header').hideElement()

            cy.clickButtonIfExists('Accept All')

            cy.removerElemento('.cky-btn-revisit-wrapper')

            cy.compareSnapshot({
                name: pagina.id,
                testThreshold: 0.2,
            })

        })

    })

    after(() => {
        cy.writeFile('cypress/results/erros-js-ignorados.json', errosDeJsIgnorados)
    })

})