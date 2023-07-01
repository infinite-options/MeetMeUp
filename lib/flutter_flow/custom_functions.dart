import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import 'uploaded_file.dart';
import '/backend/backend.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '/auth/firebase_auth/auth_util.dart';

int? convertStringToInt(String? someString) {
  // string to int
  int tries;

  if (someString == null) {
    return 0;
  }

  try {
    tries = int.parse(someString);
  } catch (err) {
    return 0;
  }

  return tries;
}
