require.config({
    baseUrl: 'scripts',
    paths: {
        spec: "tests/spec",
    },
    shim: {
        "google-analytics": {
            exports: "ga",
        },
    }
});
