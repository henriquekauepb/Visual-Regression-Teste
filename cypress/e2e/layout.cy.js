describe('Layout - Baseline', () => {

    let paginas
    let paginaAtual

    before(() => {
        cy.fixture('wordpress/paginas.json').then((dados) => {
            paginas = dados
            cy.log(`Total de páginas: ${paginas.length}`)
        })
    })

    it('Gerar o baseline visual das páginas', () => {

        const errosDeJsIgnorados = []

        cy.on('uncaught:exception', (err) => {

            const padroesConhecidos = [
                'mask is not a function'
            ]

            const eErroConhecido = padroesConhecidos.some((trecho) =>
                err.message.includes(trecho)
            )

            if (eErroConhecido) {
                errosDeJsIgnorados.push(
                    `${paginaAtual?.id} | ${paginaAtual?.url} | ${err.message}`
                )
                return false
            }

            return true 
        })

        paginas.forEach((pagina) => {

            paginaAtual = pagina

            cy.visit(pagina.url, { failOnStatusCode: false })

            cy.get("html, body").invoke("attr", "style", "height: auto; scroll-behavior: auto;")

            cy.get('header').hideElement()

            cy.clickButtonIfExists('Accept All')

            cy.removerElemento('.cky-btn-revisit-wrapper')

            cy.compareSnapshot({
                name: pagina.id,
                testThreshold: 0.2,
            })

        })

        cy.then(() => {
            if (errosDeJsIgnorados.length) {
                cy.log(
                    `${errosDeJsIgnorados.length} página(s) com erro de JS (mask) ignorado:\n${errosDeJsIgnorados.join('\n')}`
                )
            }
        })

    })

})