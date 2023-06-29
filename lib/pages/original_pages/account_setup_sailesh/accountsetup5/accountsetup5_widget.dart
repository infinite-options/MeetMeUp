import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'accountsetup5_model.dart';
export 'accountsetup5_model.dart';

class Accountsetup5Widget extends StatefulWidget {
  const Accountsetup5Widget({Key? key}) : super(key: key);

  @override
  _Accountsetup5WidgetState createState() => _Accountsetup5WidgetState();
}

class _Accountsetup5WidgetState extends State<Accountsetup5Widget> {
  late Accountsetup5Model _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => Accountsetup5Model());

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
            width: 547.0,
            height: 941.0,
            decoration: BoxDecoration(
              color: FlutterFlowTheme.of(context).secondaryBackground,
            ),
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: Image.asset(
                    'assets/images/pexels-katerina-holmes-5910804.png',
                    width: 431.0,
                    height: 941.0,
                    fit: BoxFit.cover,
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Container(
                    width: 779.0,
                    height: 1157.0,
                    decoration: BoxDecoration(
                      color: Color(0x8AD79090),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.03, 0.88),
                  child: Container(
                    width: 362.0,
                    height: 353.0,
                    decoration: BoxDecoration(
                      color: FlutterFlowTheme.of(context).secondaryBackground,
                      borderRadius: BorderRadius.circular(40.0),
                    ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.01, 0.21),
                  child: Text(
                    'meet me up',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Inria Sans',
                          color: Color(0xFFE4423F),
                          fontSize: 36.0,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(0.06, 0.34),
                  child: Text(
                    'Start matching and create you \n    first date with meet me up',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          fontSize: 20.0,
                          fontWeight: FontWeight.w500,
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.05, 0.75),
                  child: FFButtonWidget(
                    onPressed: () {
                      print('Button pressed ...');
                    },
                    text: 'Become a member',
                    options: FFButtonOptions(
                      width: 208.0,
                      height: 52.0,
                      padding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                      iconPadding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                      color: Color(0xFFE4423F),
                      textStyle:
                          FlutterFlowTheme.of(context).titleSmall.override(
                                fontFamily: 'Lexend',
                                color: Colors.white,
                                fontSize: 18.0,
                                fontWeight: FontWeight.normal,
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
                  alignment: AlignmentDirectional(0.09, 0.58),
                  child: Text(
                    ' Become a member and gain access to creating\n  unlimited dates with anyone you match with.\n   Free early bird subscription offers for three \nmonths for you or a friend/family members when\n                     the app is created.',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'DM Sans',
                        ),
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional(-0.07, 0.86),
                  child: Text(
                    'Maybe later',
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Lexend',
                          color: Color(0xFFE4423F),
                        ),
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
