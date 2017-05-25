/**
 * Created by eddyspreeuwers on 5/25/17.
 */
var mymodule;
(function (mymodule) {
    var myClass = (function () {
        function myClass() {
        }
        return myClass;
    }());
    mymodule.myClass = myClass;
})(mymodule || (mymodule = {}));
//# sourceMappingURL=module1.js.map