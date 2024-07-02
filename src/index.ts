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

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  //Initialize cloth
  var cloth = 'MacysOutfit_m.glb';

  let currentOutfitIndex = 0; // Keeps track of the current outfit index

  // Renderer
  const container = document.getElementById("root");
  if (!container) return;
  const renderer = new AvatarRenderer(
    container,
    "pad",
    !rear,
    cloth,
    // { width: windowWidth, height: windowHeight }
  );

  //Gender Switching
  var gender = 'female';
  const women = document.getElementById('women');
  const men = document.getElementById('men');


  if (women){
    console.log("Women found");
    women.onclick = async () => {
      gender = 'female';
      selectMacysOutfit();
      macys_outfit?.classList.add('active');
      currentOutfitIndex = 0;
      if (gender=='female'){
        women.classList.add('active');
        men?.classList.remove('active');
      }
      console.log("Women Clicked");

      //Hiding Outfit
      hideOutfits();

      //Show female outfit
      const femaleOutfits = [macys_outfit, bomber_shein, hogwarts_uniform, coat, shein, bag, vest_puffer]
      showOutfits(femaleOutfits);
    }
  }

  if (men){
    console.log("Men found");
    men.onclick = async () => {
      gender = 'male';
      selectClassicOutfit();
      currentOutfitIndex = 0;
      if (gender=='male'){
        men.classList.add('active');
        women?.classList.remove('active');
      }
      console.log("Men Clicked");

      //Hiding Outfit
      hideOutfits();

      //Show male outfit
      const maleOutfits = [classic_outfit, adidas_hoodie, adidas_jacket]
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

  hideOutfits();

  //Initialize with female outfit
  const maleOutfits = [classic_outfit, adidas_hoodie, adidas_jacket]
  const femaleOutfits = [macys_outfit, bomber_shein, hogwarts_uniform, coat, shein, bag, vest_puffer]
  showOutfits(femaleOutfits);
  women?.classList.add('active');
  macys_outfit?.classList.add('active');


  function selectCoat() {
    if (coat){
      console.log("coat found");
      // coat.onclick = async () => {
        // const currentGender = gender;
        // cloth = currentGender === 'female' ? 'coat.glb' : 'classic_outfit_M.glb';
        cloth = 'coat.glb';
        coat.classList.add('active');
        shein?.classList.remove('active');
        bomber_shein?.classList.remove('active');
        bag?.classList.remove('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit?.classList.remove('active');
        vest_puffer?.classList.remove('active');
        renderer.setModel(cloth);
        const hasSizes = coat.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        // }
        console.log("coat");
      };
    }
    else{
      console.log("coat not found");
    }
  }

  function selectShein() {
    if (shein){
      console.log("shein found");
      // shein.onclick = async () => {
        // const currentGender = gender;
        // cloth = currentGender === 'male' ? 'shein.glb' : 'bomber_shein_m.glb';
        cloth = 'shein.glb';
        coat?.classList.remove('active');
        shein.classList.add('active');
        bomber_shein?.classList.remove('active');
        bag?.classList.remove('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit?.classList.remove('active');
        vest_puffer?.classList.remove('active');
        renderer.setModel(cloth);
        const hasSizes = shein.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("shein");
      // };
    }
    else{
      console.log("shein not found");
    }
  }

  function selectBomberShein() {
    if (bomber_shein){
      console.log("bomber_shein found");
      // bomber_shein.onclick = async () => {
        const hasSizes = bomber_shein.dataset.hasSizes === 'true';
        cloth = 'bomber_shein_m.glb';
        coat?.classList.remove('active');
        shein?.classList.remove('active');
        bomber_shein.classList.add('active');
        bag?.classList.remove('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit?.classList.remove('active');
        vest_puffer?.classList.remove('active');
        const m_size = document.getElementById('m-size');
        const xl_size = document.getElementById('xl-size');
        m_size.classList.add('active');
        xl_size.classList.remove('active');
        renderer.setModel(cloth);
        if (hasSizes){
          console.log("Classic Outfit has size");
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'flex';
          const s_size = document.getElementById('s-size');
          if (s_size){
            s_size.style.display = 'none';
          }
          if (m_size){
            m_size.style.display = 'flex';
            m_size.onclick = async () => {
              cloth = 'bomber_shein_m.glb';
              m_size.classList.add('active');
              xl_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
          const l_size = document.getElementById('l-size');
          if (l_size){
            l_size.style.display = 'none';
          }
          if (xl_size){
            xl_size.style.display = 'flex';
            xl_size.onclick = async () => {
              cloth = 'bomber_shein_xl.glb';
              xl_size.classList.add('active');
              m_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
        }
        else{
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("bomber_shein");
      // };
    }
    else{
      console.log("bomber_shein not found");
    }
  }
  
  function selectAdidasJacket() {
    if (adidas_jacket){
      console.log("adidas_jacket found");
      // adidas_jacket.onclick = async () => {
        const hasSizes = adidas_jacket.dataset.hasSizes === 'true';
        cloth = 'adidas_jacket_m.glb';
        classic_outfit?.classList.remove('active');
        adidas_hoodie?.classList.remove('active');
        adidas_jacket.classList.add('active');
        const xl_size = document.getElementById('xl-size');
        const m_size = document.getElementById('m-size');
        m_size.classList.add('active');
        xl_size.classList.remove('active');
        renderer.setModel(cloth);
        if (hasSizes){
          console.log("Classic Outfit has size");
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'flex';
          const s_size = document.getElementById('s-size');
          if (s_size){
            s_size.style.display = 'none';
          }
          if (m_size){
            m_size.style.display = 'flex';
            m_size.onclick = async () => {
              cloth = 'adidas_jacket_m.glb';
              m_size.classList.add('active');
              xl_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
          const l_size = document.getElementById('l-size');
          if (l_size){
            l_size.style.display = 'none';
          }
          if (xl_size){
            xl_size.style.display = 'flex';
            xl_size.onclick = async () => {
              cloth = 'adidas_jacket_xl.glb';
              xl_size.classList.add('active');
              m_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
        }
        else{
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("adidas_jacket");
      // };
    }
    else{
      console.log("adidas_jacket not found");
    }
  }
  
  function selectAdidasHoodie() {
    if (adidas_hoodie){
      console.log("adidas_hoodie found");
      // adidas_hoodie.onclick = async () => {
        const hasSizes = adidas_hoodie.dataset.hasSizes === 'true';
        cloth = 'adidas_hoodie_m.glb';
        classic_outfit?.classList.remove('active');
        adidas_hoodie.classList.add('active');
        adidas_jacket?.classList.remove('active');
        const m_size = document.getElementById('m-size');
        const xl_size = document.getElementById('xl-size');
        m_size.classList.add('active');
        xl_size.classList.remove('active');
        renderer.setModel(cloth);
        if (hasSizes){
          console.log("Adidas Hoodie has size");
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'flex';
          const s_size = document.getElementById('s-size');
          if (s_size){
            s_size.style.display = 'none';
          }
          if (m_size){
            m_size.style.display = 'flex';
            m_size.onclick = async () => {
              cloth = 'adidas_hoodie_m.glb';
              m_size.classList.add('active');
              xl_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
          const l_size = document.getElementById('l-size');
          if (l_size){
            l_size.style.display = 'none';
          }
          if (xl_size){
            xl_size.style.display = 'flex';
            xl_size.onclick = async () => {
              cloth = 'adidas_hoodie_xl.glb';
              xl_size.classList.add('active');
              m_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
        }
        else{
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("adidas_hoodie");
      // };
    }
    else{
      console.log("adidas_hoodie not found");
    }
  }
  
  function selectBag() {
    if (bag){
      console.log("bag found");
      // bag.onclick = async () => {
        cloth = 'bag.glb';
        coat?.classList.remove('active');
        shein?.classList.remove('active');
        bomber_shein?.classList.remove('active');
        bag.classList.add('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit?.classList.remove('active');
        vest_puffer?.classList.remove('active');
        renderer.setModel(cloth);
        const hasSizes = bag.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("bag");
      // };
    }
    else{
      console.log("bag not found");
    }
  }
  
  function selectClassicOutfit() {
    if (classic_outfit){
      console.log("classic_outfit found");
      // classic_outfit.onclick = async () => {
        const hasSizes = classic_outfit.dataset.hasSizes === 'true';
        cloth = 'classic_outfit_M.glb';
        classic_outfit.classList.add('active');
        adidas_hoodie?.classList.remove('active');
        adidas_jacket?.classList.remove('active');
        const m_size = document.getElementById('m-size');
        const s_size = document.getElementById('s-size');
        const l_size = document.getElementById('l-size');
        const xl_size = document.getElementById('xl-size');
        s_size.classList.remove('active');
        m_size.classList.add('active');
        l_size.classList.remove('active');
        xl_size.classList.remove('active');
        renderer.setModel(cloth);
        if (hasSizes){
          console.log("Classic Outfit has size");
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'flex';
          const s_size = document.getElementById('s-size');
          if (s_size){
            s_size.style.display = 'flex';
            s_size.onclick = async () => {
              cloth = 'classic_38US.glb';
              renderer.setModel(cloth);
              s_size.classList.add('active');
              m_size.classList.remove('active');
              l_size.classList.remove('active');
              xl_size.classList.remove('active');
            }
          }
          const m_size = document.getElementById('m-size');
          if (m_size){
            m_size.style.display = 'flex';
            m_size.onclick = async () => {
              cloth = 'classic_outfit_M.glb';
              s_size.classList.remove('active');
              m_size.classList.add('active');
              l_size.classList.remove('active');
              xl_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
          const l_size = document.getElementById('l-size');
          if (l_size){
            l_size.style.display = 'flex';
            l_size.onclick = async () => {
              cloth = 'classic_outfit_L.glb';
              s_size.classList.remove('active');
              m_size.classList.remove('active');
              l_size.classList.add('active');
              xl_size.classList.remove('active');
              renderer.setModel(cloth);
            }
          }
          const xl_size = document.getElementById('xl-size');
          if (xl_size){
            xl_size.style.display = 'flex';
            xl_size.onclick = async () => {
              cloth = 'classic_outfit_XL.glb';
              s_size.classList.remove('active');
              m_size.classList.remove('active');
              l_size.classList.remove('active');
              xl_size.classList.add('active');
              renderer.setModel(cloth);
            }
          }
        }
        console.log("classic_outfit");
      // };
    }
    else{
      console.log("classic_outfit not found");
    }
  }
  
  function selectHogwartsUniform() {
    if (hogwarts_uniform){
      console.log("hogwarts_uniform found");
      // hogwarts_uniform.onclick = async () => {
        cloth = 'hogwarts_uniform_girl.glb';
        coat?.classList.remove('active');
        shein?.classList.remove('active');
        bomber_shein?.classList.remove('active');
        bag?.classList.remove('active');
        hogwarts_uniform.classList.add('active');
        macys_outfit?.classList.remove('active');
        vest_puffer?.classList.remove('active');
        renderer.setModel(cloth);
        const hasSizes = hogwarts_uniform.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("hogwarts_uniform_girl");
      // };
    }
    else{
      console.log("hogwarts_uniform not found");
    }
  }
  
  function selectMacysOutfit() {
    if (macys_outfit){
      console.log("macys_outfit found");
      // macys_outfit.onclick = async () => {
        cloth = 'MacysOutfit_m.glb';
        coat?.classList.remove('active');
        shein?.classList.remove('active');
        bomber_shein?.classList.remove('active');
        bag?.classList.remove('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit.classList.add('active');
        vest_puffer?.classList.remove('active');
        renderer.setModel(cloth);
        const hasSizes = macys_outfit.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("macys_outfit");
      // };
    }
    else{
      console.log("macys_outfit not found");
    }
  }
  
  function selectVestPuffer() {
    if (vest_puffer){
      console.log("vest_puffer found");
      // vest_puffer.onclick = async () => {
        cloth = 'Vest_Puffer_Blue.glb';
        coat?.classList.remove('active');
        shein?.classList.remove('active');
        bomber_shein?.classList.remove('active');
        bag?.classList.remove('active');
        hogwarts_uniform?.classList.remove('active');
        macys_outfit?.classList.remove('active');
        vest_puffer.classList.add('active');
        renderer.setModel(cloth);
        const hasSizes = vest_puffer.dataset.hasSizes === 'true';
        if (!hasSizes){
          const sizeCheck = document.getElementById('sizes');
          if (sizeCheck)sizeCheck.style.display = 'none';
        }
        console.log("vest_puffer");
      // };
    }
    else{
      console.log("vest_puffer not found");
    }
  }

  //Enable changing for clicking
  if (coat){
    coat.onclick = async () => {
      currentOutfitIndex = 3;
      selectCoat();
    }
  }
  if (shein){
    shein.onclick = async () => {
      currentOutfitIndex = 4;
      selectShein();
    }
  }
  if (bomber_shein){
    bomber_shein.onclick = async () => {
      currentOutfitIndex = 1;
      selectBomberShein();
    }
  }
  if (adidas_jacket){
    adidas_jacket.onclick = async () => {
      currentOutfitIndex = 2;
      selectAdidasJacket();
    }
  }
  if (adidas_hoodie){
    adidas_hoodie.onclick = async () => {
      currentOutfitIndex = 1;
      selectAdidasHoodie();
    }
  }
  if (bag){
    bag.onclick = async () => {
      currentOutfitIndex = 5;
      selectBag();
    }
  }
  if (classic_outfit){
    classic_outfit.onclick = async () => {
      currentOutfitIndex = 0;
      selectClassicOutfit();
    }
  }
  if (hogwarts_uniform){
    hogwarts_uniform.onclick = async () => {
      currentOutfitIndex = 2;
      selectHogwartsUniform();
    }
  }
  if (macys_outfit){
    macys_outfit.onclick = async () => {
      currentOutfitIndex = 0;
      selectMacysOutfit();
    }
  }
  if (vest_puffer){
    vest_puffer.onclick = async () => {
      currentOutfitIndex = 6;
      selectVestPuffer();
    }
  }

  //Traversing

  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  if (prev) {
    prev.onclick = async() => {
      changeOutfit('prev');
    }
  }
  if (next) {
    next.onclick = async() => {
      changeOutfit('next');
    }
  }

  const maleOutfitsChange = ["classic_outfit_M", "adidas_hoodie_m", "adidas_jacket_m"]
  const femaleOutfitsChange = ["MacysOutfit_m", "bomber_shein_m", "hogwarts_uniform_girl", "coat", "shein", "bag", "Vest_Puffer_Blue"]

  function changeOutfit(direction: "prev" | "next") {
    const outfits = gender === "female" ? femaleOutfitsChange : maleOutfitsChange;
    const outfitLength = outfits.length;

    if (direction === "prev") {
      currentOutfitIndex = (currentOutfitIndex - 1 + outfitLength) % outfitLength;
    } else {
      currentOutfitIndex = (currentOutfitIndex + 1) % outfitLength;
    }

    // console.log(currentOutfitIndex);
    if (gender === "female"){
      if (currentOutfitIndex===3){
        // console.log("Check");
        selectCoat();
      }if (currentOutfitIndex===4){
        // console.log("Check");
        selectShein();
      }if (currentOutfitIndex===1){
        // console.log("Check");
        selectBomberShein();
      }if (currentOutfitIndex===5){
        // console.log("Check");
        selectBag();
      }if (currentOutfitIndex===2){
        // console.log("Check");
        selectHogwartsUniform();
      }if (currentOutfitIndex===0){
        // console.log("Check");
        selectMacysOutfit();
      }if (currentOutfitIndex===6){
        // console.log("Check");
        selectVestPuffer();
      }
    }

    if (gender === "male"){
      if (currentOutfitIndex===2){
        // console.log("Check");
        selectAdidasJacket();
      }if (currentOutfitIndex===1){
        // console.log("Check");
        selectAdidasHoodie();
      }if (currentOutfitIndex===0){
        // console.log("Check");
        selectClassicOutfit();
      }
    }

    // cloth = outfits[currentOutfitIndex] + ".glb";
    // renderer.setModel(cloth);
  }

  // Camera switch
  const cameraSwitch = document.getElementById(
    "camera-switch"
  ) as HTMLButtonElement | null;
  if (cameraSwitch) {
    cameraSwitch.onclick = async () => {
      cameraSwitch.disabled = true;
      rear = !rear;
      await engine.setup({ size: { width: windowWidth, height: windowHeight }, rear });
      await engine.start();
      renderer.setMirror(!rear);
      cameraSwitch.disabled = false;
      console.log("camera switched");
    };
  }

  // Listen for resize event
  window.addEventListener("resize", async () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

  // Update engine setup size for camera
    await engine.setup({ size: { width: newWidth, height: newHeight }, rear });
    await engine.start();
  });

  // Initialization
  await Promise.all([
    engine.addRenderer(renderer),
    engine.init({ token: token, mask: true }), // Mask segmentation (Body Patch) turning on by mask: true
  ]);
  await engine.setup({ size: { width: windowWidth, height: windowHeight }, rear });
  await engine.start();

  document.getElementById("dots")?.remove();
}
main();
