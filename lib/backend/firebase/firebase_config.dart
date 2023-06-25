import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyCGFXb1p2XyjE-o7N6eUBcnW5WqAVPhWMY",
            authDomain: "meetmeup-69349.firebaseapp.com",
            projectId: "meetmeup-69349",
            storageBucket: "meetmeup-69349.appspot.com",
            messagingSenderId: "466541803518",
            appId: "1:466541803518:web:4003fdfe739cc5804632af"));
  } else {
    await Firebase.initializeApp();
  }
}
