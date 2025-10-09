import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { VIDEOS } from '@assets/videos';

type VideoSplashScreenProps = {
  onVideoEnd: () => void;
};

const VideoSplashScreen: React.FC<VideoSplashScreenProps> = ({
  onVideoEnd,
}) => {
  const [hasEnded, setHasEnded] = useState(false);

  const handleVideoEnd = useCallback(() => {
    if (hasEnded) return;
    setHasEnded(true);
    onVideoEnd();
  }, [hasEnded, onVideoEnd]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasEnded) {
        console.log('Video timeout - forcing end');
        handleVideoEnd();
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [hasEnded, handleVideoEnd]);

  return (
    <View style={styles.container}>
      <Video
        source={VIDEOS.splash}
        style={styles.video}
        resizeMode="contain"
        repeat={false}
        onEnd={handleVideoEnd}
        onError={error => {
          console.warn('Video error:', error);
          handleVideoEnd();
        }}
        muted={true}
        playInBackground={false}
        playWhenInactive={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoSplashScreen;
