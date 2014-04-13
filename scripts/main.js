require.config({
    baseUrl: 'scripts',
    paths: {
        spec: "tests/spec",
        "google-analytics": [
            "//www.google-analytics.com/analytics",
            "vendor/google-analytics" // this is your local copy
        ],
    },
    shim: {
        "google-analytics": {
            exports: "ga",
        },
    }
});
