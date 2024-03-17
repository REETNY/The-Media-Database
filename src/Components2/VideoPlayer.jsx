import React, { useEffect, useRef, useState } from 'react'
import No_Trailer from "../assets/Videos_Trailer/No_Trailer.mp4"
import Test from "../assets/Videos_Trailer/Test.mp4"
import {FaPlay, FaPause, FaTools} from "react-icons/fa"
import { AiFillPicture, AiOutlineFullscreen, AiOutlineFullscreenExit, AiFillCaretLeft } from "react-icons/ai"
import Sound_Btn from '../Customs/Sound_Btn'

const VideoPlayer = ({setScreen, screen}) => {

    const [playerState, setPlayer] = useState({
        duration: 0,
        currentTime: 0,
        trackVal: 0,
        inpVal: 0,
        isPlaying: false,
        wasPlaying: false
    });

    const [videoSettz, setSettz] = useState({
        opt: "",
        settz: false,
        playback: 1.0
    })

   const [pip, setPip] = useState(false)

    const [PV, setPV] = useState(10)

    const [IsDrag, setDragging] = useState(false)

    let Player = useRef(null);
    let Track = useRef(null);
    let TrackThumb = useRef(null)
    let Seeker = useRef(null)
    let SeekView = useRef(null)
    let SeekedTime = useRef(null)
    let VideoTimer1 = useRef(null)
    let VideoTimer2 = useRef(null)
    let VideoCont = useRef(null);

    const playerTime = (e) => {
        let Track_Width = Track.current.clientWidth;
        const perc = parseFloat(((100 * e.target.currentTime) / playerState.duration).toFixed(3));
        TimerFunc(parseFloat(e.target.currentTime));
        let pixels = (Track_Width * perc) / 100;
        TrackThumb.current.style.left = `calc(${pixels}px)`;
        Track.current.style.background = `linear-gradient(to right, #860A35 0%, #860A35 calc(${perc}%), #53585a calc(${perc}%), #53585a 100%)`;
    }

    const NowPlaying = () => {
        setPlayer((obj) => ({...obj, isPlaying: true, wasPlaying: true}))
    }

    const NowPaused = () => {
        setPlayer((obj) => ({...obj, isPlaying: false}))
    }

    const NowEnded = () => {
        setPlayer((obj) => ({...obj, isPlaying: false, wasPlaying: false}))
    }

    const moveThumb = (e) => {
        const sliderRect = Track.current.getBoundingClientRect();
        const newPosition = e.clientX - sliderRect.left;
        const maxWidth = sliderRect.width;

        const newPositionClamped = Math.min(maxWidth, Math.max(0, (newPosition)));
        TrackThumb.current.style.left = `calc(${newPositionClamped}px)`;
        
        let perc = ((100 * newPositionClamped) / maxWidth);
        let time = (playerState.duration * perc) / 100;

        Track.current.style.background = `linear-gradient(to right, #860A35 0%, #860A35 calc(${perc}%), #53585a calc(${perc}%), #53585a 100%)`;
        Player.current.currentTime = time;


        TimerFunc(parseFloat(time));
    }

    const moveThumb2 = (e) => {
        const sliderRect = Track.current.getBoundingClientRect();
        const newPosition = (e.clientX - sliderRect.left);
        const maxWidth = sliderRect.width;

        const newPositionClamped = Math.min(maxWidth, Math.max(0, (newPosition)));
        
        let perc = ((100 * newPositionClamped) / maxWidth);
        let time = (playerState.duration * perc) / 100;

        let hour = (time / 60 / 60) % 24 ;
        let minutes = (time / 60) % 60;
        let seconds = (time) % 60;
        
        seconds = parseInt(Math.floor(seconds));
        minutes = parseInt(Math.floor(minutes));
        hour = parseInt(Math.floor(hour));
        
        SeekedTime.current.textContent = `${hour > 9 ? hour : `0${hour}`}:${minutes > 9 ? minutes : `0${minutes}`}: ${seconds > 9 ? seconds : `0${seconds}`}`
        SeekView.current.currentTime = time;

        Seeker.current.style.left  = 
        perc < 15 
        ? `calc(${perc}%)`
        : (perc > 15 && perc < 85)
        ? `calc(${perc}% - ${Seeker.current.clientWidth / 2}px)`
        : (perc > 85)
        ? `calc(${perc}% - ${Seeker.current.clientWidth}px)`
        : `calc(${perc}%)`

        
        
    }

    // const moveRound2 = (e) => {
    //     if(playerState.isPlaying){
    //         Player.current.pause();
    //         Player.current.currentTime = parseFloat(e.target.value);
    //         setPlayer((obj) => ({...obj, isPlaying: false, wasPlaying: true, inpVal: parseFloat(e.target.value)}))
    //     }else{
    //         Player.current.currentTime = parseFloat(e.target.value);
    //         setPlayer((obj) => ({...obj, inpVal: parseFloat(e.target.value), isPlaying: true, wasPlaying: false}))
    //     }
    // }

    // const moveRound3 = (e) => {
    //     if(playerState.wasPlaying){
    //         Player.current.play()
    //         setPlayer((obj) => ({...obj, isPlaying: true}))
    //     }else{
    //         setPlayer((obj) => ({...obj, isPlaying: false, wasPlaying: false}))
    //     }
    // }

    useEffect(() => {
        if(!IsDrag)return;

        let TW = Track.current.clientWidth;

        const handleMM = (e) => {
            const sliderRect = Track.current.getBoundingClientRect();
            const newPosition = e.clientX - sliderRect.left;
            const maxWidth = sliderRect.width;
            

            const thumbPosition = TrackThumb.current.getBoundingClientRect().left - sliderRect.left;
            const percentPosition = (thumbPosition / sliderRect.width) * 100;

            const newPositionClamped = Math.min(maxWidth, Math.max(0, (newPosition)));
            TrackThumb.current.style.left = newPositionClamped  + "px";
            
            let perc = ((100 * newPositionClamped) / maxWidth)

            let time = (playerState.duration * perc) / 100;

            Track.current.style.background = `linear-gradient(to right, #860A35 0%, #860A35 calc(${perc}%), #53585a calc(${perc}%), #53585a 100%)`;
            Player.current.currentTime = time;

        }

        const handleMU = (e) => {
            setDragging(false);
        }

        window.addEventListener("mousemove", handleMM)
        window.addEventListener("mouseup", handleMU)

        return () => {
            window.removeEventListener("mousemove", handleMM)
            window.removeEventListener("mouseup", handleMU)
        }

    }, [IsDrag])


    const setMouse = (e) => {
        setDragging(true)
    }

    const TimerFunc = (sec) => {
        let hour = (sec / 60 / 60) % 24 ;
        let minutes = (sec / 60) % 60;
        let seconds = (sec) % 60;

        seconds = parseInt(Math.floor(seconds));
        minutes = parseInt(Math.floor(minutes));
        hour = parseInt(Math.floor(hour));
        
        let vid2ArrElement = [...(VideoTimer2.current.childNodes)];
        vid2ArrElement[0].textContent = `${hour > 9 ? hour : `0${hour}`}`;
        vid2ArrElement[2].textContent = `${minutes > 9 ? minutes : `0${minutes}`}`;
        vid2ArrElement[4].textContent = `${seconds > 9 ? seconds : `0${seconds}`}`;
    }

    const TimerFunc2 = (sec) => {
        let hour = (sec / 60 / 60) % 24 ;
        let minutes = (sec / 60) % 60;
        let seconds = (sec) % 60;
        
        seconds = parseInt(Math.floor(seconds));
        minutes = parseInt(Math.floor(minutes));
        hour = parseInt(Math.floor(hour));

        let vid1ArrElement = [...(VideoTimer1.current.childNodes)];
        vid1ArrElement[2].textContent = `${minutes > 9 ? minutes : `0${minutes}`}`;
        vid1ArrElement[4].textContent = `${seconds > 9 ? seconds : `0${seconds}`}`;
        vid1ArrElement[0].textContent = `${hour > 9 ? hour : `0${hour}`}`;

    }  

    const R_I_Volume = (num) => {
        setPV(num);
        Player.current.volume = parseInt(num) / 100;
    }

    const PIPMODE = () => {
        setPip((bool) => !bool)

        if(!pip){
            Player.current.requestPictureInPicture()
        }else if(pip){
            document.exitPictureInPicture()
        }
    }

    const playBack = (num) => {
        Player.current.playbackRate = num;
        setSettz((obj) => ({...obj, playback: num, settz: false, opt: ""}));
    }


    let timer;

    let timeOut = () => {
        timer = setTimeout(excludeSettz, 4000);
    }

    const excludeSettz = () => {
        setSettz((obj) => ({...obj, opt: '', settz: false}))
    }

    const retainSettz = () => {
        clearTimeout(timer)
    }

  return (
   <>
        <div ref={VideoCont} className="video_player_cont">

            <div onDoubleClick={() => !playerState.isPlaying ? Player.current.play() : Player.current.pause()} className="vid_player_wrap">
                <video 
                onLoadedData={(e) => {
                    setPlayer((obj) => ({...obj, duration: e.target.duration}))
                    TimerFunc2(parseFloat(e.target.duration))
                }} 
                onTimeUpdate={(e) => {
                    playerTime(e)
                }}
                onPlaying={() => NowPlaying()}
                onEnded={() => NowEnded()}
                onPause={() => NowPaused()}
                ref={Player} 
                id='customVideoPlayer' 
                src={Test}>

                </video>
            </div>

            <div className="vid_player_controls">

                <div className="player_controls">
                    
                    <div className="part_left_controls">
                        <span onClick={() => !playerState.isPlaying ? Player.current.play() : Player.current.pause()} className="play_pause_video_controls">{
                            !playerState.isPlaying
                            ? <FaPlay />
                            : <FaPause />
                        }</span>

                        <span className="timer_video_control">

                            <span ref={VideoTimer1} className="timer_fullLength">
                                <span className="hr">..</span>
                                <span className="divisor_tim">:</span>
                                <span className="min">..</span>
                                <span className="divisor_tim">:</span>
                                <span className="sec">..</span>
                            </span>
                            -
                            <span ref={VideoTimer2} className="counting_timer">
                                <span className="hr">00</span>
                                <span className="divisor_tim">:</span>
                                <span className="min">00</span>
                                <span className="divisor_tim">:</span>
                                <span className="sec">00</span>
                            </span>

                        </span>

                    </div>

                    <div className="part_right_controls">
                        <span className="volume_controls"><Sound_Btn datas={{setVol: R_I_Volume, vol: PV}} /></span>
                        <span className="full_screen_controls" onClick={() => setScreen(VideoCont.current)}>
                            {screen 
                                ? <AiOutlineFullscreenExit />
                                :<AiOutlineFullscreen />
                            }
                        </span>
                        <span onClick={() => PIPMODE()} className="pip_mode"><AiFillPicture /></span>
                        <span className="settings_controls">
                            <span onClick={() => setSettz((obj) => ({...obj, settz: !videoSettz.settz, opt: ""}))} className='settings_icon'><FaTools /></span>

                            <div
                                onMouseEnter={() => retainSettz()} 
                                onMouseLeave={() => timeOut()} 
                                style={videoSettz.settz ? {display: "block"} : {display: "none"}} 
                                className="settings_options"
                            >

                                <div 
                                    style={videoSettz.opt == "" ? {display: "flex"} : {display: "none"}}        className="settings_main_menu"
                                >
                                    <div className="options_settings">
                                        <span onClick={() => setSettz((obj) => ({...obj, opt: "speed"}))} className="SOP">Playback Speed</span>
                                        
                                    </div>
                                </div>

                                <div style={videoSettz.opt == "speed" ? {display: "block"} : {display: "none"}}  className="playBackRate">
                                    <div onClick={() => setSettz((obj) => ({...obj, opt: ""}))} className="backBtn"><AiFillCaretLeft /></div>
                                    <div className="speedrate_options">
                                        <div style={videoSettz.playback == "0.25" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(0.25)} className="sppd_rate">0.25x</div>
                                        <div style={videoSettz.playback == "0.5" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(0.5)} className="sppd_rate">0.5x</div>
                                        <div style={videoSettz.playback == "0.75" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(0.75)} className="sppd_rate">0.75x</div>
                                        <div style={videoSettz.playback == "1.0" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(1.0)} className="sppd_rate">1.0x</div>
                                        <div style={videoSettz.playback == "1.25" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(1.25)} className="sppd_rate">1.25x</div>
                                        <div style={videoSettz.playback == "1.50" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(1.50)} className="sppd_rate">1.5x</div>
                                        <div style={videoSettz.playback == "1.75" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(1.75)} className="sppd_rate">1.75x</div>
                                        <div style={videoSettz.playback == "2.0" ? {background: "#053a5f", color: "white"} : {}} onClick={() => playBack(2.0)} className="sppd_rate">2.0x</div>
                                    </div>
                                </div>

                            </div>
                        </span>
                    </div>

                </div>

                <div className="player_track">
                    <span className="player_track_wrap">

                        {<div className="track_wrapper_cont">

                            
                            <div className="track_currTime">
                                <div className="track_length">
                                    <div className="hasLoaded_track"></div>
                                    <div 
                                    ref={Track} 
                                    onMouseDown={(e) => setMouse()} 
                                    className="progress_track"
                                    onClick={(e) => moveThumb(e)}
                                    onMouseMove={(e) => moveThumb2(e)}
                                    >
                                        <div ref={TrackThumb}  className="track_knob"></div>
                                    </div>
                                </div>
                            </div>

                            <div ref={Seeker} className="seek_for_time">
                                <span ref={SeekedTime} className="seekedTime">00:00:00</span>
                                <span className="seekedTime_Video">
                                    <video ref={SeekView} src={Test} ></video>
                                </span>
                            </div>
                           
                        </div>}

                    </span>
                </div>

            </div>

        </div>
   </>
  )
}

export default VideoPlayer