/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
   presets: ['module:metro-react-native-babel-preset'],
   plugins: [
      [
         'module-resolver',
         {
            root: ['./src'],
            extensions: ['.js', '.json', '.tsx', '.ts'],
            alias: {
               '@hooks': './src/hooks',
               '@assets': './src/theme/assets',
               '@atoms': './src/components/atoms',
               '@molecules': './src/components/molecules',
               '@organisms': './src/components/organisms',
               '@templates': './src/components/templates',
               '@services': './src/services',
               '@screens': './src/screens',
               types: './@types',
            },
         },
      ],
      'inline-dotenv',
      'react-native-reanimated/plugin', // needs to be last
   ],
};
