"use strict";
/**
 * Created by eddyspreeuwers on 5/25/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Converter = (function () {
    function Converter() {
        this.src = __dirname + '/src';
        console.log('workking dir:  ' + __dirname);
    }
    Converter.prototype.convert = function () {
        console.log('converting' + this.src);
        walk(this.src);
    };
    return Converter;
}());
exports.Converter = Converter;
function walk(file) {
    var isFolder = fs.lstatSync(file).isDirectory();
    if (isFolder) {
        console.log('d:  ' + file);
        fs.readdir(file, function (err, files) {
            files.forEach(function (f) {
                walk(file + '/' + f);
            });
        });
    }
    else {
        if (/\.ts$/.test(file)) {
            console.log('f:  ' + file);
            var contents = fs.readFileSync(file).toString();
            var lines = contents.split(/\n/);
            var refs = lines.filter(function (f) { return /^\/\//.test(file); });
            console.log(refs);
        }
    }
}
new Converter().convert();
//# sourceMappingURL=convert.js.map