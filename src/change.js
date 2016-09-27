export default function change(operation) {
    return function(prevState, nextState, replace, callback) {
        operation(nextState, replace, prevState).then(() => callback()).catch(() => callback(new Error()));
    };
}
