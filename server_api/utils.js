/**
 * @param expected {string[]} list of parameters expected in body
 * @param args {json} body
 * @return {boolean}
 */
function GetMissingParameters(expected, args) {
    let missing = [];
    for (const param of expected) {
        if (!(param in args)) {
            missing.push(param)
        }
    }
    return missing
}

module.exports = {
    GetMissingParameters
}