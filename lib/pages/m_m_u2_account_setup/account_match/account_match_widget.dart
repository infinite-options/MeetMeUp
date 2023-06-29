import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/custom_code/actions/index.dart' as actions;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'account_match_model.dart';
export 'account_match_model.dart';

class AccountMatchWidget extends StatefulWidget {
  const AccountMatchWidget({Key? key}) : super(key: key);

  @override
  _AccountMatchWidgetState createState() => _AccountMatchWidgetState();
}

class _AccountMatchWidgetState extends State<AccountMatchWidget> {
  late AccountMatchModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => AccountMatchModel());

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
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                FFButtonWidget(
                  onPressed: () async {
                    _model.matchedUsersData =
                        await actions.getDocsFromCollection(
                      (currentUserDocument?.userInterests?.toList() ?? [])
                          .toList(),
                      currentUserUid,
                    );

                    setState(() {});
                  },
                  text: 'Match Me!',
                  options: FFButtonOptions(
                    height: 40.0,
                    padding:
                        EdgeInsetsDirectional.fromSTEB(24.0, 0.0, 24.0, 0.0),
                    iconPadding:
                        EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                    color: FlutterFlowTheme.of(context).primary,
                    textStyle: FlutterFlowTheme.of(context).titleSmall.override(
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
                Builder(
                  builder: (context) {
                    final matchedUsersDoc =
                        _model.matchedUsersData!.map((e) => e).toList();
                    return ListView.builder(
                      padding: EdgeInsets.zero,
                      shrinkWrap: true,
                      scrollDirection: Axis.vertical,
                      itemCount: matchedUsersDoc.length,
                      itemBuilder: (context, matchedUsersDocIndex) {
                        final matchedUsersDocItem =
                            matchedUsersDoc[matchedUsersDocIndex];
                        return Container(
                          width: 100.0,
                          height: 197.0,
                          decoration: BoxDecoration(
                            color: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            children: [
                              Text(
                                _model.matchedUsersData![matchedUsersDocIndex]
                                    .fullName,
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                              Text(
                                _model.matchedUsersData![matchedUsersDocIndex]
                                    .gender,
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                              Text(
                                _model
                                    .matchedUsersData![matchedUsersDocIndex].age
                                    .toString(),
                                style: FlutterFlowTheme.of(context).bodyMedium,
                              ),
                              Builder(
                                builder: (context) {
                                  final matchedUsersInterests =
                                      matchedUsersDocItem.userInterests
                                          .map((e) => e)
                                          .toList();
                                  return ListView.builder(
                                    padding: EdgeInsets.zero,
                                    shrinkWrap: true,
                                    scrollDirection: Axis.vertical,
                                    itemCount: matchedUsersInterests.length,
                                    itemBuilder:
                                        (context, matchedUsersInterestsIndex) {
                                      final matchedUsersInterestsItem =
                                          matchedUsersInterests[
                                              matchedUsersInterestsIndex];
                                      return Text(
                                        valueOrDefault<String>(
                                          _model
                                                  .matchedUsersData?[
                                                      matchedUsersDocIndex]!
                                                  .userInterests[
                                              matchedUsersInterestsIndex],
                                          'none',
                                        ),
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium,
                                      );
                                    },
                                  );
                                },
                              ),
                            ],
                          ),
                        );
                      },
                    );
                  },
                ),
                FFButtonWidget(
                  onPressed: () async {
                    context.pushNamed('AccountSetup4-Interests');
                  },
                  text: 'Edit Interests',
                  options: FFButtonOptions(
                    height: 40.0,
                    padding:
                        EdgeInsetsDirectional.fromSTEB(24.0, 0.0, 24.0, 0.0),
                    iconPadding:
                        EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 0.0),
                    color: FlutterFlowTheme.of(context).primary,
                    textStyle: FlutterFlowTheme.of(context).titleSmall.override(
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
