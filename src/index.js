import './main.scss'
import * as THREE from 'three'
import uos from 'uos'

const rotate_radius = 50

const renderer = new THREE.WebGLRenderer({
  antialias: true,
})

renderer.setClearColor(0x212121, 0)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1)

const container = document.querySelector('.container')
container.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
)
camera.position.set(0, 0, rotate_radius)
camera.lookAt(scene.position)
scene.add(camera)

const ambientLight = new THREE.AmbientLight('#ffffff', 0.1)
scene.add(ambientLight)

const light = new THREE.SpotLight(0xffffff, 1, 80, Math.PI * 0.25, 1, 2)
light.position.set(0, 40, 0)
scene.add(light)

const geometry = new THREE.BoxBufferGeometry(5, 5, 5)
const material = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material)
const cube3 = new THREE.Mesh(geometry, material)
cube2.position.x = 10
cube2.scale.set(0.5, 0.5, 0.5)
cube3.position.y = 10
cube3.scale.set(0, 0, 0)
scene.add(cube, cube2, cube3)

function render() {
  camera.lookAt(scene.position)
  renderer.render(scene, camera)
}
render()

uos(0.5, 1, (progress) => {
  camera.position.x = rotate_radius * Math.sin(360 * progress * (Math.PI / 180))
  camera.position.z = rotate_radius * Math.cos(360 * progress * (Math.PI / 180))

  render()
})

uos(0, 0.5, (progress) => {
  camera.position.y = 50 * progress
  render()
})

uos(0, 1, (progress) => {
  cube3.scale.set(progress * 2, progress * 2, progress * 2)
})

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}
window.addEventListener('resize', resize, false)
