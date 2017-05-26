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
        // fs.readdir(this.src, (err, files) => {
        //     files.forEach(file => {
        //             console.log(file);
        //         }
        //     );
        // });
    };
    return Converter;
}());
exports.Converter = Converter;
function walk(file) {
    //console.log(file, fs.lstatSync(file).isDirectory());
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
        console.log('f:  ' + file);
    }
}
new Converter().convert();
//# sourceMappingURL=convert.js.map