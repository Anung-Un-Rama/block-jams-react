import React, { Component } from 'react';
import albumData from './../data/albums';
import SongRow from './SongRow';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);


    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }
    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    componentDidMount() {
      this.eventListeners = {
         timeupdate: e => {
           this.setState({ currentTime: this.audioElement.currentTime });
         },
         durationchange: e => {
           this.setState({ duration: this.audioElement.duration });
         }
       };
       this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     }

     componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song});
    }

    handleSongClick(song) {
      if (this.state.isPlaying && this.isSameSong(song)) {
        this.pause();
      } else{
        if (!this.isSameSong(song)) { this.setSong(song); }
        this.play();
      }
    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex -1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min((this.state.album.songs.length - 1), currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime : newTime});
    }

    isSameSong(song) {
      return this.state.currentSong === song;
    }

    formatTime(seconds) {
      if (isNaN(seconds)) {return "-:--"}
      const wholeTime = Math.floor(seconds);
      const minutes = Math.floor(wholeTime / 60);
      const timeLeft = wholeTime % 60;
      let output = minutes + ':';
      if (timeLeft < 10) {
        output += '0';
      }
      output += timeLeft;
      return output;
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume : newVolume});
    }

    handleVolumeDownClick(e) {
      if (this.state.volume > 0) {
        const newVolume = this.state.volume - 0.1;
        this.audioElement.volume = Math.max(0, newVolume);
        this.setState({ volume : newVolume });
      }  else this.setState({ volume: 0});
    }

    handleFadeOut() {
      if (this.state.volume <= 0) {
        const newVolume = this.state.volume == 0.1;
        this.audioElement.volume = Math.max(0, newVolume);
        this.setState({});
      } 
    }


    handleVolumeUpClick(e) {
      if (this.state.volume < 1) {
        const newVolume = this.state.volume + 0.1;
        this.audioElement.volume = Math.min(newVolume, 1);
        this.setState({ volume : newVolume});
      } else this.setState({volume: 1});
    }



  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
         </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index ) =>
              <SongRow  key={index}
                        song={song}
                        onClick={() => this.handleSongClick(song)}
                        trackNumber={index + 1}
                        isPlaying={this.state.isPlaying}
                        selectedSong={this.isSameSong(song)}/>
                      )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          formatTime={this.formatTime}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          handleVolumeDownClick={(e) => this.handleVolumeDownClick(e)}
          handleVolumeUpClick={(e) => this.handleVolumeUpClick(e)}
        />
      </section>
    );
  }
}



export default Album;
