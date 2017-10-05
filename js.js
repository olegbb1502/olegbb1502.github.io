HIMAJIN.Helper = {
Random: function() {
return (Math.random());
},
RandomRange: function(min, max) {
return (HIMAJIN.Helper.Random() * (max - min) + min);
},
RandomVector: function (v) {
v.set(
HIMAJIN.Helper.Random(),
HIMAJIN.Helper.Random(),
HIMAJIN.Helper.Random());
},
RandomVectorNormalized: function (v) {
HIMAJIN.Helper.RandomVector(v);
v.normalize();
},
RandomVectorRange: function(v, min, max) {
v.set(
HIMAJIN.Helper.RandomRange(min, max),
HIMAJIN.Helper.RandomRange(min, max),
HIMAJIN.Helper.RandomRange(min, max));
},
RandomVectorRangeNormalized: function(v, min, max) {
HIMAJIN.Helper.RandomVectorRange(v, min, max);
v.normalize();
},
};

HIMAJIN.ShaderPool._ScreenQuadVS = [
"varying vec2 vUv;",
"varying vec3 vPosition;",
"",
"void main() {",
" vUv = uv;",
" vPosition = position;",
" gl_Position =",
" projectionMatrix *",
" modelViewMatrix *",
" vec4(vPosition, 1.);",
"}"].join("\n");

HIMAJIN.ShaderPool.Particle = {
Uniforms: {
input_0: {type: "t", value: null, },
input_1: {type: "t", value: null, },
nearFocalStart: {type: "f", value: 0.0, },
nearFocalEnd: {type: "f", value: 0.4, },
farFocalStart: {type: "f", value: 0.6, },
farFocalEnd: {type: "f", value: 1.0, },
},
Attributes: {
size: {type: "f", value: [], },
palette: {type: "c", value: [], },
},
VertexShader: [
"varying vec3 vColor;",
"attribute float size;",
"attribute vec3 palette;",
"uniform float nearFocalStart;",
"uniform float nearFocalEnd;",
"uniform float farFocalStart;",
"uniform float farFocalEnd;",
"",
"void main() {",
" vec4 p = modelViewMatrix * vec4(position, 1.);",
" vColor = palette;",
" gl_PointSize = size * (256. / length(p.xyz) );",
" gl_Position = projectionMatrix * p;",
"}"].join("\n"),
FragmentShader: [
"varying vec3 vColor;",
"uniform sampler2D input_0;",
"uniform sampler2D input_1;",
"",
"void main() {",
" vec3 o = vColor;",
" vec4 c = texture2D(input_0, gl_PointCoord);",
" gl_FragColor = c * vec4(o, 1.);",
"}"].join("\n"),
};

HIMAJIN.ShaderPool.DepthPass1 = {
Uniforms: {
input_0: {type: "t", value: null, },
nearFocalStart: {type: "f", value: 0.0, },
nearFocalEnd: {type: "f", value: 0.4, },
farFocalStart: {type: "f", value: 0.6, },
farFocalEnd: {type: "f", value: 1.0, },
},
VertexShader: HIMAJIN.ShaderPool._ScreenQuadVS,
FragmentShader: [
"varying vec2 vUv;",
"uniform sampler2D input_0;",
"uniform float nearFocalStart;",
"uniform float nearFocalEnd;",
"uniform float farFocalStart;",
"uniform float farFocalEnd;",
"",
"void main() {",
" vec2 v = vUv;",
" vec4 c;",
//" c.x =",
//" (nearZ * 2.) / (farZ + nearZ - texture2D(input_0, v).r *",
//" (farZ - nearZ));",
" c.x = 1. - texture2D(input_0, v).r;",
" c.y = clamp(",
" 1. - clamp((c.x - nearFocalStart) / (nearFocalEnd - nearFocalStart), 0., 1.) +",
" clamp((c.x - farFocalStart) / (farFocalEnd - farFocalStart), 0., 1.), 0., 1.);",
" c.z = .0;",
" c.w = .0;",
" gl_FragColor = c;",
"}"].join("\n"),
};

&nbsp;

HIMAJIN.ShaderPool.DepthPass2 = {
Defines: {
BLUR_SAMPLES: 8,
},
Uniforms: {
input_0: {type: "t", value: null, },
screenWidthInverse: {type: "f", value: null, },
blurSize: {type: "f", value: 10.0, },
blurMixCoeff: {type: "f", value: 2.0, },
},
VertexShader: HIMAJIN.ShaderPool._ScreenQuadVS,
FragmentShader: [
"varying vec2 vUv;",
"uniform sampler2D input_0;",
"uniform float screenWidthInverse;",
"uniform float blurSize;",
"uniform float blurMixCoeff;",
"",
"void main() {",
" vec2 v = vUv;",
" vec4 c = texture2D(input_0, v);",
" float f_0 = texture2D(input_0, v).y;",
" float f_avg = f_0;",
" float f_min = f_0;",
" int a = 1;",
" if(f_0 > .0001) {",
" float g = blurSize * f_0 * screenWidthInverse;",
" float d = 1. / float(BLUR_SAMPLES / 2);",
" for(int i = -BLUR_SAMPLES / 2; i <= BLUR_SAMPLES / 2; ++i) {",
" float k = float(i) * d;",
" float f = texture2D(input_0, v + vec2(g * k, 0.)).y;",
" if(f_0 <= f) ++a, f_avg += f;",
" f_min = min(f, f_min);",
" }",
" }",
" f_avg /= float(a);",
" c.y = mix(f_0, f_avg, pow(f_min, 1. / blurMixCoeff));",
" gl_FragColor = c;",
"}"].join("\n"),
};

HIMAJIN.ShaderPool.DepthPass3 = {
Defines: {
BLUR_SAMPLES: 8,
},
Uniforms: {
input_0: {type: "t", value: null, },
screenHeightInverse: {type: "f", value: null, },
blurSize: {type: "f", value: 10.0, },
blurMixCoeff: {type: "f", value: 2.0, },
},
VertexShader: HIMAJIN.ShaderPool._ScreenQuadVS,
FragmentShader: [
"varying vec2 vUv;",
"uniform sampler2D input_0;",
"uniform float screenHeightInverse;",
"uniform float blurSize;",
"uniform float blurMixCoeff;",
"",
"void main() {",
" vec2 v = vUv;",
" vec4 c = texture2D(input_0, v);",
" float f_0 = texture2D(input_0, v).y;",
" float f_avg = f_0;",
" float f_min = f_0;",
" int a = 1;",
" if(f_0 > .0001) {",
" float g = blurSize * f_0 * screenHeightInverse;",
" float d = 1. / float(BLUR_SAMPLES / 2);",
" for(int i = -BLUR_SAMPLES / 2; i <= BLUR_SAMPLES / 2; ++i) {",
" float k = float(i) * d;",
" float f = texture2D(input_0, v + vec2(0., g * k)).y;",
" if(f_0 <= f) ++a, f_avg += f;",
" f_min = min(f, f_min);",
" }",
" }",
" f_avg /= float(a);",
" c.y = mix(f_0, f_avg, pow(f_min, 1. / blurMixCoeff));",
" gl_FragColor = c;",
"}"].join("\n"),
};

HIMAJIN.ShaderPool.ColorPass1 = {
Defines: {
NUM_RING_SAMPLES: 11,
NUM_COC_SAMPLES: 8,
},
Uniforms: {
input_0: {type: "t", value: null, }, // COLOR
input_1: {type: "t", value: null, }, // DEPTH
screenInverse: {type: "v2", value: null, },
maxCocSize: {type: "f", value: 15.0, },
},
VertexShader: HIMAJIN.ShaderPool._ScreenQuadVS,
FragmentShader: [
"const float PI = " + Math.PI + ";",
"varying vec2 vUv;",
"uniform sampler2D input_0;",
"uniform sampler2D input_1;",
"uniform vec2 screenInverse;",
"uniform float maxCocSize;",
"",
"void main() {",
" vec2 v = vUv;",
" vec4 c = texture2D(input_0, v);",
" float k = texture2D(input_1, v).y * maxCocSize * (1. / float(NUM_COC_SAMPLES));",
" float u = 2. * PI * (1. / float(NUM_RING_SAMPLES));",
" float z = v.x * 399.353;",
" int t = 1;",
" for(int i = 1; i < NUM_COC_SAMPLES; ++i) {",
" float w = float(i) * k;",
" if(w > .025) {",
" float s = float(i) * cos(z) + sin(cos(w * 21.392 + v.y) * 312.261);",
" for(int j = 0; j < NUM_RING_SAMPLES; ++j) {",
" float r = float(j) * u + s;",
" c += texture2D(input_0, vec2(cos(r), sin(r)) * w * screenInverse + v);",
" ++t;",
" }",
" }",
" }",
" gl_FragColor = c / float(t);",
"}"].join("\n"),
};

HIMAJIN.ShaderPool.ColorPass2 = {
Uniforms: {
input_0: {type: "t", value: null, }, // COLOR
},
VertexShader: HIMAJIN.ShaderPool._ScreenQuadVS,
FragmentShader: [
"varying vec2 vUv;",
"uniform sampler2D input_0;",
"",
"void main() {",
" vec2 v = vUv;",
" vec2 o = (vec2(.5) - v) * 1.5;",
" vec2 o3 = o * o * o;",
" vec4 c = vec4(",
" texture2D(input_0, v - o3 * .01).r,",
" texture2D(input_0, v).g,",
" texture2D(input_0, v + o3 * .01).b,",
" 1.);",
" c = c + vec4(0., .0075, .015, 0.);",
" c = max(c + max(dot(c.xyz, vec3(.25)), 0.), vec4(0.));",
" c = c * (1.75 - length(o));",
" gl_FragColor = clamp(c, vec4(0.), vec4(1.));",
"}"].join("\n"),
};

HIMAJIN.AnimationFrameInfo = (function () {

var _Class = function (totalTime, elapsedTime) {
this.TotalTime = totalTime;
this.ElapsedTime = elapsedTime;
};

return _Class;

})();

-----------------------------------------------------------

HIMAJIN.Demo = (function () {
var _NumberOfObjects = 300;
var _NumberOfParticles = 7500;
var _ObjectMaximumDistance = 1000;
var _NumberOfLights = 15;
var _LightPalette = [0xFFAA22, 0xFF22AA, 0xAA22FF];
//var _LightPalette = [0xFFFF00, 0xFF00FF, 0x00FFFF];
var _LightIntensity = 1;
var _LightDistance = 750;

var _Class = function(element) {
this._Element = element;

this._EnableDoF = true;
this._DepthDownSample = true;

this._NearFocalStart = 0.0;
this._NearFocalEnd = 0.125;
this._FarFocalStart = 0.45;
this._FarFocalEnd = 0.95;
this._DepthBlurSize = 15.0;
this._DepthBlurMixCoeff = 0.5;
this._MaxCocSize = 20.0;

this._CameraRotationTarget = 0.0;
this._CameraRotation = 0.0;
this._CameraLeanTarget = 0.0;
this._CameraLean = 50.0;

this._InitRenderer();
this._InitScene();
this._InitLight();
this._InitCamera();
this._InitPostProcessor();
this._Start();
};

_Class.prototype = {
_Start: function () {
var self = this;
var onResize = function () {
var width = $(window).width();
var height = $(window).height();
self._Renderer.setSize(width, height);
self._OnResize(width, height);
};
var onMouseMove = function (e) {
self._OnMouseMove(e);
};
onResize();
$(window).resize(onResize);
$(window).mousemove(onMouseMove);

var currentTime = +new Date();
this._BaseTime = currentTime;
this._LastElapsedTime = currentTime;
this._OnRequestAnimationFrame();
},
_ResetRenderTargets: function () {
var q = $(window);
var width = q.width();
var height = q.height();
var params = {
minFilter: THREE.PointFilter,
magFilter: THREE.PointFilter,
format: THREE.RGBFormat,
stencilBuffer: false, };

var depthWidth = this._DepthDownSample ? width / 2 : width;
var depthHeight = this._DepthDownSample ? height / 2 : height;

this._ColorRenderTarget = new THREE.WebGLRenderTarget(width, height, params);
this._DepthRenderTarget = new THREE.WebGLRenderTarget(depthWidth, depthHeight, params);
this._DepthPass1Output = new THREE.WebGLRenderTarget(depthWidth, depthHeight, params);
this._DepthPass2Output = new THREE.WebGLRenderTarget(depthWidth, depthHeight, params);
this._DepthPass3Output = new THREE.WebGLRenderTarget(depthWidth, depthHeight, params);
this._ColorPass1Output = new THREE.WebGLRenderTarget(width, height, params);
},
_ResetRenderTargetUniforms: function () {
var q = $(window);
var width = q.width();
var height = q.height();

this._ParticlesUniforms.input_0.value = this._ParticleTexture;
this._ParticlesUniforms.input_1.value = this._DepthPass3Output;
this._ParticlesUniforms.nearFocalStart.value = this._NearFocalStart;
this._ParticlesUniforms.nearFocalEnd.value = this._NearFocalEnd;
this._ParticlesUniforms.farFocalStart.value = this._FarFocalStart;
this._ParticlesUniforms.farFocalEnd.value = this._FarFocalEnd;

this._DepthPass1Uniforms.input_0.value = this._DepthRenderTarget;
this._DepthPass1Uniforms.nearFocalStart.value = this._NearFocalStart;
this._DepthPass1Uniforms.nearFocalEnd.value = this._NearFocalEnd;
this._DepthPass1Uniforms.farFocalStart.value = this._FarFocalStart;
this._DepthPass1Uniforms.farFocalEnd.value = this._FarFocalEnd;

this._DepthPass2Uniforms.input_0.value = this._DepthPass1Output;
this._DepthPass2Uniforms.screenWidthInverse.value = 1. / width;
this._DepthPass2Uniforms.blurSize.value = this._DepthBlurSize;
this._DepthPass2Uniforms.blurMixCoeff.value = this._DepthBlurMixCoeff;

this._DepthPass3Uniforms.input_0.value = this._DepthPass2Output;
this._DepthPass3Uniforms.screenHeightInverse.value = 1. / height;
this._DepthPass3Uniforms.blurSize.value = this._DepthBlurSize;
this._DepthPass3Uniforms.blurMixCoeff.value = this._DepthBlurMixCoeff;

this._ColorPass1Uniforms.input_0.value = this._ColorRenderTarget;
this._ColorPass1Uniforms.input_1.value = this._DepthPass3Output;
this._ColorPass1Uniforms.screenInverse.value = new THREE.Vector2(1. / width, 1. / height);
this._ColorPass1Uniforms.maxCocSize.value = this._MaxCocSize;

this._ColorPass2Uniforms.input_0.value = this._ColorPass1Output;
},
_OnRequestAnimationFrame: function () {
var self = this;
var onRequestAnimationFrame = function () {
self._OnRequestAnimationFrame();
};
requestAnimationFrame(onRequestAnimationFrame);
var currentTime = +new Date();
var totalTime = (currentTime - this._BaseTime) * .001;
var elapsedTime = (currentTime - this._LastElapsedTime) * .001;
var frameInfo = new HIMAJIN.AnimationFrameInfo(totalTime, elapsedTime);
this._LastElapsedTime = currentTime;
this._OnUpdate(frameInfo);
this._OnRender(frameInfo);
},
_OnMouseMove: function(e) {
var q = $(window);
var x = e.pageX / q.width() * 2 - 1;
var y = e.pageY / q.height() * 2 - 1;

this._CameraRotationTarget = x;
this._CameraLeanTarget = y;
},
_OnResize: function (width, height) {
this._Camera.aspect = width / height;
this._Camera.updateProjectionMatrix();
this._ResetRenderTargets();
this._ResetRenderTargetUniforms();
},
_OnUpdate: function (frameInfo) {
this._UpdateCamera(frameInfo);
this._UpdateScene(frameInfo);
this._UpdateLight(frameInfo);
},
_OnRender: function (frameInfo) {
this._RenderScene(frameInfo);
},
_InitRenderer: function () {
this._Renderer = new THREE.WebGLRenderer({canvas: $(this._Element)[0]});
this._Renderer.autoClear = false;
},
_InitScene: function () {
this._Scene1 = new THREE.Scene();
this._Scene1.fog = new THREE.Fog(0x000000, 850, 1600);
this._Scene2 = new THREE.Scene();

this._ColorMaterial = new THREE.MeshPhongMaterial({
ambient: 0x030303,
specular: 0xFFFFFF,
color: 0x111111,
shading: THREE.FlatShading,
shininess: 80,
overdraw: true, });
this._DepthMaterial = new THREE.MeshDepthMaterial();

this._ObjectMeshes = [];
this._ObjectRotationAxes = [];
this._ObjectRotationAngles = [];

for(var i = 0; i < _NumberOfObjects; ++i) {
var axis = new THREE.Vector3();
var angle = 0;
var quaternion = new THREE.Quaternion();
var mesh;

HIMAJIN.Helper.RandomVectorRangeNormalized(axis, -1, 1);
angle = HIMAJIN.Helper.Random() * Math.PI * 2;
quaternion.setFromAxisAngle(axis, angle);

var geometry = ((i % 2) == 0)
? new THREE.CylinderGeometry(50, 50, 4, 6)
: new THREE.IcosahedronGeometry(50, 0);
mesh = new THREE.Mesh(geometry, this._ColorMaterial);

var distance = Math.pow(HIMAJIN.Helper.Random(), .4) * _ObjectMaximumDistance;
HIMAJIN.Helper.RandomVectorRangeNormalized(mesh.position, -1, 1);
mesh.position.setLength(distance);
//mesh.useQuaternion = true;
mesh.quaternion.copy(quaternion);

this._ObjectRotationAxes.push(axis);
this._ObjectRotationAngles.push(angle);
this._ObjectMeshes.push(mesh);
this._Scene1.add(mesh);
}

var particleSizes = [5, 5, 7.5, 7.5, 25];
var particlePalette = [0x6F6F40, 0xFF0FAF];

this._ParticleTexture = THREE.ImageUtils.loadTexture(HIMAJIN.ParticleTexture);
this._ParticlesAttributes = {
size: {type: "f", value: [], },
palette: {type: "c", value: [], }, };
this._ParticlesUniforms = THREE.UniformsUtils.clone(HIMAJIN.ShaderPool.Particle.Uniforms);
this._ParticlesGeometry = new THREE.Geometry();
this._ParticlesMaterial = new THREE.ShaderMaterial({
attributes: this._ParticlesAttributes,
uniforms: this._ParticlesUniforms,
vertexShader: HIMAJIN.ShaderPool.Particle.VertexShader,
fragmentShader: HIMAJIN.ShaderPool.Particle.FragmentShader,
blending: THREE.AdditiveBlending,
depthWrite: false,
transparent: true, });

for(var i = 0; i < _NumberOfParticles; ++i) {
var position = new THREE.Vector3();
var distance = Math.pow(HIMAJIN.Helper.Random(), .4) * _ObjectMaximumDistance;
HIMAJIN.Helper.RandomVectorRangeNormalized(position, -1, 1);
position.setLength(distance);

this._ParticlesGeometry.vertices.push(position);
this._ParticlesAttributes.size.value.push(particleSizes[i % particleSizes.length]);
this._ParticlesAttributes.palette.value.push(new THREE.Color(particlePalette[i % particlePalette.length]));
}

this._Particles = new THREE.ParticleSystem(this. _ParticlesGeometry, this._ParticlesMaterial);
this._Particles.dynamic = false;
this._Particles.sortParticles = false;
this._Scene2.add(this._Particles);
},
_InitLight: function () {
this._Scene1.add(new THREE.AmbientLight(0xFFFFFF));
this._PointLights = [];

for(var i = 0; i < _NumberOfLights; ++i) {
var pointLight = new THREE.PointLight(
_LightPalette[i % _LightPalette.length],
_LightIntensity,
_LightDistance);
HIMAJIN.Helper.RandomVectorRangeNormalized(pointLight.position, -1, 1);
pointLight.position.setLength(_LightDistance);
this._PointLights.push(pointLight);
this._Scene1.add(pointLight);
}
},
_InitCamera: function () {
var q = $(window);
this._Camera = new THREE.PerspectiveCamera(75, q.width() / q.height(), 1, 2000);
this._Camera.position.y = 0.0;
this._Camera.position.z = 750.0;
this._Camera.lookAt(this._Scene1.position);
this._CameraRotation = 0.0;
},
