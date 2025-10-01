describe('Connexion', () => {
  it('Se connecte avec succès', () => {
    cy.visit('/#/');
    cy.get('input[type="email"]').type('user1@facadia.com');
    cy.get('input[type="password"]').type('azerty');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/#/home');
    cy.contains('Accueil');
  });
});
