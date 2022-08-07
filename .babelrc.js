module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src/ijest',
          '@ijest': './test/index.ts',
          'ijest': './src/ijest/index.ts',
        },
      },
    ],
    // '@babel/plugin-transform-runtime'
  ],
};
