export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'key' },
    body: {
        id: '4',
        first: 'Антон',
        lastname: 'Туриста',
        age: 30,
        currency: 'RUB',
        country: 'Russia',
        city: 'Moscow',
        username: 'test',
        avatar: 'https://i.imgur.com/B29b18e.jpeg'
    }
});

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>,
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
