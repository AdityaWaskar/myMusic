console.log("Welcome to the Spotify");

//Intialize the variables
let songIndex = 1;
let audioElement = new Audio('music/1.mp4');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let title = document.getElementById('title');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Qaafirana - Arijit Singh, Nikhita Gandhi", filePath:"music/1.mp4", coverPath:"images/cover/Quafiranna.jpg"},
    {songName:"Dilbar(From-Satyameva Jayate)", filePath:"music/2.mp4", coverPath:"images/cover/Dilbar.jpg"},
    {songName:"Majhe Aaiche Palkhila - Preet Bandre", filePath:"music/3.mp4", coverPath:"images/cover/maze-aiche-palkila.jpg"},
    {songName:"Nawari Distes G - Karan Shelke", filePath:"music/4.mp4", coverPath:"images/cover/nawari-diste-gaa.jpg"}, 
    {songName:"Shape Of You - Ed Sheeran", filePath:"music/5.mp4", coverPath:"images/cover/shape-of-you.jpg"},
    {songName:"Believer - Imagine Dragons", filePath:"music/6.mp4", coverPath:"images/cover/imagine-dragon.jpg"},
    {songName:"Bella Ciao - Manu Pilas", filePath:"music/7.mp4", coverPath:"images/cover/bella_chio.jpg"},
    {songName:"Khairiyat Pucho - Arijit Singh", filePath:"music/8.mp4", coverPath:"images/cover/kariyat_pucho.jpg"},
    {songName:"Mast Malang  - Adnan Dhool", filePath:"music/9.mp4", coverPath:"images/cover/mast-malang.jpg"}
]
let covers = [
    "images/cover/Quafiranna.jpg","images/cover/Dilbar.jpg", "images/cover/maze-aiche-palkila.jpg", "images/cover/nawari-diste-gaa.jpg", "images/cover/shape-of-you.jpg", "images/cover/imagine-dragon.jpg", "images/cover/bella_chio.jpg", "images/cover/kariyat_pucho.jpg", "images/cover/mast-malang.jpg"
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

document.getElementsByClassName("songItem")[0].style.boxShadow = "5px 8px 5px rgb(41 196 255 / 55%)" ;
document.getElementsByClassName("songItem")[songIndex-1].style.backgroundColor = "#3ae870" ;
document.getElementsByClassName("songItem")[0].style.transform = "scale(1.1)";
//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();    
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex.toString()).classList.remove('fa-play-circle');
        document.getElementById(songIndex.toString()).classList.add('fa-pause-circle');
}
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById(songIndex.toString()).classList.add('fa-play-circle');
        document.getElementById(songIndex.toString()).classList.remove('fa-pause-circle');
        // gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //updating seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
});


const markALLPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
}

const markALLDefault = ()=>{
    // Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        for (let i = 0; i < songs.length; i++) {

        document.getElementsByClassName("songItem")[i].style.boxShadow = "none";
        document.getElementsByClassName("songItem")[i].style.backgroundColor = "#22ebff";
        document.getElementsByClassName("songItem")[i].style.transform = "none";

        }
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(audioElement.paused)
        {
            markALLPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex-1].songName;
            audioElement.src = `music/${songIndex}.mp4`;
            audioElement.currentTime = 0;
            audioElement.play();    
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            markALLDefault();
            document.getElementsByClassName("songItem")[songIndex-1].style.boxShadow = "5px 8px 5px rgb(41 196 255 / 55%)" ;
            document.getElementsByClassName("songItem")[songIndex-1].style.backgroundColor = "#3ae870" ;
            document.getElementsByClassName("songItem")[songIndex-1].style.transform = "scale(1.1)";
            document.getElementById("cover").src = covers[songIndex-1];
            title.innerText = songs[songIndex-1].songName;
        }
        else
        {
            audioElement.pause(); 
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
        }
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=songs.length){
        songIndex = 1;
    }
    else{
        songIndex +=1; 
    }
        audioElement.src = `music/${songIndex}.mp4`;
        masterSongName.innerText = songs[songIndex-1].songName;
        title.innerText = songs[songIndex-1].songName;  
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        markALLPlays();
        document.getElementById(songIndex.toString()).classList.remove('fa-play-circle');
        document.getElementById(songIndex.toString()).classList.add('fa-pause-circle');
        document.getElementById("cover").src = covers[songIndex-1];
        markALLDefault();
        document.getElementsByClassName("songItem")[songIndex-1].style.boxShadow = "5px 8px 5px rgb(41 196 255 / 55%)" ;
        document.getElementsByClassName("songItem")[songIndex-1].style.backgroundColor = "#3ae870" ;
        document.getElementsByClassName("songItem")[songIndex-1].style.transform = "scale(1.1)" ;
    })

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = songs.length;
    }
    else{
        songIndex -=1; 
    }
        audioElement.src = `music/${songIndex}.mp4`;
        masterSongName.innerText = songs[songIndex-1].songName;
        title.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');  
        masterPlay.classList.add('fa-pause-circle');
        markALLPlays();
        document.getElementById(songIndex.toString()).classList.remove('fa-play-circle');
        document.getElementById(songIndex.toString()).classList.add('fa-pause-circle');
        console.log(covers[songIndex]);
        markALLDefault();
        document.getElementsByClassName("songItem")[songIndex-1].style.boxShadow = "5px 8px 5px rgb(41 196 255 / 55%)" ;
        document.getElementsByClassName("songItem")[songIndex-1].style.backgroundColor = "#3ae870" ;
        document.getElementsByClassName("songItem")[songIndex-1].style.transform = "scale(1.1)" ;
        document.getElementById("cover").src = covers[songIndex-1];
})

