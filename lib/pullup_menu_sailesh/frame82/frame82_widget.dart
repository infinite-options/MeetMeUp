import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'frame82_model.dart';
export 'frame82_model.dart';

class Frame82Widget extends StatefulWidget {
  const Frame82Widget({Key? key}) : super(key: key);

  @override
  _Frame82WidgetState createState() => _Frame82WidgetState();
}

class _Frame82WidgetState extends State<Frame82Widget> {
  late Frame82Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => Frame82Model());

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
                  width: 414.0,
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
                alignment: AlignmentDirectional(-0.67, 0.34),
                child: Text(
                  'Why On Earth Do You Need This ?',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Open Sans',
                        color: Color(0xFF1A1A1A),
                        fontSize: 18.0,
                      ),
                ),
              ),
              Align(
                alignment: AlignmentDirectional(1.67, 0.65),
                child: Text(
                  '    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, \n    sed diam nonumy eirmod tempor invidunt ut labore et \n    dolore magna aliquyam erat, sed diam voluptua.\n\n   At vero eos et accusam et justo duo dolores et ea rebum. \n   stet clita kasd gubergren, no sea takimata sanctus est \n   Lorem ipsum dolor sit amet. ',
                  style: FlutterFlowTheme.of(context).bodyMedium.override(
                        fontFamily: 'Open Sans',
                        color: Color(0xFF1A1A1A),
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
                alignment: AlignmentDirectional(-0.01, 0.24),
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
            ],
          ),
        ),
      ),
    );
  }
}
