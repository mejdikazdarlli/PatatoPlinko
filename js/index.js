import { CARviewer} from './MKViewer.js';
import * as THREE from './THREE/three.module.js';
function _(elm){return document.getElementById(elm)}

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}
document.addEventListener( 'mousemove', onDocumentMouseMove );
let Viewer = new CARviewer(_("MKViewer"))
Viewer.initScene()
Viewer.animate()
Viewer.render = function () {
    targetX = mouseX * .001;
    targetY = mouseY * .001;
    Viewer.scene.traverse(function (child) {
        if (child.name=="master") {
            child.rotation.y += 0.05 * (targetX - child.rotation.y);
            child.rotation.x += 0.05 * (targetY - child.rotation.x);
        }
    })
    Viewer.renderer.render(Viewer.scene, Viewer.camera);
}

