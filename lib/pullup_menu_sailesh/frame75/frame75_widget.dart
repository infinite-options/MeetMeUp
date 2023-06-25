import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'frame75_model.dart';
export 'frame75_model.dart';

class Frame75Widget extends StatefulWidget {
  const Frame75Widget({Key? key}) : super(key: key);

  @override
  _Frame75WidgetState createState() => _Frame75WidgetState();
}

class _Frame75WidgetState extends State<Frame75Widget> {
  late Frame75Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => Frame75Model());

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
          child: Stack(
            children: [
              Align(
                alignment: AlignmentDirectional(0.0, 0.0),
                child: Container(
                  width: 517.0,
                  height: 947.0,
                  decoration: BoxDecoration(
                    color: Color(0xFFA1A1A1),
                  ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(0.0, 1.6),
                child: Container(
                  width: 450.0,
                  height: 435.0,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(0.0),
                      bottomRight: Radius.circular(0.0),
                      topLeft: Radius.circular(35.0),
                      topRight: Radius.circular(35.0),
                    ),
                  ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.92, 0.34),
                child: Text(
                  'Your Current Position',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Open Sans',
                        color: Color(0xFF1A1A1A),
                        fontSize: 18.0,
                      ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.86, 0.47),
                child: Text(
                  'seeing what you get up to in your day to day.',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Open Sans',
                        color: Color(0xFF060606),
                      ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.11, 0.43),
                child: Text(
                  'What is your current line of work? Potential matches love ',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Open Sans',
                      ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.01, 0.89),
                child: FFButtonWidget(
                  onPressed: () {
                    print('Button pressed ...');
                  },
                  text: 'Add',
                  options: FFButtonOptions(
                    width: 130.0,
                    height: 45.0,
                    padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                    iconPadding:
                        EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                    color: Color(0xFFE4423F),
                    textStyle: FlutterFlowTheme.of(context).titleSmall.override(
                          fontFamily: 'Open Sans',
                          color: Colors.white,
                          fontSize: 18.0,
                        ),
                    elevation: 3.0,
                    borderSide: BorderSide(
                      color: Colors.transparent,
                      width: 1.0,
                    ),
                    borderRadius: BorderRadius.circular(25.0),
                  ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.03, 0.22),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: Image.asset(
                    'assets/images/_197.png',
                    width: 60.0,
                    height: 5.0,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.21, 0.7),
                child: Container(
                  width: 354.0,
                  height: 50.0,
                  decoration: BoxDecoration(
                    color: Color(0xFFE9E9E9),
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.82, 0.66),
                child: Text(
                  'Your Job',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Readex Pro',
                        color: Color(0xFFE4423F),
                        fontWeight: FontWeight.bold,
                      ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-0.79, 0.7),
                child: Text(
                  'UI / UX designer',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Readex Pro',
                        color: Color(0xFF1A1A1A),
                      ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
