require.config({
    paths: {
        spec: "../tests/spec",
    },
});

require([
    'Cell',
    'SnakeWorldOptions',
    'Theme',
    'ContinuousSequence',
    'wrap',
]);
