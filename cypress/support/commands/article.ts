import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'Testing article',
    subtitle: 'Биология',
    img: 'https://i.imgur.com/B29b18e.jpeg',
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    type: ['SCIENCE'],
    blocks: []
};

export const createArticle = (article?: Article) => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { Authorization: 'key' },
    body: article ?? defaultArticle
}).then((resp) => resp.body);

export const removeArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'key' }
});

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>,
            removeArticle(articleId: string): Chainable<void>
        }
    }
}
