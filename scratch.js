// doors open and closed functions
const door = document.querySelector(".door_right");
const door1 = document.querySelector(".door_left");
function doorsClose() {
    return new Promise((res,rej)=>{
        doorsCloseId1 = setInterval(()=>{
            if(parseInt(door.style.width || 0) >= 150 && parseInt(door1.style.width || 0) >= 150){
                clearInterval(doorsCloseId1);
                res(true);
            }else {
                door.style.width = parseInt(door.style.width || 0) + 6 + 'px';
                door1.style.width = parseInt(door1.style.width || 0) + 6 + 'px';
            }
        },10);
    });
}
function doorsOpen() {
    return new Promise((resolve, reject)=>{
        doorsOpenID1= setInterval(()=>{
            if(parseInt(door.style.width || 0) <= 0 && parseInt(door1.style.width || 0) <= 0){
                clearInterval(doorsOpenID1);
                resolve(true);
            }else{
                door.style.width = parseInt(door.style.width || 0) - 6 + 'px';
                door1.style.width = parseInt(door1.style.width || 0) - 6 + 'px';
            }
        },10);
    })
}

function loop() {
    doorsClose().then(()=>{
        climb(queue[queue.length - 1]).then((res)=>{
            if(res){
                doorsOpen().then(()=>{
                    queue.pop();

                    if (queue.length === 0) {

                        clearInterval(liftId);
                        return;
                    }
                })
            }
        })
    })
}




// Open and Close buttons
const open = document.querySelector(".open");
const close = document.querySelector(".close");
const next = document.querySelector(".continue");
close.addEventListener("click", (evt) => {
    doorsClose().then(r => r);
})
open.addEventListener("click",(evt)=>{
    doorsOpen().then(r => r);
})
let check = false;
next.addEventListener(("click"),(evt)=>{
    check = true;
})



// floors button clicked and other all logic
const lift = document.querySelector(".obj");
let button = document.querySelectorAll(".fl");
button = [...button];
lift.style.bottom = "0";
const queue = [];



function climb(fl) {
    return new Promise((resolve, reject)=>{
        liftId = setInterval(()=>{
            if(check){
                loop();
                check = false;
            }
            console.log(15);
            if(parseInt(lift.style.bottom || 0) < (fl-1)*88){
                lift.style.bottom = parseInt(lift.style.bottom || 0) + 4 +'px';
            }else {
                resolve(true);
            }
        },10);
    })

}



let k = -2;


let liftId,doorsCloseId1,doorsCloseId2,doorsOpenID1,doorsOpenID2;
// let nowPosition = parseInt(lift.style.bottom || 0);
// console.log(nowPosition);
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click",(evt)=>{
        clearInterval(liftId);
        clearInterval(doorsCloseId1);
        clearInterval(doorsCloseId2);
        clearInterval(doorsOpenID1);
        clearInterval(doorsOpenID2);
        const floor = +(evt.target.innerText);

        queue.push(floor);
        loop();
    })
}















