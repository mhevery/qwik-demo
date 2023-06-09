import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { createNoise3D } from "simplex-noise";
import {
  SphereGeometry as SphereBufferGeometry,
  BoxGeometry as Geometry,
  Scene,
  Mesh,
  Points,
  WebGLRenderer,
  PerspectiveCamera,
  PointsMaterial,
  AdditiveBlending,
  MathUtils,
  AmbientLight,
  BackSide,
  DirectionalLight,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  type Texture,
  TextureLoader,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CSS from "./space-globe.css?inline";

type TEMP_ANY_TODO = any;

export default component$(() => {
  const containerSignal = useSignal<HTMLCanvasElement>();
  useStylesScoped$(CSS);

  useVisibleTask$(() => {
    const container = containerSignal.value!;
    const noise = createNoise3D();
    const blobScale = 3;
    let scene: Scene;
    let nucleus: Mesh;
    let stars: Points;
    let renderer: WebGLRenderer;
    let camera: PerspectiveCamera;
    let sphereBg: Mesh;
    let controls: OrbitControls;
    let timeout_Debounce: any;

    init();
    animate();

    function init() {
      scene = new Scene();

      const camera = new PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.set(0, 0, 230);

      const directionalLight = new DirectionalLight("#fff", 2);
      directionalLight.position.set(0, 50, -20);
      scene.add(directionalLight);

      const ambientLight = new AmbientLight("#ffffff", 1);
      ambientLight.position.set(0, 20, 20);
      scene.add(ambientLight);

      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      //OrbitControl
      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 4;
      controls.maxDistance = 350;
      controls.minDistance = 150;
      controls.enablePan = false;

      const loader = new TextureLoader();
      const textureSphereBg = loader.load(
        "https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg"
      );
      const texturenucleus = loader.load(
        "https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg"
      );
      const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
      const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");
      const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
      const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");

      /*  Nucleus  */
      texturenucleus.anisotropy = 16;
      const icosahedronGeometry = new IcosahedronGeometry(30, 10);
      const lambertMaterial = new MeshPhongMaterial({
        map: texturenucleus,
      });
      nucleus = new Mesh(icosahedronGeometry, lambertMaterial);
      scene.add(nucleus);

      /*    Sphere  Background   */
      textureSphereBg.anisotropy = 16;
      const geometrySphereBg = new SphereBufferGeometry(150, 40, 40);
      const materialSphereBg = new MeshBasicMaterial({
        side: BackSide,
        map: textureSphereBg,
      });
      sphereBg = new Mesh(geometrySphereBg, materialSphereBg);
      scene.add(sphereBg);

      /*    Moving Stars   */
      const starsGeometry: TEMP_ANY_TODO = new Geometry();

      for (let i = 0; i < 50; i++) {
        const particleStar: TEMP_ANY_TODO = randomPointSphere(150);

        particleStar.velocity = MathUtils.randInt(50, 200);

        particleStar.startX = particleStar.x;
        particleStar.startY = particleStar.y;
        particleStar.startZ = particleStar.z;

        starsGeometry.vertices.push(particleStar);
      }
      const starsMaterial = new PointsMaterial({
        size: 5,
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: AdditiveBlending,
      });
      starsMaterial.depthWrite = false;
      stars = new Points(starsGeometry, starsMaterial);
      scene.add(stars);

      /*    Fixed Stars   */
      function createStars(texture: Texture, size: number, total: number) {
        const pointGeometry: TEMP_ANY_TODO = new Geometry();
        const pointMaterial = new PointsMaterial({
          size: size,
          map: texture,
          blending: AdditiveBlending,
        });

        for (let i = 0; i < total; i++) {
          const radius = MathUtils.randInt(149, 70);
          const particles = randomPointSphere(radius);
          pointGeometry.vertices.push(particles);
        }
        return new Points(pointGeometry, pointMaterial);
      }
      scene.add(createStars(texture1, 15, 20));
      scene.add(createStars(texture2, 5, 5));
      scene.add(createStars(texture4, 7, 5));

      function randomPointSphere(radius: number) {
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
        const dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
        const dz = 0 + radius * Math.cos(phi);
        return new Vector3(dx, dy, dz);
      }
    }

    function animate() {
      //Stars  Animation
      (stars.geometry as TEMP_ANY_TODO).vertices.forEach(function (
        v: TEMP_ANY_TODO
      ) {
        v.x += (0 - v.x) / v.velocity;
        v.y += (0 - v.y) / v.velocity;
        v.z += (0 - v.z) / v.velocity;

        v.velocity -= 0.3;

        if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
          v.x = v.startX;
          v.y = v.startY;
          v.z = v.startZ;
          v.velocity = MathUtils.randInt(50, 300);
        }
      });

      //Nucleus Animation
      (nucleus.geometry as TEMP_ANY_TODO).vertices.forEach(function (
        v: Vector3
      ) {
        const time = Date.now();
        v.normalize();
        const distance =
          (nucleus.geometry as TEMP_ANY_TODO).parameters.radius +
          noise(v.x + time * 0.0005, v.y + time * 0.0003, v.z + time * 0.0008) *
            blobScale;
        v.multiplyScalar(distance);
      });
      (nucleus.geometry as TEMP_ANY_TODO).verticesNeedUpdate = true;
      (nucleus.geometry as TEMP_ANY_TODO).normalsNeedUpdate = true;
      (nucleus.geometry as TEMP_ANY_TODO).computeVertexNormals();
      (nucleus.geometry as TEMP_ANY_TODO).computeFaceNormals();
      nucleus.rotation.y += 0.002;

      //Sphere Beckground Animation
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      sphereBg.rotation.z += 0.002;

      controls.update();
      (stars.geometry as TEMP_ANY_TODO).verticesNeedUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    /*     Resize     */
    window.addEventListener("resize", () => {
      clearTimeout(timeout_Debounce);
      timeout_Debounce = setTimeout(onWindowResize, 80);
    });
    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
  return (
    <div>
      <h1>Space Globe</h1>
      <div ref={containerSignal}></div>
    </div>
  );
});
