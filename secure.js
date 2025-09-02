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

document.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    // alert("Right click is isabled!")
})
document.addEventListener("keydown", function(e) {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // F11 (fullscreen)
      if (e.key === "F11") {
        e.preventDefault();
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
      }
      // Ctrl+Shift+J (console)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
      }
      });