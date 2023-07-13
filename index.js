import { catsData } from "./data.js";
const radioContainer = document.querySelector(".radio-container")
const radio = document.querySelector(".radio") 
const Btn = document.querySelector(".btn")
const giftOnlyOption = document.querySelector(".gift-only-option")
const modal = document.querySelector(".modal")
const modalPic = document.querySelector(".modal-pic")
const closeBtn = document.querySelector(".close-btn")

 function getEmotionRadio(data){
    let newEmotion = []
    for(let cat of data){
        for(let emotion of cat.emotionTags){
            if(!newEmotion.includes(emotion)){
                newEmotion.push(emotion)
            }      
        }   
    } 
    return(newEmotion) 
 }

 function renderEmotionsRadios(data){
    let html = ""
    let emotion = getEmotionRadio(data)
    for(let key of emotion){
           html += `
                   <div class="radio id = "radio">
                   <label for="${key}">${key}</label>
                   <input
                   type="radio"
                   id="${key}"
                   value="${key}"
                   name="key"
                   >
                   </div>              `
    }
        radioContainer.innerHTML = html
 }

 renderEmotionsRadios(catsData)

radioContainer.addEventListener("change", highlightCheckedOption)
Btn.addEventListener("click", renderCat)

function highlightCheckedOption(e){
    let radioArray = document.getElementsByClassName("radio")
    for(let radio of radioArray){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")  
}

function getMatchingCatsArray(){
    if(document.querySelector('input[type= "radio"]:checked')){
        let selectedEmotion = document.querySelector('input[type= "radio"]:checked').value 
        let isGif = giftOnlyOption.checked
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
              return matchingCatsArray 
    }  
} 

function getSingleCatObject(){
  let catsArray = getMatchingCatsArray()
  if(catsArray.length === 1){
        return (catsArray[0]);
  }
  else{
    
     let randomNumber =  Math.floor(Math.random()* catsArray.length)
         return (catsArray[randomNumber]);
  } 
}

function renderCat(){
    let catObject =  getSingleCatObject()
    modalPic.innerHTML = `
                <img 
                class="cat-img" 
                src="./images/${catObject.image}"
                alt="${catObject.alt}"
                >
                `
              modal.style.display = "flex"
}

closeBtn.addEventListener("click", ()=>{
    modal.style.display = "none"
})
