import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'accountsetup4_model.dart';
export 'accountsetup4_model.dart';

class Accountsetup4Widget extends StatefulWidget {
  const Accountsetup4Widget({Key? key}) : super(key: key);

  @override
  _Accountsetup4WidgetState createState() => _Accountsetup4WidgetState();
}

class _Accountsetup4WidgetState extends State<Accountsetup4Widget> {
  late Accountsetup4Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => Accountsetup4Model());

    WidgetsBinding.instance.addPostFrameCallback((_) => setState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(_model.unfocusNode),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        body: SafeArea(
          top: true,
          child: Container(
            width: 516.0,
            height: 943.0,
            decoration: BoxDecoration(
              color: Color(0xCEF5F5F5),
            ),
            child: Stack(
              children: [
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 1.0),
                  child: Stack(
                    children: [
                      Align(
                        alignment: AlignmentDirectional(-0.14, -0.91),
                        child: Text(
                          'Profile Creation ',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'Lexend',
                                    color: Color(0xFF1A1A1A),
                                    fontSize: 22.0,
                                  ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(-0.89, -0.78),
                        child: Container(
                          width: 277.0,
                          height: 5.01,
                          decoration: BoxDecoration(
                            color: Color(0xFFE4423F),
                            borderRadius: BorderRadius.circular(20.0),
                            shape: BoxShape.rectangle,
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(0.64, -0.8),
                        child: Text(
                          '80%',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'Readex Pro',
                                    color: Color(0xFFE4423F),
                                    fontSize: 18.0,
                                  ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(1.02, -0.78),
                        child: Container(
                          width: 63.0,
                          height: 4.01,
                          decoration: BoxDecoration(
                            color: Color(0xFFE2E2E2),
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(-0.75, -0.71),
                        child: Text(
                          'Your Profile Recording',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'Lexend',
                                    color: Color(0xFF1A1A1A),
                                    fontSize: 18.0,
                                  ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(0.32, -0.62),
                        child: Text(
                          'This is a short 30 second to 5 minute video to tell us \na bit about who you are and what you like.\n\nBe as open and honest as you would like, matches love\nto hear about you.',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'DM Sans',
                                    color: Colors.black,
                                  ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(-0.16, 0.53),
                        child: Text(
                          'Record a Video',
                          style:
                              FlutterFlowTheme.of(context).bodyMedium.override(
                                    fontFamily: 'Lexend',
                                    color: Colors.white,
                                    fontSize: 18.0,
                                  ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(0.43, 0.53),
                        child: Icon(
                          Icons.videocam_sharp,
                          color: Colors.white,
                          size: 24.0,
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(0.12, 0.2),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16.0),
                          child: Image.asset(
                            'assets/images/IMG_9322.png',
                            width: 350.0,
                            height: 433.0,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.0, 2.63),
                  child: Container(
                    width: 533.0,
                    height: 610.0,
                    decoration: BoxDecoration(
                      color: FlutterFlowTheme.of(context).secondaryBackground,
                      borderRadius: BorderRadius.circular(30.0),
                      border: Border.all(
                        color: Color(0xFFA1A1A1),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.41, 0.15),
                  child: Text(
                    'Presenting An Accurate Profile',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Colors.black,
                          fontSize: 18.0,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.02, 0.78),
                  child: FFButtonWidget(
                    onPressed: () {
                      print('Button pressed ...');
                    },
                    text: 'Done',
                    options: FFButtonOptions(
                      width: 128.0,
                      height: 43.0,
                      padding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                      iconPadding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                      color: Color(0xFFE4423F),
                      textStyle:
                          FlutterFlowTheme.of(context).titleSmall.override(
                                fontFamily: 'Readex Pro',
                                color: Colors.white,
                              ),
                      elevation: 3.0,
                      borderSide: BorderSide(
                        color: Colors.transparent,
                        width: 1.0,
                      ),
                      borderRadius: BorderRadius.circular(28.0),
                    ),
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Align(
                      alignment: AlignmentDirectional(0.0, 0.38),
                      child: Text(
                        '         The video recording is mandatory to use the app.  \n         If you have any concerns providing this  information \n         there is an option to delete it, if you don\'t wish to\n         become a member or keep on site for use of a \n         deactivated account.',
                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                              fontFamily: 'DM Sans',
                            ),
                      ),
                    ),
                  ],
                ),
                Align(
                  alignment: AlignmentDirectional(-0.93, -0.92),
                  child: FlutterFlowIconButton(
                    borderColor: Color(0xFFCECECE),
                    borderRadius: 20.0,
                    borderWidth: 1.0,
                    buttonSize: 40.0,
                    fillColor: Color(0x33AB9494),
                    icon: Icon(
                      Icons.arrow_back_sharp,
                      color: FlutterFlowTheme.of(context).primaryText,
                      size: 24.0,
                    ),
                    onPressed: () {
                      print('IconButton pressed ...');
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
