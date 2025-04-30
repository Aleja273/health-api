// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
{
ignores: ['eslint.config.mjs'],
},
eslint.configs.recommended,
...tseslint.configs.recommendedTypeChecked,
{
languageOptions: {
globals: {
...globals.node,
...globals.jest,
},
sourceType: 'commonjs',
parserOptions: {
projectService: true,
tsconfigRootDir: import.meta.dirname,
},
},
},
prettierConfig, // 💡 Evita conflictos con Prettier
{
rules: {
'@typescript-eslint/no-explicit-any': 'off',
'@typescript-eslint/no-floating-promises': 'warn',
'@typescript-eslint/no-unsafe-argument': 'warn',
// Opcional: puedes añadir reglas específicas aquí
},
}
);