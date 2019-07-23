import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import anotherModule from './another-module';

/*function component(){
    const element = document.createElement("div");
    element.innerHTML = _.join(['hello', 'webpack'], ' ');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}*/

function getComponent(){
    /*return import(/!* webpackChunkName: "lodash" *!/ 'lodash').then(({default: _ })=>{
        const element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }).catch(error => 'An error occurred while loading the Component');*/

    const element = document.createElement('div');

    //const { default: _ } = import(/* webpackChunkName: "lodash" */ 'lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);

    anotherModule();

    return element;
}

let element = getComponent();
document.body.appendChild(element);

/*let element;
getComponent().then(component => {
    document.body.appendChild(component)
    element = component;
})*/

if(module.hot){
    module.hot.accept('./print.js', function () {
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);

        console.log('Accept the update printMe module')
        printMe();
    });
}