import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_google_map.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_place_picker.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/place.dart';
import '/pages/m_m_u2_account_setup/bottom_sheets/bottom_sheet_why_location/bottom_sheet_why_location_widget.dart';
import '/pages/m_m_u2_account_setup/bottom_sheets/bottom_sheet_why_open_to/bottom_sheet_why_open_to_widget.dart';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class AccountSetup3DetailsCopyModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for TextField widget.
  TextEditingController? textController1;
  String? Function(BuildContext, String?)? textController1Validator;
  // State field(s) for TextField widget.
  TextEditingController? textController2;
  String? Function(BuildContext, String?)? textController2Validator;
  // State field(s) for TextField widget.
  TextEditingController? textController3;
  String? Function(BuildContext, String?)? textController3Validator;
  // State field(s) for AgeTextField widget.
  TextEditingController? ageTextFieldController;
  String? Function(BuildContext, String?)? ageTextFieldControllerValidator;
  // State field(s) for TextField widget.
  TextEditingController? textController5;
  String? Function(BuildContext, String?)? textController5Validator;
  // State field(s) for SuburbTextField widget.
  TextEditingController? suburbTextFieldController;
  String? Function(BuildContext, String?)? suburbTextFieldControllerValidator;
  // State field(s) for ProfileTextField widget.
  TextEditingController? profileTextFieldController;
  String? Function(BuildContext, String?)? profileTextFieldControllerValidator;
  // State field(s) for GoogleMap widget.
  LatLng? googleMapsCenter;
  final googleMapsController = Completer<GoogleMapController>();
  // State field(s) for PlacePicker widget.
  var placePickerValue = FFPlace();
  // State field(s) for SexualityTextField widget.
  TextEditingController? sexualityTextFieldController;
  String? Function(BuildContext, String?)?
      sexualityTextFieldControllerValidator;
  // State field(s) for OpenToTextField widget.
  TextEditingController? openToTextFieldController;
  String? Function(BuildContext, String?)? openToTextFieldControllerValidator;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
    textController1?.dispose();
    textController2?.dispose();
    textController3?.dispose();
    ageTextFieldController?.dispose();
    textController5?.dispose();
    suburbTextFieldController?.dispose();
    profileTextFieldController?.dispose();
    sexualityTextFieldController?.dispose();
    openToTextFieldController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
