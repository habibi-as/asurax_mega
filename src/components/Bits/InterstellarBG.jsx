// src/components/Bits/InterstellarBG.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InterstellarBG({
  nebulaSpeed = 0.12,
  starCount = 1600,
  starSize = 1.2,
  parallaxStrength = 0.06
}) {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const el = mountRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(el.clientWidth, el.clientHeight, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    el.appendChild(renderer.domElement);

    // camera
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 120;

    // Resize helper
    const onResize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ---- Starfield (points) ----
    const starsGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = THREE.MathUtils.randFloatSpread(800); // spread
      const phi = THREE.MathUtils.randFloatSpread(Math.PI);
      const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2);
      const x = Math.cos(theta) * Math.cos(phi) * r;
      const y = Math.sin(phi) * r * 0.4; // flatten a bit
      const z = Math.sin(theta) * Math.cos(phi) * r;
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      // subtle color variance
      const t = Math.random() * 0.6 + 0.4;
      colors[i * 3 + 0] = 0.6 * t;
      colors[i * 3 + 1] = 0.65 * t;
      colors[i * 3 + 2] = 1.0 * t;
    }
    starsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: starSize,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const stars = new THREE.Points(starsGeom, starsMaterial);
    scene.add(stars);

    // ---- Nebula plane with simple shader-like noise (using baked fragment shader, no external libs) ----
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
        u_speed: { value: nebulaSpeed },
        u_intensity: { value: 0.9 },
        u_color1: { value: new THREE.Color(0x0b0b14) }, // deep
        u_color2: { value: new THREE.Color(0x2e2b66) }, // blue-purple
        u_color3: { value: new THREE.Color(0x8b44ff) }  // magenta highlights
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_speed;
        uniform float u_intensity;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform vec3 u_color3;

        // Classic 2D noise (iq)
        float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i+vec2(1.0,0.0));
          float c = hash(i+vec2(0.0,1.0));
          float d = hash(i+vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.5;
          for(int i=0;i<5;i++){
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main(){
          vec2 uv = (vUv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);
          float t = u_time * u_speed;

          // layered fbm
          float n = fbm(uv * 1.2 + vec2(t*0.05, -t*0.03));
          float n2 = fbm(uv * 3.0 + vec2(-t*0.02, t*0.04));
          float neb = smoothstep(0.18,0.78, n*0.6 + 0.4*n2);

          // color mix
          vec3 col = mix(u_color1, u_color2, clamp((n*1.6 - 0.1), 0.0, 1.0));
          col = mix(col, u_color3, pow(clamp(n2, 0.0, 1.0), 2.0));

          // vignette & subtle star specks
          float vign = smoothstep(0.8, 0.2, length(uv)*0.9);
          float specks = step(0.996, fract(sin(dot(uv*543.23, vec2(12.9898,78.233))) * 43758.5453 + t*10.0));
          vec3 finalCol = col * neb * u_intensity + specks * vec3(1.0,0.9,1.0)*0.08;
          finalCol *= vign;
          gl_FragColor = vec4(finalCol, clamp(neb*1.0, 0.0, 0.95));
        }
      `
    });

    // large slightly curved plane
    const planeGeo = new THREE.PlaneGeometry(400, 220, 1, 1);
    const plane = new THREE.Mesh(planeGeo, nebulaMaterial);
    plane.position.z = -30;
    plane.rotation.x = -0.05;
    plane.scale.set(1.6, 1.6, 1);
    scene.add(plane);

    // subtle lights
    const keyLight = new THREE.PointLight(0x6b44ff, 0.35, 800);
    keyLight.position.set(120, 60, 60);
    scene.add(keyLight);
    const fill = new THREE.PointLight(0x2ea6ff, 0.18, 800);
    fill.position.set(-80, -40, 40);
    scene.add(fill);

    // animate
    let t0 = performance.now();
    function animate(now) {
      const elapsed = (now - t0) / 1000;
      nebulaMaterial.uniforms.u_time.value = elapsed;
      // rotate stars slowly
      stars.rotation.y = elapsed * 0.02;
      // subtle parallax - camera moves slightly toward mouse
      const targetX = (mouse.current.x - 0.5) * parallaxStrength * 120;
      const targetY = (mouse.current.y - 0.5) * parallaxStrength * 60;
      camera.position.x += (targetX - camera.position.x) * 0.06;
      camera.position.y += (targetY - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }
    frameRef.current = requestAnimationFrame(animate);

    // mouse move
    function onMouse(e) {
      const rect = el.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    }
    window.addEventListener('pointermove', onMouse);

    // cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMouse);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [nebulaSpeed, starCount, starSize, parallaxStrength]);

  return <div ref={mountRef} className="interstellar-bg" aria-hidden style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: -9 }} />;
}
