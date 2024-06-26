import {
    BodypartPatchPlugin,
    PoseRenderer,
    ClothSkirtPlugin,
    BodypartPatchHDPlugin,
} from '@geenee/bodyrenderers-babylon';
import { type CanvasMode } from '@geenee/armature';
import { type AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { PointLight } from '@babylonjs/core/Lights/pointLight';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { ShadowLight } from '@babylonjs/core/Lights/shadowLight';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import '@babylonjs/loaders/glTF/2.0';
import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { BodyMaskHDPlugin } from '@geenee/bodyrenderers-common';
import { OccluderMaskHDPlugin } from '@geenee/bodyrenderers-babylon';

export class AvatarRenderer extends PoseRenderer {
    // Scene
    protected aligner = new ClothSkirtPlugin(undefined, { shouldersD: undefined });
    protected patcher: BodypartPatchPlugin;
    protected outfit?: AbstractMesh;
    protected shadowers: ShadowGenerator[] = [];
    protected light!: DirectionalLight;
    protected occluderMaskPlugin!: OccluderMaskHDPlugin;

    constructor (
        container: HTMLElement,
        mode: CanvasMode,
        mirror: boolean,
        protected url: string,
    ) {
        super(container, mode, mirror);
        this.addPlugin(this.aligner);
        const bodyMaskHDPlugin = new BodyMaskHDPlugin();
        this.addPlugin(bodyMaskHDPlugin);
        this.patcher = new BodypartPatchHDPlugin();
        this.addPlugin(this.patcher);
        this.occluderMaskPlugin = new OccluderMaskHDPlugin();
        this.addPlugin(this.occluderMaskPlugin);
    }

    async load () {
        if (this.loaded || !this.scene) {
            return;
        }
        await super.load();
        this.setupLight();
        await this.setupScene();
    }

    setupLight () {
        this.light = new DirectionalLight('DirectLightUp', new Vector3(0.5, -1, -1), this.scene);
        this.light.position.set(0, 4, 10);
        this.light.intensity = 2;
        // Shadows
        [this.light].forEach((light) => {
            if (!(light instanceof ShadowLight)) {
                return;
            }
            const shadower = new ShadowGenerator(2048, light, true);
            shadower.useBlurCloseExponentialShadowMap = true;
            shadower.usePercentageCloserFiltering = true;
            shadower.blurBoxOffset = 1;
            shadower.bias = 0.005;
            shadower.normalBias = 0.0001;
            light.autoCalcShadowZBounds = true;
            this.shadowers.push(shadower);
        });

        const pointLight = new PointLight('PointLight', new Vector3(-2, 1, 2), this.scene);
        pointLight.intensity = 20;
    }

    async setupScene () {
        if (!this.scene) {
            throw new Error('Scene is not initialized');
        }

        const hdrTexture = CubeTexture.CreateFromPrefilteredData('https://labs-custom-projects.s3.eu-central-1.amazonaws.com/assets/environments/city_blender.env', this.scene);
        this.scene.clearColor = new Color4(0, 0, 0, 0);
        this.scene.ambientColor = new Color3(1, 1, 1);
        this.scene.imageProcessingConfiguration.contrast = 1.2;

        this.scene.environmentTexture = hdrTexture;
        this.scene.environmentIntensity = 0.8;

        await this.setModel(this.url);
    }

    public async setModel (url: string) {
        if (this.scene == null) {
            return;
        }

        if (this.outfit) {
            const outfit = this.outfit;
            this.aligner.setNode();
            this.patcher?.setParts();
            this.shadowers.forEach((s) => s.removeShadowCaster(outfit));
            this.scene?.removeMesh(outfit, true);
            this.outfit.dispose(false, true);
        }
        delete this.outfit;

        this.aligner?.setNode(undefined);

        const gltf = await SceneLoader.LoadAssetContainerAsync(
            url, '', this.scene, undefined, '.glb');
        const outfit = gltf.meshes.find((m) => m.id === '__root__');
        if (outfit == null) {
            throw new Error("Couldn't get the root node");
        }
        gltf.addAllToScene();
        this.outfit = outfit;

        const aligner = this.aligner;

        const meshes = outfit.getChildMeshes();

        this.patcher.setParts(
            meshes.filter((m) => m.name.toLowerCase().includes('cloth')),
            meshes.filter((m) => m.name.includes('body'))
        );

        outfit.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
        });
        this.shadowers.forEach((s) => s.addShadowCaster(outfit));

        const body = this.scene.meshes.filter((el) => el.name.toLowerCase().includes('body'));
        body.forEach((el) => {
            if (el != null && this.scene != null) {
                el.material = this.occluderMaskPlugin.createMaterial();
            }
        });

        aligner.setNode(outfit);
    }
}
