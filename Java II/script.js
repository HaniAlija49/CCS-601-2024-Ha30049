import * as THREE from 'three';

const scene = new THREE.Scene();

const bodySizes = {
    bottom: 1,
    middle: 0.75,
    top: 0.5,
    hatSize: 0.5
};

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const detailMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const noseMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const hatMaterial = new THREE.MeshBasicMaterial({ color: 0x964B00 });

const bottomSphere = new THREE.Mesh(new THREE.SphereGeometry(bodySizes.bottom, 32, 32), bodyMaterial);
const middleSphere = new THREE.Mesh(new THREE.SphereGeometry(bodySizes.middle, 32, 32), bodyMaterial);
const topSphere = new THREE.Mesh(new THREE.SphereGeometry(bodySizes.top, 32, 32), bodyMaterial);

bottomSphere.position.y = bodySizes.bottom - 3;
middleSphere.position.y = bodySizes.bottom - 3 + bodySizes.middle * 2;
topSphere.position.y = bodySizes.bottom - 2.7 + bodySizes.middle * 2 + bodySizes.top * 1.5;

scene.add(bottomSphere, middleSphere, topSphere);

const eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const leftEye = new THREE.Mesh(eyeGeometry, detailMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, detailMaterial);

leftEye.position.set(-0.15, topSphere.position.y + 0.1, 0.45);
rightEye.position.set(0.15, topSphere.position.y + 0.1, 0.45);

scene.add(leftEye, rightEye);

const noseGeometry = new THREE.ConeGeometry(0.05, 0.2, 32);
const nose = new THREE.Mesh(noseGeometry, noseMaterial);

nose.position.set(0, topSphere.position.y, 0.5);
nose.rotation.x = Math.PI / 2;

scene.add(nose);

const button1 = new THREE.Mesh(eyeGeometry, detailMaterial);
const button2 = new THREE.Mesh(eyeGeometry, detailMaterial);
const button3 = new THREE.Mesh(eyeGeometry, detailMaterial);

button1.position.set(0, middleSphere.position.y + 0.2, bodySizes.middle + 0.1);
button2.position.set(0, middleSphere.position.y, bodySizes.middle + 0.1);
button3.position.set(0, middleSphere.position.y - 0.2, bodySizes.middle + 0.1);

scene.add(button1, button2, button3);

const hatGeometry = new THREE.BoxGeometry(bodySizes.hatSize, bodySizes.hatSize, bodySizes.hatSize);
const hat = new THREE.Mesh(hatGeometry, hatMaterial);

hat.position.set(0, topSphere.position.y + 0.6, 0);

scene.add(hat);

const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

renderer.render(scene, camera);
