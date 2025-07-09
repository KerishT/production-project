let profileId = '';

describe('Profile edit', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;

            cy.visit(`/profile/${data.id}`);
        });
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it('Profile successfully uploaded', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'Антон');
    });

    it('Editing profile', () => {
        const newName = 'Борис';
        const newLastname = 'Бритва';

        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
    });
});
