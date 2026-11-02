import gsap from 'gsap'
import * as THREE from 'three'

export function buildOrb(hero: HTMLElement, before: HTMLElement) {
  const canvas = document.createElement('canvas')
  canvas.id = 'hz-orb'
  before.parentElement?.insertBefore(canvas, before)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 7.5
  const group = new THREE.Group()
  scene.add(group)
  const radius = 2.3
  const uniforms = { uTime: { value: 0 }, uProg: { value: 0 }, uPR: { value: renderer.getPixelRatio() } }

  const count = 2600
  const positions: number[] = []
  const randoms: number[] = []
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = Math.PI * (3 - Math.sqrt(5)) * index
    const jitter = 1 + (Math.random() - 0.5) * 0.12
    positions.push(Math.cos(theta) * ring * radius * jitter, y * radius * jitter, Math.sin(theta) * ring * radius * jitter)
    randoms.push(Math.random())
  }

  const nodes: THREE.Vector3[] = []
  for (let index = 0; index < 150; index += 1) {
    const up = Math.random() * 2 - 1
    const theta = Math.random() * Math.PI * 2
    const ring = Math.sqrt(1 - up * up)
    const nodeRadius = radius * (0.55 + Math.random() * 0.5)
    const point = new THREE.Vector3(ring * Math.cos(theta) * nodeRadius, up * nodeRadius, ring * Math.sin(theta) * nodeRadius)
    nodes.push(point)
    positions.push(point.x, point.y, point.z)
    randoms.push(1.4 + Math.random())
  }

  const dust = new THREE.BufferGeometry()
  dust.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  dust.setAttribute('aRand', new THREE.Float32BufferAttribute(randoms, 1))
  const dustMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: 'attribute float aRand;uniform float uTime,uProg,uPR;varying float vR;varying float vY;void main(){vR=aRand;vec3 p=position*(1.0+uProg*(0.6+fract(aRand*7.0)*0.9));p+=normalize(position)*sin(uTime*1.2+aRand*40.0)*0.03;vY=normalize(position).y;vec4 mv=modelViewMatrix*vec4(p,1.0);float s=aRand>1.0?(5.0+aRand*2.0):(1.2+aRand*2.0);gl_PointSize=s*uPR*(6.0/-mv.z);gl_Position=projectionMatrix*mv;}',
    fragmentShader: 'uniform float uTime,uProg;varying float vR;varying float vY;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;float a=smoothstep(0.5,0.0,d);vec3 c=mix(vec3(0.49,0.33,1.0),vec3(0.56,0.89,1.0),vY*0.5+0.5);if(vR>1.0){c=mix(c,vec3(1.0),0.45);a*=0.9+0.4*sin(uTime*3.0+vR*20.0);}else{a*=0.45+0.35*sin(uTime*2.0+vR*50.0);}gl_FragColor=vec4(c,a*(1.0-uProg*0.75));}',
  })
  group.add(new THREE.Points(dust, dustMaterial))

  const linePositions: number[] = []
  const lineT: number[] = []
  const linePhase: number[] = []
  for (let start = 0; start < nodes.length; start += 1) {
    for (let end = start + 1; end < nodes.length; end += 1) {
      if (nodes[start].distanceTo(nodes[end]) < 1.05) {
        const phase = Math.random()
        const from = nodes[start]
        const to = nodes[end]
        linePositions.push(from.x, from.y, from.z, to.x, to.y, to.z)
        lineT.push(0, 1)
        linePhase.push(phase, phase)
      }
    }
  }
  const lines = new THREE.BufferGeometry()
  lines.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  lines.setAttribute('aT', new THREE.Float32BufferAttribute(lineT, 1))
  lines.setAttribute('aPh', new THREE.Float32BufferAttribute(linePhase, 1))
  const lineMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: 'attribute float aT,aPh;uniform float uProg;varying float vT;varying float vPh;void main(){vT=aT;vPh=aPh;vec3 p=position*(1.0+uProg*0.9);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}',
    fragmentShader: 'uniform float uTime,uProg;varying float vT;varying float vPh;void main(){float h=fract(uTime*0.35+vPh);float pulse=smoothstep(0.12,0.0,abs(vT-h));vec3 c=mix(vec3(0.55,0.42,1.0),vec3(0.56,0.89,1.0),pulse);gl_FragColor=vec4(c,(0.07+pulse*0.8)*(1.0-uProg));}',
  })
  group.add(new THREE.LineSegments(lines, lineMaterial))

  const resize = () => {
    const width = hero.clientWidth
    const height = hero.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
    group.position.y = width < 700 ? 0.6 : 0.35
    group.scale.setScalar(width < 700 ? 0.72 : 1)
  }
  resize()
  window.addEventListener('resize', resize)

  const progress = { value: 0 }
  gsap.to(progress, { value: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } })
  gsap.from(canvas, { opacity: 0, scale: 0.85, duration: 2.4, delay: 0.2, ease: 'expo.out' })

  let pointerX = 0
  let pointerY = 0
  let tiltX = 0
  let tiltY = 0
  const onPointer = (event: PointerEvent) => {
    pointerX = event.clientX / innerWidth - 0.5
    pointerY = event.clientY / innerHeight - 0.5
  }
  window.addEventListener('pointermove', onPointer)

  let visible = true
  const observer = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? false })
  observer.observe(hero)
  const timer = new THREE.Timer()
  let alive = true
  const tick = () => {
    if (!alive || !visible) return
    timer.update()
    const time = timer.getElapsed()
    uniforms.uTime.value = time
    uniforms.uProg.value = progress.value
    tiltX += (pointerX - tiltX) * 0.04
    tiltY += (pointerY - tiltY) * 0.04
    group.rotation.y = time * 0.08 + tiltX * 0.6 + progress.value * 1.2
    group.rotation.x = 0.25 + tiltY * 0.4
    renderer.render(scene, camera)
  }
  gsap.ticker.add(tick)

  return () => {
    alive = false
    gsap.ticker.remove(tick)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointer)
    observer.disconnect()
    dust.dispose()
    lines.dispose()
    dustMaterial.dispose()
    lineMaterial.dispose()
    renderer.dispose()
    canvas.remove()
  }
}
