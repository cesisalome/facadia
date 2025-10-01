describe('Connexion et ajout de capteur', () => {
  it('Se connecte puis ajoute un capteur', () => {
    cy.visit('/#/');
    cy.get('input[type="email"]').type('user1@facadia.com');
    cy.get('input[type="password"]').type('azerty');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/#/home');
    cy.contains('Accueil');
    cy.visit('/#/add-sensor');
    cy.get('input[name="name"]').type('CapteurE2E2');
    cy.get('input[name="type"]').type('temperature');
    cy.get('button[type="submit"]').click();
    cy.get('#sensor-message').should('contain', 'succès');
  });
});
