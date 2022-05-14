var prevEl = null;
var prevColor = null;
for (let e of document.querySelectorAll("div.chessboard > div > div.black")) {
    e.onclick = function () {
        if (e.classList.contains('circle')){
            
        }
        else {
            e.classList.add('circle');
            prevEl.classList.remove('circle');
        }
        if (prevEl === e) {      
            if (e.style.backgroundColor === prevColor) {
                e.style.backgroundColor = "#808080";
                
            } else {
                e.style.backgroundColor = prevColor;
                         
            }
        } else {
            if (prevEl !== null) {
                prevEl.style.backgroundColor = prevColor;   
            }
           

            prevEl = e;
            prevColor = e.style.backgroundColor;
            e.style.backgroundColor = "#808080";
            
                
            
            
        }
       
    }
}
