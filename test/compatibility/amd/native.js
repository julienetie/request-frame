requirejs.config({
    baseUrl: '../../dist',
});
requirejs(['request-frame'],
    function(requestFrame) {
        // Re-assign native functions
        requestFrame('native');
    });
