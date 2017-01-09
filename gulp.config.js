module.exports = {
    app:{
        base: "app/",
        assets: "app/assets/**/*",
        styles: "app/assets/**/*.css",
        less: "app/**/*.less",
        scripts: "app/scripts/*.js",
        baseHtml: "app/base.html",
        libs: "node_modules/**/*"
    },
    dist: {
        base: "dist/",
        assets: "dist/assets/",
        styles: "app/styles/",
        baseHtml: "dist/base.html",
        indexHtml: "dist/index.html",
        libs: "dist/node_modules",
        scripts: "dist/scripts",
        compiledSources: ['dist/**/*.js', 'dist/**/*.css', '!dist/node_modules/**/*']
    }
}