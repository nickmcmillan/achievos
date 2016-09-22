// // handy function for making requests for JS files
// // http://stackoverflow.com/a/28002292
//
// var getScript = function(source, callback) {
//     var script = document.createElement('script');
//     var prior = document.getElementsByTagName('script')[0];
//     script.async = 1;
//     prior.parentNode.insertBefore(script, prior);
//
//     script.onload = script.onreadystatechange = function( _, isAbort ) {
//         if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
//             script.onload = script.onreadystatechange = null;
//             script = undefined;
//
//             if(!isAbort) { if(callback) callback(); }
//         }
//     };
//
//     script.src = source;
// }
//
// export {getScript}
