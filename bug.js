import { Camera } from 'expo-camera';

// ... other code ...

const [hasPermission, setHasPermission] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);

useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);

if (hasPermission === null) {
  return <View />; // Or some loading indicator
}
if (hasPermission === false) {
  return <Text>No access to camera</Text>;
}

return (
  <View style={styles.container}>
    <Camera style={styles.camera} type={type}>
      {/* Camera controls here */}
    </Camera>
  </View>
);