module.exports = (api) => {
  const isTest = api.env('test')
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 1 versions', 'iOS 12-13'],
          },
          useBuiltIns: 'usage',
          corejs: { version: 3, proposals: true },
          modules: isTest ? 'commonjs' : false,
        },
      ],
      ['@babel/typescript'],
    ],
  }
}
