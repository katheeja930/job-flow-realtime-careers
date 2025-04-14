
import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const Scene3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Dynamically import Three.js to prevent SSR issues
    const loadThreeJS = async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');
      
      if (!containerRef.current) return;
      
      // Scene setup
      const scene = new THREE.Scene();
      const bgColor = theme === 'dark' ? 0x111827 : 0xf8fafc;
      scene.background = new THREE.Color(bgColor);
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      
      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);
      
      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Career path visualization - create a path of connected nodes
      const createCareerPath = () => {
        const group = new THREE.Group();
        
        // Create nodes representing career stages
        const nodeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const primaryColor = theme === 'dark' ? 0x3b82f6 : 0x2563eb;
        const nodeMaterial = new THREE.MeshStandardMaterial({ 
          color: primaryColor,
          metalness: 0.3,
          roughness: 0.4
        });
        
        // Create multiple career stages
        const positions = [
          new THREE.Vector3(-4, 0, 0),   // Entry level
          new THREE.Vector3(-2, 1, 0),   // Junior
          new THREE.Vector3(0, 0, 0),    // Mid-level
          new THREE.Vector3(2, 1, 0),    // Senior
          new THREE.Vector3(4, 2, 0),    // Lead
        ];
        
        // Create nodes
        const nodes: THREE.Mesh[] = [];
        positions.forEach(position => {
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.copy(position);
          group.add(node);
          nodes.push(node);
        });
        
        // Connect nodes with lines
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: theme === 'dark' ? 0x4b5563 : 0x9ca3af,
          linewidth: 2
        });
        
        for (let i = 0; i < nodes.length - 1; i++) {
          const points = [
            nodes[i].position,
            nodes[i + 1].position
          ];
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);
        }
        
        // Add decorative elements - skill clouds
        const skillGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const skillMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xff8844,
          metalness: 0.1,
          roughness: 0.8
        });
        
        for (let i = 0; i < 15; i++) {
          const skill = new THREE.Mesh(skillGeometry, skillMaterial);
          skill.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4 + 3,
            (Math.random() - 0.5) * 2
          );
          skill.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          skill.scale.multiplyScalar(0.5 + Math.random() * 0.5);
          group.add(skill);
        }
        
        return group;
      };
      
      const careerPath = createCareerPath();
      scene.add(careerPath);
      
      // Simple animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate the entire career path slightly
        careerPath.rotation.y += 0.003;
        
        controls.update();
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;
        
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    };
    
    loadThreeJS();
  }, [theme]);
  
  return <div ref={containerRef} className="w-full h-full" />;
};
