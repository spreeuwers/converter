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
        fs.readdir(this.src, function (err, files) {
            files.forEach(function (file) {
                console.log(file);
            });
        });
    };
    return Converter;
}());
exports.Converter = Converter;
new Converter().convert();
//# sourceMappingURL=convert.js.map