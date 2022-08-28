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




// Open and Close buttons
const open = document.querySelector(".open");
const close = document.querySelector(".close");
close.addEventListener("click", (evt) => {
    doorsClose().then(r => r);
})
open.addEventListener("click",(evt)=>{
    doorsOpen().then(r => r);
})




// floors button clicked and other all logic
const lift = document.querySelector(".obj");
let button = document.querySelectorAll(".fl");
button = [...button];
lift.style.bottom = "0";
const queue = [];


let k = -2;


let check = true,liftId,doorsCloseId1,doorsCloseId2,doorsOpenID1,doorsOpenID2;
// let nowPosition = parseInt(lift.style.bottom || 0);
// console.log(nowPosition);
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click",(evt)=>{
        k++;
        const floor = +(evt.target.innerText);

        clearInterval(liftId);
        clearInterval(doorsCloseId1);
        clearInterval(doorsCloseId2);
        clearInterval(doorsOpenID1);
        clearInterval(doorsOpenID2);

        let isInclude = queue.includes(floor);
        if(!isInclude){
            if(parseInt(lift.style.bottom || 0) > (+(floor)-1)*88 && parseInt(lift.style.bottom || 0) < (+(queue[k])-1)*88){
                queue.unshift(floor);
            }else {
                queue.push(floor);
            }
        }
        doorsClose().then(()=>{
            liftId = setInterval(()=>{
                if(queue.length === 0){
                    k = -2;
                    clearInterval(liftId);
                }
                else if(parseInt(lift.style.bottom || 0) > (+(queue[queue.length-1])-1)*88 ){
                    lift.style.bottom = parseInt(lift.style.bottom || 0) - 4 +'px';
                }
                else if(parseInt(lift.style.bottom || 0) < (+(queue[queue.length-1])-1)*88){
                    if(parseInt(lift.style.bottom || 0) > (+(queue[k])-1)*88 && parseInt(lift.style.bottom || 0) < (+(floor)-1)*88){

                        let a = queue.pop();
                        queue.unshift(a);
                    }else {
                        lift.style.bottom = parseInt(lift.style.bottom || 0) + 4 +'px';
                    }
                }
                else  if(check){
                    check = false;
                    doorsOpen().
                    then(()=>{
                        doorsClose().
                        then(()=>{
                            queue.pop();
                            check = true;
                        });
                    });
                }
            },10);

        })

    })
}












