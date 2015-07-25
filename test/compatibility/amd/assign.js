requirejs.config({
    baseUrl: '../../dist',
});
requirejs(['request-frame'],
    function(requestFrame) {
        var div = document.getElementsByTagName('div');

        // Assign functions
        var request = requestFrame('request');
        var cancel = requestFrame('cancel');

        // Expose the functions on screen
        (function exposeFunctions(timestamp) {

            // Show the request function
            div[0].innerHTML = request;

            // Show the cancel function
            div[1].innerHTML = cancel;

            // Show the high resolution timestamp
            div[2].innerHTML = timestamp;

            // request the frame
            request(exposeFunctions);
        }());
    });
