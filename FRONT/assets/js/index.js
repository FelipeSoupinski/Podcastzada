function setVars(files, favoritos) {
    window.files = files;
    window.favoritos = favoritos;
}

$(function() {
    // Definir playlist
    playlist = [];
    for(var i=0; i<files.length; i++){
        playlist[i] = {
            artist: favoritos[i]['nome_canal'],
            title: favoritos[i]['nome_episodio'],
            mp3: files[i]
        };
    }

    currentTrack = 0;
    numTracks = playlist.length;

    player = $(".player").jPlayer({
        ready: function () {

            // configura a faixa inicial do jPlayer
            player.jPlayer("setMedia", playlist[currentTrack])
          
          },
          ended: function() {
              // quando terminar de tocar uma música, ir para a próxima
              $(this).playNext();
          },
          play: function(){
              // quando começar a tocar, escrever o nome da faixa sendo executada
              $('.player-current-track').text(playlist[currentTrack].artist+' - '+playlist[currentTrack].title);
          },
          swfPath: '/jplayer/',
          supplied: "mp3",
          cssSelectorAncestor: "",
          cssSelector: {
              play: '.player-play',
              pause: ".player-pause",
              stop: ".player-stop",
              seekBar: ".player-timeline",
              playBar: ".player-timeline-control"
          },
          size: {
              width: "1px",
              height: "1px"
          }
      });

      player.playCurrent = function() {
        player.jPlayer("setMedia", playlist[currentTrack]).jPlayer("play");
      }
      
      player.playNext = function() {
       currentTrack = (currentTrack == (numTracks -1)) ? 0 : ++currentTrack;
       player.playCurrent();
      };
      
      player.playPrevious = function() {
         currentTrack = (currentTrack == 0) ? numTracks - 1 : --currentTrack;
         player.playCurrent();
      };

     $('.player-next').click(function() {
        player.playNext();
     });
     
     $('.player-prev').click(function() {
       player.playPrevious();
     });

 });

function playThis(x, favorito, imagem) {
    for(var i=0; i<files.length; i++){
        if(playlist[i]['title'] == x){
            currentTrack = i;
            player.jPlayer("setMedia", playlist[currentTrack]).jPlayer("play");
            break;
        } 
    }
    if(favorito){
        setFavorito();
    } else {
        notFavorito();
    }
    attImagemPlayer(imagem);
}

function attImagemPlayer(imagem){
    img = document.getElementById('canal-logo');
    img.style = 'display:block;';
    img.setAttribute('src', imagem);
}

function attVolume() {
    document.getElementById('jp_audio_0').volume =document.getElementById('volume-control').value;
}

function showTempoTotal() {
    var audio = document.getElementById("jp_audio_0");
    let data = new Date(null);
    data.setSeconds(audio.duration);
    let duracao = data.toISOString().substr(12, 7);
    document.getElementById('tempo-total').innerHTML = duracao;
}

function attTempoAtual() {
    var audio = document.getElementById("jp_audio_0");
    let data = new Date(null);
    data.setSeconds(audio.currentTime);
    let tempo_atual = data.toISOString().substr(12, 7);
    document.getElementById('tempo-atual').innerHTML = tempo_atual;
}

function play() {
    showTempoTotal();
    temporizador = setInterval(attTempoAtual, 1000);
}

function changeSpeed(speed){
    var audio = document.getElementById("jp_audio_0");
    audio.playbackRate = speed;
}

$(function(){

    $("#dropdown-speed").on('click', 'div', function(){
      $(".btn:first-child").text($(this).text());
      $(".btn:first-child").val($(this).text());
   });

});

function attImageFavoritos(){
    var favorito = document.getElementById("add-favoritos");
    if(favorito.getAttribute('src') == '../assets/img/favorito_2.png'){
        favorito.setAttribute('src', '../assets/img/favorito.png');
    } else {
        favorito.setAttribute('src', '../assets/img/favorito_2.png');
    }
}

function setFavorito(){
    var favorito = document.getElementById("add-favoritos");
    favorito.setAttribute('src', '../assets/img/favorito_2.png');
}

function notFavorito(){
    var favorito = document.getElementById("add-favoritos");
    favorito.setAttribute('src', '../assets/img/favorito.png');
}

