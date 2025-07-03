import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
    describe('User not authorized', () => {
        it('Go to home page', () => {
            cy.visit('/');

            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Transition opens the profile page', () => {
            cy.visit('/profile/1');

            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Transition opens a non-existent route', () => {
            cy.visit('/wrong-url');

            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User authorized', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Transition opens the profile page', () => {
            cy.visit('/profile/1');

            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Transition opens the articles page', () => {
            cy.visit('/articles');

            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
