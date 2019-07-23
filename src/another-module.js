import _ from 'lodash';

console.log(
    _.join(['Another', 'modules', 'loaded'], '')
)

export default function anotherModule() {
    console.log("this is anotherModule");
}