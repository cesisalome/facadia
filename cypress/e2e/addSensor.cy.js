describe('Ajout d\'un capteur', () => {
  it('Ajoute un capteur avec succès', () => {
    cy.visit('/#/add-sensor');
    cy.get('input[name="name"]').type('CapteurE2E');
    cy.get('input[name="type"]').type('temperature');
    cy.get('button[type="submit"]').click();
    cy.get('#sensor-message').should('contain', 'succès');
  });
});
