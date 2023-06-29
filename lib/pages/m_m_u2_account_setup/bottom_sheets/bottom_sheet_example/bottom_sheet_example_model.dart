import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/random_data_util.dart' as random_data;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class BottomSheetExampleModel extends FlutterFlowModel {
  ///  Local state fields for this component.

  String? bottomSheetReturn;

  ///  State fields for stateful widgets in this component.

  // State field(s) for BottomSheetTextField widget.
  TextEditingController? bottomSheetTextFieldController;
  String? Function(BuildContext, String?)?
      bottomSheetTextFieldControllerValidator;
  // State field(s) for shortBio widget.
  TextEditingController? shortBioController;
  String? Function(BuildContext, String?)? shortBioControllerValidator;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    bottomSheetTextFieldController?.dispose();
    shortBioController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
