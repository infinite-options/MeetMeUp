import '/backend/api_requests/api_calls.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'a_p_i_test_model.dart';
export 'a_p_i_test_model.dart';

class APITestWidget extends StatefulWidget {
  const APITestWidget({Key? key}) : super(key: key);

  @override
  _APITestWidgetState createState() => _APITestWidgetState();
}

class _APITestWidgetState extends State<APITestWidget> {
  late APITestModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => APITestModel());

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
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FFButtonWidget(
                    onPressed: () async {
                      context.pushNamed('MeetUpHomePage');
                    },
                    text: 'Button',
                    options: FFButtonOptions(
                      height: 40.0,
                      padding:
                          EdgeInsetsDirectional.fromSTEB(24.0, 0.0, 24.0, 0.0),
                      iconPadding:
                          EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                      color: FlutterFlowTheme.of(context).primary,
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
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FutureBuilder<ApiCallResponse>(
                    future: BondMoviesAPICallCall.call(),
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
                      final listViewBondMoviesAPICallResponse = snapshot.data!;
                      return Builder(
                        builder: (context) {
                          final bondDB = getJsonField(
                            listViewBondMoviesAPICallResponse.jsonBody,
                            r'''$''',
                          ).toList();
                          return ListView.builder(
                            padding: EdgeInsets.zero,
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: bondDB.length,
                            itemBuilder: (context, bondDBIndex) {
                              final bondDBItem = bondDB[bondDBIndex];
                              return Row(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  Text(
                                    getJsonField(
                                      bondDBItem,
                                      r'''$..movie_title''',
                                    ).toString(),
                                    style:
                                        FlutterFlowTheme.of(context).bodyMedium,
                                  ),
                                  Text(
                                    getJsonField(
                                      bondDBItem,
                                      r'''$..bond_girl''',
                                    ).toString(),
                                    style:
                                        FlutterFlowTheme.of(context).bodyMedium,
                                  ),
                                ],
                              );
                            },
                          );
                        },
                      );
                    },
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FutureBuilder<ApiCallResponse>(
                    future: BondMoviesAPICallCall.call(),
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
                      final listViewBondMoviesAPICallResponse = snapshot.data!;
                      return Builder(
                        builder: (context) {
                          final bondGirlList = (BondMoviesAPICallCall.bondGIrl(
                                listViewBondMoviesAPICallResponse.jsonBody,
                              ) as List)
                                  .map<String>((s) => s.toString())
                                  .toList()
                                  ?.toList() ??
                              [];
                          return ListView.builder(
                            padding: EdgeInsets.zero,
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: bondGirlList.length,
                            itemBuilder: (context, bondGirlListIndex) {
                              final bondGirlListItem =
                                  bondGirlList[bondGirlListIndex];
                              return Text(
                                bondGirlListItem,
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              );
                            },
                          );
                        },
                      );
                    },
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Hello World',
                        textAlign: TextAlign.center,
                        style: FlutterFlowTheme.of(context).bodyMedium,
                      ),
                    ],
                  ),
                ),
                FutureBuilder<ApiCallResponse>(
                  future: BondMoviesAPICallCall.call(),
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
                    final listViewBondMoviesAPICallResponse = snapshot.data!;
                    return Builder(
                      builder: (context) {
                        final bondMovieTitleList =
                            (BondMoviesAPICallCall.bondMovieTitle(
                                  listViewBondMoviesAPICallResponse.jsonBody,
                                ) as List)
                                    .map<String>((s) => s.toString())
                                    .toList()
                                    ?.toList() ??
                                [];
                        return ListView.builder(
                          padding: EdgeInsets.zero,
                          shrinkWrap: true,
                          scrollDirection: Axis.vertical,
                          itemCount: bondMovieTitleList.length,
                          itemBuilder: (context, bondMovieTitleListIndex) {
                            final bondMovieTitleListItem =
                                bondMovieTitleList[bondMovieTitleListIndex];
                            return Text(
                              bondMovieTitleListItem,
                              style: FlutterFlowTheme.of(context).bodyMedium,
                            );
                          },
                        );
                      },
                    );
                  },
                ),
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0.0, 40.0, 0.0, 0.0),
                  child: Text(
                    'IO API Response',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FutureBuilder<ApiCallResponse>(
                    future: IOAvailableAppointmentsCall.call(),
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
                      final rowIOAvailableAppointmentsResponse = snapshot.data!;
                      return Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text(
                            getJsonField(
                              rowIOAvailableAppointmentsResponse.jsonBody,
                              r'''$.result''',
                            ).toString(),
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                          Text(
                            '[{ start_time: 11:30:00}]',
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                        ],
                      );
                    },
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FutureBuilder<ApiCallResponse>(
                    future: IOAvailableAppointmentsCall.call(),
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
                      final rowIOAvailableAppointmentsResponse = snapshot.data!;
                      return Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text(
                            getJsonField(
                              rowIOAvailableAppointmentsResponse.jsonBody,
                              r'''$.result[0]''',
                            ).toString(),
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                          Text(
                            '{ start_time: 11:30:00}',
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                        ],
                      );
                    },
                  ),
                ),
                Padding(
                  padding:
                      EdgeInsetsDirectional.fromSTEB(20.0, 20.0, 20.0, 20.0),
                  child: FutureBuilder<ApiCallResponse>(
                    future: IOAvailableAppointmentsCall.call(),
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
                      final rowIOAvailableAppointmentsResponse = snapshot.data!;
                      return Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text(
                            getJsonField(
                              rowIOAvailableAppointmentsResponse.jsonBody,
                              r'''$.result[0].start_time''',
                            ).toString(),
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                          Text(
                            '11:30:00',
                            style: FlutterFlowTheme.of(context).bodyMedium,
                          ),
                        ],
                      );
                    },
                  ),
                ),
                ListView(
                  padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  scrollDirection: Axis.vertical,
                  children: [],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
