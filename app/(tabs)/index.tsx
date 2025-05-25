// // import { Redirect } from 'expo-router';
// // import 'react-native-reanimated';

// // export default function Index() {
// //   return <Redirect href="/Home" />;
// // }
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   ImageBackground,
//   View,
//   TextInput,
//   Text,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Camera } from 'expo-camera';
// import * as Location from 'expo-location';
// import { ThemedText } from '@/components/ThemedText';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as FileSystem from 'expo-file-system';
// import { LocationGeocodedAddress } from 'expo-location';
// import { ScrollView } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { ActivityIndicator } from 'react-native';
// import { RefreshControl } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import { Ionicons } from '@expo/vector-icons';
// //import TopNavBar from '@/components/TopNavBar';
// // import RNHTMLtoPDF from 'react-native-html-to-pdf';
// // import * as MediaLibrary from 'expo-media-library';
// // import ChatbotIcon from './ChatbotIcon';
// //import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { MaterialIcons } from '@expo/vector-icons';

// export default function HomeScreen() 
// {
//   type Report = {
//     _id: string;
//     userId: string;
//     imageUrl: string;
//     location: string;
//     summary: string;
//     createdAt: string;
//     status?: string;
//     latitude?: number;  
//     longitude?: number; 
//   };
  
  
//   const [screen, setScreen] = useState('home');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [image, setImage] = useState<string | null>(null);
//   const [location, setLocation] = useState<string | null>(null);
//     const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [tooltipVisible, setTooltipVisible] = useState(false);
//   const [latestUpload, setLatestUpload] = useState<
//   {
//     image: string | null;
//     location: string | null;
//     date: string;
//     coordinates?: { latitude: number; longitude: number } | null;
//   }>({ image: null, location: null, date: '', coordinates: null });
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const buttonOpacity = useRef(new Animated.Value(0)).current;
//   const [selectedRole, setSelectedRole] = useState<string | null>(null);
//   const [otp, setOtp] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [resetEmail, setResetEmail] = useState('');
//   const [showManualLocation, setShowManualLocation] = useState(false);
//   const [address, setAddress] = useState('');
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [selectedAddress, setSelectedAddress] =  useState<LocationGeocodedAddress | null>(null);
//   const [aiSummary, setAiSummary] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [totalReports, setTotalReports] = useState(0);
//   const [pendingReports, setPendingReports] = useState(0);
//   const [urgentReports, setUrgentReports] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [recentReports, setRecentReports] = useState<{ time: string; message: string }[]>([]);
//   const [message, setMessage] = useState('');
//   const [allReports, setAllReports] = useState<Report[]>([]);
//   const [loadingReports, setLoadingReports] = useState(true);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [needsRefresh, setNeedsRefresh] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [currentScreen, setCurrentScreen] = useState<'login' | 'user' | 'history'>('login');
//   const [historyData, setHistoryData] = useState<Report[]>([]);
//   const [summaryProgress, setSummaryProgress] = useState(0); // 0 to 100
//   const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

 
//   useEffect(() => {
//     const loadRole = async () => {
//       const savedRole = await AsyncStorage.getItem('selectedRole');
//       if (savedRole) setSelectedRole(savedRole);
//     };
//     loadRole();
  
//     Animated.timing(logoOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start(() => {
//       Animated.timing(textOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start(() => {
//         Animated.timing(buttonOpacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();
//       });
//     });
//   }, []);

//   const convertUriIfNeeded = async (uri: string): Promise<string> => {
//     if (uri && uri.startsWith('content://')) {
//       const newPath = FileSystem.cacheDirectory + 'converted.jpg';
//       await FileSystem.copyAsync({ from: uri, to: newPath });
//       return newPath;
//     }
//     return uri;
//   };

//   const fetchAISummary = async (): Promise<void> => {
//   let interval: NodeJS.Timeout | null = null;
//   try {
//     console.log('🧠 Starting fetchAISummary');
//     console.log('Original Image URI:', latestUpload.image);

//     if (!latestUpload.image) {
//       Alert.alert("Error", "No image selected.");
//       return;
//     }

//     setIsGeneratingSummary(true);
//     setSummaryProgress(0);

//     // Simulate summary generation progress
//     interval = setInterval(() => {
//       setSummaryProgress((prev) => (prev < 90 ? prev + 10 : prev));
//     }, 300);

//     const imageUri = await convertUriIfNeeded(latestUpload.image);
//     console.log('✅ Processed Image URI:', imageUri);

//     const formData = new FormData();
//     formData.append('image', {
//       uri: imageUri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     } as any);

//     console.log('📤 Sending request to Flask server...');
//     const aiResponse = await fetch('https://495e-34-150-134-178.ngrok-free.app/analyze', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         Accept: 'application/json',
//       },
//     });

//     if (!aiResponse.ok) {
//       const errorText = await aiResponse.text();
//       console.error('🔥 Server Error:', errorText);
//       throw new Error(`Server Error: ${errorText}`);
//     }

//     const contentType = aiResponse.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const data = await aiResponse.json();
//       console.log('✅ AI Response:', data);
//       console.log('📍 Summary:', data.data.summary); 
//       console.log('📍 Message:', data.message);

//       setAiSummary(data.data.summary || '[No summary returned]');
//       setMessage(data.message);

//       clearInterval(interval);
//       setSummaryProgress(100);
//       setIsGeneratingSummary(false);

//       //await uploadToServer();
//     } else {
//       const rawText = await aiResponse.text();
//       console.warn('⚠️ Unexpected response:', rawText);
//       throw new Error(`Unexpected response format: ${rawText}`);
//     }
//   } catch (err: unknown) {
//     if (interval) clearInterval(interval);
//     setSummaryProgress(0);
//     setIsGeneratingSummary(false);

//     const msg = err instanceof Error ? err.message : 'Unknown error';
//     console.error('⚠️ AI Summary Fetch Error:', msg);
//     setAiSummary('[Error generating summary: ' + msg + ']');
//   }
// };

  
//   useEffect(() => {
//     if (screen === 'summary' && latestUpload.image) {
//       setAiSummary('');
//       fetchAISummary(); // This causes the error if fetchAISummary is defined below
//     }
//   }, [screen]);
  
//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation not supported');
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
//       () => alert('Unable to retrieve location')
//     );
//   };
  
//   const validateAndLogin = async () => {
//     setErrorMessage('');
  
//     if (!selectedRole) {
//       Alert.alert('Error', 'Please select a role before logging in.');
//       return;
//     }
  
//     if (selectedRole === 'Supervisor' && email.toLowerCase() !== 'safestreet3@gmail.com') {
//       Alert.alert('Access Denied', 'Only the authorized Supervisor email can log in.');
//       return;
//     }
  
//     if (!email.includes('@')) {
//       setErrorMessage('Email must contain @');
//       return;
//     }
  
//     if (password.length < 8 || !/\d/.test(password)) {
//       setErrorMessage('Password must be at least 8 characters long and contain at least one number');
//       return;
//     }
  
//     try {
//       const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonErr) {
//         console.error('Response was not valid JSON:', text);
//         throw new Error('Server returned invalid response. Try again later.');
//       }
  
//       console.log('Login response:', data);
  
//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }
  
//       if (!data.user || !data.user._id) {
//         throw new Error('User not found in response');
//       }
  
//       await AsyncStorage.setItem('userId', data.user._id);
  
    
//       setFullName(data.user.name || '');
//       setEmail(data.user.email || '');
  
//       Alert.alert('Login Successful', `Welcome, ${data.user.name || 'User'}`);
  
//       if (selectedRole === 'User') {
//         setScreen('UserDashboard');
//       } else if (selectedRole === 'Supervisor') {
//         setScreen('supervisorDashboard');
//       } else {
//         setScreen('roleSelection');
//       }
  
//     } catch (err) {
//       console.error('Login Error:', err);
//       const message = err instanceof Error ? err.message : 'Something went wrong';
//       Alert.alert('Login Error', message);
//     }
//   };
  
    
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };
//   const validateAndSignUp = async () => {
//     console.log('Sign Up button clicked ✅');
  
//     if (!fullName || !phoneNumber || !email || !occupation || !password || !confirmPassword) {
//       Alert.alert('Error', 'All fields are required!');
//       return;
//     }
  
//     if (!email.includes('@')) {
//       Alert.alert('Error', 'Email must contain @');
//       return;
//     }

//     if (password.length < 8 || !/\d/.test(password)) {
//       Alert.alert('Error', 'Password must be at least 8 characters long and contain at least one number');
//       return;
//     }
  
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }
    
//     try {
//       const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: fullName,
//           phone: phoneNumber,
//           email,
//           password,
//         }),
//       });
//       const getAddressFromCoords = async (coords: { latitude: number; longitude: number }) => {
//         try {
//           const [address] = await Location.reverseGeocodeAsync(coords);
//           return address;
//         } catch (error) {
//           console.error("Failed to reverse geocode:", error);
//           return null;
//         }
//       };
//       const handleRegionChangeComplete = async (region: { latitude: number; longitude: number }) => {
//         setSelectedLocation({ latitude: region.latitude, longitude: region.longitude });
        
//         const address = await getAddressFromCoords(region);
//         setSelectedAddress(address);
//       };
      
//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonErr) {
//         console.error('Invalid JSON from server:', text);
//         throw new Error('Unexpected server response');
//       }
  
//       console.log('Signup response:', data);
  
//       if (!response.ok) {
//         throw new Error(data.error || 'Signup failed');
//       }
  
//       Alert.alert('Success', 'Sign Up Successful. Redirecting to Login...');
//       setScreen('login');
//     }catch (err) {
//       console.error('Signup Error:', err);
//       const message = err instanceof Error ? err.message : 'Something went wrong';
//       Alert.alert('Signup Error', message);
//     }    
//   };
  
  
//   const takePicture = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Camera permission is required to take pictures.');
//       return;
//     }
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };
//   const extractLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Location access is required to get image location.');
//       return;
//     }
  
//     let loc = await Location.getCurrentPositionAsync({});
//     let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
  
//     if (reverseGeocode.length > 0) {
//       let address = reverseGeocode[0];
  
//       setLocation(
//         `${address.name ? address.name + ', ' : ''}` +
//         `${address.street ? address.street + ', ' : ''}` +
//         `${address.postalCode ? address.postalCode + ', ' : ''}` +
//         `${address.city ? address.city + ', ' : ''}` +
//         `${address.region ? address.region + ', ' : ''}` +
//         `${address.country ? address.country : ''}`
//       );
//     } else {
//       setLocation("Location not found");
//     }
//   };
//   const getCoordsFromAddress = async (address: string) => {
//     try {
//       const locations = await Location.geocodeAsync(address);
//       if (locations.length > 0) {
//         const { latitude, longitude } = locations[0];
//         console.log('Coordinates from address:', latitude, longitude);
  
//         setSelectedLocation({ latitude, longitude });
//       } else {
//         Alert.alert('Error', 'No location found for this address.');
//       }
//     } catch (error) {
//       console.error('Error getting coordinates:', error);
//       Alert.alert('Error', 'Failed to fetch location coordinates.');
//     }
//   };
  
//   <View style={styles.manualContainer}>
//   <ThemedText type="title" style={styles.heading}>Enter Location</ThemedText>

//   <TextInput
//     placeholder="Type location here..."
//     value={address}
//     onChangeText={setAddress}
//     style={styles.manual_input}
//     placeholderTextColor="#999"
//   />

//   <TouchableOpacity
//     style={styles.getLocationButton}
//     onPress={() => getCoordsFromAddress(address)}
//   >
//     <ThemedText type="defaultSemiBold" style={styles.buttonText}>Get Address</ThemedText>
//   </TouchableOpacity>

//   {address !== '' && (
//     <Text style={{ marginTop: 10, fontSize: 16, color: '#000' }}>
//       Selected Address: {address}
//     </Text>
//   )}

//   <View style={styles.mapContainer}>
//     <View style={{ height: 200, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
//       <WebView
//         source={{ uri: 'https://www.openstreetmap.org' }}
//         style={{ flex: 1 }}
//       />
//     </View>
//   </View>

//   <TouchableOpacity
//     style={styles.manual_backButton}
//     onPress={() => {
//       if (!address) {
//         Alert.alert('Error', 'Please select an address first');
//         return;
//       }
//       setLatestUpload(prev => ({ ...prev, location: address }));
//       setScreen('imageUpload');
//     }}
//   >
//     <ThemedText type="defaultSemiBold" style={styles.button}>Done</ThemedText>
//   </TouchableOpacity>
// </View>

  
// const sendOtpToEmail = async () => {
//   if (!email.includes('@')) {
//     return Alert.alert('Invalid Email', 'Please enter a valid email address');
//   }

//   try {
//     const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/send-otp', { 
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });

//     const data = await res.json();
//     if (!res.ok) return Alert.alert('Error', data.error || 'Something went wrong');

//     Alert.alert('OTP Sent ✅', 'Check your email for the OTP');
//     setScreen('otpVerification'); 
//   } catch (err) {
//     console.error('Send OTP Error:', err);
//     Alert.alert('Error', 'Server error');
//   }
// };
  
  
//   // Function to verify OTP
//   const verifyOTP = async () => {
//     try {
//       const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/verify-otp', { 
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });
  
//       const data = await res.json();
//       if (!res.ok) return Alert.alert('Error', data.error || 'Invalid OTP');
  
//       Alert.alert('Verified!', 'OTP verified successfully');
//       setScreen('resetPassword'); 
//     } catch (err) {
//       console.error('Verify OTP Error:', err);
//       Alert.alert('Error', 'Server error');
//     }
//   };
  

//   const handleSummaryClick = () => {
//     setLatestUpload({
//       image: image,
//       location: position
//         ? `Latitude: ${position[0]}, Longitude: ${position[1]}`
//         : 'No location',
//       date: new Date().toLocaleDateString(),
//       coordinates: position
//         ? { latitude: position[0], longitude: position[1] }
//         : null,
//     });    
//     setScreen('summary');
//   };
  
//   const handleSummaryNavigation = () => {
//     if (!image || !address) {
//       Alert.alert("Error", "Please select image and location.");
//       return;
//     }
//     setLatestUpload({
//       image,
//       location: address || location || 'No location provided',
//       date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//       coordinates: selectedLocation || null, 
//     });
    
//         setScreen('summary');
//   };
  
//   const uploadToServer = async () => {
//     try {
//       if (!latestUpload.location || !latestUpload.image) {
//         Alert.alert("Upload Error", "Please select an image and location.");
//         return;
//       }
  
//       const userId = await AsyncStorage.getItem('userId');
//       if (!userId) {
//         Alert.alert("Error", "User not logged in properly.");
//         return;
//       }
  
//       setUploading(true); 
//       setUploadProgress(0); 
  
//       // Step 1: Analyze Image
//       const analyzeFormData = new FormData();
//       analyzeFormData.append('image', {
//         uri: latestUpload.image,
//         name: 'upload.jpg',
//         type: 'image/jpeg',
//       } as any);
  
//       const analyzeRes = await fetch('https://e18c-183-82-237-45.ngrok-free.app/analyze', {
//         method: 'POST',
//         body: analyzeFormData,
//       });
  
//       const analyzeText = await analyzeRes.text();
//       let analyzeData;
//       try {
//         analyzeData = JSON.parse(analyzeText);
//       } catch (error) {
//         console.error('Invalid analyze response:', analyzeText);
//         throw new Error('Failed to analyze image');
//       }
  
//       const summary = analyzeData?.data?.summary || '[No summary returned]';
//       setAiSummary(summary);
  
//       // Step 2: Upload to server with progress tracking
//       const uploadFormData = new FormData();
//       uploadFormData.append('userId', userId);
//       uploadFormData.append('location', latestUpload.location);
//       uploadFormData.append('summary', summary);
//       uploadFormData.append('image', {
//         uri: latestUpload.image,
//         name: 'upload.jpg',
//         type: 'image/jpeg',
//       } as any);
  
//       // ✅ Replacing normal fetch here with XHR for progress
//       await new Promise<void>((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', 'https://e18c-183-82-237-45.ngrok-free.app/api/upload/new');
  
//         xhr.setRequestHeader('Accept', 'application/json');
  
//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const percent = Math.round((event.loaded * 100) / event.total);
//             console.log('Upload Progress:', percent);
//             setUploadProgress(percent);
//           }
//         };
  
//         xhr.onload = () => {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             console.log('✅ Upload success response:', xhr.responseText);
//             resolve();
//           } else {
//             reject(new Error(`Upload failed: ${xhr.status}`));
//           }
//         };
  
//         xhr.onerror = () => {
//           reject(new Error('Network error'));
//         };
  
//         xhr.send(uploadFormData);
//       });
  
//       Alert.alert(
//       "Success 🎉",
//       "Upload sent successfully to Supervisor!\n\nDo you want to logout?",
//       [
//         {
//           text: "Stay",
//           onPress: () => {
//             setScreen('UserDashboard');
//           },
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress: logout,
//           style: "destructive",
//         },
//       ]
//     );

//     // Clear form after upload
//     setImage(null);
//     setAddress('');
//     setLocation(null);
//     setLatestUpload({ image: null, location: null, date: '', coordinates: null });
//     setNeedsRefresh(true);

  
//       setScreen('UserDashboard'); // Move to User dashboard
  
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error('Upload Error:', err.message);
//         Alert.alert('Upload Failed ❌', err.message);
//       } else {
//         console.error('Unknown Upload Error');
//         Alert.alert('Upload Failed ❌', 'An unknown error occurred.');
//       }
//     } finally {
//       setUploading(false);
//     }
//   };
  
//   // Function to reset password
//   const resetPassword = async () => {
//     if (newPassword.length < 8 || !/\d/.test(newPassword)) {
//       return Alert.alert(
//         'Invalid Password',
//         'Password must be at least 8 characters long and contain a number.'
//       );
//     }

//     if (newPassword !== confirmPassword) {
//       return Alert.alert('Password Mismatch', 'Passwords do not match.');
//     }

//     try {
//       const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, newPassword }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return Alert.alert('Error', data.error || 'Failed to reset password.');
//       }

//       Alert.alert('Success', 'Password updated successfully.');
//       setScreen('login');
//     } catch (error) {
//       Alert.alert('Error', 'Server error. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/upload/all');
//         const data = await res.json();
//         setAllReports(data);
//       } catch (err) {
//         console.error('Failed fetching reports:', err);
//       } finally {
//         setLoadingReports(false);
//         setNeedsRefresh(false); // ✅ after fetching, reset flag
//       }
//     };
  
//     if (screen === 'supervisorDashboard') {
//       setLoadingReports(true);
//       fetchReports();
//     }
//   }, [screen, needsRefresh]);
  
  

//   const logout = async () => {
//     try {
//       // ✅ Clear all important AsyncStorage data
//       await AsyncStorage.removeItem('userId');
//       await AsyncStorage.removeItem('selectedRole');
  
//       // ✅ Reset important states
//       setFullName('');
//       setEmail('');
//       setPassword('');
//       setSelectedRole(null);
//       setImage(null);
//       setLocation(null);
  
//       // ✅ Navigate to home or login screen
//       setScreen('home');
      
//       Alert.alert('Logged Out', 'You have been logged out successfully.');
//     } catch (err) {
//       console.error('Logout Error:', err);
//       Alert.alert('Error', 'Something went wrong during logout.');
//     }
//   };
  

//   // const downloadAndSavePdf = async (url: string) => {
//   //   try {
//   //     const filename = url.split('/').pop() || 'report.pdf';
//   //     const downloadPath = FileSystem.documentDirectory + filename;
  
//   //     const { status } = await MediaLibrary.requestPermissionsAsync();
//   //     if (status !== 'granted') {
//   //       Alert.alert('Permission Denied', 'Storage permission is required to save the PDF.');
//   //       return;
//   //     }
  
//   //     const downloadRes = await FileSystem.downloadAsync(url, downloadPath);
//   //     console.log('📥 Downloaded to:', downloadRes.uri);
  
//   //     const asset = await MediaLibrary.createAssetAsync(downloadRes.uri);
//   //     await MediaLibrary.createAlbumAsync('Download', asset, false);
//   //     Alert.alert('✅ Success', 'PDF downloaded and saved to your device.');
  
//   //   } catch (error) {
//   //     console.error('❌ PDF Download Error:', error);
//   //     Alert.alert('Error', 'Failed to download PDF.');
//   //   }
//   // };


//   const downloadAndSavePdf = async (pdfUrl: string): Promise<void> => {
//     try {
//       await WebBrowser.openBrowserAsync(pdfUrl);
//     } catch (error) {
//       console.error('Error opening PDF:', error);
//     }
//   };
  
//   const handleDownloadPdf = async () => {
//     try {
//       // Fetch the PDF URL from your server
//       const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/generate-pdf', {
//         method: 'POST', // or 'GET', depending on your backend
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           image: '...',      // whatever your API needs
//           summary: '...',
//           location: '...'
//         }),
//       });

//       const data = await response.json();

//       if (!data.pdfUrl) {
//         throw new Error('No PDF URL returned');
//       }

//       // Open the PDF in the browser
//       await WebBrowser.openBrowserAsync(data.pdfUrl);

//     } catch (error) {
//       console.error('PDF open error:', error);
//       Alert.alert('Error', 'Failed to open PDF.');
//     }
//   };

//   const generateAndOpenPdf = async (html: string, fileName: string): Promise<void> => {
//     try {
//       const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/generate-pdf', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ html, fileName }),
//       });
  
//       const data: { url?: string } = await response.json();
  
//       if (!data.url) {
//         throw new Error('No PDF URL returned');
//       }
  
//       await WebBrowser.openBrowserAsync(data.url);
  
//     } catch (error) {
//       console.error('PDF generation/open error:', error);
//       Alert.alert('Error', 'Failed to generate or open PDF.');
//     }
//   };
  
//   const validReports = allReports
//     .filter(r => typeof r.latitude === 'number' && typeof r.longitude === 'number')
//     .map(r => ({
//       lat: r.latitude,
//       lon: r.longitude,
//       summary: (r.summary || 'No Summary').replace(/'/g, "\\'"),
//       location: (r.location || 'Unknown').replace(/'/g, "\\'")
//     }));

//   // console.log('🧭 Map Pins:', validReports);

//   useEffect(() => {
//     const fetchUserHistory = async () => {
//       try {
//         const userId = await AsyncStorage.getItem('userId');
//         console.log('📦 Fetching reports for userId:', userId);
//         if (!userId) {
//           console.warn('User ID not found');
//           return;
//         }
//         const res = await fetch(`https://e18c-183-82-237-45.ngrok-free.app/api/upload/user/${userId}`);
//         const data = await res.json();
//         setHistoryData(data);
//       } catch (error) {
//         console.error('Error fetching user history:', error);
//       }
//     };
  
//     if (screen === 'history') {
//       fetchUserHistory();
//     }
//   }, [screen]);
  
//   // const sendToAuthorities = async (report: Report) => {
//   //   try {
//   //     const res = await fetch('http://192.168.3.138:8000/api/receive-report', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         imageUrl: `https://e18c-183-82-237-45.ngrok-free.app${report.imageUrl}`,
//   //         location: report.location,
//   //         summary: report.summary,
//   //         date: report.createdAt,
//   //         status: report.status || 'Pending',
//   //       }),
//   //     });
  
//   //     const text = await res.text();
//   //     console.log('📦 Raw response:', text);
  
//   //     let data;
//   //     try {
//   //       data = JSON.parse(text);
//   //     } catch (err) {
//   //       throw new Error('Server did not return valid JSON.');
//   //     }
  
//   //     if (!res.ok) throw new Error(data.message || 'Failed to send report');
  
//   //     Alert.alert('✅ Sent!', 'Report sent to authorities successfully');
//   //   } catch (err) {
//   //     console.error('❌ Send error:', err);
//   //     Alert.alert('Error', err.message || 'Something went wrong');
//   //   }
//   // };

//   const sendToAuthorities = async (report: Report) => {
//     try {
//         // const res = await fetch('http://localhost:8000/api/receive-report',
          
//           const res = await fetch('http://192.168.29.113/api/receive-report', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 imageUrl: report.imageUrl,  // Use relative path for consistency
//                 location: report.location,
//                 summary: report.summary,
//                 date: new Date(report.createdAt).toISOString(),  // Ensure proper date format
//                 status: report.status || 'Pending',
//             }),
//         });

//         const data = await res.json();

//         if (!res.ok) throw new Error(data.error || 'Failed to send report');

//         alert('✅ Sent! Report sent to authorities successfully');
//     } catch (err) {
//         console.error('❌ Send error:', err);
//         alert('Error: ' + (err.message || 'Something went wrong'));
//     }
// };
  

  
  
//   return (
//     <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
//       {/* <TopNavBar
//         isLoggedIn={screen !== 'login' && screen !== 'signup' && screen !== 'home' && screen !== 'auth'}
//         onNavigate={(target) => {
//           if (target === 'logout') logout();
//           else setScreen(target);
//         }}
//         fullName={fullName}
//       /> */}
//       {screen === 'home' && (
//         <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
//           <View style={styles.HomeContainer}>
//             <Animated.View style={[styles.homeInnerContainer, { opacity: logoOpacity }]}>
//               <Animated.Image
//                 source={require('@/assets/images/logo.png')}
//                 style={[styles.logo, { opacity: logoOpacity }]}
//               />
//               <Animated.View style={{ opacity: textOpacity, alignItems: 'center' }}>
//                 <ThemedText type="title" style={styles.title}>Safe Street</ThemedText>
//                 <ThemedText type="subtitle" style={styles.tagline}>Making roads safer, one step at a time</ThemedText>
//               </Animated.View>
//               <Animated.View style={{ opacity: buttonOpacity }}>
//                 <TouchableOpacity style={styles.startButton} onPress={() => setScreen('roleSelection')}>
//                   <ThemedText type="defaultSemiBold" style={styles.buttonText}>Start</ThemedText>
//                 </TouchableOpacity>
//               </Animated.View>
//             </Animated.View>
//           </View>
//         </ImageBackground>
//       )}
//       {screen === 'auth' && (
//         <View style={styles.AuthContainer}>
//           <ThemedText type="title" style={styles.authTitle}>
//             {selectedRole ? `${selectedRole} Authentication` : 'Authentication'}
//           </ThemedText>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.authButton} onPress={() => setScreen('login')}>
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>Login</ThemedText>
//             </TouchableOpacity>
//             {selectedRole === 'User' && (
//               <TouchableOpacity style={styles.authButton} onPress={() => setScreen('signup')}>
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Sign Up</ThemedText>
//               </TouchableOpacity>
//             )}
//           </View>
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('roleSelection')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </View>
//       )}
//       {screen === 'login' && (
//         <ScrollView contentContainerStyle={styles.loginScrollContainer}>
//         <View style={styles.loginCard}>
//           <Text style={styles.loginTitle}>{selectedRole ? `${selectedRole} Login` : 'Login'}</Text>
      
//           {/* Email Input */}
//           <TextInput
//             style={styles.loginInput}
//             placeholder="Enter Email"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//             placeholderTextColor="#999"
//           />
      
//           {/* Password Input with Eye */}
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Enter Password"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               placeholderTextColor="#999"
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//             </TouchableOpacity>
//           </View>
      
//           {/* Error Message */}
//           {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      
//           {/* Submit Button */}
//           <TouchableOpacity style={styles.loginButton} onPress={validateAndLogin}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
      
//           {/* Forgot Password Link */}
//           <TouchableOpacity onPress={() => setScreen('forgotPassword')}>
//             <Text style={styles.loginLink}>Forgot Password?</Text>
//           </TouchableOpacity>
      
//           {/* Sign Up Link */}
//           <TouchableOpacity onPress={() => setScreen('signup')}>
//             <Text style={styles.loginLink}>
//               Don't have an account? <Text style={styles.loginLinkBold}>Sign up here</Text>
//             </Text>
//           </TouchableOpacity>
      
//           {/* Back Button */}
//           <TouchableOpacity style={styles.backButton} onPress={() => setScreen('auth')}>
//             <Text style={styles.buttonText}>Back</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>      
//       )}

//       {screen === 'forgotPassword' && (
//         <View style={styles.forgotPasswordcontainer}>
//           <View style={styles.forgotPasswordcard}>
//             <Text style={styles.title}>🔐 Enter Your Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="example@mail.com"
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             <TouchableOpacity style={styles.submitButton} onPress={sendOtpToEmail}>
//               <Text style={styles.buttonText}>Send OTP</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('login')}>
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//       {screen === 'otpVerification' && (
//         <View style={styles.forgotPasswordcontainer}>
//           <View style={styles.forgotPasswordcard}>
//             <Text style={styles.title}>🔐 Enter OTP</Text>

//             <Text style={styles.label}>OTP sent to:</Text>
//             <Text style={styles.email}>{email}</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter OTP"
//               keyboardType="numeric"
//               onChangeText={setOtp}
//               value={otp}
//             />

//             <TouchableOpacity style={styles.submitButton} onPress={verifyOTP}>
//               <Text style={styles.buttonText}>Verify OTP</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('forgotPassword')}>
//               <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {screen === 'resetPassword' && (
//         <View style={styles.forgotPasswordcontainer}>
//           <View style={styles.forgotPasswordcard}>
//             <Text style={styles.title}>🔐 Reset Password</Text>

//             <Text style={styles.label}>New Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new password"
//               secureTextEntry={!showPassword}
//               onChangeText={setNewPassword}
//               value={newPassword}
//             />

//             <Text style={styles.label}>Confirm Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm new password"
//               secureTextEntry={!showPassword}
//               onChangeText={setConfirmPassword}
//               value={confirmPassword}
//             />

//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Text style={styles.toggle}>
//                 {showPassword ? 'Hide Password' : 'Show Password'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.submitButton} onPress={resetPassword}>
//               <Text style={styles.buttonText}>Reset Password</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('login')}>
//               <Text style={styles.buttonText}>Back to Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {screen === 'signup' && (
//         <ScrollView contentContainerStyle={styles.signupScrollContainer}>
//         <View style={styles.signupCard}>
//           <Text style={styles.signupTitle}>User Sign Up</Text>
      
//           {/* Full Name */}
//           <TextInput
//             style={styles.signupInput}
//             placeholder="Full Name"
//             value={fullName}
//             onChangeText={setFullName}
//             placeholderTextColor="#999"
//           />
      
//           {/* Phone Number */}
//           <TextInput
//             style={styles.signupInput}
//             placeholder="Phone Number"
//             keyboardType="phone-pad"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholderTextColor="#999"
//           />
      
//           {/* Email */}
//           <TextInput
//             style={styles.signupInput}
//             placeholder="Email"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//             placeholderTextColor="#999"
//           />
      
//           {/* Occupation */}
//           <TextInput
//             style={styles.signupInput}
//             placeholder="Occupation"
//             value={occupation}
//             onChangeText={setOccupation}
//             placeholderTextColor="#999"
//           />
      
//           {/* Password + Eye Button */}
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Password"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               placeholderTextColor="#999"
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//             </TouchableOpacity>
//           </View>
      
//           {/* Confirm Password + Eye Button */}
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Confirm Password"
//               secureTextEntry={!showConfirmPassword}
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               placeholderTextColor="#999"
//             />
//             <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//               <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
//             </TouchableOpacity>
//           </View>
      
//           {/* Submit Button */}
//           <TouchableOpacity style={styles.signupButton} onPress={validateAndSignUp}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
      
//           {/* Already have an account */}
//           <TouchableOpacity onPress={() => setScreen('login')}>
//             <Text style={styles.loginLink}>
//               Already have an account? <Text style={styles.loginLinkBold}>Login here</Text>
//             </Text>
//           </TouchableOpacity>
      
//           {/* Back Button */}
//           <TouchableOpacity style={styles.backButton} onPress={() => setScreen('auth')}>
//             <Text style={styles.buttonText}>Back</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>      
//       )}
//       {/* Role Selection */}
//       {screen === 'roleSelection' && (
//         <View style={styles.roleContainer}>
//           <ThemedText type="title" style={styles.authTitle}>Select Your Role</ThemedText>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity 
//               style={styles.roleButton} 
//               onPress={async () => { 
//                 await AsyncStorage.setItem('selectedRole', 'User'); 
//                 setSelectedRole('User'); 
//                 setScreen('auth'); 
//               }}
//             >
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>User</ThemedText>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.roleButton} 
//               onPress={async () => { 
//                 await AsyncStorage.setItem('selectedRole', 'Supervisor'); 
//                 setSelectedRole('Supervisor'); 
//                 setScreen('auth'); 
//               }}
//             >
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>Supervisor</ThemedText>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('home')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </View>
//       )}

//       {screen === 'UserDashboard' && (
//         <View style={styles.UserDashboardContainer}>
//           <ThemedText type="title" style={styles.authTitle}>User Dashboard</ThemedText>
//           <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('imageUpload')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload a Picture</ThemedText>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('history')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>View History</ThemedText>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('roleSelection')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </View>
//       )}
//       {screen === 'history' && (
//       <>
//         <TouchableOpacity onPress={() => setScreen('UserDashboard')} style={{ marginBottom: 20 }}>
//           <Ionicons name="arrow-back" size={28} color="#fff" />
//         </TouchableOpacity>

//         <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
//           My Report History
//         </Text>

//         <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//           {historyData.length === 0 ? (
//             <Text style={{ color: '#94a3b8', fontSize: 16, textAlign: 'center' }}>
//               No reports submitted yet.
//             </Text>
//           ) : (
//             historyData.map((item, index) => (
//               <View
//                 key={item._id || index}
//                 style={{
//                   backgroundColor: '#334155',
//                   borderRadius: 16,
//                   padding: 16,
//                   marginBottom: 16,
//                 }}
//               >
//                 {item.imageUrl && (
//                   <Image
//                     source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${item.imageUrl}` }}
//                     style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 10 }}
//                   />
//                 )}
//                 <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//                   📍 {item.location}
//                 </Text>
//                 <Text style={{ color: '#ccc', marginTop: 6, fontSize: 12 }}>
//                   🕑 {new Date(item.createdAt).toLocaleString()}
//                 </Text>
//               </View>
//             ))
//           )}
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('UserDashboard')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </ScrollView>
//       </>
//     )}
//       {screen === 'imageUpload' && (
//         <View style={styles.imageUploadContainer}>
//           {!image && (
//             <>
//               <TouchableOpacity style={styles.submitButton} onPress={takePicture}>
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Take Picture</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.submitButton} onPress={pickImage}>
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload from Device</ThemedText>
//               </TouchableOpacity>
//             </>
//           )}
//           {image && (
//             <View>
//               <Image source={{ uri: image }} style={styles.previewImage} />
//               <TouchableOpacity
//                 style={styles.submitButton}
//                 onPress={() => {
//                   setImage(null);
//                   setLocation(null);
//                   setAddress('');
//                   setPosition(null);
//                   setSelectedLocation(null);
//                 }}
//               >
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Retake</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('manualLocation')}>
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Enter Location Manually</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.submitButton} onPress={extractLocation}>
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Get Location</ThemedText>
//               </TouchableOpacity>
//             </View>
//           )}
//           {(location || address) && (
//             <View>
//               {location && (
//                 <Text style={styles.locationText}>Coordinates: {location}</Text>
//               )}
//               {address !== '' && (
//                 <Text style={styles.locationText}>Selected Address: {address}</Text>
//               )}
//               <TouchableOpacity
//                 style={styles.submitButton}
//                 onPress={() => {
//                   if (!image || (!address && !location)) {
//                     Alert.alert("Error", "Please select an image and add a location before continuing.");
//                     return;
//                   }
                
//                   const finalLocation = address || location || "No location available";
                
//                   setLatestUpload({
//                     image,
//                     location: finalLocation,
//                     date: new Date().toLocaleDateString(),
//                   });
//                   setScreen('summary');
//                 }}
                
//               >
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Summary</ThemedText>
//               </TouchableOpacity>
//             </View>
//           )}
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('UserDashboard')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </View>
//       )}
//       {screen === 'manualLocation' && (
//         <View style={styles.manualContainer}>
//           <ThemedText type="title" style={styles.heading}>Pick Location on Map</ThemedText>

//           <View style={styles.mapContainer}>
//             <WebView
//               originWhitelist={['*']}
//               source={{
//                 html: `
//                   <!DOCTYPE html>
//                   <html>
//                     <head>
//                       <title>OpenStreetMap</title>
//                       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                       <link
//                         rel="stylesheet"
//                         href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
//                       />
//                       <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
//                       <style>
//                         #map { height: 100%; width: 100%; }
//                         html, body { margin: 0; padding: 0; height: 100%; }
//                       </style>
//                     </head>
//                     <body>
//                       <div id="map"></div>
//                       <script>
//                         document.addEventListener('DOMContentLoaded', function() {
//                           var map = L.map('map').setView([17.385044, 78.486671], 13);
//                           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                             attribution: '&copy; OpenStreetMap contributors'
//                           }).addTo(map);

//                           var marker;

//                           map.on('click', function(e) {
//                             if (marker) {
//                               map.removeLayer(marker);
//                             }
//                             marker = L.marker(e.latlng).addTo(map);

//                             window.ReactNativeWebView.postMessage(JSON.stringify({
//                               lat: e.latlng.lat,
//                               lng: e.latlng.lng
//                             }));
//                           });
//                         });
//                       </script>
//                     </body>
//                   </html>
//                 `
//               }}
//               injectedJavaScriptBeforeContentLoaded={''}
//               onMessage={async (event) => {
//                 try {
//                   const data = JSON.parse(event.nativeEvent.data);
//                   const { lat, lng } = data;

//                   console.log('Clicked Coordinates:', lat, lng);
//                   setSelectedLocation({ latitude: lat, longitude: lng });

//                   const { status } = await Location.requestForegroundPermissionsAsync();
//                   if (status !== 'granted') {
//                     Alert.alert('Permission Denied', 'Location permission is required to reverse geocode.');
//                     return;
//                   }

//                   const [addr] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
//                   const fullAddress = `${addr.name ? addr.name + ', ' : ''}${addr.street ? addr.street + ', ' : ''}${addr.postalCode ? addr.postalCode + ', ' : ''}${addr.city ? addr.city + ', ' : ''}${addr.region ? addr.region + ', ' : ''}${addr.country ? addr.country : ''}`;

//                   console.log('Full Address:', fullAddress);
//                   setAddress(fullAddress);
//                 } catch (error) {
//                   console.error('Failed parsing map click:', error);
//                 }
//               }}
//               style={{ flex: 1 }}
//             />
//           </View>

//           {address !== '' && (
//             <Text style={{ marginTop: 10, fontSize: 16, color: '#000' }}>
//               Selected Address: {address}
//             </Text>
//           )}

//           <TouchableOpacity
//             onPress={() => {
//               if (!address) {
//                 Alert.alert("Error", "Please select a location by clicking on the map.");
//                 return;
//               }
//               setLatestUpload(prev => ({
//                 ...prev,
//                 location: address,
//               }));
//               setScreen('imageUpload');
//             }}
//           >
//             <ThemedText type="defaultSemiBold" style={styles.button}>Done</ThemedText>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('imageUpload')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
    
          

//         </View>
//       )}

//       {screen === 'summary' && latestUpload.image && (
//         <View style={styles.supervisorViewContainer}>
//           <Image source={{ uri: latestUpload.image }} style={styles.previewImage} />
//           <Text style={styles.summaryText}>SUMMARY</Text>
//           <Text style={styles.locationText}>Name: {fullName || '[Unknown]'}</Text>
//           <Text style={styles.locationText}>Email: {email || '[Unknown]'}</Text>
//           <Text style={styles.locationText}>Date: {latestUpload.date || '[Not Set]'}</Text>
//           <Text style={styles.locationText}>Location: {latestUpload.location}</Text>

//           <Text style={{ color: 'white', fontSize: 16 }}>{message}</Text>

//           {/* ✅ Progress Bar: Generating Summary */}
//           {isGeneratingSummary && (
//             <View style={{ width: '100%', marginTop: 15 }}>
//               <Text style={{ color: '#fff', marginBottom: 4 }}>Generating Summary...</Text>
//               <View style={{ height: 10, backgroundColor: '#555', borderRadius: 5 }}>
//                 <View
//                   style={{
//                     height: 10,
//                     width: `${summaryProgress}%`,
//                     backgroundColor: 'orange',
//                     borderRadius: 5,
//                   }}
//                 />
//               </View>
//             </View>
//           )}

//           {/* ✅ Progress Bar: Uploading Report */}
//           {uploading && (
//             <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 20 }}>
//               <Text style={{ color: '#fff', marginBottom: 4 }}>
//                 Uploading: {uploadProgress}%
//               </Text>
//               <View style={{
//                 height: 10,
//                 backgroundColor: '#ccc',
//                 borderRadius: 5,
//                 overflow: 'hidden',
//               }}>
//                 <View style={{
//                   width: `${uploadProgress}%`,
//                   height: '100%',
//                   backgroundColor: '#00ff00',
//                 }} />
//               </View>
//             </View>
//           )}


//           {/* ✅ Upload button (disabled when summary is generating or upload in progress) */}
//           {!isGeneratingSummary && !uploading && (
//             <TouchableOpacity style={styles.uploadButton} onPress={uploadToServer}>
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload</ThemedText>
//             </TouchableOpacity>
//           )}

//           {/* ✅ Back button */}
//           <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('home')}>
//             <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Supervisor Dashboard */}
//       {screen === 'supervisorDashboard' && (
//         <ImageBackground
//           source={require('@/assets/images/potholeclick.png')}
//           style={{ flex: 1, width: '100%', height: '100%' }}
//           resizeMode="cover"
//         >
//           <ScrollView
//             contentContainerStyle={{
//               paddingVertical: 20,
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//             }}
//             keyboardShouldPersistTaps="handled"
//             refreshControl={  /* 🆕 Pull to refresh added */
//               <RefreshControl
//                 refreshing={loadingReports}
//                 onRefresh={async () => {
//                   setLoadingReports(true);
//                   try {
//                     const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/upload/all');
//                     const data = await res.json();
//                     setAllReports(data);
//                   } catch (err) {
//                     console.error('Failed fetching reports:', err);
//                   } finally {
//                     setLoadingReports(false);
//                   }
//                 }}
//               />
//             }
//           >
//             <View style={styles.supervisorDashboardContainer}>
//               {/* Title */}
//               <ThemedText type="title" style={styles.authTitle}>
//                 Supervisor Dashboard
//               </ThemedText>

//               {/* Summary Cards */}
//               <View style={styles.cardRow}>
//                 <View style={[styles.dashboardCard, { backgroundColor: 'rgba(0, 123, 255, 0.8)' }]}>
//                   <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Total Reports</ThemedText>
//                   <ThemedText style={styles.cardValue}>{allReports.length}</ThemedText>
//                 </View>

//                 <View style={[styles.dashboardCard, { backgroundColor: 'rgba(40, 167, 69, 0.8)' }]}>
//                   <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Pending</ThemedText>
//                   <ThemedText style={styles.cardValue}>{pendingReports}</ThemedText>
//                 </View>

//                 <View style={[styles.dashboardCard, { backgroundColor: 'rgba(220, 53, 69, 0.8)' }]}>
//                   <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Urgent</ThemedText>
//                   <ThemedText style={styles.cardValue}>{urgentReports}</ThemedText>
//                 </View>
//               </View>

//               {/* Map View */}
//               <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
//                 <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//                   Map View
//                 </ThemedText>
                
//                 <View style={styles.mapBox}>
//                 <WebView
//                   originWhitelist={['*']}
//                   javaScriptEnabled={true}
//                   style={{ width: '100%', height: 400 }}
//                   source={{
//                     html: `
//                       <!DOCTYPE html>
//                       <html>
//                         <head>
//                           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                           <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
//                           <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
//                           <style>
//                             html, body, #map { height: 100%; margin: 0; padding: 0; }
//                           </style>
//                         </head>
//                         <body>
//                           <div id="map"></div>
//                           <script>
//                             const reports = ${JSON.stringify(validReports)};

//                             const map = L.map('map');
//                             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                               attribution: '&copy; OpenStreetMap contributors'
//                             }).addTo(map);

//                             const markers = [];

//                             reports.forEach(report => {
//                               if (report.lat && report.lon) {
//                                 const marker = L.marker([report.lat, report.lon])
//                                   .addTo(map)
//                                   .bindPopup('<b>' + report.location + '</b><br>' + report.summary);
//                                 markers.push(marker);
//                               }
//                             });

//                             if (markers.length > 1) {
//                               const group = new L.featureGroup(markers);
//                               map.fitBounds(group.getBounds().pad(0.2));
//                             } else if (markers.length === 1) {
//                               map.setView([markers[0].getLatLng().lat, markers[0].getLatLng().lng], 14);
//                             } else {
//                               map.setView([17.385044, 78.486671], 12);
//                             }
//                           </script>
//                         </body>
//                       </html>
//                     `
//                   }}
//                 />
//                 </View>
//               </View>

//               {/* All Reports */}
//               <View style={{ width: '100%', marginTop: 20 }}>
//                 <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
//                   Recent Updated Reports
//                 </ThemedText>

//                 {loadingReports ? (
//                   <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
//                 ) : allReports.length > 0 ? (
//                   allReports.map((report, index) => (
//                     <TouchableOpacity
//                         key={report._id || index}
//                         style={styles.reportItem}
//                         onPress={() => {
//                             setSelectedReport(report);
//                             setScreen('supervisorReportView');
//                         }}
//                         >
//                         {/* Image (or Placeholder) */}
//                         {report.imageUrl ? (
//                             <Image
//                             source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${report.imageUrl}` }}
//                             style={{
//                                 width: 60,
//                                 height: 60,
//                                 borderRadius: 10,
//                                 marginRight: 12,
//                             }}
//                             />
//                         ) : (
//                             <View
//                             style={{
//                                 width: 60,
//                                 height: 60,
//                                 borderRadius: 10,
//                                 marginRight: 12,
//                                 backgroundColor: '#ccc',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                             >
//                             <ThemedText style={{ fontSize: 10 }}>No Image</ThemedText>
//                             </View>
//                         )}

//                         {/* Text Info */}
//                         <View style={{ flex: 1 }}>
//                             <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
//                             📍 {report.location || '[No Location]'}
//                             </ThemedText>
//                             <ThemedText numberOfLines={2} ellipsizeMode="tail" style={{ color: '#eee' }}>
//                             📝 {report.summary || '[No Summary]'}
//                             </ThemedText>
//                             <ThemedText style={{ fontSize: 12, color: '#ccc' }}>
//                             🕑 {report.createdAt ? new Date(report.createdAt).toLocaleString('en-IN') : '[No Date]'}
//                             </ThemedText>
//                         </View>
//                         </TouchableOpacity>

//                   ))
//                 ) : (
//                   <ThemedText>No reports found.</ThemedText>
//                 )}
//               </View>

//               {/* Back Button */}
//               <TouchableOpacity
//                 style={[styles.authBackButton, { marginTop: 30 }]}
//                 onPress={() => {
//                   Alert.alert(
//                     'Confirm Logout',
//                     'Are you sure you want to logout?',
//                     [
//                       { text: 'Cancel', style: 'cancel' },
//                       { text: 'Logout', style: 'destructive', onPress: logout },
//                     ]
//                   );
//                 }}
//               >
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>
//                   Logout
//                 </ThemedText>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </ImageBackground>
//       )}

//       {/* Supervisor View Page - Displays Image & Location */}
//       {screen === 'supervisorReportView' && selectedReport && (
//         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//           <View style={{
//             width: '90%',
//             maxWidth: 400,
//             alignSelf: 'center',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'rgba(43, 41, 41, 0.76)',
//             padding: 20,
//             borderRadius: 15,
//           }}>
//             <ThemedText type="title" style={styles.authTitle}>Report Details</ThemedText>

//             {/* Image */}
//             {selectedReport.imageUrl ? (
//               <Image
//                 source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${selectedReport.imageUrl}` }}
//                 style={{ width: 250, height: 250, borderRadius: 15, marginBottom: 20 }}
//                 resizeMode="cover"
//               />
//             ) : (
//               <ThemedText>No Image Available</ThemedText>
//             )}

//             {/* Location */}
//             <ThemedText type="defaultSemiBold" style={styles.locationText}>📍 Location:</ThemedText>
//             <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>
//               {selectedReport.location || 'Not Available'}
//             </Text>

//             {/* Summary */}
//             <ThemedText type="defaultSemiBold" style={styles.locationText}>📝 Summary:</ThemedText>
//             <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
//               {selectedReport.summary || 'No Summary'}
//             </Text>

//             {/* Date */}
//             <ThemedText type="defaultSemiBold" style={styles.locationText}>🕑 Date:</ThemedText>
//             <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
//               {selectedReport.createdAt ? new Date(selectedReport.createdAt).toLocaleString('en-IN') : 'Unknown'}
//             </Text>

//             {/* Status */}
//             <ThemedText type="defaultSemiBold" style={styles.locationText}>📌 Status:</ThemedText>
//             <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
//               {selectedReport.status || 'Pending'}
//             </Text>
//             {/* Download PDF */}
//             <TouchableOpacity
//               style={[styles.submitButton, { backgroundColor: 'blue', marginBottom: 20 }]}
//               onPress={async () => {
//                 try {
//                   const htmlContent = `
//                     <html>
//                       <body>
//                         <h1>SafeStreet Report</h1>
//                         <p><strong>Location:</strong> ${selectedReport.location}</p>
//                         <p><strong>Summary:</strong> ${selectedReport.summary}</p>
//                         <p><strong>Date:</strong> ${new Date(selectedReport.createdAt).toLocaleString('en-IN')}</p>
//                         <p><strong>Status:</strong> ${selectedReport.status}</p>
//                         <img src="https://e18c-183-82-237-45.ngrok-free.app${selectedReport.imageUrl}" style="width:100%;max-width:400px;margin-top:20px;" />
//                       </body>
//                     </html>
//                   `;


//                   const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/generate-pdf', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                       html: htmlContent,
//                       fileName: `safestreet-report-${selectedReport._id}`,
//                     }),
//                   });

//                   const contentType = response.headers.get('Content-Type') || '';
//                   if (contentType.includes('application/json')) {
//                     const data = await response.json();
//                     if (response.ok && data.url) {
//                       await downloadAndSavePdf(data.url);  // ✅ This is where you download it
//                     } else {
//                       Alert.alert('Error', 'Failed to generate PDF.');
//                     }
//                   } else {
//                     const rawText = await response.text();
//                     console.error('Unexpected response:', rawText);
//                     Alert.alert('Error', 'Server returned unexpected content.');
//                   }
//                 } catch (error) {
//                   console.error('PDF generation error:', error);
//                   Alert.alert('Error', 'Something went wrong while creating the PDF.');
//                 }
//               }}
//             >
//               <Text style={styles.buttonText}>Download Summary as PDF</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => sendToAuthorities(selectedReport)}>
//               <Text style={styles.buttonText}>Send to Authorities</Text>
//             </TouchableOpacity>
//             {/* Resolve Button */}
//             {selectedReport.status !== 'Resolved' && (
//               <TouchableOpacity
//                 style={[styles.submitButton, { backgroundColor: 'green', marginBottom: 20 }]}
//                 onPress={async () => {
//                   try {
//                     const res = await fetch(`https://e18c-183-82-237-45.ngrok-free.app/api/upload/resolve/${selectedReport._id}`, {
//                       method: 'PUT',
//                       headers: { 'Content-Type': 'application/json' },
//                     });

//                     const data = await res.json();
//                     if (res.ok) {
//                       alert('Report marked as Resolved ✅');
//                       setScreen('supervisorDashboard');
//                       setSelectedReport(null);
//                     } else {
//                       alert('Failed to mark as Resolved ❌');
//                     }
//                   } catch (error) {
//                     console.error(error);
//                     alert('Error marking report.');
//                   }
//                 }}
//               >
//                 <ThemedText type="defaultSemiBold" style={styles.buttonText}>Mark as Resolved</ThemedText>
//               </TouchableOpacity>
//             )}
//             {/* Back Button */}
//             <TouchableOpacity
//               style={styles.authBackButton}
//               onPress={() => {
//                 setScreen('supervisorDashboard');
//                 setSelectedReport(null);
//               }}
//             >
//               <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       )}
//       {/* <ChatbotIcon /> */}
//     </ImageBackground>
//   );
// }
// const styles = StyleSheet.create({
//   background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
//   authContainer: { width: '50%', height: '50%', padding: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
//   authButton: { backgroundColor: 'green', width: 120, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
//   authBackButton: { marginTop: 20, backgroundColor: 'red', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', alignSelf: 'center', minWidth: 180,},
//   roleButton: { backgroundColor: 'green', width: 140, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
//   submitButton: { marginTop: 10, backgroundColor: 'green', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', alignSelf: 'center', minWidth: 180, },
//   errorText: { color: 'white', marginBottom: 10, fontSize: 14 }, 
//   startButton: { marginTop: 20, backgroundColor: 'green', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
//   backButton: { marginTop: 13, backgroundColor: 'red', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6, width: '100%', alignItems: 'center',},
//   tagline: { fontSize: 16, color: 'white', marginTop: 5, textAlign: 'center' },
//   locationText: { marginTop: 10, fontSize: 16, color: 'white' }, 
//   previewImage: { width: 200, height: 200, marginVertical: 10 },
//   removeButton: { marginTop: 10, backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
//   uploadButton: { marginTop: 10, backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
//   openButton: { marginTop: 10, backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
//   logo: {width: 120,height: 120,borderRadius: 60,marginBottom: 20,}, 
//   HomeContainer: {width: '90%',padding: 20,backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 5,},
//   roleContainer: {width: '90%',padding: 20,backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 5,},
//   AuthContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   LoginContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   SignupContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   UserDashboardContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   imageUploadContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   supervisorViewContainer: { width: '100%', maxWidth: 400, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   linkText: {color: 'white'},
//   overlay: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', width: '100%', height: '100%',},
//   videoBackground: {position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,width: '100%',height: '100%',zIndex: -1,},
//   manualContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 253, 253, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
//   heading: {fontSize: 22,marginBottom: 16,textAlign: 'center',},
//   manual_input: {borderWidth: 1,borderColor: '#ccc',borderRadius: 8,padding: 12,marginBottom: 16,color: '#000',},
//   getLocationButton: { backgroundColor: '#16a34a',paddingVertical: 12,borderRadius: 8,alignItems: 'center', marginBottom: 16,},
//   coordsText: {textAlign: 'center',fontSize: 14,marginBottom: 16,},
//   manual_backButton: {backgroundColor: '#4b5563', paddingVertical: 12, borderRadius: 8, alignItems: 'center',},
//   summaryText: {fontSize: 18,fontWeight: 'bold', color: '#007b8f', marginTop: 10, },
//   metaText: { marginTop: 20, fontSize: 14, color: '#666', textAlign: 'center',}, 
//   boldText: { fontWeight: 'bold', },
//   backButtonContainer: { position: 'absolute', top: 20, left: 20, },
//   buttonContainer: { flexDirection: 'column',justifyContent: 'center',alignItems: 'center',gap: 15,marginBottom: 20,},
//   supervisorDashboardContainer: { padding: 20, backgroundColor: 'rgba(32, 26, 26, 0.71)', flexGrow: 1, width: '95%', maxWidth: 500, borderRadius: 15, alignItems: 'center', justifyContent: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},  
//   cardRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 20, },
//   dashboardCard: { flexBasis: '30%', minWidth: 100, borderRadius: 12, padding: 15, margin: 5,},
//   cardTitle: { color: '#fff', fontSize: 16,},
//   cardValue: {color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 5,},
//   authTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: 'white', textAlign: 'center',},
//   placeholderBox: { height: 150, backgroundColor: '#e0e0e0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10,},
//   infoRow: { flexDirection: 'column', justifyContent: 'flex-start',marginBottom: 10,},
//   notificationBox: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12,  marginRight: 10,  elevation: 2,},
//   chartBox: {  flex: 1,  backgroundColor: '#fff', padding: 15, borderRadius: 12, marginLeft: 10, elevation: 2, },
//   sectionTitle: { fontSize: 18, marginBottom: 10, color:'white', alignItems: 'center'},
//   container: { padding: 24, backgroundColor: '#f3f4f6', alignItems: 'center',width: '60%', height: '50%',  borderRadius: 20, justifyContent: 'center',flex: 1},
//   card: {shadowColor: '#000',backgroundColor: 'rgba(255,255,255,0.05)', width: '100%', maxWidth: 400, shadowRadius: 10, padding: 24, borderRadius: 16,  elevation: 5,shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },},
//   title: {marginBottom: 20,fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', }, 
//   button: {borderRadius: 10,backgroundColor: '#10b981', padding: 16,},
//   buttonText: { fontSize: 16,textAlign: 'center',  color: 'white', fontWeight: 'bold', paddingVertical: 6, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 8,},
//   label: { color: '#ddd', marginBottom: 6,fontSize: 16 },
//   email: { fontSize: 14, marginBottom: 16, color: '#6b7280' },
//   toggle: { color: '#38bdf8', textAlign: 'right', marginBottom: 20,},
//   homeInnerContainer: {alignItems: 'center',justifyContent: 'center', width: '100%', padding: 20,},
//   loginContainer: {flex: 1,alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 60,},
//   forgotPasswordcontainer: {flex: 1,alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 60,},
//   forgotPasswordcard:{shadowColor: '#000',backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', maxWidth: 400, shadowRadius: 10, padding: 24, borderRadius: 16,  elevation: 5,shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },},
//   recentReportsBox: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 15, marginVertical: 20,marginHorizontal: 10, borderRadius: 10, shadowColor: '#000',  shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3, },
//   mapContainer: { height: 300, width: '100%', backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5, marginTop: 20, marginBottom: 20, alignSelf: 'center',},
//   mapContainersuper: { marginTop: 20, width: '100%', alignItems: 'center',},
//   mapBox: { width: '100%', height: 300, borderRadius: 12, overflow: 'hidden', marginTop: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },   shadowOpacity: 0.2,
//   shadowRadius: 4, elevation: 3, },
//   reportItem: { backgroundColor: 'rgba(23, 20, 20, 0.9)', borderRadius: 12, padding: 12, marginTop: 15, width: '100%', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4, flexDirection: 'row', alignItems: 'center',},
//   // priorityDot: {
//   //   position: 'absolute',
//   //   top: 10,
//   //   left: 10,
//   //   width: 12,
//   //   height: 12,
//   //   borderRadius: 6,
//   // },
//   passwordInputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, backgroundColor: 'white', marginBottom: 15,},
//   // input: {
          
//   //   height: 50,
//   //   paddingHorizontal: 15,
//   //   fontSize: 16,
//   //   color: 'black',
//   // },
//   input: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16, color: 'black', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 15,},  
//   eyeButton: { padding: 10,},
//   eyeText: { fontSize: 20,},
//   signupScrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,},
//   signupCard: { width: '90%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 20, borderRadius: 15, alignItems: 'center',},
//   signupTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20,},
//   signupInput: { width: '100%', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 16, marginBottom: 15,},
//   passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8,  marginBottom: 15, paddingHorizontal: 12,},
//   passwordInput: { flex: 1, paddingVertical: 10, fontSize: 16,},
//   eyeIcon: { fontSize: 22,},
//   signupButton: { backgroundColor: 'green', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 10,},
//   loginLinkBold: { fontWeight: 'bold', textDecorationLine: 'underline', },
//   loginScrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,},
//   loginCard: { width: '90%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 20, borderRadius: 15, alignItems: 'center',},
//   loginTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20,},
//   loginInput: { width: '100%', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 16, marginBottom: 15,},
//   loginButton: { backgroundColor: 'green', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 10,},
//   errorMessage: { color: 'red', marginBottom: 10, fontSize: 14,textAlign: 'center',},
//   loginLink: { color: 'white', marginTop: 10, fontSize: 14, },
// });





// import { Redirect } from 'expo-router';
// import 'react-native-reanimated';

// export default function Index() {
//   return <Redirect href="/Home" />;
// }
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  View,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { LocationGeocodedAddress } from 'expo-location';
import { ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
//import TopNavBar from '@/components/TopNavBar';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import * as MediaLibrary from 'expo-media-library';
// import ChatbotIcon from './ChatbotIcon';
//import Icon from 'react-native-vector-icons/MaterialIcons';
// import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() 
{
  type Report = {
    _id: string;
    userId: string;
    imageUrl: string;
    location: string;
    summary: string;
    createdAt: string;
    status?: string;
    latitude?: number;  
    longitude?: number; 
  };
  
  
  const [screen, setScreen] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [latestUpload, setLatestUpload] = useState<
  {
    image: string | null;
    location: string | null;
    date: string;
    coordinates?: { latitude: number; longitude: number } | null;
  }>({ image: null, location: null, date: '', coordinates: null });
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [selectedAddress, setSelectedAddress] =  useState<LocationGeocodedAddress | null>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [totalReports, setTotalReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [urgentReports, setUrgentReports] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [recentReports, setRecentReports] = useState<{ time: string; message: string }[]>([]);
  const [message, setMessage] = useState('');
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [uploading, setUploading] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'login' | 'user' | 'history'>('login');
  const [historyData, setHistoryData] = useState<Report[]>([]);
  const [summaryProgress, setSummaryProgress] = useState(0); // 0 to 100
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

 
  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem('selectedRole');
      if (savedRole) setSelectedRole(savedRole);
    };
    loadRole();
  
    Animated.timing(logoOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start(() => {
      Animated.timing(textOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }).start(() => {
        Animated.timing(buttonOpacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();
      });
    });
  }, []);

  const convertUriIfNeeded = async (uri: string): Promise<string> => {
    if (uri && uri.startsWith('content://')) {
      const newPath = FileSystem.cacheDirectory + 'converted.jpg';
      await FileSystem.copyAsync({ from: uri, to: newPath });
      return newPath;
    }
    return uri;
  };

  const fetchAISummary = async (): Promise<void> => {
  let interval: NodeJS.Timeout | null = null;
  try {
    console.log('🧠 Starting fetchAISummary');
    console.log('Original Image URI:', latestUpload.image);

    if (!latestUpload.image) {
      Alert.alert("Error", "No image selected.");
      return;
    }

    setIsGeneratingSummary(true);
    setSummaryProgress(0);

    // Simulate summary generation progress
    interval = setInterval(() => {
      setSummaryProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    const imageUri = await convertUriIfNeeded(latestUpload.image);
    console.log('✅ Processed Image URI:', imageUri);

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    console.log('📤 Sending request to Flask server...');
    const aiResponse = await fetch('https://3c5d-34-106-145-180.ngrok-free.app/analyze', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('🔥 Server Error:', errorText);
      throw new Error(`Server Error: ${errorText}`);
    }

    const contentType = aiResponse.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await aiResponse.json();
      console.log('✅ AI Response:', data);
      console.log('📍 Summary:', data.data.summary); 
      console.log('📍 Message:', data.message);

      setAiSummary(data.data.summary || '[No summary returned]');
      setMessage(data.message);

      clearInterval(interval);
      setSummaryProgress(100);
      setIsGeneratingSummary(false);

      //await uploadToServer();
    } else {
      const rawText = await aiResponse.text();
      console.warn('⚠️ Unexpected response:', rawText);
      throw new Error(`Unexpected response format: ${rawText}`);
    }
  } catch (err: unknown) {
    if (interval) clearInterval(interval);
    setSummaryProgress(0);
    setIsGeneratingSummary(false);

    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('⚠️ AI Summary Fetch Error:', msg);
    setAiSummary('[Error generating summary: ' + msg + ']');
  }
};

  
  useEffect(() => {
    if (screen === 'summary' && latestUpload.image) {
      setAiSummary('');
      fetchAISummary(); // This causes the error if fetchAISummary is defined below
    }
  }, [screen]);
  
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => alert('Unable to retrieve location')
    );
  };
  
  const validateAndLogin = async () => {
    setErrorMessage('');
  
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role before logging in.');
      return;
    }
  
    if (selectedRole === 'Supervisor' && email.toLowerCase() !== 'safestreet3@gmail.com') {
      Alert.alert('Access Denied', 'Only the authorized Supervisor email can log in.');
      return;
    }
  
    if (!email.includes('@')) {
      setErrorMessage('Email must contain @');
      return;
    }
  
    if (password.length < 8 || !/\d/.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one number');
      return;
    }
  
    try {
      const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Response was not valid JSON:', text);
        throw new Error('Server returned invalid response. Try again later.');
      }
  
      console.log('Login response:', data);
  
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      if (!data.user || !data.user._id) {
        throw new Error('User not found in response');
      }
  
      await AsyncStorage.setItem('userId', data.user._id);
  
    
      setFullName(data.user.name || '');
      setEmail(data.user.email || '');
  
      Alert.alert('Login Successful', `Welcome, ${data.user.name || 'User'}`);
  
      if (selectedRole === 'User') {
        setScreen('UserDashboard');
      } else if (selectedRole === 'Supervisor') {
        setScreen('supervisorDashboard');
      } else {
        setScreen('roleSelection');
      }
  
    } catch (err) {
      console.error('Login Error:', err);
      const message = err instanceof Error ? err.message : 'Something went wrong';
      Alert.alert('Login Error', message);
    }
  };
  
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const validateAndSignUp = async () => {
    console.log('Sign Up button clicked ✅');
  
    if (!fullName || !phoneNumber || !email || !occupation || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email must contain @');
      return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long and contain at least one number');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone: phoneNumber,
          email,
          password,
        }),
      });
      const getAddressFromCoords = async (coords: { latitude: number; longitude: number }) => {
        try {
          const [address] = await Location.reverseGeocodeAsync(coords);
          return address;
        } catch (error) {
          console.error("Failed to reverse geocode:", error);
          return null;
        }
      };
      const handleRegionChangeComplete = async (region: { latitude: number; longitude: number }) => {
        setSelectedLocation({ latitude: region.latitude, longitude: region.longitude });
        
        const address = await getAddressFromCoords(region);
        setSelectedAddress(address);
      };
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Invalid JSON from server:', text);
        throw new Error('Unexpected server response');
      }
  
      console.log('Signup response:', data);
  
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      Alert.alert('Success', 'Sign Up Successful. Redirecting to Login...');
      setScreen('login');
    }catch (err) {
      console.error('Signup Error:', err);
      const message = err instanceof Error ? err.message : 'Something went wrong';
      Alert.alert('Signup Error', message);
    }    
  };
  
  
  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to take pictures.');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const extractLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required to get image location.');
      return;
    }
  
    let loc = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
  
    if (reverseGeocode.length > 0) {
      let address = reverseGeocode[0];
  
      setLocation(
        `${address.name ? address.name + ', ' : ''}` +
        `${address.street ? address.street + ', ' : ''}` +
        `${address.postalCode ? address.postalCode + ', ' : ''}` +
        `${address.city ? address.city + ', ' : ''}` +
        `${address.region ? address.region + ', ' : ''}` +
        `${address.country ? address.country : ''}`
      );
    } else {
      setLocation("Location not found");
    }
  };
  const getCoordsFromAddress = async (address: string) => {
    try {
      const locations = await Location.geocodeAsync(address);
      if (locations.length > 0) {
        const { latitude, longitude } = locations[0];
        console.log('Coordinates from address:', latitude, longitude);
  
        setSelectedLocation({ latitude, longitude });
      } else {
        Alert.alert('Error', 'No location found for this address.');
      }
    } catch (error) {
      console.error('Error getting coordinates:', error);
      Alert.alert('Error', 'Failed to fetch location coordinates.');
    }
  };
  
  <View style={styles.manualContainer}>
  <ThemedText type="title" style={styles.heading}>Enter Location</ThemedText>

  <TextInput
    placeholder="Type location here..."
    value={address}
    onChangeText={setAddress}
    style={styles.manual_input}
    placeholderTextColor="#999"
  />

  <TouchableOpacity
    style={styles.getLocationButton}
    onPress={() => getCoordsFromAddress(address)}
  >
    <ThemedText type="defaultSemiBold" style={styles.buttonText}>Get Address</ThemedText>
  </TouchableOpacity>

  {address !== '' && (
    <Text style={{ marginTop: 10, fontSize: 16, color: '#000' }}>
      Selected Address: {address}
    </Text>
  )}

  <View style={styles.mapContainer}>
    <View style={{ height: 200, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
      <WebView
        source={{ uri: 'https://www.openstreetmap.org' }}
        style={{ flex: 1 }}
      />
    </View>
  </View>

  <TouchableOpacity
    style={styles.manual_backButton}
    onPress={() => {
      if (!address) {
        Alert.alert('Error', 'Please select an address first');
        return;
      }
      setLatestUpload(prev => ({ ...prev, location: address }));
      setScreen('imageUpload');
    }}
  >
    <ThemedText type="defaultSemiBold" style={styles.button}>Done</ThemedText>
  </TouchableOpacity>
</View>

  
const sendOtpToEmail = async () => {
  if (!email.includes('@')) {
    return Alert.alert('Invalid Email', 'Please enter a valid email address');
  }

  try {
    const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/send-otp', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return Alert.alert('Error', data.error || 'Something went wrong');

    Alert.alert('OTP Sent ✅', 'Check your email for the OTP');
    setScreen('otpVerification'); 
  } catch (err) {
    console.error('Send OTP Error:', err);
    Alert.alert('Error', 'Server error');
  }
};
  
  
  // Function to verify OTP
  const verifyOTP = async () => {
    try {
      const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/verify-otp', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
  
      const data = await res.json();
      if (!res.ok) return Alert.alert('Error', data.error || 'Invalid OTP');
  
      Alert.alert('Verified!', 'OTP verified successfully');
      setScreen('resetPassword'); 
    } catch (err) {
      console.error('Verify OTP Error:', err);
      Alert.alert('Error', 'Server error');
    }
  };
  

  const handleSummaryClick = () => {
    setLatestUpload({
      image: image,
      location: position
        ? `Latitude: ${position[0]}, Longitude: ${position[1]}`
        : 'No location',
      date: new Date().toLocaleDateString(),
      coordinates: position
        ? { latitude: position[0], longitude: position[1] }
        : null,
    });    
    setScreen('summary');
  };
  
  const handleSummaryNavigation = () => {
    if (!image || !address) {
      Alert.alert("Error", "Please select image and location.");
      return;
    }
    setLatestUpload({
      image,
      location: address || location || 'No location provided',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      coordinates: selectedLocation || null, 
    });
    
        setScreen('summary');
  };
  
  const uploadToServer = async () => {
    try {
      if (!latestUpload.location || !latestUpload.image) {
        Alert.alert("Upload Error", "Please select an image and location.");
        return;
      }
  
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert("Error", "User not logged in properly.");
        return;
      }
  
      setUploading(true); 
      setUploadProgress(0); 
  
      // Step 1: Analyze Image
      const analyzeFormData = new FormData();
      analyzeFormData.append('image', {
        uri: latestUpload.image,
        name: 'upload.jpg',
        type: 'image/jpeg',
      } as any);
  
      const analyzeRes = await fetch('https://e18c-183-82-237-45.ngrok-free.app/analyze', {
        method: 'POST',
        body: analyzeFormData,
      });
  
      const analyzeText = await analyzeRes.text();
      let analyzeData;
      try {
        analyzeData = JSON.parse(analyzeText);
      } catch (error) {
        console.error('Invalid analyze response:', analyzeText);
        throw new Error('Failed to analyze image');
      }
  
      const summary = analyzeData?.data?.summary || '[No summary returned]';
      setAiSummary(summary);
  
      // Step 2: Upload to server with progress tracking
      const uploadFormData = new FormData();
      uploadFormData.append('userId', userId);
      uploadFormData.append('location', latestUpload.location);
      uploadFormData.append('summary', summary);
      uploadFormData.append('image', {
        uri: latestUpload.image,
        name: 'upload.jpg',
        type: 'image/jpeg',
      } as any);
  
      // ✅ Replacing normal fetch here with XHR for progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://e18c-183-82-237-45.ngrok-free.app/api/upload/new');
  
        xhr.setRequestHeader('Accept', 'application/json');
  
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log('Upload Progress:', percent);
            setUploadProgress(percent);
          }
        };
  
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('✅ Upload success response:', xhr.responseText);
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };
  
        xhr.onerror = () => {
          reject(new Error('Network error'));
        };
  
        xhr.send(uploadFormData);
      });
  
      Alert.alert(
      "Success 🎉",
      "Upload sent successfully to Supervisor!\n\nDo you want to logout?",
      [
        {
          text: "Stay",
          onPress: () => {
            setScreen('UserDashboard');
          },
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: logout,
          style: "destructive",
        },
      ]
    );

    // Clear form after upload
    setImage(null);
    setAddress('');
    setLocation(null);
    setLatestUpload({ image: null, location: null, date: '', coordinates: null });
    setNeedsRefresh(true);

  
      setScreen('UserDashboard'); // Move to User dashboard
  
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Upload Error:', err.message);
        Alert.alert('Upload Failed ❌', err.message);
      } else {
        console.error('Unknown Upload Error');
        Alert.alert('Upload Failed ❌', 'An unknown error occurred.');
      }
    } finally {
      setUploading(false);
    }
  };
  
  // Function to reset password
  const resetPassword = async () => {
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      return Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain a number.'
      );
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Password Mismatch', 'Passwords do not match.');
    }

    try {
      const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        return Alert.alert('Error', data.error || 'Failed to reset password.');
      }

      Alert.alert('Success', 'Password updated successfully.');
      setScreen('login');
    } catch (error) {
      Alert.alert('Error', 'Server error. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/upload/all');
        const data = await res.json();
        setAllReports(data);
      } catch (err) {
        console.error('Failed fetching reports:', err);
      } finally {
        setLoadingReports(false);
        setNeedsRefresh(false); // ✅ after fetching, reset flag
      }
    };
  
    if (screen === 'supervisorDashboard') {
      setLoadingReports(true);
      fetchReports();
    }
  }, [screen, needsRefresh]);
  
  

  const logout = async () => {
    try {
      // ✅ Clear all important AsyncStorage data
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('selectedRole');
  
      // ✅ Reset important states
      setFullName('');
      setEmail('');
      setPassword('');
      setSelectedRole(null);
      setImage(null);
      setLocation(null);
  
      // ✅ Navigate to home or login screen
      setScreen('home');
      
      Alert.alert('Logged Out', 'You have been logged out successfully.');
    } catch (err) {
      console.error('Logout Error:', err);
      Alert.alert('Error', 'Something went wrong during logout.');
    }
  };
  

  // const downloadAndSavePdf = async (url: string) => {
  //   try {
  //     const filename = url.split('/').pop() || 'report.pdf';
  //     const downloadPath = FileSystem.documentDirectory + filename;
  
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Permission Denied', 'Storage permission is required to save the PDF.');
  //       return;
  //     }
  
  //     const downloadRes = await FileSystem.downloadAsync(url, downloadPath);
  //     console.log('📥 Downloaded to:', downloadRes.uri);
  
  //     const asset = await MediaLibrary.createAssetAsync(downloadRes.uri);
  //     await MediaLibrary.createAlbumAsync('Download', asset, false);
  //     Alert.alert('✅ Success', 'PDF downloaded and saved to your device.');
  
  //   } catch (error) {
  //     console.error('❌ PDF Download Error:', error);
  //     Alert.alert('Error', 'Failed to download PDF.');
  //   }
  // };


  const downloadAndSavePdf = async (pdfUrl: string): Promise<void> => {
    try {
      await WebBrowser.openBrowserAsync(pdfUrl);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };
  
  const handleDownloadPdf = async () => {
    try {
      // Fetch the PDF URL from your server
      const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/generate-pdf', {
        method: 'POST', // or 'GET', depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: '...',      // whatever your API needs
          summary: '...',
          location: '...'
        }),
      });

      const data = await response.json();

      if (!data.pdfUrl) {
        throw new Error('No PDF URL returned');
      }

      // Open the PDF in the browser
      await WebBrowser.openBrowserAsync(data.pdfUrl);

    } catch (error) {
      console.error('PDF open error:', error);
      Alert.alert('Error', 'Failed to open PDF.');
    }
  };

  const generateAndOpenPdf = async (html: string, fileName: string): Promise<void> => {
    try {
      const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, fileName }),
      });
  
      const data: { url?: string } = await response.json();
  
      if (!data.url) {
        throw new Error('No PDF URL returned');
      }
  
      await WebBrowser.openBrowserAsync(data.url);
  
    } catch (error) {
      console.error('PDF generation/open error:', error);
      Alert.alert('Error', 'Failed to generate or open PDF.');
    }
  };
  
  const validReports = allReports
    .filter(r => typeof r.latitude === 'number' && typeof r.longitude === 'number')
    .map(r => ({
      lat: r.latitude,
      lon: r.longitude,
      summary: (r.summary || 'No Summary').replace(/'/g, "\\'"),
      location: (r.location || 'Unknown').replace(/'/g, "\\'")
    }));

  // console.log('🧭 Map Pins:', validReports);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('📦 Fetching reports for userId:', userId);
        if (!userId) {
          console.warn('User ID not found');
          return;
        }
        const res = await fetch(`https://e18c-183-82-237-45.ngrok-free.app/api/upload/user/${userId}`);
        const data = await res.json();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching user history:', error);
      }
    };
  
    if (screen === 'history') {
      fetchUserHistory();
    }
  }, [screen]);
  
  // const sendToAuthorities = async (report: Report) => {
  //   try {
  //     const res = await fetch('http://192.168.3.138:8000/api/receive-report', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         imageUrl: `https://e18c-183-82-237-45.ngrok-free.app${report.imageUrl}`,
  //         location: report.location,
  //         summary: report.summary,
  //         date: report.createdAt,
  //         status: report.status || 'Pending',
  //       }),
  //     });
  
  //     const text = await res.text();
  //     console.log('📦 Raw response:', text);
  
  //     let data;
  //     try {
  //       data = JSON.parse(text);
  //     } catch (err) {
  //       throw new Error('Server did not return valid JSON.');
  //     }
  
  //     if (!res.ok) throw new Error(data.message || 'Failed to send report');
  
  //     Alert.alert('✅ Sent!', 'Report sent to authorities successfully');
  //   } catch (err) {
  //     console.error('❌ Send error:', err);
  //     Alert.alert('Error', err.message || 'Something went wrong');
  //   }
  // };

  const sendToAuthorities = async (report: Report) => {
    try {
        // const res = await fetch('http://localhost:8000/api/receive-report',{
          
           const res = await fetch('http://192.168.29.113:8000/api/receive-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageUrl: report.imageUrl,  // Use relative path for consistency
                location: report.location,
                summary: report.summary,
                date: new Date(report.createdAt).toISOString(),  // Ensure proper date format
                status: report.status || 'Pending',
            }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to send report');

        alert('✅ Sent! Report sent to authorities successfully');
    } catch (err) {
        console.error('❌ Send error:', err);
        alert('Error: ' + (err.message || 'Something went wrong'));
    }
};
  

  
  
  return (
    <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
      {/* <TopNavBar
        isLoggedIn={screen !== 'login' && screen !== 'signup' && screen !== 'home' && screen !== 'auth'}
        onNavigate={(target) => {
          if (target === 'logout') logout();
          else setScreen(target);
        }}
        fullName={fullName}
      /> */}
      {screen === 'home' && (
        <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
          <View style={styles.HomeContainer}>
            <Animated.View style={[styles.homeInnerContainer, { opacity: logoOpacity }]}>
              <Animated.Image
                source={require('@/assets/images/logo.png')}
                style={[styles.logo, { opacity: logoOpacity }]}
              />
              <Animated.View style={{ opacity: textOpacity, alignItems: 'center' }}>
                <ThemedText type="title" style={styles.title}>Safe Street</ThemedText>
                <ThemedText type="subtitle" style={styles.tagline}>Making roads safer, one step at a time</ThemedText>
              </Animated.View>
              <Animated.View style={{ opacity: buttonOpacity }}>
                <TouchableOpacity style={styles.startButton} onPress={() => setScreen('roleSelection')}>
                  <ThemedText type="defaultSemiBold" style={styles.buttonText}>Start</ThemedText>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>
        </ImageBackground>
      )}
      {screen === 'auth' && (
        <View style={styles.AuthContainer}>
          <ThemedText type="title" style={styles.authTitle}>
            {selectedRole ? `${selectedRole} Authentication` : 'Authentication'}
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.authButton} onPress={() => setScreen('login')}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Login</ThemedText>
            </TouchableOpacity>
            {selectedRole === 'User' && (
              <TouchableOpacity style={styles.authButton} onPress={() => setScreen('signup')}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Sign Up</ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('roleSelection')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {screen === 'login' && (
        <ScrollView contentContainerStyle={styles.loginScrollContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>{selectedRole ? `${selectedRole} Login` : 'Login'}</Text>
      
          {/* Email Input */}
          <TextInput
            style={styles.loginInput}
            placeholder="Enter Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
      
          {/* Password Input with Eye */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
      
          {/* Error Message */}
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      
          {/* Submit Button */}
          <TouchableOpacity style={styles.loginButton} onPress={validateAndLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      
          {/* Forgot Password Link */}
          <TouchableOpacity onPress={() => setScreen('forgotPassword')}>
            <Text style={styles.loginLink}>Forgot Password?</Text>
          </TouchableOpacity>
      
          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => setScreen('signup')}>
            <Text style={styles.loginLink}>
              Don't have an account? <Text style={styles.loginLinkBold}>Sign up here</Text>
            </Text>
          </TouchableOpacity>
      
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen('auth')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>      
      )}

      {screen === 'forgotPassword' && (
        <View style={styles.forgotPasswordcontainer}>
          <View style={styles.forgotPasswordcard}>
            <Text style={styles.title}>🔐 Enter Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submitButton} onPress={sendOtpToEmail}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('login')}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {screen === 'otpVerification' && (
        <View style={styles.forgotPasswordcontainer}>
          <View style={styles.forgotPasswordcard}>
            <Text style={styles.title}>🔐 Enter OTP</Text>

            <Text style={styles.label}>OTP sent to:</Text>
            <Text style={styles.email}>{email}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              onChangeText={setOtp}
              value={otp}
            />

            <TouchableOpacity style={styles.submitButton} onPress={verifyOTP}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('forgotPassword')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === 'resetPassword' && (
        <View style={styles.forgotPasswordcontainer}>
          <View style={styles.forgotPasswordcard}>
            <Text style={styles.title}>🔐 Reset Password</Text>

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry={!showPassword}
              onChangeText={setNewPassword}
              value={newPassword}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              secureTextEntry={!showPassword}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggle}>
                {showPassword ? 'Hide Password' : 'Show Password'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={resetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('login')}>
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === 'signup' && (
        <ScrollView contentContainerStyle={styles.signupScrollContainer}>
        <View style={styles.signupCard}>
          <Text style={styles.signupTitle}>User Sign Up</Text>
      
          {/* Full Name */}
          <TextInput
            style={styles.signupInput}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#999"
          />
      
          {/* Phone Number */}
          <TextInput
            style={styles.signupInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="#999"
          />
      
          {/* Email */}
          <TextInput
            style={styles.signupInput}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
      
          {/* Occupation */}
          <TextInput
            style={styles.signupInput}
            placeholder="Occupation"
            value={occupation}
            onChangeText={setOccupation}
            placeholderTextColor="#999"
          />
      
          {/* Password + Eye Button */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
      
          {/* Confirm Password + Eye Button */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
      
          {/* Submit Button */}
          <TouchableOpacity style={styles.signupButton} onPress={validateAndSignUp}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      
          {/* Already have an account */}
          <TouchableOpacity onPress={() => setScreen('login')}>
            <Text style={styles.loginLink}>
              Already have an account? <Text style={styles.loginLinkBold}>Login here</Text>
            </Text>
          </TouchableOpacity>
      
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen('auth')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>      
      )}
      {/* Role Selection */}
      {screen === 'roleSelection' && (
        <View style={styles.roleContainer}>
          <ThemedText type="title" style={styles.authTitle}>Select Your Role</ThemedText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.roleButton} 
              onPress={async () => { 
                await AsyncStorage.setItem('selectedRole', 'User'); 
                setSelectedRole('User'); 
                setScreen('auth'); 
              }}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>User</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.roleButton} 
              onPress={async () => { 
                await AsyncStorage.setItem('selectedRole', 'Supervisor'); 
                setSelectedRole('Supervisor'); 
                setScreen('auth'); 
              }}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Supervisor</ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('home')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'UserDashboard' && (
        <View style={styles.UserDashboardContainer}>
          <ThemedText type="title" style={styles.authTitle}>User Dashboard</ThemedText>
          <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('imageUpload')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload a Picture</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('history')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>View History</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('roleSelection')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {screen === 'history' && (
      <>
        <TouchableOpacity onPress={() => setScreen('UserDashboard')} style={{ marginBottom: 20 }}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
          My Report History
        </Text>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {historyData.length === 0 ? (
            <Text style={{ color: '#94a3b8', fontSize: 16, textAlign: 'center' }}>
              No reports submitted yet.
            </Text>
          ) : (
            historyData.map((item, index) => (
              <View
                key={item._id || index}
                style={{
                  backgroundColor: '#334155',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                {item.imageUrl && (
                  <Image
                    source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${item.imageUrl}` }}
                    style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 10 }}
                  />
                )}
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  📍 {item.location}
                </Text>
                <Text style={{ color: '#ccc', marginTop: 6, fontSize: 12 }}>
                  🕑 {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            ))
          )}
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('UserDashboard')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </>
    )}
      {screen === 'imageUpload' && (
        <View style={styles.imageUploadContainer}>
          {!image && (
            <>
              <TouchableOpacity style={styles.submitButton} onPress={takePicture}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Take Picture</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={pickImage}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload from Device</ThemedText>
              </TouchableOpacity>
            </>
          )}
          {image && (
            <View>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  setImage(null);
                  setLocation(null);
                  setAddress('');
                  setPosition(null);
                  setSelectedLocation(null);
                }}
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Retake</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={() => setScreen('manualLocation')}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Enter Location Manually</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={extractLocation}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Get Location</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          {(location || address) && (
            <View>
              {location && (
                <Text style={styles.locationText}>Coordinates: {location}</Text>
              )}
              {address !== '' && (
                <Text style={styles.locationText}>Selected Address: {address}</Text>
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  if (!image || (!address && !location)) {
                    Alert.alert("Error", "Please select an image and add a location before continuing.");
                    return;
                  }
                
                  const finalLocation = address || location || "No location available";
                
                  setLatestUpload({
                    image,
                    location: finalLocation,
                    date: new Date().toLocaleDateString(),
                  });
                  setScreen('summary');
                }}
                
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Summary</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('UserDashboard')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {screen === 'manualLocation' && (
        <View style={styles.manualContainer}>
          <ThemedText type="title" style={styles.heading}>Pick Location on Map</ThemedText>

          <View style={styles.mapContainer}>
            <WebView
              originWhitelist={['*']}
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>OpenStreetMap</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <link
                        rel="stylesheet"
                        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                      />
                      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                      <style>
                        #map { height: 100%; width: 100%; }
                        html, body { margin: 0; padding: 0; height: 100%; }
                      </style>
                    </head>
                    <body>
                      <div id="map"></div>
                      <script>
                        document.addEventListener('DOMContentLoaded', function() {
                          var map = L.map('map').setView([17.385044, 78.486671], 13);
                          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; OpenStreetMap contributors'
                          }).addTo(map);

                          var marker;

                          map.on('click', function(e) {
                            if (marker) {
                              map.removeLayer(marker);
                            }
                            marker = L.marker(e.latlng).addTo(map);

                            window.ReactNativeWebView.postMessage(JSON.stringify({
                              lat: e.latlng.lat,
                              lng: e.latlng.lng
                            }));
                          });
                        });
                      </script>
                    </body>
                  </html>
                `
              }}
              injectedJavaScriptBeforeContentLoaded={''}
              onMessage={async (event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  const { lat, lng } = data;

                  console.log('Clicked Coordinates:', lat, lng);
                  setSelectedLocation({ latitude: lat, longitude: lng });

                  const { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Location permission is required to reverse geocode.');
                    return;
                  }

                  const [addr] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
                  const fullAddress = `${addr.name ? addr.name + ', ' : ''}${addr.street ? addr.street + ', ' : ''}${addr.postalCode ? addr.postalCode + ', ' : ''}${addr.city ? addr.city + ', ' : ''}${addr.region ? addr.region + ', ' : ''}${addr.country ? addr.country : ''}`;

                  console.log('Full Address:', fullAddress);
                  setAddress(fullAddress);
                } catch (error) {
                  console.error('Failed parsing map click:', error);
                }
              }}
              style={{ flex: 1 }}
            />
          </View>

          {address !== '' && (
            <Text style={{ marginTop: 10, fontSize: 16, color: '#000' }}>
              Selected Address: {address}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              if (!address) {
                Alert.alert("Error", "Please select a location by clicking on the map.");
                return;
              }
              setLatestUpload(prev => ({
                ...prev,
                location: address,
              }));
              setScreen('imageUpload');
            }}
          >
            <ThemedText type="defaultSemiBold" style={styles.button}>Done</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('imageUpload')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
    
          

        </View>
      )}

      {screen === 'summary' && latestUpload.image && (
        <View style={styles.supervisorViewContainer}>
          <Image source={{ uri: latestUpload.image }} style={styles.previewImage} />
          <Text style={styles.summaryText}>SUMMARY</Text>
          <Text style={styles.locationText}>Name: {fullName || '[Unknown]'}</Text>
          <Text style={styles.locationText}>Email: {email || '[Unknown]'}</Text>
          <Text style={styles.locationText}>Date: {latestUpload.date || '[Not Set]'}</Text>
          <Text style={styles.locationText}>Location: {latestUpload.location}</Text>

          <Text style={{ color: 'white', fontSize: 16 }}>{message}</Text>

          {/* ✅ Progress Bar: Generating Summary */}
          {isGeneratingSummary && (
            <View style={{ width: '100%', marginTop: 15 }}>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Generating Summary...</Text>
              <View style={{ height: 10, backgroundColor: '#555', borderRadius: 5 }}>
                <View
                  style={{
                    height: 10,
                    width: `${summaryProgress}%`,
                    backgroundColor: 'orange',
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          )}

          {/* ✅ Progress Bar: Uploading Report */}
          {uploading && (
            <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 20 }}>
              <Text style={{ color: '#fff', marginBottom: 4 }}>
                Uploading: {uploadProgress}%
              </Text>
              <View style={{
                height: 10,
                backgroundColor: '#ccc',
                borderRadius: 5,
                overflow: 'hidden',
              }}>
                <View style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  backgroundColor: '#00ff00',
                }} />
              </View>
            </View>
          )}


          {/* ✅ Upload button (disabled when summary is generating or upload in progress) */}
          {!isGeneratingSummary && !uploading && (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadToServer}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Upload</ThemedText>
            </TouchableOpacity>
          )}

          {/* ✅ Back button */}
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('home')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Supervisor Dashboard */}
      {screen === 'supervisorDashboard' && (
        <ImageBackground
          source={require('@/assets/images/potholeclick.png')}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            keyboardShouldPersistTaps="handled"
            refreshControl={  /* 🆕 Pull to refresh added */
              <RefreshControl
                refreshing={loadingReports}
                onRefresh={async () => {
                  setLoadingReports(true);
                  try {
                    const res = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/upload/all');
                    const data = await res.json();
                    setAllReports(data);
                  } catch (err) {
                    console.error('Failed fetching reports:', err);
                  } finally {
                    setLoadingReports(false);
                  }
                }}
              />
            }
          >
            <View style={styles.supervisorDashboardContainer}>
              {/* Title */}
              <ThemedText type="title" style={styles.authTitle}>
                Supervisor Dashboard
              </ThemedText>

              {/* Summary Cards */}
              <View style={styles.cardRow}>
                <View style={[styles.dashboardCard, { backgroundColor: 'rgba(0, 123, 255, 0.8)' }]}>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Total Reports</ThemedText>
                  <ThemedText style={styles.cardValue}>{allReports.length}</ThemedText>
                </View>

                <View style={[styles.dashboardCard, { backgroundColor: 'rgba(40, 167, 69, 0.8)' }]}>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Pending</ThemedText>
                  <ThemedText style={styles.cardValue}>{pendingReports}</ThemedText>
                </View>

                <View style={[styles.dashboardCard, { backgroundColor: 'rgba(220, 53, 69, 0.8)' }]}>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Urgent</ThemedText>
                  <ThemedText style={styles.cardValue}>{urgentReports}</ThemedText>
                </View>
              </View>

              {/* Map View */}
              <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Map View
                </ThemedText>
                
                <View style={styles.mapBox}>
                <WebView
                  originWhitelist={['*']}
                  javaScriptEnabled={true}
                  style={{ width: '100%', height: 400 }}
                  source={{
                    html: `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
                          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                          <style>
                            html, body, #map { height: 100%; margin: 0; padding: 0; }
                          </style>
                        </head>
                        <body>
                          <div id="map"></div>
                          <script>
                            const reports = ${JSON.stringify(validReports)};

                            const map = L.map('map');
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                              attribution: '&copy; OpenStreetMap contributors'
                            }).addTo(map);

                            const markers = [];

                            reports.forEach(report => {
                              if (report.lat && report.lon) {
                                const marker = L.marker([report.lat, report.lon])
                                  .addTo(map)
                                  .bindPopup('<b>' + report.location + '</b><br>' + report.summary);
                                markers.push(marker);
                              }
                            });

                            if (markers.length > 1) {
                              const group = new L.featureGroup(markers);
                              map.fitBounds(group.getBounds().pad(0.2));
                            } else if (markers.length === 1) {
                              map.setView([markers[0].getLatLng().lat, markers[0].getLatLng().lng], 14);
                            } else {
                              map.setView([17.385044, 78.486671], 12);
                            }
                          </script>
                        </body>
                      </html>
                    `
                  }}
                />
                </View>
              </View>

              {/* All Reports */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Recent Updated Reports
                </ThemedText>

                {loadingReports ? (
                  <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
                ) : allReports.length > 0 ? (
                  allReports.map((report, index) => (
                    <TouchableOpacity
                        key={report._id || index}
                        style={styles.reportItem}
                        onPress={() => {
                            setSelectedReport(report);
                            setScreen('supervisorReportView');
                        }}
                        >
                        {/* Image (or Placeholder) */}
                        {report.imageUrl ? (
                            <Image
                            source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${report.imageUrl}` }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                marginRight: 12,
                            }}
                            />
                        ) : (
                            <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                marginRight: 12,
                                backgroundColor: '#ccc',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                            <ThemedText style={{ fontSize: 10 }}>No Image</ThemedText>
                            </View>
                        )}

                        {/* Text Info */}
                        <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
                            📍 {report.location || '[No Location]'}
                            </ThemedText>
                            <ThemedText numberOfLines={2} ellipsizeMode="tail" style={{ color: '#eee' }}>
                            📝 {report.summary || '[No Summary]'}
                            </ThemedText>
                            <ThemedText style={{ fontSize: 12, color: '#ccc' }}>
                            🕑 {report.createdAt ? new Date(report.createdAt).toLocaleString('en-IN') : '[No Date]'}
                            </ThemedText>
                        </View>
                        </TouchableOpacity>

                  ))
                ) : (
                  <ThemedText>No reports found.</ThemedText>
                )}
              </View>

              {/* Back Button */}
              <TouchableOpacity
                style={[styles.authBackButton, { marginTop: 30 }]}
                onPress={() => {
                  Alert.alert(
                    'Confirm Logout',
                    'Are you sure you want to logout?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', style: 'destructive', onPress: logout },
                    ]
                  );
                }}
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                  Logout
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      )}

      {/* Supervisor View Page - Displays Image & Location */}
      {screen === 'supervisorReportView' && selectedReport && (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <View style={{
            width: '90%',
            maxWidth: 400,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(43, 41, 41, 0.76)',
            padding: 20,
            borderRadius: 15,
          }}>
            <ThemedText type="title" style={styles.authTitle}>Report Details</ThemedText>

            {/* Image */}
            {selectedReport.imageUrl ? (
              <Image
                source={{ uri: `https://e18c-183-82-237-45.ngrok-free.app${selectedReport.imageUrl}` }}
                style={{ width: 250, height: 250, borderRadius: 15, marginBottom: 20 }}
                resizeMode="cover"
              />
            ) : (
              <ThemedText>No Image Available</ThemedText>
            )}

            {/* Location */}
            <ThemedText type="defaultSemiBold" style={styles.locationText}>📍 Location:</ThemedText>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>
              {selectedReport.location || 'Not Available'}
            </Text>

            {/* Summary */}
            <ThemedText type="defaultSemiBold" style={styles.locationText}>📝 Summary:</ThemedText>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
              {selectedReport.summary || 'No Summary'}
            </Text>

            {/* Date */}
            <ThemedText type="defaultSemiBold" style={styles.locationText}>🕑 Date:</ThemedText>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
              {selectedReport.createdAt ? new Date(selectedReport.createdAt).toLocaleString('en-IN') : 'Unknown'}
            </Text>

            {/* Status */}
            <ThemedText type="defaultSemiBold" style={styles.locationText}>📌 Status:</ThemedText>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
              {selectedReport.status || 'Pending'}
            </Text>
            {/* Download PDF */}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: 'blue', marginBottom: 20 }]}
              onPress={async () => {
                try {
                  const htmlContent = `
                    <html>
                      <body>
                        <h1>SafeStreet Report</h1>
                        <p><strong>Location:</strong> ${selectedReport.location}</p>
                        <p><strong>Summary:</strong> ${selectedReport.summary}</p>
                        <p><strong>Date:</strong> ${new Date(selectedReport.createdAt).toLocaleString('en-IN')}</p>
                        <p><strong>Status:</strong> ${selectedReport.status}</p>
                        <img src="https://e18c-183-82-237-45.ngrok-free.app${selectedReport.imageUrl}" style="width:100%;max-width:400px;margin-top:20px;" />
                      </body>
                    </html>
                  `;


                  const response = await fetch('https://e18c-183-82-237-45.ngrok-free.app/api/generate-pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      html: htmlContent,
                      fileName: `safestreet-report-${selectedReport._id}`,
                    }),
                  });

                  const contentType = response.headers.get('Content-Type') || '';
                  if (contentType.includes('application/json')) {
                    const data = await response.json();
                    if (response.ok && data.url) {
                      await downloadAndSavePdf(data.url);  // ✅ This is where you download it
                    } else {
                      Alert.alert('Error', 'Failed to generate PDF.');
                    }
                  } else {
                    const rawText = await response.text();
                    console.error('Unexpected response:', rawText);
                    Alert.alert('Error', 'Server returned unexpected content.');
                  }
                } catch (error) {
                  console.error('PDF generation error:', error);
                  Alert.alert('Error', 'Something went wrong while creating the PDF.');
                }
              }}
            >
              <Text style={styles.buttonText}>Download Summary as PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => sendToAuthorities(selectedReport)}>
              <Text style={styles.buttonText}>Send to Authorities</Text>
            </TouchableOpacity>
            {/* Resolve Button */}
            {selectedReport.status !== 'Resolved' && (
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: 'green', marginBottom: 20 }]}
                onPress={async () => {
                  try {
                    const res = await fetch(`https://e18c-183-82-237-45.ngrok-free.app/api/upload/resolve/${selectedReport._id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                    });

                    const data = await res.json();
                    if (res.ok) {
                      alert('Report marked as Resolved ✅');
                      setScreen('supervisorDashboard');
                      setSelectedReport(null);
                    } else {
                      alert('Failed to mark as Resolved ❌');
                    }
                  } catch (error) {
                    console.error(error);
                    alert('Error marking report.');
                  }
                }}
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>Mark as Resolved</ThemedText>
              </TouchableOpacity>
            )}
            {/* Back Button */}
            <TouchableOpacity
              style={styles.authBackButton}
              onPress={() => {
                setScreen('supervisorDashboard');
                setSelectedReport(null);
              }}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {/* <ChatbotIcon /> */}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
  authContainer: { width: '50%', height: '50%', padding: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  authButton: { backgroundColor: 'green', width: 120, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  authBackButton: { marginTop: 20, backgroundColor: 'red', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', alignSelf: 'center', minWidth: 180,},
  roleButton: { backgroundColor: 'green', width: 140, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  submitButton: { marginTop: 10, backgroundColor: 'green', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', alignSelf: 'center', minWidth: 180, },
  errorText: { color: 'white', marginBottom: 10, fontSize: 14 }, 
  startButton: { marginTop: 20, backgroundColor: 'green', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  backButton: { marginTop: 13, backgroundColor: 'red', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6, width: '100%', alignItems: 'center',},
  tagline: { fontSize: 16, color: 'white', marginTop: 5, textAlign: 'center' },
  locationText: { marginTop: 10, fontSize: 16, color: 'white' }, 
  previewImage: { width: 200, height: 200, marginVertical: 10 },
  removeButton: { marginTop: 10, backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
  uploadButton: { marginTop: 10, backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
  openButton: { marginTop: 10, backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center' },
  logo: {width: 120,height: 120,borderRadius: 60,marginBottom: 20,}, 
  HomeContainer: {width: '90%',padding: 20,backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 5,},
  roleContainer: {width: '90%',padding: 20,backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 5,},
  AuthContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  LoginContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  SignupContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  UserDashboardContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  imageUploadContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  supervisorViewContainer: { width: '100%', maxWidth: 400, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  linkText: {color: 'white'},
  overlay: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', width: '100%', height: '100%',},
  videoBackground: {position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,width: '100%',height: '100%',zIndex: -1,},
  manualContainer: {width: '90%', maxWidth: 400, padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 253, 253, 0.7)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},
  heading: {fontSize: 22,marginBottom: 16,textAlign: 'center',},
  manual_input: {borderWidth: 1,borderColor: '#ccc',borderRadius: 8,padding: 12,marginBottom: 16,color: '#000',},
  getLocationButton: { backgroundColor: '#16a34a',paddingVertical: 12,borderRadius: 8,alignItems: 'center', marginBottom: 16,},
  coordsText: {textAlign: 'center',fontSize: 14,marginBottom: 16,},
  manual_backButton: {backgroundColor: '#4b5563', paddingVertical: 12, borderRadius: 8, alignItems: 'center',},
  summaryText: {fontSize: 18,fontWeight: 'bold', color: '#007b8f', marginTop: 10, },
  metaText: { marginTop: 20, fontSize: 14, color: '#666', textAlign: 'center',}, 
  boldText: { fontWeight: 'bold', },
  backButtonContainer: { position: 'absolute', top: 20, left: 20, },
  buttonContainer: { flexDirection: 'column',justifyContent: 'center',alignItems: 'center',gap: 15,marginBottom: 20,},
  supervisorDashboardContainer: { padding: 20, backgroundColor: 'rgba(32, 26, 26, 0.71)', flexGrow: 1, width: '95%', maxWidth: 500, borderRadius: 15, alignItems: 'center', justifyContent: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,},  
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 20, },
  dashboardCard: { flexBasis: '30%', minWidth: 100, borderRadius: 12, padding: 15, margin: 5,},
  cardTitle: { color: '#fff', fontSize: 16,},
  cardValue: {color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 5,},
  authTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: 'white', textAlign: 'center',},
  placeholderBox: { height: 150, backgroundColor: '#e0e0e0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10,},
  infoRow: { flexDirection: 'column', justifyContent: 'flex-start',marginBottom: 10,},
  notificationBox: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12,  marginRight: 10,  elevation: 2,},
  chartBox: {  flex: 1,  backgroundColor: '#fff', padding: 15, borderRadius: 12, marginLeft: 10, elevation: 2, },
  sectionTitle: { fontSize: 18, marginBottom: 10, color:'white', alignItems: 'center'},
  container: { padding: 24, backgroundColor: '#f3f4f6', alignItems: 'center',width: '60%', height: '50%',  borderRadius: 20, justifyContent: 'center',flex: 1},
  card: {shadowColor: '#000',backgroundColor: 'rgba(255,255,255,0.05)', width: '100%', maxWidth: 400, shadowRadius: 10, padding: 24, borderRadius: 16,  elevation: 5,shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },},
  title: {marginBottom: 20,fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', }, 
  button: {borderRadius: 10,backgroundColor: '#10b981', padding: 16,},
  buttonText: { fontSize: 16,textAlign: 'center',  color: 'white', fontWeight: 'bold', paddingVertical: 6, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 8,},
  label: { color: '#ddd', marginBottom: 6,fontSize: 16 },
  email: { fontSize: 14, marginBottom: 16, color: '#6b7280' },
  toggle: { color: '#38bdf8', textAlign: 'right', marginBottom: 20,},
  homeInnerContainer: {alignItems: 'center',justifyContent: 'center', width: '100%', padding: 20,},
  loginContainer: {flex: 1,alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 60,},
  forgotPasswordcontainer: {flex: 1,alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 60,},
  forgotPasswordcard:{shadowColor: '#000',backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', maxWidth: 400, shadowRadius: 10, padding: 24, borderRadius: 16,  elevation: 5,shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },},
  recentReportsBox: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 15, marginVertical: 20,marginHorizontal: 10, borderRadius: 10, shadowColor: '#000',  shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3, },
  mapContainer: { height: 300, width: '100%', backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5, marginTop: 20, marginBottom: 20, alignSelf: 'center',},
  mapContainersuper: { marginTop: 20, width: '100%', alignItems: 'center',},
  mapBox: { width: '100%', height: 300, borderRadius: 12, overflow: 'hidden', marginTop: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },   shadowOpacity: 0.2,
  shadowRadius: 4, elevation: 3, },
  reportItem: { backgroundColor: 'rgba(23, 20, 20, 0.9)', borderRadius: 12, padding: 12, marginTop: 15, width: '100%', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4, flexDirection: 'row', alignItems: 'center',},
  // priorityDot: {
  //   position: 'absolute',
  //   top: 10,
  //   left: 10,
  //   width: 12,
  //   height: 12,
  //   borderRadius: 6,
  // },
  passwordInputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, backgroundColor: 'white', marginBottom: 15,},
  // input: {
          
  //   height: 50,
  //   paddingHorizontal: 15,
  //   fontSize: 16,
  //   color: 'black',
  // },
  input: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16, color: 'black', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 15,},  
  eyeButton: { padding: 10,},
  eyeText: { fontSize: 20,},
  signupScrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,},
  signupCard: { width: '90%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 20, borderRadius: 15, alignItems: 'center',},
  signupTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20,},
  signupInput: { width: '100%', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 16, marginBottom: 15,},
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8,  marginBottom: 15, paddingHorizontal: 12,},
  passwordInput: { flex: 1, paddingVertical: 10, fontSize: 16,},
  eyeIcon: { fontSize: 22,},
  signupButton: { backgroundColor: 'green', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 10,},
  loginLinkBold: { fontWeight: 'bold', textDecorationLine: 'underline', },
  loginScrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,},
  loginCard: { width: '90%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 20, borderRadius: 15, alignItems: 'center',},
  loginTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20,},
  loginInput: { width: '100%', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 16, marginBottom: 15,},
  loginButton: { backgroundColor: 'green', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 10,},
  errorMessage: { color: 'red', marginBottom: 10, fontSize: 14,textAlign: 'center',},
  loginLink: { color: 'white', marginTop: 10, fontSize: 14, },
});