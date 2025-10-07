import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

interface Props {
  onEnd: () => void;
}

const VideoSplash = ({ onEnd }: Props) => {
  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/splash.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat={false}
        onEnd={onEnd}
        muted={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoSplash;
