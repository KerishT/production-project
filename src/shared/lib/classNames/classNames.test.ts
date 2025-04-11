import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with aditional class', () => {
        const expected = 'someClass class 1 class 2';
        expect(classNames('someClass', {}, ['class 1', 'class 2'])).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass hovered';
        expect(classNames('someClass', { hovered: true, scrollable: false })).toBe(expected);
    });

    test('with mods undefined', () => {
        expect(classNames('someClass', { hovered: undefined })).toBe('someClass');
    });
});
