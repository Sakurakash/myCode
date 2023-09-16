module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    globals: {
        $: false,
        jquery: false
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['import'],
    rules: {
    // 强制语句结束添加，分号
        semi: ['error', 'always'],
        // 强制缩进2个空格
        indent: ['error', 4],
        // 方法名和刮号之间不加空格
        'space-before-function-paren': ['error', 'never'],
        'no-unexpected-multiline': 'off'
    }
};
