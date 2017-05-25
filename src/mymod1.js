/**
 * Created by eddyspreeuwers on 5/25/17.
 */
var mymod1;
(function (mymod1) {
    var myDep = (function () {
        function myDep() {
        }
        return myDep;
    }());
    mymod1.myDep = myDep;
})(mymod1 || (mymod1 = {}));
//# sourceMappingURL=mymod1.js.map