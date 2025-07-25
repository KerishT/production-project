import path from 'path';

export default {
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest'
    },
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    moduleDirectories: [
        'node_modules'
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ],
    rootDir: '../../',
    modulePaths: ['<rootDir>/src'],
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec |test).[tj]s?(x)'
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    reporters: [
        'default',
        ['jest-html-reporters', {
            publicPath: '<rootDir>/reports/unit',
            filename: 'report.html',
            openReport: true,
            inlineSource: true
        }]
    ]
};
