import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'accountsetup2_model.dart';
export 'accountsetup2_model.dart';

class Accountsetup2Widget extends StatefulWidget {
  const Accountsetup2Widget({Key? key}) : super(key: key);

  @override
  _Accountsetup2WidgetState createState() => _Accountsetup2WidgetState();
}

class _Accountsetup2WidgetState extends State<Accountsetup2Widget> {
  late Accountsetup2Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => Accountsetup2Model());

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
        body: SafeArea(
          top: true,
          child: Padding(
            padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 1.0),
            child: Stack(
              children: [
                Align(
                  alignment: AlignmentDirectional(-0.14, -0.91),
                  child: Text(
                    'Profile Creation ',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFF1A1A1A),
                          fontSize: 22.0,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.89, -0.78),
                  child: Container(
                    width: 118.0,
                    height: 5.01,
                    decoration: BoxDecoration(
                      color: Color(0xFFE4423F),
                      borderRadius: BorderRadius.circular(20.0),
                      shape: BoxShape.rectangle,
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.2, -0.8),
                  child: Text(
                    '40%',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          color: Color(0xFFE4423F),
                          fontSize: 18.0,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.92, -0.78),
                  child: Container(
                    width: 195.0,
                    height: 4.0,
                    decoration: BoxDecoration(
                      color: Color(0xFFE2E2E2),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.85, -0.71),
                  child: Text(
                    'About You',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          fontSize: 18.0,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.37, -0.63),
                  child: Text(
                    'These details are about you and will be public to\npotential matches on meet me up.',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.44, -0.48),
                  child: Padding(
                    padding:
                        EdgeInsetsDirectional.fromSTEB(6.0, 6.0, 10.0, 10.0),
                    child: Container(
                      width: 354.0,
                      height: 49.0,
                      decoration: BoxDecoration(
                        color: Color(0xA5F5F5F5),
                        borderRadius: BorderRadius.circular(10.0),
                        border: Border.all(
                          color: Color(0x4C000000),
                        ),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.82, -0.48),
                  child: Text(
                    'Full Name',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          color: Color(0xFFE4423F),
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.81, -0.43),
                  child: Text(
                    'Lachlan Collis',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          color: Colors.black,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.8, -0.28),
                  child: Container(
                    width: 170.0,
                    height: 49.0,
                    decoration: BoxDecoration(
                      color: Color(0xA5F5F5F5),
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(
                        color: Color(0x4C000000),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.91, -0.28),
                  child: Container(
                    width: 170.0,
                    height: 49.0,
                    decoration: BoxDecoration(
                      color: Color(0xA5F5F5F5),
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(
                        color: Color(0x4C000000),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.84, -0.3),
                  child: Text(
                    'Age',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFFE4423F),
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.81, -0.24),
                  child: Text(
                    '21',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.3, -0.29),
                  child: Text(
                    'Gender',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFFE4423F),
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.29, -0.24),
                  child: Text(
                    'Female',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                          color: Colors.black,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.24, -0.07),
                  child: Container(
                    width: 354.0,
                    height: 49.0,
                    decoration: BoxDecoration(
                      color: Color(0xA5F5F5F5),
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(
                        color: Color(0x4C000000),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.79, -0.1),
                  child: Text(
                    'Suburb',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFFE4423F),
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.78, -0.04),
                  child: Text(
                    'Lorem Ipsum',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.19, 0.28),
                  child: Container(
                    width: 354.0,
                    height: 140.0,
                    decoration: BoxDecoration(
                      color: Color(0xA5F5F5F5),
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(
                        color: Color(0x4C000000),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.79, 0.11),
                  child: Text(
                    'Profile Bio',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFFE4423F),
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.15, 0.28),
                  child: Text(
                    'Lorem ipsum dolor sit amet, consetetur sadipscing \nelitr, sed diam nonumy eirmod tempor invidunt ut.\n\nConsetetur sadipscing elitr, sed diam nonumy \neirmod tempor invidunt ut.',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                          color: Color(0xFF1A1A1A),
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.09, 0.54),
                  child: FFButtonWidget(
                    onPressed: () {
                      print('Button pressed ...');
                    },
                    text: '',
                    options: FFButtonOptions(
                      width: 233.0,
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
                Align(
                  alignment: AlignmentDirectional(-0.16, 0.53),
                  child: Text(
                    'Record a Video',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
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
                  alignment: AlignmentDirectional(-0.93, -0.93),
                  child: FlutterFlowIconButton(
                    borderColor: Color(0xFFCECECE),
                    borderRadius: 20.0,
                    borderWidth: 1.0,
                    buttonSize: 40.0,
                    fillColor: Color(0xFFCECECE),
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
