import {StyleSheet, View, Text , Dimensions} from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import { WebView } from 'react-native-webview';


const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY;
const BackgroundVideo = ({ videoSource }) => {
    const videoRef = useRef(null);

    const [videoUrl, setVideoUrl] = useState(null);



    const getVideoSource = (source) => {
        if(source && source.results.length > 0) {
            const firstAvailableVideo = source?.results.find(video => video.type === 'Trailer');
            if (firstAvailableVideo) {
                console.log("First available video:", firstAvailableVideo);
                return firstAvailableVideo.key
            } else {
                console.log("No video found with the desired type.");
            }

        }

    }
    const videoId = getVideoSource(videoSource)

    const [status, setStatus] = React.useState({});

    // useEffect(() => {
    //     (async () => {
    //         // Load the video when the component mounts
    //         await videoRef.current.loadAsync({ uri: videoSource }, { shouldPlay: true });
    //     })();
    // }, [videoSource]);





    useEffect(() => {
        fetchVideoUrl();

    }, []);

    const fetchVideoUrl = async () => {
        try {
            // Make a request to the YouTube Data API to get the video details
            const response = await fetch(

                `https://www.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${YOUTUBE_API_KEY}`
            );
            const result = await response.json();

            if (!result || !result.items || result.items.length === 0) {
                throw new Error('Video not found');
            }

            const { player } = await result.items[0];

            const videoUri = player.embedHtml.match(/src="([^"]*)/)[1];

            console.log('player',videoUri)

            setVideoUrl(videoUri.replace(/&amp;/g, '&'));
        } catch (error) {
            console.error('Error fetching video URL:', error);
        }
    };

    if (!videoUrl) {
        return null; // Return a loading state or placeholder
    }



    return (

            <View style={styles.container}>
                <WebView
                    ref={videoRef}
                    style={styles.webView}
                    source={{ uri: `https:${videoUrl}` }}
                    allowsInlineMediaPlayback={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={`
                         document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
                    `}
                    allowsFullscreenVideo={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={true}
                    allowFileAccess={false}
                    startInLoadingState={true}

                />
            </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    webView: {
        zIndex:1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
export default BackgroundVideo;