// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';

// export default function ChatbotIcon() {
//   const [visible, setVisible] = useState(false);
//   const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello! How can I help you?' }]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setMessages((prev) => [...prev, { from: 'user', text: input }]);
  
//     setInput('');
  
//     try {
//       const res = await fetch('https://c697-183-82-237-45.ngrok-free.app/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ question: input }),
//       });
  
//       const data = await res.json();
//       setMessages((prev) => [...prev, { from: 'bot', text: data.answer || 'No response' }]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { from: 'bot', text: 'Error talking to server.' },
//       ]);
//     }
//   };
  
  

//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => setVisible(true)}
//         style={styles.iconContainer}
//       >
//         <Text style={styles.iconText}>💬</Text>
//       </TouchableOpacity>

//       <Modal visible={visible} animationType="slide" transparent>
//         <View style={styles.modalBackground}>
//           <View style={styles.chatContainer}>
//             <FlatList
//               data={messages}
//               keyExtractor={(_, i) => i.toString()}
//               renderItem={({ item }) => (
//                 <Text
//                   style={[
//                     styles.message,
//                     item.from === 'user' ? styles.userMessage : styles.botMessage,
//                   ]}
//                 >
//                   {item.text}
//                 </Text>
//               )}
//             />
//             <View style={styles.inputContainer}>
//               <TextInput
//                 value={input}
//                 onChangeText={setInput}
//                 style={styles.input}
//                 placeholder="Type a message..."
//               />
//               <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//                 <Text style={{ color: 'white' }}>Send</Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
//               <Text style={{ color: 'white' }}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   iconContainer: {
//     position: 'absolute',
//     bottom: 30,
//     right: 30,
//     backgroundColor: '#007AFF',
//     borderRadius: 30,
//     padding: 16,
//     zIndex: 1000,
//   },
//   iconText: {
//     color: 'white',
//     fontSize: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: '#00000088',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chatContainer: {
//     backgroundColor: 'white',
//     width: '90%',
//     height: '70%',
//     borderRadius: 16,
//     padding: 16,
//   },
//   message: {
//     padding: 8,
//     borderRadius: 8,
//     marginVertical: 4,
//     maxWidth: '80%',
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   botMessage: {
//     backgroundColor: '#E5E5EA',
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginTop: 12,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     marginRight: 8,
//   },
//   sendButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//   },
//   closeButton: {
//     marginTop: 10,
//     backgroundColor: '#FF3B30',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
// });
