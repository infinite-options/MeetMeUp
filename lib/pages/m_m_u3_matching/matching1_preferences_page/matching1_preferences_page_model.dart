import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/pages/m_m_u2_account_setup/bottom_sheets/bottom_sheet_error/bottom_sheet_error_widget.dart';
import '/custom_code/actions/index.dart' as actions;
import '/custom_code/widgets/index.dart' as custom_widgets;
import '/flutter_flow/custom_functions.dart' as functions;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class Matching1PreferencesPageModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for DistanceSlider widget.
  double? distanceSliderValue;
  // State field(s) for AgeSliderMin widget.
  double? ageSliderMinValue;
  // State field(s) for AgeSliderMax widget.
  double? ageSliderMaxValue;
  // State field(s) for HeightSlider widget.
  double? heightSliderValue;
  // State field(s) for KidSlider widget.
  double? kidSliderValue;
  // Stores action output result for [Custom Action - getDocsFromCollectionByAge] action in Button widget.
  List<UsersRecord>? matchesByAge;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
