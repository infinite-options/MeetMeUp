import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/pages/account_setup_p_m/bottom_sheets/bottom_sheet_body_type/bottom_sheet_body_type_widget.dart';
import '/pages/account_setup_p_m/bottom_sheets/bottom_sheet_drinking/bottom_sheet_drinking_widget.dart';
import '/pages/account_setup_p_m/bottom_sheets/bottom_sheet_education/bottom_sheet_education_widget.dart';
import '/pages/account_setup_p_m/bottom_sheets/bottom_sheet_height/bottom_sheet_height_widget.dart';
import '/pages/account_setup_p_m/bottom_sheets/bottom_sheet_sign/bottom_sheet_sign_widget.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class AccountSetup4InterestsModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for InterestTextField widget.
  TextEditingController? interestTextFieldController;
  String? Function(BuildContext, String?)? interestTextFieldControllerValidator;
  // State field(s) for SignTextField widget.
  TextEditingController? signTextFieldController;
  String? Function(BuildContext, String?)? signTextFieldControllerValidator;
  // Stores action output result for [Bottom Sheet - BottomSheetHeight] action in Text widget.
  String? heightReturn;
  // Stores action output result for [Bottom Sheet - BottomSheetEducation] action in Text widget.
  String? educationReturn;
  // Stores action output result for [Bottom Sheet - BottomSheetBodyType] action in Text widget.
  String? bodyTypeReturn;
  // Stores action output result for [Bottom Sheet - BottomSheetSign] action in Text widget.
  String? signReturn;
  // Stores action output result for [Bottom Sheet - BottomSheetDrinking] action in Text widget.
  String? drinkingReturn;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
    interestTextFieldController?.dispose();
    signTextFieldController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
