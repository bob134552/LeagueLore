function getData(cb) {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_GB/champion.json"
  );
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

function writeToDocument(champData) {
  let myArray = Array.from(Object.values(champData.data));
  let el = " ";
  for (let i = 0; i < Math.min(myArray.length); i++) {
    el += `<div class="item"><img id="${myArray[i].name}" src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${myArray[i].id}.png" alt="${myArray[i].id}"></div>`;
    document.getElementById("champ-grid").innerHTML = el;
  }
}

getData(writeToDocument);


 const galleryItems=document.querySelector(".champ-grid").children;
 const prev=document.querySelector(".prev");
 const next=document.querySelector(".next");
 const page=document.querySelector(".page-num");
 const maxItem=20;
 let index=1;
  
  const pagination=Math.ceil(galleryItems.length/maxItem);
  console.log(pagination)

  prev.addEventListener("click",function(){
    index--;
    check();
    showItems();
  })
  next.addEventListener("click",function(){
  	index++;
  	check();
    showItems();  
  })

  function check(){
  	 if(index==pagination){
  	 	next.classList.add("disabled");
  	 }
  	 else{
  	   next.classList.remove("disabled");	
  	 }

  	 if(index==1){
  	 	prev.classList.add("disabled");
  	 }
  	 else{
  	   prev.classList.remove("disabled");	
  	 }
  }

  function showItems() {
  	 for(let i=0;i<galleryItems.length; i++){
  	 	galleryItems[i].classList.remove("show");
  	 	galleryItems[i].classList.add("hide");


  	    if(i>=(index*maxItem)-maxItem && i<index*maxItem){
  	 	  // if i greater than and equal to (index*maxItem)-maxItem;
  		  // means  (1*8)-8=0 if index=2 then (2*8)-8=8
          galleryItems[i].classList.remove("hide");
          galleryItems[i].classList.add("show");
  	    }
  	    page.innerHTML=index;
  	 }

  	 	
  }

  window.onload=function(){
  	showItems();
  	check();
  }