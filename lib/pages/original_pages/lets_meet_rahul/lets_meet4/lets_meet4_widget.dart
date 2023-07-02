import '/flutter_flow/flutter_flow_drop_down.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'lets_meet4_model.dart';
export 'lets_meet4_model.dart';

class LetsMeet4Widget extends StatefulWidget {
  const LetsMeet4Widget({Key? key}) : super(key: key);

  @override
  _LetsMeet4WidgetState createState() => _LetsMeet4WidgetState();
}

class _LetsMeet4WidgetState extends State<LetsMeet4Widget> {
  late LetsMeet4Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => LetsMeet4Model());

    WidgetsBinding.instance.addPostFrameCallback((_) => setState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(_model.unfocusNode),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        appBar: AppBar(
          backgroundColor: FlutterFlowTheme.of(context).primary,
          automaticallyImplyLeading: false,
          title: Text(
            'Page Title',
            style: FlutterFlowTheme.of(context).headlineMedium.override(
                  fontFamily: 'Outfit',
                  color: Colors.white,
                  fontSize: 22.0,
                ),
          ),
          actions: [],
          centerTitle: false,
          elevation: 2.0,
        ),
        body: SafeArea(
          top: true,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(5.0, 150.0, 0.0, 0.0),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: 'Let’s meet up on',
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  fontFamily: 'Lexend',
                                  color: Colors.black,
                                  fontSize: 30.0,
                                  fontWeight: FontWeight.normal,
                                ),
                          ),
                          TextSpan(
                            text: ' Saturday \n07:30',
                            style: GoogleFonts.getFont(
                              'Lexend',
                              color: Color(0xFFE4423F),
                              fontSize: 30.0,
                            ),
                          ),
                          TextSpan(
                            text: ', and go to',
                            style: GoogleFonts.getFont(
                              'Lexend',
                              color: Colors.black,
                              fontSize: 30.0,
                            ),
                          ),
                          TextSpan(
                            text: ' Dinner',
                            style: GoogleFonts.getFont(
                              'Lexend',
                              color: Color(0xFFE4423F),
                              fontSize: 30.0,
                            ),
                          ),
                          TextSpan(
                            text: ' at \nthe',
                            style: GoogleFonts.getFont(
                              'Lexend',
                              color: Colors.black,
                              fontSize: 30.0,
                            ),
                          ),
                          TextSpan(
                            text: ' Vapiano\'s',
                            style: GoogleFonts.getFont(
                              'Lexend',
                              color: Color(0xFFE4423F),
                              fontSize: 30.0,
                            ),
                          )
                        ],
                        style: FlutterFlowTheme.of(context).bodyMedium,
                      ),
                      textAlign: TextAlign.start,
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(0.0, 56.5, 0.0, 10.0),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FlutterFlowDropDown<String>(
                      controller: _model.dropDownValueController1 ??=
                          FormFieldController<String>(null),
                      options: ['Option 1'],
                      onChanged: (val) =>
                          setState(() => _model.dropDownValue1 = val),
                      width: 354.0,
                      height: 40.0,
                      textStyle: FlutterFlowTheme.of(context).bodyMedium,
                      hintText: 'Date & Time',
                      icon: Icon(
                        FFIcons.k129,
                        color: Color(0xFF333333),
                        size: 15.0,
                      ),
                      fillColor:
                          FlutterFlowTheme.of(context).secondaryBackground,
                      elevation: 2.0,
                      borderColor: FlutterFlowTheme.of(context).alternate,
                      borderWidth: 2.0,
                      borderRadius: 39.0,
                      margin:
                          EdgeInsetsDirectional.fromSTEB(16.0, 4.0, 16.0, 4.0),
                      hidesUnderline: true,
                      isSearchable: false,
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FlutterFlowDropDown<String>(
                      controller: _model.dropDownValueController2 ??=
                          FormFieldController<String>(null),
                      options: ['Option 1'],
                      onChanged: (val) =>
                          setState(() => _model.dropDownValue2 = val),
                      width: 354.0,
                      height: 40.0,
                      textStyle: FlutterFlowTheme.of(context).bodyMedium,
                      hintText: 'Date Theme',
                      icon: Icon(
                        FFIcons.k129,
                        color: Color(0xFF333333),
                        size: 15.0,
                      ),
                      fillColor:
                          FlutterFlowTheme.of(context).secondaryBackground,
                      elevation: 2.0,
                      borderColor: FlutterFlowTheme.of(context).alternate,
                      borderWidth: 2.0,
                      borderRadius: 39.0,
                      margin:
                          EdgeInsetsDirectional.fromSTEB(16.0, 4.0, 16.0, 4.0),
                      hidesUnderline: true,
                      isSearchable: false,
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 10.0),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FlutterFlowDropDown<String>(
                      controller: _model.dropDownValueController3 ??=
                          FormFieldController<String>(null),
                      options: ['Option 1'],
                      onChanged: (val) =>
                          setState(() => _model.dropDownValue3 = val),
                      width: 354.0,
                      height: 40.0,
                      textStyle: FlutterFlowTheme.of(context).bodyMedium,
                      hintText: 'Location',
                      icon: Icon(
                        FFIcons.k129,
                        color: Color(0xFF333333),
                        size: 15.0,
                      ),
                      fillColor:
                          FlutterFlowTheme.of(context).secondaryBackground,
                      elevation: 2.0,
                      borderColor: FlutterFlowTheme.of(context).alternate,
                      borderWidth: 2.0,
                      borderRadius: 39.0,
                      margin:
                          EdgeInsetsDirectional.fromSTEB(16.0, 4.0, 16.0, 4.0),
                      hidesUnderline: true,
                      isSearchable: false,
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Stack(
                    children: [
                      Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(
                            0.0, 237.0, 0.0, 0.0),
                        child: FFButtonWidget(
                          onPressed: () {
                            print('Button pressed ...');
                          },
                          text: 'Slide to Send',
                          options: FFButtonOptions(
                            width: 354.0,
                            height: 61.0,
                            padding: EdgeInsetsDirectional.fromSTEB(
                                0.0, 0.0, 0.0, 0.0),
                            iconPadding: EdgeInsetsDirectional.fromSTEB(
                                0.0, 0.0, 0.0, 0.0),
                            color: Colors.white,
                            textStyle: FlutterFlowTheme.of(context)
                                .titleSmall
                                .override(
                                  fontFamily: 'Open Sans',
                                  color: Color(0xFF1A1A1A),
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.normal,
                                ),
                            elevation: 3.0,
                            borderSide: BorderSide(
                              color: Color(0xFFE2E2E2),
                              width: 1.0,
                            ),
                            borderRadius: BorderRadius.circular(24.0),
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(-0.49, 0.88),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              4.5, 240.0, 0.0, 0.0),
                          child: Icon(
                            FFIcons.k223,
                            color: Color(0xFFE4423F),
                            size: 51.0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
