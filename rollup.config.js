import { execSync } from 'child_process';
import fs from 'fs';

import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';

const yalcPublisher = () =>
    // eslint-disable-next-line no-undef
    process.argv.includes( '--yalc' )
        ? {
            writeBundle: () =>
            {
                execSync( 'yalc publish --push', {
                    stdio: 'inherit'
                } );
            }
        }
        : {};

export default {
    input: 'src/index.ts',
    external: id => !( id.startsWith( '.' ) || id.startsWith( '/' ) ),
    output: [
        {
            dir: './dist',
            format: 'es',
            preserveModules: true,
            entryFileNames: '[name].js',
            assetFileNames: '[name]-[hash][extname]'
        }
    ],
    plugins: [
        del( { runOnce: true, targets: [ './dist/**/*' ] } ),
        typescript(),
        babel( {
            extensions: [ '.ts', '.tsx' ],
            babelHelpers: 'bundled',
            presets: [ 'solid' ]
        } ),
        styles(),
        {
            writeBundle ()
            {
                fs.writeFileSync( './dist/src/package.json', JSON.stringify( { type: 'module' }, null, '  ' ) );
            }
        },
        yalcPublisher()
    ]
};
