import webpack from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    };

    const svgLoader = buildSvgLoader();

    const fontLoader = {
        test: /\.(woff2?|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]'
        }
    };

    return [
        fileLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
        fontLoader,
        svgLoader
    ];
}
