'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FlowParticles() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mountNode = mountRef.current
    if (!mountNode) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup - looking diagonally down at the wave
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(0, 100, 200)
    camera.lookAt(0, 0, -100)

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Position canvas to cover the wrapper
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.zIndex = '0'
    renderer.domElement.style.pointerEvents = 'none'
    
    mountNode.appendChild(renderer.domElement)

    // Particles Settings
    const particleCount = 8000 // Dense particle field
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount) // For organic randomness

    const spreadWidth = 800
    const spreadDepth = 800 // Deep horizon
    
    for (let i = 0; i < particleCount; i++) {
      // Spread across x and z plane
      const x = (Math.random() - 0.5) * spreadWidth
      // Push particles deep into the background (horizon)
      const z = (Math.random() * -spreadDepth) + 100 
      const y = (Math.random() - 0.5) * 10 
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      randoms[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    // Shader Material for advanced fluid / audio wave effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        // Probe Brand Color: #d7145b
        color: { value: new THREE.Color('#d7145b') }
      },
      vertexShader: `
        uniform float time;
        attribute float aRandom;
        
        varying float vDepth;
        
        void main() {
          vec3 pos = position;
          
          // Combine multiple sine waves for complex organic fluid motion (voice wave)
          float wave1 = sin(pos.x * 0.03 + time * 0.8) * 15.0;
          float wave2 = cos(pos.z * 0.04 - time * 0.5) * 10.0;
          float wave3 = sin(pos.x * 0.01 + pos.z * 0.02 + time) * 20.0;
          
          // Mix waves, localized by randomness
          float displacement = wave1 + wave2 + wave3;
          
          // Make the wave taper off at the far edges horizontally
          float edgeFade = 1.0 - smoothstep(100.0, 400.0, abs(pos.x));
          
          pos.y += displacement * edgeFade * (0.5 + aRandom * 0.5);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Pass depth to fragment shader for horizon fade
          vDepth = -mvPosition.z;
          
          // Dynamic particle sizes based on depth and slight randomness
          gl_PointSize = (4.0 + aRandom * 2.0) * (200.0 / vDepth);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        varying float vDepth;
        
        void main() {
          // Soft circle
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float dist = length(xy);
          if (dist > 0.5) discard;
          
          // Smooth inner opacity fade
          float op = (0.5 - dist) * 2.0;
          
          // Horizon fade: transparent as it goes far away
          float depthFade = 1.0 - smoothstep(100.0, 600.0, vDepth);
          
          // Extremely subtle opacity to ensure it looks premium and not overwhelming
          gl_FragColor = vec4(color, op * 0.25 * depthFade);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    })

    const particles = new THREE.Points(geometry, material)
    
    scene.add(particles)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      material.uniforms.time.value = elapsedTime * 0.6
      
      // Gentle floating rotation to give a 3D volume feel
      particles.rotation.y = Math.sin(elapsedTime * 0.05) * 0.05
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize gracefully
    const handleResize = () => {
      if (mountNode) {
        // We use window dimensions here, but in a real dashboard we might want parent dimensions
        const width = window.innerWidth
        const height = window.innerHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        
        renderer.setSize(width, height)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}
