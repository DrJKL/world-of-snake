require.config({
    baseUrl: 'scripts',
    paths: {
        spec: "tests/spec",
        hammer: [
            "//raw.github.com/jantimon/hammer.js/master/dist/hammer.min",
            "vendor/hammer.min"
        ],
    },
    shim: {
        "google-analytics": {
            exports: "ga",
        },
    }
});
