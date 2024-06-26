import { PoseEngine } from "@geenee/bodyprocessors";
import { AvatarRenderer } from "./avatarrenderer";
import "./index.css";

// Engine
const engine = new PoseEngine();
const token =
  location.hostname === "localhost"
    ? "OesY-n98plQwoJsS2aJEs4n6OnAT4NNE"
    : "6w1GqK4hriTZ2Z96QsEfKLI5FvKCHOf-";

// Parameters
const urlParams = new URLSearchParams(window.location.search);
let rear = urlParams.has("rear");



async function main() {

  //Initialize cloth
  var cloth = 'hoodie.glb';

  // Renderer
  const container = document.getElementById("root");
  if (!container) return;
  const renderer = new AvatarRenderer(
    container,
    "pad",
    !rear,
    cloth,
  );

  //Gender Switching
  var gender = 'female';
  const women = document.getElementById('women');
  const men = document.getElementById('men');

  if (women){
    console.log("Women found");
    women.onclick = async () => {
      gender = 'female';
      console.log("Women Clicked");

      //Hiding Outfit
      hideOutfits();

      //Show female outfit
      const femaleOutfits = [coat, shein, bomber_shein, bag, hogwarts_uniform, macys_outfit, vest_puffer]
      showOutfits(femaleOutfits);
    }
  }

  if (men){
    console.log("Men found");
    men.onclick = async () => {
      gender = 'male';
      console.log("Men Clicked");

      //Hiding Outfit
      hideOutfits();

      //Show male outfit
      const maleOutfits = [adidas_jacket, adidas_hoodie, classic_outfit]
      showOutfits(maleOutfits);
    }
  }

  function hideOutfits() {
    const allOutfits = [coat, shein, bomber_shein, adidas_jacket, adidas_hoodie, bag, classic_outfit, hogwarts_uniform, macys_outfit, vest_puffer];

    for (const outfit of allOutfits){
      if (outfit){
        outfit.style.display = 'none';
      }
    }
  }

  function showOutfits(outfitsToShow) {
    for (const outfit of outfitsToShow) {
      if (outfit){
        outfit.style.display = 'flex';
      }
    }
  }

  // Changing Outfits
  const coat = document.getElementById('coat') as HTMLButtonElement | null;
  const shein = document.getElementById('shein') as HTMLButtonElement | null;
  const bomber_shein = document.getElementById('bomber-shein') as HTMLButtonElement | null;
  const adidas_jacket = document.getElementById('adidas-jacket') as HTMLButtonElement | null;
  const adidas_hoodie = document.getElementById('adidas-hoodie') as HTMLButtonElement | null;
  const bag = document.getElementById('bag') as HTMLButtonElement | null;
  const classic_outfit = document.getElementById('classic-outfit') as HTMLButtonElement | null;
  const hogwarts_uniform = document.getElementById('hogwarts-uniform') as HTMLButtonElement | null;
  const macys_outfit = document.getElementById('macys-outfit') as HTMLButtonElement | null;
  const vest_puffer = document.getElementById('vest-puffer') as HTMLButtonElement | null;

  if (coat){
    console.log("coat found");
    coat.onclick = async () => {
      // const currentGender = gender;
      // cloth = currentGender === 'female' ? 'coat.glb' : 'classic_outfit_M.glb';
      cloth = 'coat.glb';
      renderer.setModel(cloth);
      console.log("coat");
    };
  }
  else{
    console.log("coat not found");
  }

  if (shein){
    console.log("shein found");
    shein.onclick = async () => {
      // const currentGender = gender;
      // cloth = currentGender === 'male' ? 'shein.glb' : 'bomber_shein_m.glb';
      cloth = 'shein.glb';
      renderer.setModel(cloth);
      console.log("shein");
    };
  }
  else{
    console.log("shein not found");
  }

  if (bomber_shein){
    console.log("bomber_shein found");
    bomber_shein.onclick = async () => {
      cloth = 'bomber_shein_m.glb';
      renderer.setModel(cloth);
      console.log("bomber_shein");
    };
  }
  else{
    console.log("bomber_shein not found");
  }

  if (adidas_jacket){
    console.log("adidas_jacket found");
    adidas_jacket.onclick = async () => {
      cloth = 'adidas_jacket_m.glb';
      renderer.setModel(cloth);
      console.log("adidas_jacket");
    };
  }
  else{
    console.log("adidas_jacket not found");
  }

  if (adidas_hoodie){
    console.log("adidas_hoodie found");
    adidas_hoodie.onclick = async () => {
      const hasSizes = adidas_hoodie.dataset.hasSizes === 'true';
      if (hasSizes){
        console.log("Adidas Hoodie has size");
      }
      cloth = 'adidas_hoodie_m.glb';
      renderer.setModel(cloth);
      console.log("adidas_hoodie");
    };
  }
  else{
    console.log("adidas_hoodie not found");
  }

  if (bag){
    console.log("bag found");
    bag.onclick = async () => {
      cloth = 'bag.glb';
      renderer.setModel(cloth);
      console.log("bag");
    };
  }
  else{
    console.log("bag not found");
  }

  if (classic_outfit){
    console.log("classic_outfit found");
    classic_outfit.onclick = async () => {
      const hasSizes = classic_outfit.dataset.hasSizes === 'true';
      if (hasSizes){
        console.log("Classic Outfit has size");
      }
      cloth = 'classic_outfit_M.glb';
      renderer.setModel(cloth);
      console.log("classic_outfit");
    };
  }
  else{
    console.log("classic_outfit not found");
  }

  if (hogwarts_uniform){
    console.log("hogwarts_uniform found");
    hogwarts_uniform.onclick = async () => {
      cloth = 'hogwarts_uniform_girl.glb';
      renderer.setModel(cloth);
      console.log("hogwarts_uniform_girl");
    };
  }
  else{
    console.log("hogwarts_uniform not found");
  }

  if (macys_outfit){
    console.log("macys_outfit found");
    macys_outfit.onclick = async () => {
      cloth = 'MacysOutfit_m.glb';
      renderer.setModel(cloth);
      console.log("macys_outfit");
    };
  }
  else{
    console.log("macys_outfit not found");
  }

  if (vest_puffer){
    console.log("vest_puffer found");
    vest_puffer.onclick = async () => {
      cloth = 'Vest_Puffer_Blue.glb';
      renderer.setModel(cloth);
      console.log("vest_puffer");
    };
  }
  else{
    console.log("vest_puffer not found");
  }
  
  // Camera switch
  const cameraSwitch = document.getElementById(
    "camera-switch"
  ) as HTMLButtonElement | null;
  if (cameraSwitch) {
    cameraSwitch.onclick = async () => {
      cameraSwitch.disabled = true;
      rear = !rear;
      await engine.setup({ size: { width: 1920, height: 1080 }, rear });
      await engine.start();
      renderer.setMirror(!rear);
      cameraSwitch.disabled = false;
      console.log("camera switched");
    };
  }

  // Initialization
  await Promise.all([
    engine.addRenderer(renderer),
    engine.init({ token: token, mask: true }), // Mask segmentation (Body Patch) turning on by mask: true
  ]);
  await engine.setup({ size: { width: 1920, height: 1080 }, rear });
  await engine.start();

  document.getElementById("dots")?.remove();
}
main();
