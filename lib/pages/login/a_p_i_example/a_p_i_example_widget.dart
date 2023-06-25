import '/backend/api_requests/api_calls.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'a_p_i_example_model.dart';
export 'a_p_i_example_model.dart';

class APIExampleWidget extends StatefulWidget {
  const APIExampleWidget({Key? key}) : super(key: key);

  @override
  _APIExampleWidgetState createState() => _APIExampleWidgetState();
}

class _APIExampleWidgetState extends State<APIExampleWidget> {
  late APIExampleModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => APIExampleModel());

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
              FutureBuilder<ApiCallResponse>(
                future: BondMovieAPICallExampleCall.call(),
                builder: (context, snapshot) {
                  // Customize what your widget looks like when it's loading.
                  if (!snapshot.hasData) {
                    return Center(
                      child: SizedBox(
                        width: 50.0,
                        height: 50.0,
                        child: CircularProgressIndicator(
                          color: FlutterFlowTheme.of(context).primary,
                        ),
                      ),
                    );
                  }
                  final listViewBondMovieAPICallExampleResponse =
                      snapshot.data!;
                  return Builder(
                    builder: (context) {
                      final bondExample = getJsonField(
                        listViewBondMovieAPICallExampleResponse.jsonBody,
                        r'''$''',
                      ).toList();
                      return ListView.builder(
                        padding: EdgeInsets.zero,
                        shrinkWrap: true,
                        scrollDirection: Axis.vertical,
                        itemCount: bondExample.length,
                        itemBuilder: (context, bondExampleIndex) {
                          final bondExampleItem = bondExample[bondExampleIndex];
                          return Row(
                            mainAxisSize: MainAxisSize.max,
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              Text(
                                getJsonField(
                                  bondExampleItem,
                                  r'''$..bond_girl''',
                                ).toString(),
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                              Text(
                                getJsonField(
                                  bondExampleItem,
                                  r'''$..movie_year''',
                                ).toString(),
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                              Text(
                                getJsonField(
                                  bondExampleItem,
                                  r'''$..movie_title''',
                                ).toString(),
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                            ],
                          );
                        },
                      );
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
