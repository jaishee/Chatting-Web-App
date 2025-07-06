let name=document.querySelector(".name")
let caption=document.querySelector(".caption")
let postBtn=document.querySelector(".postBtn")
let allPost=document.querySelector(".allPost")
let error=document.querySelector(".error")


let arr=[]
postBtn.addEventListener("click",()=>{
    if(!name.value){
        error.innerHTML="Please enter your name and write caption."
    }
    else if(!caption.value){
        error.innerHTML="Please enter your name and write caption."

    }
    else if(!name.value && !caption.value){
        error.innerHTML="Please enter your name and write caption."
    }
    else{
        arr.push({
            name:name.value,
            caption:caption.value
        })
        error.style.display="none"
        allPost.innerHTML=""
        display()
        name.value=""
        caption.value=""
    }


    

})

function display(){
    arr.map(item=>{
        allPost.innerHTML+=`<div class="card mt-5" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.caption}</p>
            <button class="btn btn-primary edit">Edit</button>
            <button class="btn btn-danger delete">Delete</button>
          </div>
        </div>`
    })
}

display()