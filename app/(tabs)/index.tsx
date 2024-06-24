// CameraPreview.js
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const CameraPreview = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const device = useCameraDevice("back");

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    };
    requestCameraPermission();
  }, []);

  if (device == null)
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
        />
      ) : (
        <Text style={styles.permissionText}>No camera permission</Text>
      )}
      <View style={styles.overlay}>
        <Text style={{...styles.permissionText, fontSize: 24, marginBottom: 8}}>ถ่ายรูปมาตรให้อยู่ในวงกลม</Text>
        <View style={styles.circle} />
      </View>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => console.log("Capture")}
      >
        <Text style={styles.captureButtonText}>ถ่าย</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  captureButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default CameraPreview;
