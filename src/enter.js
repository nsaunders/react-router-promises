export default function enter(operation) {
    return function(nextState, replace, callback) {
        operation(nextState, replace).then(() => callback()).catch(() => callback(new Error()));
    };
}
