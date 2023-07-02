// Automatic FlutterFlow imports
import '/backend/backend.dart';
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import '/flutter_flow/custom_functions.dart'; // Imports custom functions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

// TODO change the name of the collection from CarsRecord to yuor collection, lets say UsersRecord
// TODO change the name of the collection from CarsRecord to yuor collection, lets say UsersRecord
Future<List<UsersRecord>> getDocsFromCollection(
    List<String> authUserInterests, String authUid) async {
  // null safety

  // TODO change the name here
  // Initialize a list of users who match the authUsers intersts
  List<UsersRecord> docs = [];

  // Get a reference to the Firestore database
  final firestore = FirebaseFirestore.instance;

  // Get a reference to the usersdata collection
  final collectionRef = firestore.collection('users');

  // Fetch all documents from the usersdata collection
  Query query = collectionRef;

  // Apply the limit if specified
  // querySnapshot gets the data in the current moment
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
          checkCommonElement(authUserInterests, usersRecord.userInterests);

      if (hasCommonElement) {
        docs.add(usersRecord);
      }
    }
  }

  return docs;
}

bool checkCommonElement(List<String> list1, List<String> list2) {
  for (String element in list1) {
    if (list2.contains(element)) {
      return true;
    }
  }
  return false;
}
// Set your action name, define your arguments and return parameter,
// and then add the boilerplate code using the button on the right!
