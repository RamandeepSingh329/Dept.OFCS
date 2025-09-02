document.addEventListener("keydown",(e)=>{
if (e.ctrlKey && ['u','s','c'].includes(e.key.toLowerCase())){
    e.preventDefault();     
}
})     

document.addEventListener("contextmenu", (e)=>{
    if (e.target.tagName === "IMG"){
        e.preventDefault();
    }
})