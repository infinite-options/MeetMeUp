import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_drop_down.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class Matching3AvailabilityModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for DayDropDown widget.
  String? dayDropDownValue;
  FormFieldController<String>? dayDropDownValueController;
  // State field(s) for StartTextField widget.
  TextEditingController? startTextFieldController;
  String? Function(BuildContext, String?)? startTextFieldControllerValidator;
  // State field(s) for StartDropDown widget.
  String? startDropDownValue;
  FormFieldController<String>? startDropDownValueController;
  // State field(s) for EndTextField widget.
  TextEditingController? endTextFieldController;
  String? Function(BuildContext, String?)? endTextFieldControllerValidator;
  // State field(s) for EndDropDown widget.
  String? endDropDownValue;
  FormFieldController<String>? endDropDownValueController;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
    startTextFieldController?.dispose();
    endTextFieldController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
