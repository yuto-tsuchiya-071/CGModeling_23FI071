/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
//23FI071_土屋祐人




function generateSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, "rgba(255, 255, 200, 1)");
    gradient.addColorStop(0.2, "rgba(255, 215, 0, 1)");
    gradient.addColorStop(0.4, "rgba(184, 134, 11, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new three__WEBPACK_IMPORTED_MODULE_3__.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}
class ThreeJSContainer {
    scene;
    light;
    clock;
    camera;
    renderer;
    rootGroup;
    plane;
    constructor() {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        this.clock = new three__WEBPACK_IMPORTED_MODULE_3__.Clock(); // アニメーション速度を一定にするためのClock
    }
    // 画面部分の作成
    createRendererDOM = (width, height, cameraPos) => {
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x313838)); //背景色
        this.renderer.shadowMap.enabled = true;
        // カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(this.camera, this.renderer.domElement);
        this.createScene();
        orbitControls.update();
        this.animate();
        return this.renderer.domElement;
    };
    characterModel;
    loadGLBModel(path, position, scale = 1) {
        const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader();
        loader.load(path, (gltf) => {
            const model = gltf.scene;
            model.position.copy(position);
            model.rotateY(-Math.PI / 2);
            model.scale.set(scale, scale, scale);
            this.scene.add(model);
            this.characterModel = model;
        }, (progress) => {
            console.log(`モデル読み込み中: ${(progress.loaded / progress.total) * 100}%`);
        }, (error) => {
            console.error("GLBモデル読み込みエラー:", error);
        });
    }
    createScene = () => {
        this.rootGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        this.scene.add(this.rootGroup);
        // BlenderからエクスポートしたGLBモデルを追加
        this.loadGLBModel("chara.glb", new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(120, -5, 0), 12);
        // 平面の生成
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(500, 500);
        const planeMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshLambertMaterial({ color: 0x7d7d7d });
        this.plane = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(planeGeometry, planeMaterial);
        this.plane.receiveShadow = true;
        this.plane.position.y = -5;
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0xffffff, 0.8);
        this.light.position.set(1, 1, 1).clone().normalize();
        this.scene.add(this.light);
        // 複数魔法陣を作成                   (x座標,y座標,z座標),大きさ,角度
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-150, 150, 0), 2.0, Math.PI / 3, 0);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-150, 170, -75), 1.3, Math.PI / 3, 200);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-150, 210, -130), 1.3, Math.PI / 3, 400);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-150, 70, 135), 1.3, Math.PI / 3, 600);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-155, 170, 75), 1.3, Math.PI / 3, 800);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-155, 155, -150), 1.2, Math.PI / 3, 1000);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-155, 115, 160), 1.8, Math.PI / 3, 1200);
        this.createMagicCircleWithTween(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-155, 195, 180), 1.8, Math.PI / 3, 1400);
    };
    // 六芒星用の正三角形のパーティクル位置を返す
    createTrianglePoints(radius, startAngle = 0) {
        const points = [];
        const segmentsPerEdge = 100;
        // 頂点A, B, C を外円と同じ角度に配置
        const angleA = startAngle;
        const angleB = startAngle + (2 * Math.PI / 3);
        const angleC = startAngle + (4 * Math.PI / 3);
        const vertexA = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(radius * Math.cos(angleA), 0, radius * Math.sin(angleA));
        const vertexB = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(radius * Math.cos(angleB), 0, radius * Math.sin(angleB));
        const vertexC = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(radius * Math.cos(angleC), 0, radius * Math.sin(angleC));
        // A→B
        for (let i = 0; i <= segmentsPerEdge; i++) {
            const t = i / segmentsPerEdge;
            const x = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexA.x, vertexB.x, t);
            const z = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexA.z, vertexB.z, t);
            points.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, 0, z));
        }
        // B→C
        for (let i = 0; i <= segmentsPerEdge; i++) {
            const t = i / segmentsPerEdge;
            const x = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexB.x, vertexC.x, t);
            const z = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexB.z, vertexC.z, t);
            points.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, 0, z));
        }
        // C→A
        for (let i = 0; i <= segmentsPerEdge; i++) {
            const t = i / segmentsPerEdge;
            const x = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexC.x, vertexA.x, t);
            const z = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.lerp(vertexC.z, vertexA.z, t);
            points.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, 0, z));
        }
        return points;
    }
    ;
    magicCircleMaterials = [];
    magicCircles = [];
    createMagicCircleWithTween(center, scale, rotationZ, delay) {
        const group = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        group.position.copy(center);
        group.scale.set(0.01, 0.01, 0.01);
        group.rotation.z = rotationZ;
        // マテリアル
        const particleMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            size: 6,
            map: generateSprite(),
            transparent: true,
            alphaTest: 0.01,
            depthWrite: false,
            blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
            sizeAttenuation: true,
            opacity: 0.5
        });
        this.magicCircleMaterials.push(particleMaterial);
        const radius = 20;
        const allPoints = [];
        for (let i = 0; i < 200; i++) {
            const angle = (i / 200) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            allPoints.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, 0, z));
        }
        const triangle1 = this.createTrianglePoints(radius, 0);
        const triangle2 = this.createTrianglePoints(radius, Math.PI / 3);
        allPoints.push(...triangle1, ...triangle2);
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry().setFromPoints(allPoints);
        const points = new three__WEBPACK_IMPORTED_MODULE_3__.Points(geometry, particleMaterial);
        group.add(points);
        this.rootGroup.add(group);
        this.magicCircles.push(group);
        //全部の魔法陣が開いたら
        const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(group.scale)
            .to({ x: scale, y: scale, z: scale }, 1400)
            .delay(delay)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Elastic.Out);
        //最後の魔法陣で発光
        if (delay === 1400) {
            tween.onComplete(() => {
                // 魔法陣をすべて開いたら呼ぶ
                this.brightenMagicCircles();
                setTimeout(() => {
                    this.magicCircles.forEach((circle) => {
                        // 隕石を生成
                        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
                        const rockTexture = textureLoader.load('rock.jpg');
                        const sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.IcosahedronGeometry(30, 0); // 角ばった球
                        const sphereMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
                            map: rockTexture
                        });
                        const sphere = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(sphereGeometry, sphereMaterial);
                        sphere.position.copy(circle.position); // 魔法陣の中心から開始
                        this.scene.add(sphere);
                        this.spheres.push(sphere);
                        // 魔法陣の回転
                        const angle = rotationZ; //魔法陣の向きと同じ方向
                        //回転後のY軸方向
                        const direction = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(Math.sin(angle), -Math.cos(angle), 0);
                        const distance = 500;
                        const targetPos = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3().copy(circle.position).clone().add(direction.clone().multiplyScalar(distance));
                        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(sphere.position)
                            .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 12000)
                            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.Out)
                            .start();
                    });
                }, 2000);
            });
        }
        tween.start();
    }
    spheres = [];
    generateSpriteTexture() {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0.0, 'rgba(255, 255, 200, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 200, 50, 0.8)');
        gradient.addColorStop(0.7, 'rgba(255, 120, 0, 0.4)');
        gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        const texture = new three__WEBPACK_IMPORTED_MODULE_3__.CanvasTexture(canvas);
        return texture;
    }
    // 爆発エフェクト生成
    createExplosion(position) {
        const particleCount = 1550;
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 0] = position.x;
            positions[i * 3 + 1] = position.y;
            positions[i * 3 + 2] = position.z;
            const dir = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3((Math.random() - 0.5), Math.random(), (Math.random() - 0.5)).clone().normalize().clone().multiplyScalar(6 + Math.random() * 6);
            velocities.push(dir);
        }
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const sprite = this.generateSpriteTexture();
        const material = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            size: 30,
            map: sprite,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
            depthWrite: false,
            color: new three__WEBPACK_IMPORTED_MODULE_3__.Color(0xffcc66) // 金色系
        });
        const points = new three__WEBPACK_IMPORTED_MODULE_3__.Points(geometry, material);
        this.scene.add(points);
        // アニメーション用
        const startTime = performance.now();
        const duration = 12000;
        const animate = () => {
            const time = performance.now();
            const elapsed = time - startTime;
            const posAttr = geometry.getAttribute('position');
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 0] += velocities[i].x * 0.1;
                positions[i * 3 + 1] += velocities[i].y * 0.1;
                positions[i * 3 + 2] += velocities[i].z * 0.1;
            }
            posAttr.needsUpdate = true;
            material.opacity = 1 - elapsed / duration;
            if (elapsed < duration) {
                requestAnimationFrame(animate);
            }
            else {
                this.scene.remove(points);
                geometry.dispose();
                material.dispose();
            }
        };
        animate();
    }
    brightenMagicCircles() {
        this.magicCircleMaterials.forEach((material) => {
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween({ opacity: material.opacity, size: material.size })
                .to({ size: 20 }, 1000) // 1秒かけて発光強化
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.Out)
                .onUpdate(function (obj) {
                material.opacity = obj.opacity;
                material.size = obj.size;
            })
                .start();
        });
    }
    animate = () => {
        requestAnimationFrame(this.animate);
        _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].update();
        // 球体の落下チェック
        this.spheres.forEach((sphere, index) => {
            if (sphere.position.y <= this.plane.position.y + 1) {
                this.createExplosion(sphere.position.clone());
                this.scene.remove(sphere);
                this.spheres.splice(index, 1);
                setTimeout(() => {
                    if (this.characterModel) {
                        this.scene.remove(this.characterModel);
                        this.characterModel = undefined;
                    }
                }, 6000);
            }
        });
        this.renderer.render(this.scene, this.camera);
    };
}
// DOMの初期化処理
window.addEventListener("DOMContentLoaded", init);
function init() {
    const container = new ThreeJSContainer();
    const viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(400, 80, 260));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-84be97"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7Ozs7Ozs7VUM1WUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8yM0ZJMDcxX+Wcn+Wxi+elkOS6ulxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXJcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVTcHJpdGUoKTogVEhSRUUuVGV4dHVyZSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjYW52YXMud2lkdGggPSAxNjtcbiAgICBjYW52YXMuaGVpZ2h0ID0gMTY7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XG4gICAgY29uc3QgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxuICAgICAgICBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMCxcbiAgICAgICAgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCAvIDJcbiAgICApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LCAyNTUsIDIwMCwgMSlcIik7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgXCJyZ2JhKDI1NSwgMjE1LCAwLCAxKVwiKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCBcInJnYmEoMTg0LCAxMzQsIDExLCAxKVwiKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDAsIDAsIDAsIDEpXCIpO1xuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBjbG9jazogVEhSRUUuQ2xvY2s7XG4gICAgcHJpdmF0ZSBjYW1lcmEhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICBwcml2YXRlIHJlbmRlcmVyITogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgICBwcml2YXRlIHJvb3RHcm91cCE6IFRIUkVFLkdyb3VwO1xuICAgIHByaXZhdGUgcGxhbmU6IFRIUkVFLk1lc2g7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+mAn+W6puOCkuS4gOWumuOBq+OBmeOCi+OBn+OCgeOBrkNsb2NrXG4gICAgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgzMTM4MzgpKTsgLy/og4zmma/oibJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgLy8g44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG5cbiAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5hbmltYXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjaGFyYWN0ZXJNb2RlbD86IFRIUkVFLkdyb3VwO1xuXG4gICAgcHJpdmF0ZSBsb2FkR0xCTW9kZWwocGF0aDogc3RyaW5nLCBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMywgc2NhbGU6IG51bWJlciA9IDEpIHtcbiAgICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpO1xuXG4gICAgbG9hZGVyLmxvYWQoXG4gICAgICAgIHBhdGgsXG4gICAgICAgIChnbHRmKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IGdsdGYuc2NlbmU7XG4gICAgICAgICAgICBtb2RlbC5wb3NpdGlvbi5jb3B5KHBvc2l0aW9uKTtcbiAgICAgICAgICAgIG1vZGVsLnJvdGF0ZVkoLU1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIG1vZGVsLnNjYWxlLnNldChzY2FsZSwgc2NhbGUsIHNjYWxlKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKG1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgfSxcbiAgICAgICAgKHByb2dyZXNzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg44Oi44OH44Or6Kqt44G/6L6844G/5LitOiAkeyhwcm9ncmVzcy5sb2FkZWQgLyBwcm9ncmVzcy50b3RhbCkgKiAxMDB9JWApO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJHTELjg6Ljg4fjg6voqq3jgb/ovrzjgb/jgqjjg6njg7w6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICk7XG59XG5cblxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgdGhpcy5yb290R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnJvb3RHcm91cCk7XG4gICAgLy8gQmxlbmRlcuOBi+OCieOCqOOCr+OCueODneODvOODiOOBl+OBn0dMQuODouODh+ODq+OCkui/veWKoFxuICAgIHRoaXMubG9hZEdMQk1vZGVsKFwiY2hhcmEuZ2xiXCIsIG5ldyBUSFJFRS5WZWN0b3IzKDEyMCwgLTUsIDApLCAxMik7XG5cbiAgICAvLyDlubPpnaLjga7nlJ/miJBcbiAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNTAwLCA1MDApO1xuICAgIGNvbnN0IHBsYW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDdkN2Q3ZCB9KTtcbiAgICB0aGlzLnBsYW5lID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGxhbmVNYXRlcmlhbCk7XG4gICAgdGhpcy5wbGFuZS5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICB0aGlzLnBsYW5lLnBvc2l0aW9uLnkgPSAtNTtcbiAgICB0aGlzLnBsYW5lLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5wbGFuZSk7XG5cbiAgICAvLyDjg6njgqTjg4jjga7oqK3lrppcbiAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMC44KTtcbiAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgIC8vIOikh+aVsOmtlOazlemZo+OCkuS9nOaIkCAgICAgICAgICAgICAgICAgICAoeOW6p+aomSx55bqn5qiZLHrluqfmqJkpLOWkp+OBjeOBlSzop5LluqZcbiAgICB0aGlzLmNyZWF0ZU1hZ2ljQ2lyY2xlV2l0aFR3ZWVuKG5ldyBUSFJFRS5WZWN0b3IzKC0xNTAsIDE1MCwgMCksIDIuMCwgTWF0aC5QSSAvIDMsIDApO1xuICAgIHRoaXMuY3JlYXRlTWFnaWNDaXJjbGVXaXRoVHdlZW4obmV3IFRIUkVFLlZlY3RvcjMoLTE1MCwgMTcwLCAtNzUpLCAxLjMsIE1hdGguUEkgLyAzLCAyMDApO1xuICAgIHRoaXMuY3JlYXRlTWFnaWNDaXJjbGVXaXRoVHdlZW4obmV3IFRIUkVFLlZlY3RvcjMoLTE1MCwgMjEwLCAtMTMwKSwgMS4zLCBNYXRoLlBJIC8gMywgNDAwKTtcbiAgICB0aGlzLmNyZWF0ZU1hZ2ljQ2lyY2xlV2l0aFR3ZWVuKG5ldyBUSFJFRS5WZWN0b3IzKC0xNTAsIDcwLCAxMzUpLCAxLjMsIE1hdGguUEkgLyAzLCA2MDApO1xuICAgIHRoaXMuY3JlYXRlTWFnaWNDaXJjbGVXaXRoVHdlZW4obmV3IFRIUkVFLlZlY3RvcjMoLTE1NSwgMTcwLCA3NSksIDEuMywgTWF0aC5QSSAvIDMsIDgwMCk7XG4gICAgdGhpcy5jcmVhdGVNYWdpY0NpcmNsZVdpdGhUd2VlbihuZXcgVEhSRUUuVmVjdG9yMygtMTU1LCAxNTUsIC0xNTApLCAxLjIsIE1hdGguUEkgLyAzLCAxMDAwKTtcbiAgICB0aGlzLmNyZWF0ZU1hZ2ljQ2lyY2xlV2l0aFR3ZWVuKG5ldyBUSFJFRS5WZWN0b3IzKC0xNTUsIDExNSwgMTYwKSwgMS44LCBNYXRoLlBJIC8gMywgMTIwMCk7XG4gICAgdGhpcy5jcmVhdGVNYWdpY0NpcmNsZVdpdGhUd2VlbihuZXcgVEhSRUUuVmVjdG9yMygtMTU1LCAxOTUsIDE4MCksIDEuOCwgTWF0aC5QSSAvIDMsIDE0MDApO1xuXG59O1xuXG5cbi8vIOWFreiKkuaYn+eUqOOBruato+S4ieinkuW9ouOBruODkeODvOODhuOCo+OCr+ODq+S9jee9ruOCkui/lOOBmVxucHJpdmF0ZSBjcmVhdGVUcmlhbmdsZVBvaW50cyhyYWRpdXM6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyID0gMCk6IFRIUkVFLlZlY3RvcjNbXSB7XG4gICAgY29uc3QgcG9pbnRzOiBUSFJFRS5WZWN0b3IzW10gPSBbXTtcbiAgICBjb25zdCBzZWdtZW50c1BlckVkZ2UgPSAxMDA7XG5cbiAgICAvLyDpoILngrlBLCBCLCBDIOOCkuWkluWGhuOBqOWQjOOBmOinkuW6puOBq+mFjee9rlxuICAgIGNvbnN0IGFuZ2xlQSA9IHN0YXJ0QW5nbGU7XG4gICAgY29uc3QgYW5nbGVCID0gc3RhcnRBbmdsZSArICgyICogTWF0aC5QSSAvIDMpO1xuICAgIGNvbnN0IGFuZ2xlQyA9IHN0YXJ0QW5nbGUgKyAoNCAqIE1hdGguUEkgLyAzKTtcblxuICAgIGNvbnN0IHZlcnRleEEgPSBuZXcgVEhSRUUuVmVjdG9yMyhyYWRpdXMgKiBNYXRoLmNvcyhhbmdsZUEpLCAwLCByYWRpdXMgKiBNYXRoLnNpbihhbmdsZUEpKTtcbiAgICBjb25zdCB2ZXJ0ZXhCID0gbmV3IFRIUkVFLlZlY3RvcjMocmFkaXVzICogTWF0aC5jb3MoYW5nbGVCKSwgMCwgcmFkaXVzICogTWF0aC5zaW4oYW5nbGVCKSk7XG4gICAgY29uc3QgdmVydGV4QyA9IG5ldyBUSFJFRS5WZWN0b3IzKHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlQyksIDAsIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlQykpO1xuXG4gICAgLy8gQeKGkkJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZWdtZW50c1BlckVkZ2U7IGkrKykge1xuICAgICAgICBjb25zdCB0ID0gaSAvIHNlZ21lbnRzUGVyRWRnZTtcbiAgICAgICAgY29uc3QgeCA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKHZlcnRleEEueCwgdmVydGV4Qi54LCB0KTtcbiAgICAgICAgY29uc3QgeiA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKHZlcnRleEEueiwgdmVydGV4Qi56LCB0KTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoeCwgMCwgeikpO1xuICAgIH1cblxuICAgIC8vIELihpJDXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VnbWVudHNQZXJFZGdlOyBpKyspIHtcbiAgICAgICAgY29uc3QgdCA9IGkgLyBzZWdtZW50c1BlckVkZ2U7XG4gICAgICAgIGNvbnN0IHggPSBUSFJFRS5NYXRoVXRpbHMubGVycCh2ZXJ0ZXhCLngsIHZlcnRleEMueCwgdCk7XG4gICAgICAgIGNvbnN0IHogPSBUSFJFRS5NYXRoVXRpbHMubGVycCh2ZXJ0ZXhCLnosIHZlcnRleEMueiwgdCk7XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHgsIDAsIHopKTtcbiAgICB9XG5cbiAgICAvLyBD4oaSQVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNlZ21lbnRzUGVyRWRnZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBpIC8gc2VnbWVudHNQZXJFZGdlO1xuICAgICAgICBjb25zdCB4ID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAodmVydGV4Qy54LCB2ZXJ0ZXhBLngsIHQpO1xuICAgICAgICBjb25zdCB6ID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAodmVydGV4Qy56LCB2ZXJ0ZXhBLnosIHQpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMyh4LCAwLCB6KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbiAgICB9O1xuXG5wcml2YXRlIG1hZ2ljQ2lyY2xlTWF0ZXJpYWxzOiBUSFJFRS5Qb2ludHNNYXRlcmlhbFtdID0gW107XG5wcml2YXRlIG1hZ2ljQ2lyY2xlczogVEhSRUUuR3JvdXBbXSA9IFtdO1xuXG5wcml2YXRlIGNyZWF0ZU1hZ2ljQ2lyY2xlV2l0aFR3ZWVuKFxuICAgIGNlbnRlcjogVEhSRUUuVmVjdG9yMyxcbiAgICBzY2FsZTogbnVtYmVyLFxuICAgIHJvdGF0aW9uWjogbnVtYmVyLFxuICAgIGRlbGF5OiBudW1iZXJcbikge1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgZ3JvdXAucG9zaXRpb24uY29weShjZW50ZXIpO1xuICAgIGdyb3VwLnNjYWxlLnNldCgwLjAxLCAwLjAxLCAwLjAxKTtcbiAgICBncm91cC5yb3RhdGlvbi56ID0gcm90YXRpb25aO1xuXG4gICAgLy8g44Oe44OG44Oq44Ki44OrXG4gICAgY29uc3QgcGFydGljbGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgIHNpemU6IDYsXG4gICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoKSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIGFscGhhVGVzdDogMC4wMSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICBzaXplQXR0ZW51YXRpb246IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYWdpY0NpcmNsZU1hdGVyaWFscy5wdXNoKHBhcnRpY2xlTWF0ZXJpYWwpO1xuXG4gICAgY29uc3QgcmFkaXVzID0gMjA7XG4gICAgY29uc3QgYWxsUG9pbnRzOiBUSFJFRS5WZWN0b3IzW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjAwOyBpKyspIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIDIwMCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgY29uc3QgeCA9IHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgYWxsUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoeCwgMCwgeikpO1xuICAgIH1cblxuICAgIGNvbnN0IHRyaWFuZ2xlMSA9IHRoaXMuY3JlYXRlVHJpYW5nbGVQb2ludHMocmFkaXVzLCAwKTtcbiAgICBjb25zdCB0cmlhbmdsZTIgPSB0aGlzLmNyZWF0ZVRyaWFuZ2xlUG9pbnRzKHJhZGl1cywgTWF0aC5QSSAvIDMpO1xuICAgIGFsbFBvaW50cy5wdXNoKC4uLnRyaWFuZ2xlMSwgLi4udHJpYW5nbGUyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCkuc2V0RnJvbVBvaW50cyhhbGxQb2ludHMpO1xuICAgIGNvbnN0IHBvaW50cyA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIHBhcnRpY2xlTWF0ZXJpYWwpO1xuICAgIGdyb3VwLmFkZChwb2ludHMpO1xuXG4gICAgdGhpcy5yb290R3JvdXAuYWRkKGdyb3VwKTtcbiAgICB0aGlzLm1hZ2ljQ2lyY2xlcy5wdXNoKGdyb3VwKTtcblxuICAgIC8v5YWo6YOo44Gu6a2U5rOV6Zmj44GM6ZaL44GE44Gf44KJXG5jb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihncm91cC5zY2FsZSlcbiAgICAudG8oeyB4OiBzY2FsZSwgeTogc2NhbGUsIHo6IHNjYWxlIH0sIDE0MDApXG4gICAgLmRlbGF5KGRlbGF5KVxuICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KTtcblxuLy/mnIDlvozjga7prZTms5XpmaPjgafnmbrlhYlcbmlmIChkZWxheSA9PT0gMTQwMCkge1xuICAgIHR3ZWVuLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgIC8vIOmtlOazlemZo+OCkuOBmeOBueOBpumWi+OBhOOBn+OCieWRvOOBtlxuICAgIHRoaXMuYnJpZ2h0ZW5NYWdpY0NpcmNsZXMoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0aGlzLm1hZ2ljQ2lyY2xlcy5mb3JFYWNoKChjaXJjbGUpID0+IHtcblxuICAgIC8vIOmaleefs+OCkueUn+aIkFxuICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgIGNvbnN0IHJvY2tUZXh0dXJlID0gdGV4dHVyZUxvYWRlci5sb2FkKCdyb2NrLmpwZycpO1xuXG4gICAgY29uc3Qgc3BoZXJlR2VvbWV0cnkgPSBuZXcgVEhSRUUuSWNvc2FoZWRyb25HZW9tZXRyeSgzMCwgMCk7IC8vIOinkuOBsOOBo+OBn+eQg1xuICAgIGNvbnN0IHNwaGVyZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBtYXA6IHJvY2tUZXh0dXJlXG4gICAgfSk7XG4gICAgY29uc3Qgc3BoZXJlID0gbmV3IFRIUkVFLk1lc2goc3BoZXJlR2VvbWV0cnksIHNwaGVyZU1hdGVyaWFsKTtcbiAgICBzcGhlcmUucG9zaXRpb24uY29weShjaXJjbGUucG9zaXRpb24pOyAvLyDprZTms5XpmaPjga7kuK3lv4PjgYvjgonplovlp4tcbiAgICB0aGlzLnNjZW5lLmFkZChzcGhlcmUpO1xuICAgIHRoaXMuc3BoZXJlcy5wdXNoKHNwaGVyZSk7XG5cbiAgICAvLyDprZTms5XpmaPjga7lm57ou6JcbiAgICBjb25zdCBhbmdsZSA9IHJvdGF0aW9uWjsgLy/prZTms5XpmaPjga7lkJHjgY3jgajlkIzjgZjmlrnlkJFcblxuICAgIC8v5Zue6Lui5b6M44GuWei7uOaWueWQkVxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKE1hdGguc2luKGFuZ2xlKSwgLU1hdGguY29zKGFuZ2xlKSwgMCk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSA1MDA7XG5cbiAgICBjb25zdCB0YXJnZXRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkoY2lyY2xlLnBvc2l0aW9uKS5hZGQoZGlyZWN0aW9uLm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKSk7XG5cbiAgICBuZXcgVFdFRU4uVHdlZW4oc3BoZXJlLnBvc2l0aW9uKVxuICAgICAgICAudG8oeyB4OiB0YXJnZXRQb3MueCwgeTogdGFyZ2V0UG9zLnksIHo6IHRhcmdldFBvcy56IH0sIDEyMDAwKVxuICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAuc3RhcnQoKTtcbn0pO1xufSwgMjAwMCk7XG59KTtcbn1cbnR3ZWVuLnN0YXJ0KCk7XG59XG5cbnByaXZhdGUgc3BoZXJlczogVEhSRUUuTWVzaFtdID0gW107XG5cbmdlbmVyYXRlU3ByaXRlVGV4dHVyZSgpOiBUSFJFRS5UZXh0dXJlIHtcbiAgY29uc3Qgc2l6ZSA9IDEyODtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5oZWlnaHQgPSBzaXplO1xuXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgY29uc3QgZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgc2l6ZSAvIDIsIHNpemUgLyAyLCAwLFxuICAgIHNpemUgLyAyLCBzaXplIC8gMiwgc2l6ZSAvIDJcbiAgKTtcblxuICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCAncmdiYSgyNTUsIDI1NSwgMjAwLCAxKScpO1xuICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4zLCAncmdiYSgyNTUsIDIwMCwgNTAsIDAuOCknKTtcbiAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNywgJ3JnYmEoMjU1LCAxMjAsIDAsIDAuNCknKTtcbiAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgJ3JnYmEoMCwgMCwgMCwgMCknKTtcblxuICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLCBzaXplKTtcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgcmV0dXJuIHRleHR1cmU7XG59XG5cbi8vIOeIhueZuuOCqOODleOCp+OCr+ODiOeUn+aIkFxuY3JlYXRlRXhwbG9zaW9uKHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzKSB7XG4gIGNvbnN0IHBhcnRpY2xlQ291bnQgPSAxNTUwO1xuICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlQ291bnQgKiAzKTtcbiAgY29uc3QgdmVsb2NpdGllczogVEhSRUUuVmVjdG9yM1tdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICBwb3NpdGlvbnNbaSAqIDMgKyAwXSA9IHBvc2l0aW9uLng7XG4gICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSBwb3NpdGlvbi55O1xuICAgIHBvc2l0aW9uc1tpICogMyArIDJdID0gcG9zaXRpb24uejtcblxuICAgIGNvbnN0IGRpciA9IG5ldyBUSFJFRS5WZWN0b3IzKFxuICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpLFxuICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KVxuICAgICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoNiArIE1hdGgucmFuZG9tKCkgKiA2KTtcbiAgICB2ZWxvY2l0aWVzLnB1c2goZGlyKTtcbiAgfVxuXG4gIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gIGNvbnN0IHNwcml0ZSA9IHRoaXMuZ2VuZXJhdGVTcHJpdGVUZXh0dXJlKCk7XG5cbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgIHNpemU6IDMwLFxuICAgIG1hcDogc3ByaXRlLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IoMHhmZmNjNjYpIC8vIOmHkeiJsuezu1xuICB9KTtcblxuICBjb25zdCBwb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIHRoaXMuc2NlbmUuYWRkKHBvaW50cyk7XG5cbiAgLy8g44Ki44OL44Oh44O844K344On44Oz55SoXG4gIGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBjb25zdCBkdXJhdGlvbiA9IDEyMDAwO1xuXG4gIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IGVsYXBzZWQgPSB0aW1lIC0gc3RhcnRUaW1lO1xuXG4gICAgY29uc3QgcG9zQXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgIHBvc2l0aW9uc1tpICogMyArIDBdICs9IHZlbG9jaXRpZXNbaV0ueCAqIDAuMTtcbiAgICAgIHBvc2l0aW9uc1tpICogMyArIDFdICs9IHZlbG9jaXRpZXNbaV0ueSAqIDAuMTtcbiAgICAgIHBvc2l0aW9uc1tpICogMyArIDJdICs9IHZlbG9jaXRpZXNbaV0ueiAqIDAuMTtcbiAgICB9XG5cbiAgICBwb3NBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIG1hdGVyaWFsLm9wYWNpdHkgPSAxIC0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuXG4gICAgaWYgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjZW5lLnJlbW92ZShwb2ludHMpO1xuICAgICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBhbmltYXRlKCk7XG59XG5cbiAgICBwcml2YXRlIGJyaWdodGVuTWFnaWNDaXJjbGVzKCkge1xuICAgIHRoaXMubWFnaWNDaXJjbGVNYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKHsgb3BhY2l0eTogbWF0ZXJpYWwub3BhY2l0eSwgc2l6ZTogbWF0ZXJpYWwuc2l6ZSB9KVxuICAgICAgICAgICAgLnRvKHtzaXplOiAyMCB9LCAxMDAwKSAvLyAx56eS44GL44GR44Gm55m65YWJ5by35YyWXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAgICAgLm9uVXBkYXRlKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5ID0gb2JqLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc2l6ZSA9IG9iai5zaXplO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0pO1xufVxuXG4gICAgcHJpdmF0ZSBhbmltYXRlID0gKCkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcblxuICAgICAgICBUV0VFTi51cGRhdGUoKTtcbiAgICAgICAgLy8g55CD5L2T44Gu6JC95LiL44OB44Kn44OD44KvXG50aGlzLnNwaGVyZXMuZm9yRWFjaCgoc3BoZXJlLCBpbmRleCkgPT4ge1xuICAgIGlmIChzcGhlcmUucG9zaXRpb24ueSA8PSB0aGlzLnBsYW5lLnBvc2l0aW9uLnkgKyAxKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRXhwbG9zaW9uKHNwaGVyZS5wb3NpdGlvbi5jbG9uZSgpKTtcbiAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUoc3BoZXJlKTtcbiAgICAgICAgdGhpcy5zcGhlcmVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gIGlmICh0aGlzLmNoYXJhY3Rlck1vZGVsKSB7XG4gICAgdGhpcy5zY2VuZS5yZW1vdmUodGhpcy5jaGFyYWN0ZXJNb2RlbCk7XG4gICAgdGhpcy5jaGFyYWN0ZXJNb2RlbCA9IHVuZGVmaW5lZDtcbiAgfVxufSwgNjAwMCk7XG5cbiAgICB9XG59KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH07XG59XG5cbi8vIERPTeOBruWIneacn+WMluWHpueQhlxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgY29uc3Qgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDQwMCwgODAsIDI2MCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250ci04NGJlOTdcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=