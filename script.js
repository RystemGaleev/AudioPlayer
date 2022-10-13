
window.addEventListener('DOMContentLoaded', () => {


        const player = document.querySelector('.player'),
              title = document.querySelector('.song'),
              subtitle = document.querySelector('.author'),
              cover = document.querySelector('.cover__img'),
              audio = document.querySelector('.audio'),
              progressContainer = document.querySelector('.progress__bar'),
              progress = document.querySelector('.progress'),
              pointer = document.querySelector('.pointer'),
              vinil = document.querySelector('.cover__vinil'),
              btnPrev = document.querySelector('.prev'),
              btnNext = document.querySelector('.next'),
              play = document.querySelector('.play'),
              pause = document.querySelector('.pause'),
              repeat = document.querySelector('.repeat'),
              random = document.querySelector('.random'),
              input = document.querySelector('.checkbox'),
              itemsWrapper = document.querySelector('.favorite'),
              container = document.querySelector('.container');
            
    
        //музыка
        const  music = [
            {
                name: "Пьяный дождь",
                track: "assets/audio/Пьяный дождь.mp3",
                author: "Макс корж",
                img: "assets/img/cover1.jpg",
                id:1
            },
            {
                name: "Benz truck",
                track: "assets/audio/Benz truck.mp3",
                author: "Lil Peep",
                img: "assets/img/cover2.jpg",
                id:2
            },
            {
                name: "Чистый",
                track: "assets/audio/Чистый.mp3",
                author: "Скриптонит",
                img: "assets/img/cover3.jpg",
                id:3
            },
            {
                name: "Sad",
                track: "assets/audio/Sad.mp3",
                author: "XXXtentacion",
                img: "assets/img/cover4.jpg",
                id:4
            },
            {
                name: "Bank account",
                track: "assets/audio/Bank account.mp3",
                author: "21 Savage",
                img: "assets/img/cover5.jpg",
                id:5
            },
            {
                name: "Евродэнс",
                track: "assets/audio/Евродэнс.mp3",
                author: "GSPD",
                img: "assets/img/cover6.jpg",
                id:6
            },
            {
                name: "POPSTAR",
                track: "assets/audio/Instasamka.mp3",
                author: "Instasamka",
                img: "assets/img/instasamka.jpg",
                id:7
            },
            {
                name: "Marmelade",
                track: "assets/audio/Miyagi.mp3",
                author: "Miyagi & Andy Panda & Mav",
                img: "assets/img/miyagi.jpg",
                id:8
            },
            {
                name: "I GOT LOVE",
                track: "assets/audio/I Got Love.mp3",
                author: "Miyagi & Andy Panda & Rem Digga",
                img: "assets/img/miyagi-andy-digga.jpg",
                id:9
            },
            {
                name: "Dance monkey",
                track: "assets/audio/Dance_monkey.mp3",
                author: "Tones and I",
                img: "assets/img/Dance monkey.jpg",
                id:10
            },
            {
                name: "Родная пой",
                track: "assets/audio/Rodnaya poy.mp3",
                author: "Miyagi & Cady",
                img: "assets/img/miyagi-cady.jpg",
                id:11
            },
            {
                name: "Moneken Love",
                track: "assets/audio/MONEYKEN_LOVE.mp3",
                author: "Instasamka",
                img: "assets/img/moneyken.jpg",
                id:12
            }
        
        ];
        
    
        //трек по умолчанию
        let musicIndex = 0;
    
        //репит трека
        audio.loop = false;
    
    
        //Генерация все музыки в альбом
        const favoriteWrapper = document.querySelector('.favorite');
        for (let i = 0; i < music.length; i++) {
            let favoriteItem = `
            <div class="favorite__item" data-action="${i}">
                <div class="favorite__cover">
                    <img src="${music[i].img}" alt="${i}" class="cover__img favorite__cover-img">
                </div>
                <div class="author favorite__author">${music[i].author}</div>
                <audio class="audio favorite__audio" loop src="${music[i].track}"></audio>
                <div class="song favorite__track">${music[i].name}</div>
            </div>
            `;
            favoriteWrapper.insertAdjacentHTML("beforeend", favoriteItem);
        }
    
        
    
        //Получение трека на который был клик, и открытие его в плеере
     
        itemsWrapper.addEventListener('click', playingNow);
       
        function playingNow(e) {
            let currentIndex = e.target.closest('[data-action]');
            const items = document.querySelectorAll('.favorite__item')
           
    
                
            const indexToPlay = +currentIndex.dataset.action
            loadSong(indexToPlay)
            playSong()
    
            items.forEach((item, index)=>{
                item.classList.toggle('active', indexToPlay === index)
            });
        
        }
    
    
        function loadSong(musicIndex) {
            try {
                title.innerHTML = music[musicIndex].name;
                subtitle.innerHTML = music[musicIndex].author;
            
                audio.src = music[musicIndex].track;
                cover.src = music[musicIndex].img;
            
            } catch(e) {
                console.error();
            }
                
          
        }
        
        loadSong(musicIndex);
    
    
        //play
        function playSong() {
            player.classList.add('play');
            vinil.classList.add('active');
            pause.src = "assets/icons/pause.svg";
            audio.play();
        }
    
        //pause
        function pauseSong() {
            player.classList.remove('play');
            vinil.classList.remove('active');
            pause.src = "assets/icons/play.svg";
            audio.pause();
        }
    
    
          play.addEventListener('click', () => {
            const isPlaying = player.classList.contains('play');
                if (isPlaying) {
                    pauseSong();
                } else {
                    playSong();
                }
        });
    
        let isRandom = false;
    
        random.addEventListener('click', () => {
            isRandom = true;
            const svg = document.querySelector('#svg-random');
            svg.classList.toggle('red');
    
            if(isRandom) {
                let random_index = Math.floor(Math.random() * music.length);
                musicIndex = random_index;
    
            }
            loadSong(musicIndex);
            playSong();
        });
    
        //след. трек 
         function nextSong() {
            musicIndex++;
    
            if (musicIndex > music.length -1) {
                musicIndex = 0;
            }
            
            loadSong(musicIndex);
            playSong();
        }
    
    
        btnNext.addEventListener('click', nextSong);
    
    
        //пред. трек
         function prevSong() {
            musicIndex--;
    
            if (musicIndex < 0) {
                musicIndex = music.length -1;
            }
    
            loadSong(musicIndex);
            playSong();
        }
    
        btnPrev.addEventListener('click', prevSong);
    
    
        //progress bar
        function updateProgress(e) {
            const {duration, currentTime} = e.target;//Длина песни и текущее время песни
            const progressPercent = (currentTime / duration) * 100 + 2;
            progress.style.width = `${progressPercent}%`;
    
            //Текущее и общее время трека отображаем на странице
            if(audio.duration) {
            
                let currentTime = document.querySelector('.music__current-time');
                let totalTime = document.querySelector('.music__total-time');
    
    
                let currentMinutes = Math.floor(audio.currentTime / 60);
                let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(audio.duration  / 60);
                let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
    
                if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
                if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
                if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes; }
                if (durationSeconds < 10 ) {durationSeconds = "0" + durationSeconds; }
    
                currentTime.textContent = currentMinutes + ":" + currentSeconds;
                totalTime.textContent = durationMinutes + ":" + durationSeconds;
    
            }
    
        }
    
        //progress pointer
        function updatePointer(e) {
            const {duration, currentTime} = e.target;
            const progressPointer = (currentTime / duration) * 100;
            pointer.style.left = `${progressPointer}%`;
        }
    
        audio.addEventListener('timeupdate', updatePointer);
        audio.addEventListener('timeupdate', updateProgress);
    
    
        //По клику на прогресс , запускать нужный участок песни
        function setProgress(e) {
            const width = this.clientWidth;
            const clickBarX = e.offsetX;
            const duration = audio.duration;
    
            audio.currentTime = (clickBarX / width) * duration;
        }
    
        progressContainer.addEventListener('click', setProgress);
    
        //autoplay
        audio.addEventListener('ended', nextSong);
    
        //репит трека
        function repeatSong() {
          const svg = document.querySelector('#svg-repeat');
    
            if (audio.loop == false) {
                audio.loop = true;
                svg.classList.add("red");
            }
            else {
                audio.loop = false;
                svg.classList.remove("red");
            }
        }
    
        repeat.addEventListener('click', repeatSong);
    
        // Смена фона
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                player.style.background = "";
                container.style.background = "#21746d";
                progress.style.background = "#000";
                pointer.style.background = "#000";
                container.classList.remove('background');
                itemsWrapper.style.background = "none";
            } else {
                container.classList.add('background');
                progress.style.background = "#ff973f";
                pointer.style.background = "#e33535";
                itemsWrapper.style.background = "rgba(255, 255, 255, 0.1)";
            }
        });
    


});

