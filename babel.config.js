module.exports = api => {
  const isTest = api.env('test')
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 1 versions', 'iOS 10-12'],
          },
          useBuiltIns: 'usage',
          corejs: 3,
          modules: isTest ? 'commonjs' : false,
        },
      ],
      ['@babel/typescript'],
    ],
    plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-optional-chaining'],
  }
}
