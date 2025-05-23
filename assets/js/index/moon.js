
   
        const img = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/06a094a4-7bd7-4bb9-b998-6c1e17f66c08/dbcju0k-b9b333e1-dd8d-4657-90db-7d3e7e179843.png';

        class MoonApp {
            constructor(container) {
                this.container = container;
                this.renderer, this.sphere, this.camera = undefined;
                this.init();
            }

            init() {
                // scene setup
                this.scene = new THREE.Scene();

                // light setup
                this.pointLight = new THREE.PointLight(0xffffff, 0);
                this.pointLight.position.set(-30, 10, 30);
                this.pointLight.castShadow = true;
                this.scene.add(this.pointLight);

                // dime light
                new TweenMax.to(this.pointLight, 1, {
                    intensity: 1.2,
                    delay: 0.5
                });

                this.initCamera();
                this.initRenderer();
                this.createCanvas();
                this.render();
                this.initSphere();
                
                window.addEventListener("resize", () => {
                    this.onWindowResize();
                }, false);
                
                this.container.addEventListener("mousemove", event => {
                    this.handleMouseMove(event);
                });
                
                // Auto rotation
                this.autoRotate();
            }
            
            autoRotate() {
                if (this.sphere) {
                    this.rotationSpeed = 0.003;
                }
            }
            
            handleMouseMove(event) {
                const rect = this.container.getBoundingClientRect();
                const posX = event.clientX - rect.left;
                const posY = event.clientY - rect.top;
                
                // Normalize positions to be between -1 and 1
                const normalizedX = (posX / this.container.offsetWidth) * 2 - 1;
                const normalizedY = (posY / this.container.offsetHeight) * 2 - 1;
                
                this.pointLight.position.x = normalizedX * 30;
                this.pointLight.position.y = -normalizedY * 15;
            }

            createCanvas() {
                this.container.appendChild(this.renderer.domElement);
            }

            initRenderer() {
                this.renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true
                });
                
                this.renderer.setClearColor(0x000000, 0); // transparent background
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
            }

            initCamera() {
                this.camera = new THREE.PerspectiveCamera(45, this.container.offsetWidth / this.container.offsetHeight, 1, 1000);
                this.camera.position.z = 20;
                this.camera.position.y = 0;
            }

            render() {
                this.renderer.render(this.scene, this.camera);

                if (this.sphere !== undefined) {
                    this.sphere.rotation.y += this.rotationSpeed || 0.001;
                }

                requestAnimationFrame(() => this.render());
            }

            onWindowResize() {
                this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
            }

            initSphere() {
                var texloader = new THREE.TextureLoader();
                texloader.load(img, tex => {
                    let geometry = new THREE.SphereGeometry(5, 22, 22);
                    let material = new THREE.MeshPhongMaterial({
                        color: 0xB2B2B2,
                        normalMap: tex,
                        shininess: 0
                    });

                    this.sphere = new THREE.Mesh(geometry, material);
                    this.sphere.rotation.z = 0.5;
                    this.scene.add(this.sphere);

                    
                });
            }
        }

        // Initialize the moon when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const moonContainer = document.getElementById('moon-canvas');
            new MoonApp(moonContainer);
        });
    
