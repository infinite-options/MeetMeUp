// Automatic FlutterFlow imports
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import '/flutter_flow/custom_functions.dart'; // Imports custom functions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

//Get Docs From Collection based on Age

// TODO change the name of the collection from CarsRecord to yuor collection, lets say UsersRecord
// TODO change the name of the collection from CarsRecord to yuor collection, lets say UsersRecord
Future<List<UsersRecord>> getDocsFromCollectionByAge(
    double start, double end, double authUserAge, String authUid) async {
  // null safety

  // TODO change the name here
  List<UsersRecord> docs = [];

  // Get a reference to the Firestore database
  final firestore = FirebaseFirestore.instance;

  // Get a reference to the usersdata collection
  final collectionRef = firestore.collection('users');

  // Fetch all documents from the usersdata collection
  Query query = collectionRef;

  // Apply the limit if specified

  final querySnapshot = await query.get();

  // Iterate through the documents and create CarsRecord instances
  for (var doc in querySnapshot.docs) {
    // TODO 2 x with capipital letter and 1 x lower letter
    UsersRecord usersRecord = await UsersRecord.getDocumentOnce(doc.reference);
    // TODO 1 x lower letter

    if (authUid == usersRecord.uid) {
      continue;
    } else {
      bool hasCommonElement =
          checkCommonElement(start, end, usersRecord.age.toDouble());

      if (hasCommonElement) {
        docs.add(usersRecord);
      }
    }
  }

  return docs;
}

bool checkCommonElement(double start, double end, double authUserAge) {
  if (start < authUserAge && authUserAge < end) {
    return true;
  } else {
    return false;
  }
}
// Set your action name, define your arguments and return parameter,
// and then add the boilerplate code using the button on the right!
// Set your action name, define your arguments and return parameter,
// and then add the boilerplate code using the button on the right!
