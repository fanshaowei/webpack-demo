import _ from "lodash";

export default function printMe() {
    //console.log('I get call from print.js!');
    console.log('update7 printMe');
    _.join(['Another', 'module', 'loaded'], '')
}