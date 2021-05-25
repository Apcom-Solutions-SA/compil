'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

const defaultSettings = require('./src/settings.js')
const name = defaultSettings.title || 'vue Element Admin' // page title

module.exports = {
    pwa: {
        name: name,
        themeColor: '#fff', // white
        msTileColor: '#2D2D2D',  // dark grey, same color with logo
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
    },
    configureWebpack: {
        devtool: 'source-map',
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        config
            .plugin('html')
            .tap(args => {
                args[0].title = name;
                return args;
            })
    }
}