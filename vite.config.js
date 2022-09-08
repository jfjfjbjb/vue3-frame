import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import postcssPresetEnv from 'postcss-preset-env';
import { viteMockServe } from 'vite-plugin-mock';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import svgLoader from 'vite-svg-loader';
import commonjs from 'vite-plugin-commonjs'
// 引入theme
import theme from './src/style/theme';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: './src/mock'
      }),
      eslint({
        cache: false
      }),
      svgLoader(),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
            resolveIcons: true
          })
        ]
      }),
      commonjs()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnv]
      },
      preprocessorOptions: {
        less: {
          modifyVars: theme['compact'],
          javascriptEnabled: true,
          charset: false,
          additionalData: '@import "./src/style/var.less";'
        }
      }
    },
    build: {
      // assetsInlineLimit: 10000
    }
  };
});
