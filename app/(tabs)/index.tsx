// CameraPreview.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const CameraPreview = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const [photoURI, setPhotoURI] = useState<null | string>(null);
  const [photo, setPhoto] = useState<any>({});

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    };
    requestCameraPermission();
  }, []);

  const handleTakePhoto = useCallback(async () => {
    try {
      const photo = await cameraRef.current?.takePhoto();
      if (photo) {
        console.log("Photo", photo);
        setPhotoURI(`file://${photo.path}`);
        setPhoto(photo);
      }
    } catch (error) {
      alert(`ERROR: ${error}`);
    }
  }, []);

  if (device == null)
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {photoURI && (
        <Image
          source={{ uri: photoURI }}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
      )}
      {!photoURI && (
        <>
          {hasPermission ? (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              ref={cameraRef}
              photo={true}
            />
          ) : (
            <Text style={styles.permissionText}>No camera permission</Text>
          )}
          <View style={styles.overlay}>
            <Text
              style={{
                ...styles.permissionText,
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              ถ่ายรูปมาตรให้อยู่ในวงกลม
            </Text>
            <View style={styles.circle} />
          </View>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => handleTakePhoto()}
          >
            <Text style={styles.captureButtonText}></Text>
          </TouchableOpacity>
        </>
      )}
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
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default CameraPreview;
