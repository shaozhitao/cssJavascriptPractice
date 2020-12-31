import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AudioLoader, Box3, Color,
  DirectionalLight, DoubleSide, Group,
  HemisphereLight,
  Mesh, MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-model-show',
  templateUrl: './model-show.component.html',
  styleUrls: ['./model-show.component.scss']
})
export class ModelShowComponent implements OnInit {
  // @ViewChild('canvas', {static: true}) canvas_ref: ElementRef;
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private scene2: Scene;
  private camera: PerspectiveCamera;
  private cameraControls: OrbitControls;
  private obj: Object3D;
  private obj2: Object3D;
  private texture;
  private texture2;
  private panoramaTexture;
  private material;
  private material2;
  private center: Vector3;
  private hemisphereLight: HemisphereLight;
  private directionalLight: DirectionalLight;
  private panorama: Mesh;
  private listener: AudioListener;
  private audioLoader: AudioLoader;
  constructor() { }

  ngOnInit(): void {
    this.ModelInit();
  }
  ModelInit(): void {
    console.log('初始化操作');
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;  // 得到canvas container 元素
    this.renderer = new WebGLRenderer({canvas, antialias: true, alpha: true}); // TODO 创建渲染器
    let heightSize = 0;
    // TODO: 判断组件是在弹窗还是页面使用，更改canvas宽高设置；
    heightSize = canvas.offsetHeight;

    this.renderer.setSize(canvas.offsetWidth, heightSize);  // TODO：设置渲染器的尺寸
    this.scene = new Scene();  // 创建一个场景
    this.scene.background = new Color(0x72645b); // 场景背景颜色
    const aspectRatio = canvas.offsetWidth / heightSize;
    this.camera = new PerspectiveCamera(45, aspectRatio, 0.1, 100000);
    this.camera.position.set(0, 0, 100);
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.cameraControls.enablePan = true; // 开启拖动
    this.cameraControls.screenSpacePanning = true; // 屏幕拖动
    this.cameraControls.panSpeed = 1;    // 拖动速度
    this.cameraControls.dampingFactor = 0.1; // 尼阻
    this.cameraControls.rotateSpeed = 1; // 手动旋转速度
    this.cameraControls.update();
    this.initLights();
    this.loadGltf();
    // TODO:循环渲染
    this.startRenderLoop();
  }
  loadGltf(): void {
    // this.screen_width = window.innerWidth;
    const gltfLoader = new GLTFLoader();
    const modelUrl =  '../../../assets/assets/img/box.gltf';
    // TODO: Add error handling.
    gltfLoader.load(modelUrl, async (group) => {
      console.log('打印gltf->group:', group);
      group.scene.position.y = 1;
      this.scene.add(group.scene);
      if (false) {
        // this.progress_text = `100%`;
        // document.getElementById('loading3').style.display = 'none'; // 取消进度圈
        // TODO: 测试添加功能 start
        this.obj.receiveShadow = true; // 使模型产生阴影
        // TODO: 测试添加功能 end
        this.updateMaterial(); // TODO:模型加载完成更新材质,贴图加载完成也更新材质
        this.scene.add(this.obj); // 加入场景
        this.setMeshAtOrigin(this.obj); // 重置网格大小
        this.updateCameraPosition(this.obj, false);
        // this.loadTexture();
      }
    });
  }
  // TODO: 更新模型材质
  public updateMaterial(): void {
    this.material = new MeshBasicMaterial({side: DoubleSide});
    this.material.map = this.texture;
    if (this.obj) {
      this.obj.children.forEach((child) => {
        const mesh = child as Mesh;
        if (!mesh) {
          return;
        }
        mesh.material = this.material;
      });
    }
  }
  // TODO: 得到模型中心原点并更新
  public setMeshAtOrigin(object: Object3D): void {
    const box = new Box3().setFromObject(object);
    this.center = box.getCenter(new Vector3());
    this.updateModel();
  }
  // TODO:更新模型 坐标角度
  updateModel(): void {
    // this.obj.position.x = this.model_data.position_x - this.center.x;
    // this.obj.position.y = this.model_data.position_y - this.center.y;
    // this.obj.position.z = this.model_data.position_z - this.center.z;
    // this.obj.rotation.x = this.model_data.rotation_x; * Math.PI / 180
    // this.obj.position.y = this.model_data_copy.position_y;
    // this.obj.rotation.x = this.model_data_copy.rotation_x * Math.PI / 180;
    // this.obj.rotation.y = this.model_data_copy.rotation_y * Math.PI / 180;
    // this.obj.rotation.z = this.model_data_copy.rotation_z * Math.PI / 180;

  }
  // TODO:根据模型尺寸自动调整相机控制器
  public updateCameraPosition(object: Object3D, hasFloor: boolean): void {
    const camera = this.camera;
    const cameraControls = this.cameraControls;

    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3()).length();

    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    // Force the camera to be at certain distance.
    cameraControls.maxDistance = size * 1.15;
    cameraControls.minDistance = size * 1.15;

    cameraControls.update();

    cameraControls.maxDistance = size * 1.5;
    cameraControls.minDistance = size * 0.25;

    cameraControls.maxPolarAngle = hasFloor ? Math.PI * 0.5 : Math.PI;
    cameraControls.update();
  }
  // TODO: 初始化光照
  public initLights(): void {

    this.hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
    this.directionalLight = new DirectionalLight(0xffeedd);
    // TODO: 添加功能测试 start
    this.directionalLight.castShadow = true;
    // TODO: 添加功能测试 end
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.directionalLight);
    // 测试第二个场景
    // this.scene2.add(this.hemisphereLight);
    // this.scene2.add(this.directionalLight);
    // this.scene2.copy(this.scene);


    this.hemisphereLight.position.set(0, 200, 0);
    this.directionalLight.position.set(-0.5, -1, 1).normalize();

    // this.updateLights();
  }
  // 切片循环渲染
  public startRenderLoop(): void {
    const renderFunction = () => {
      this.cameraControls.update();
      // this.camera_controls.update();
      const canvas = this.canvasRef.nativeElement;  // 得到canvas container 元素
      this.renderer.clear();
      this.renderer.setScissorTest(true);

      this.renderer.setScissor(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      this.renderer.render(this.scene, this.camera);

      // this.renderer.setScissor(canvas.offsetWidth / 2, 0, canvas.offsetWidth / 2, canvas.offsetHeight);
      // this.renderer.render(this.scene2, this.camera);
      this.renderer.setScissorTest(false);
      // this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderFunction);

    };

    requestAnimationFrame(renderFunction);
  }

}
