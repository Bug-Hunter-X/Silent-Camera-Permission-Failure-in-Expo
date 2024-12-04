import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        setCameraError(error);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting Permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>Camera permission denied. Please enable permission in your device settings</Text>;
  }
  if (cameraError) {
    Alert.alert('Camera Error', `An error occurred: ${cameraError.message}`);
    return <Text>Camera error. Check logs for details.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        {/* Camera controls here */}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default App;