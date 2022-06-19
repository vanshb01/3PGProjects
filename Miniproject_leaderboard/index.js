
var fNameInp = document.getElementById("fName");
var lNameInp = document.getElementById("lName");
var countryInp = document.getElementById("countryInp");
var scoreInp = document.getElementById("scoreInp");
var addBtn = document.getElementById("addPlayerBtn");
var warning = document.getElementById("warning");
var container = document.getElementById("container");

var dateArr = ["JAN","FEB","MAR","APR","MAY","JUN",'JUL',"AUG","SEP","OCT","NOV","DEC"];

function getData(){
    var data = localStorage.getItem("Scores");
    var toReturn = [];

    if(!data){
        return toReturn;
    }else{
        toReturn = JSON.parse(data);
    }
    return toReturn;
}

function createFields(dataArr){
    container.innerHTML = "";
    for(let i=0;i<dataArr.length;i++){
        let body = dataArr[i];
        let id = body.id;
        let name = body.fName+" "+body.lName;
        let time = body.time;
        let country = body.country;
        let score = body.score;
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","deleteBtn");
        deleteBtn.innerHTML = "&#9986;";
        let incScoreBtn = document.createElement("button");
        incScoreBtn.setAttribute("class","incScoreBtn");
        incScoreBtn.innerHTML = "+5";
        let decScoreBtn = document.createElement("button");
        decScoreBtn.setAttribute("class","decScoreBtn");
        decScoreBtn.innerHTML = "-5";

        let playerDiv = document.createElement("div");
        playerDiv.setAttribute("class","playerDiv");

        let playerInfoDiv = document.createElement("div");
        playerInfoDiv.setAttribute("class","playerInfoDiv");

        let countryDiv = document.createElement("div");
        countryDiv.setAttribute("class","countryDiv");

        let scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("class","scoreDiv");

        let operationsDiv = document.createElement("div");
        operationsDiv.setAttribute("class","operationsDiv");

        playerDiv.appendChild(playerInfoDiv);
        playerDiv.appendChild(countryDiv);
        playerDiv.appendChild(scoreDiv);
        playerDiv.appendChild(operationsDiv);
        operationsDiv.appendChild(deleteBtn);
        operationsDiv.appendChild(incScoreBtn);
        operationsDiv.appendChild(decScoreBtn);

        let NamePara = document.createElement("p");
        NamePara.innerHTML = name;

        let timePara = document.createElement("p");
        timePara.innerHTML = time;

        let countryPara = document.createElement("h3");
        countryPara.innerHTML = country;

        let scorePara = document.createElement("p");
        scorePara.innerHTML = score;

        playerInfoDiv.appendChild(NamePara);
        playerInfoDiv.appendChild(timePara);
        countryDiv.appendChild(countryPara);
        scoreDiv.appendChild(scorePara);
        container.appendChild(playerDiv);
        deleteBtnFunc(deleteBtn,id,dataArr,i);
        incScoreBtnFunc(incScoreBtn,id,dataArr,i);
        decScoreBtnFunc(decScoreBtn,id,dataArr,i);

    }
}

createFields(getData());

function deleteBtnFunc(deleteBtn,id,dataArr,i){
    deleteBtn.addEventListener("click",function(){
        dataArr.splice(i,1);
        writeData(dataArr);
        createFields(dataArr);
    })
}
function incScoreBtnFunc(incScoreBtn,id,dataArr,i){
    incScoreBtn.addEventListener("click",function(){
        dataArr[i].score = dataArr[i].score + 5;

        writeData(dataArr);
        createFields(getData());
    })
}
function decScoreBtnFunc(decScoreBtn,id,dataArr,i){
    decScoreBtn.addEventListener("click",function(){
        dataArr[i].score = dataArr[i].score - 5;
        if(dataArr[i].score<0){
            dataArr.score = 0;
        }
        writeData(dataArr);
        createFields(getData());
    })
}
function writeData(dataArr){
    dataArr.sort((a, b) => b.score - a.score);
    dataArr = JSON.stringify(dataArr);
    localStorage.setItem("Scores",dataArr);
}

addBtn.addEventListener("click",function(){
    let body = {};
    let dataArr = getData();

    let fName = (fNameInp.value).trim();
    let lName = (lNameInp.value).trim();
    let country = (countryInp.value).trim();
    let score = parseInt(scoreInp.value);
    if(fName.length>0 && lName.length>0 && country.length>0 && score>=0){
        warning.style.display = "none";
        let id = Date.now()+fName[0]+lName[0]+Math.floor(Math.random()*1000);
        let d = new Date();
        let date = dateArr[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
        body.fName = fName;
        body.lName = lName;
        body.country = country;
        body.score = score;
        body.id = id;
        body.time = date;
        dataArr.push(body);
        dataArr.sort((a, b) => b.score - a.score);
        writeData(dataArr);
        createFields(getData());
        
    }else{
        warning.style.display = "block";
    }
    fNameInp.value="";
    lNameInp.value="";
    countryInp.value = "";
    scoreInp.value = "";
});
