// Call this function to Route Handlers in order to skip the try/catch block statement
// in order to catch the errors in async functions 
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};