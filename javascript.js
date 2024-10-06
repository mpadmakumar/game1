const boxs=document.querySelectorAll('.box');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#btn');
const gif=document.querySelector('.gif');

let x = "<img src='./eimg.png' width='50' height='50'>";
let  o ="<img src='./aimg.png' width='70' height='70'>";

const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
];

let options=["","","","","","","","",""];
let currentplayer=x;
let player="X";
let running=false;
pkgame();

function pkgame(){

    boxs.forEach(box=>box.addEventListener('click',boxClick));
    btnRestart.addEventListener('click',restartGame);
    statusTxt.textContent=`${player} Your Turn`;
    running=true;
}
function boxClick(){

    const index=this.dataset.index;
    if(options[index]!=""|| !running){
        return;
    }
    updatebox(this,index);
    checkwinner();

}

function updatebox(box,index){

options[index]=player;
box.innerHTML=currentplayer;
}
function changePlayer(){
  
   player=(player=='X') ? "O" : "X";
   currentplayer=(currentplayer==x) ? o :x;
   statusTxt.textContent=`${player} Your Turn`;


}

function checkwinner(){

    let isWon= false;
    for(let i=0;i<win.length;i++)
    {
       const condition=win[i];
       const box1=options[condition[0]];
       const box2=options[condition[1]];
       const box3=options[condition[2]];
       if(box1=="" || box2=="" || box3==""){
           continue;
       }
       if(box1==box2 && box2==box3){
        isWon=true;
        boxs[condition[0]].classList.add('win');
        boxs[condition[1]].classList.add('win');
        boxs[condition[2]].classList.add('win');
        gif.style.display='block';

       }
    }

    if(isWon==true){
       statusTxt.textContent=`${player} Win..!`;
       running=false;
    }
    else if(!options.includes("")){
       statusTxt.textContent=`Game Draw..!`;
       running=false;
    }
    else{
       
        changePlayer();
    }
}
function restartGame(){
    
     options=["","","","","","","","",""];
     currentplayer=x;
     player="X";
     running=true;
     gif.style.display='none';

     statusTxt.textContent=`${player} Your Turn`;

     boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
     })

 }