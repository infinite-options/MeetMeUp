import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:page_transition/page_transition.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '../flutter_flow_theme.dart';
import '/backend/backend.dart';
import '/backend/schema/structs/index.dart';

import '../../auth/base_auth_user_provider.dart';

import '../../index.dart';
import '../../main.dart';
import '../lat_lng.dart';
import '../place.dart';
import 'serialization_util.dart';

export 'package:go_router/go_router.dart';
export 'serialization_util.dart';

const kTransitionInfoKey = '__transition_info__';

class AppStateNotifier extends ChangeNotifier {
  AppStateNotifier._();

  static AppStateNotifier? _instance;
  static AppStateNotifier get instance => _instance ??= AppStateNotifier._();

  BaseAuthUser? initialUser;
  BaseAuthUser? user;
  bool showSplashImage = true;
  String? _redirectLocation;

  /// Determines whether the app will refresh and build again when a sign
  /// in or sign out happens. This is useful when the app is launched or
  /// on an unexpected logout. However, this must be turned off when we
  /// intend to sign in/out and then navigate or perform any actions after.
  /// Otherwise, this will trigger a refresh and interrupt the action(s).
  bool notifyOnAuthChange = true;

  bool get loading => user == null || showSplashImage;
  bool get loggedIn => user?.loggedIn ?? false;
  bool get initiallyLoggedIn => initialUser?.loggedIn ?? false;
  bool get shouldRedirect => loggedIn && _redirectLocation != null;

  String getRedirectLocation() => _redirectLocation!;
  bool hasRedirect() => _redirectLocation != null;
  void setRedirectLocationIfUnset(String loc) => _redirectLocation ??= loc;
  void clearRedirectLocation() => _redirectLocation = null;

  /// Mark as not needing to notify on a sign in / out when we intend
  /// to perform subsequent actions (such as navigation) afterwards.
  void updateNotifyOnAuthChange(bool notify) => notifyOnAuthChange = notify;

  void update(BaseAuthUser newUser) {
    final shouldUpdate =
        user?.uid == null || newUser.uid == null || user?.uid != newUser.uid;
    initialUser ??= newUser;
    user = newUser;
    // Refresh the app on auth change unless explicitly marked otherwise.
    // No need to update unless the user has changed.
    if (notifyOnAuthChange && shouldUpdate) {
      notifyListeners();
    }
    // Once again mark the notifier as needing to update on auth change
    // (in order to catch sign in / out events).
    updateNotifyOnAuthChange(true);
  }

  void stopShowingSplashImage() {
    showSplashImage = false;
    notifyListeners();
  }
}

GoRouter createRouter(AppStateNotifier appStateNotifier) => GoRouter(
      initialLocation: '/',
      debugLogDiagnostics: true,
      refreshListenable: appStateNotifier,
      errorBuilder: (context, state) => appStateNotifier.loggedIn
          ? AccountSetup3DetailsWidget()
          : MMUHomePageWidget(),
      routes: [
        FFRoute(
          name: '_initialize',
          path: '/',
          builder: (context, _) => appStateNotifier.loggedIn
              ? AccountSetup3DetailsWidget()
              : MMUHomePageWidget(),
        ),
        FFRoute(
          name: 'MMU_HomePage',
          path: '/mMUHomePage',
          builder: (context, params) => MMUHomePageWidget(),
        ),
        FFRoute(
          name: 'Demo-APITest',
          path: '/demoAPITest',
          builder: (context, params) => DemoAPITestWidget(),
        ),
        FFRoute(
          name: 'Demo-APIExample',
          path: '/demoAPIExample',
          builder: (context, params) => DemoAPIExampleWidget(),
        ),
        FFRoute(
          name: 'onboarding_slide1',
          path: '/onboardingSlide1',
          builder: (context, params) => OnboardingSlide1Widget(),
        ),
        FFRoute(
          name: 'TrailAccountPage1',
          path: '/trailAccountPage1',
          builder: (context, params) => TrailAccountPage1Widget(),
        ),
        FFRoute(
          name: 'Page4',
          path: '/page4',
          builder: (context, params) => Page4Widget(),
        ),
        FFRoute(
          name: 'Page5',
          path: '/page5',
          builder: (context, params) => Page5Widget(),
        ),
        FFRoute(
          name: 'ProfilePage1',
          path: '/profilePage1',
          builder: (context, params) => ProfilePage1Widget(),
        ),
        FFRoute(
          name: 'ProfilePage2',
          path: '/profilePage2',
          builder: (context, params) => ProfilePage2Widget(),
        ),
        FFRoute(
          name: 'ProfilePage3',
          path: '/profilePage3',
          builder: (context, params) => ProfilePage3Widget(),
        ),
        FFRoute(
          name: 'ProfilePage4',
          path: '/profilePage4',
          builder: (context, params) => ProfilePage4Widget(),
        ),
        FFRoute(
          name: 'ProfilePage5',
          path: '/profilePage5',
          builder: (context, params) => ProfilePage5Widget(),
        ),
        FFRoute(
          name: 'ProfilePage6',
          path: '/profilePage6',
          builder: (context, params) => ProfilePage6Widget(),
        ),
        FFRoute(
          name: 'ProfilePage7',
          path: '/profilePage7',
          builder: (context, params) => ProfilePage7Widget(),
        ),
        FFRoute(
          name: 'ProfilePage8',
          path: '/profilePage8',
          builder: (context, params) => ProfilePage8Widget(),
        ),
        FFRoute(
          name: 'ProfilePage9',
          path: '/profilePage9',
          builder: (context, params) => ProfilePage9Widget(),
        ),
        FFRoute(
          name: 'ProfilePage10',
          path: '/profilePage10',
          builder: (context, params) => ProfilePage10Widget(),
        ),
        FFRoute(
          name: 'ProfilePage11',
          path: '/profilePage11',
          builder: (context, params) => ProfilePage11Widget(),
        ),
        FFRoute(
          name: 'Settings1',
          path: '/settings1',
          builder: (context, params) => Settings1Widget(),
        ),
        FFRoute(
          name: 'Settings2',
          path: '/settings2',
          builder: (context, params) => Settings2Widget(),
        ),
        FFRoute(
          name: 'Settings3',
          path: '/settings3',
          builder: (context, params) => Settings3Widget(),
        ),
        FFRoute(
          name: 'Settings4',
          path: '/settings4',
          builder: (context, params) => Settings4Widget(),
        ),
        FFRoute(
          name: 'Settings4Copy',
          path: '/settings4Copy',
          builder: (context, params) => Settings4CopyWidget(),
        ),
        FFRoute(
          name: 'LetsMeet1',
          path: '/letsMeet1',
          builder: (context, params) => LetsMeet1Widget(),
        ),
        FFRoute(
          name: 'LetsMeet2',
          path: '/letsMeet2',
          builder: (context, params) => LetsMeet2Widget(),
        ),
        FFRoute(
          name: 'LetsMeet3',
          path: '/letsMeet3',
          builder: (context, params) => LetsMeet3Widget(),
        ),
        FFRoute(
          name: 'LetsMeet4',
          path: '/letsMeet4',
          builder: (context, params) => LetsMeet4Widget(),
        ),
        FFRoute(
          name: 'Welcome1',
          path: '/welcome1',
          builder: (context, params) => Welcome1Widget(),
        ),
        FFRoute(
          name: 'Welcome2',
          path: '/welcome2',
          builder: (context, params) => Welcome2Widget(),
        ),
        FFRoute(
          name: 'Welcome3',
          path: '/welcome3',
          builder: (context, params) => Welcome3Widget(),
        ),
        FFRoute(
          name: 'Accountsetup5',
          path: '/accountsetup5',
          builder: (context, params) => Accountsetup5Widget(),
        ),
        FFRoute(
          name: 'Accountsetup2',
          path: '/accountsetup2',
          builder: (context, params) => Accountsetup2Widget(),
        ),
        FFRoute(
          name: 'Accountsetup3',
          path: '/accountsetup3',
          builder: (context, params) => Accountsetup3Widget(),
        ),
        FFRoute(
          name: 'Accountsetup4',
          path: '/accountsetup4',
          builder: (context, params) => Accountsetup4Widget(),
        ),
        FFRoute(
          name: 'Frame87',
          path: '/frame87',
          builder: (context, params) => Frame87Widget(),
        ),
        FFRoute(
          name: 'Frame88',
          path: '/frame88',
          builder: (context, params) => Frame88Widget(),
        ),
        FFRoute(
          name: 'Frame116',
          path: '/frame116',
          builder: (context, params) => Frame116Widget(),
        ),
        FFRoute(
          name: 'Frame117',
          path: '/frame117',
          builder: (context, params) => Frame117Widget(),
        ),
        FFRoute(
          name: 'Frame69',
          path: '/frame69',
          builder: (context, params) => Frame69Widget(),
        ),
        FFRoute(
          name: 'Frame70',
          path: '/frame70',
          builder: (context, params) => Frame70Widget(),
        ),
        FFRoute(
          name: 'Frame72',
          path: '/frame72',
          builder: (context, params) => Frame72Widget(),
        ),
        FFRoute(
          name: 'Frame73',
          path: '/frame73',
          builder: (context, params) => Frame73Widget(),
        ),
        FFRoute(
          name: 'Frame74',
          path: '/frame74',
          builder: (context, params) => Frame74Widget(),
        ),
        FFRoute(
          name: 'Frame71',
          path: '/frame71',
          builder: (context, params) => Frame71Widget(),
        ),
        FFRoute(
          name: 'Frame75',
          path: '/frame75',
          builder: (context, params) => Frame75Widget(),
        ),
        FFRoute(
          name: 'Frame76',
          path: '/frame76',
          builder: (context, params) => Frame76Widget(),
        ),
        FFRoute(
          name: 'Frame77',
          path: '/frame77',
          builder: (context, params) => Frame77Widget(),
        ),
        FFRoute(
          name: 'Frame79',
          path: '/frame79',
          builder: (context, params) => Frame79Widget(),
        ),
        FFRoute(
          name: 'Frame80',
          path: '/frame80',
          builder: (context, params) => Frame80Widget(),
        ),
        FFRoute(
          name: 'Frame81',
          path: '/frame81',
          builder: (context, params) => Frame81Widget(),
        ),
        FFRoute(
          name: 'Frame82',
          path: '/frame82',
          builder: (context, params) => Frame82Widget(),
        ),
        FFRoute(
          name: 'Frame83',
          path: '/frame83',
          builder: (context, params) => Frame83Widget(),
        ),
        FFRoute(
          name: 'Frame84',
          path: '/frame84',
          builder: (context, params) => Frame84Widget(),
        ),
        FFRoute(
          name: 'onboarding_slide2',
          path: '/onboardingSlide2',
          builder: (context, params) => OnboardingSlide2Widget(),
        ),
        FFRoute(
          name: 'onboarding_slide4',
          path: '/onboardingSlide4',
          builder: (context, params) => OnboardingSlide4Widget(),
        ),
        FFRoute(
          name: 'TrailAccountPage2',
          path: '/trailAccountPage2',
          builder: (context, params) => TrailAccountPage2Widget(),
        ),
        FFRoute(
          name: 'TrailAccountPage3',
          path: '/trailAccountPage3',
          builder: (context, params) => TrailAccountPage3Widget(),
        ),
        FFRoute(
          name: 'AccountSetup-Create-old',
          path: '/accountSetupCreateOld',
          builder: (context, params) => AccountSetupCreateOldWidget(),
        ),
        FFRoute(
          name: 'AccountSetup1-Login',
          path: '/accountSetup1Login',
          builder: (context, params) => AccountSetup1LoginWidget(),
        ),
        FFRoute(
          name: 'onboarding_slide3',
          path: '/onboardingSlide3',
          builder: (context, params) => OnboardingSlide3Widget(),
        ),
        FFRoute(
          name: 'Accountsetup5-Video',
          path: '/accountsetup5Video',
          builder: (context, params) => Accountsetup5VideoWidget(),
        ),
        FFRoute(
          name: 'AccountSetup2-Create',
          path: '/accountSetup2Create',
          builder: (context, params) => AccountSetup2CreateWidget(),
        ),
        FFRoute(
          name: 'AccountSetup3-Details',
          path: '/accountSetup3Details',
          builder: (context, params) => AccountSetup3DetailsWidget(),
        ),
        FFRoute(
          name: 'AccountSetup4-Interests',
          path: '/accountSetup4Interests',
          builder: (context, params) => AccountSetup4InterestsWidget(),
        ),
        FFRoute(
          name: 'Accountsetup6-Availability',
          path: '/accountsetup6Availability',
          builder: (context, params) => Accountsetup6AvailabilityWidget(),
        ),
        FFRoute(
          name: 'Accountsetup7-Summary',
          path: '/accountsetup7Summary',
          builder: (context, params) => Accountsetup7SummaryWidget(),
        ),
        FFRoute(
          name: 'Matching2-AccountMatch',
          path: '/matching2AccountMatch',
          builder: (context, params) => Matching2AccountMatchWidget(),
        ),
        FFRoute(
          name: 'Demo-GoogleMaps',
          path: '/demoGoogleMaps',
          builder: (context, params) => DemoGoogleMapsWidget(),
        ),
        FFRoute(
          name: 'Demo-Video',
          path: '/demoVideo',
          builder: (context, params) => DemoVideoWidget(),
        ),
        FFRoute(
          name: 'Matching2-FlipCards',
          path: '/matching2FlipCards',
          asyncParams: {
            'passToFlipCards': getDocList(['users'], UsersRecord.fromSnapshot),
          },
          builder: (context, params) => Matching2FlipCardsWidget(
            passToFlipCards: params.getParam<UsersRecord>(
                'passToFlipCards', ParamType.Document, true),
          ),
        ),
        FFRoute(
          name: 'Matching1-PreferencesPage',
          path: '/matching1PreferencesPage',
          builder: (context, params) => Matching1PreferencesPageWidget(),
        ),
        FFRoute(
          name: 'Matching2-FlipCardsCopy',
          path: '/matching2FlipCardsCopy',
          asyncParams: {
            'passToFlipCards': getDocList(['users'], UsersRecord.fromSnapshot),
          },
          builder: (context, params) => Matching2FlipCardsCopyWidget(
            passToFlipCards: params.getParam<UsersRecord>(
                'passToFlipCards', ParamType.Document, true),
          ),
        ),
        FFRoute(
          name: 'Matching3-Availability',
          path: '/matching3Availability',
          builder: (context, params) => Matching3AvailabilityWidget(),
        )
      ].map((r) => r.toRoute(appStateNotifier)).toList(),
      observers: [routeObserver],
    );

extension NavParamExtensions on Map<String, String?> {
  Map<String, String> get withoutNulls => Map.fromEntries(
        entries
            .where((e) => e.value != null)
            .map((e) => MapEntry(e.key, e.value!)),
      );
}

extension NavigationExtensions on BuildContext {
  void goNamedAuth(
    String name,
    bool mounted, {
    Map<String, String> pathParameters = const <String, String>{},
    Map<String, String> queryParameters = const <String, String>{},
    Object? extra,
    bool ignoreRedirect = false,
  }) =>
      !mounted || GoRouter.of(this).shouldRedirect(ignoreRedirect)
          ? null
          : goNamed(
              name,
              pathParameters: pathParameters,
              queryParameters: queryParameters,
              extra: extra,
            );

  void pushNamedAuth(
    String name,
    bool mounted, {
    Map<String, String> pathParameters = const <String, String>{},
    Map<String, String> queryParameters = const <String, String>{},
    Object? extra,
    bool ignoreRedirect = false,
  }) =>
      !mounted || GoRouter.of(this).shouldRedirect(ignoreRedirect)
          ? null
          : pushNamed(
              name,
              pathParameters: pathParameters,
              queryParameters: queryParameters,
              extra: extra,
            );

  void safePop() {
    // If there is only one route on the stack, navigate to the initial
    // page instead of popping.
    if (canPop()) {
      pop();
    } else {
      go('/');
    }
  }
}

extension GoRouterExtensions on GoRouter {
  AppStateNotifier get appState => AppStateNotifier.instance;
  void prepareAuthEvent([bool ignoreRedirect = false]) =>
      appState.hasRedirect() && !ignoreRedirect
          ? null
          : appState.updateNotifyOnAuthChange(false);
  bool shouldRedirect(bool ignoreRedirect) =>
      !ignoreRedirect && appState.hasRedirect();
  void clearRedirectLocation() => appState.clearRedirectLocation();
  void setRedirectLocationIfUnset(String location) =>
      appState.updateNotifyOnAuthChange(false);
}

extension _GoRouterStateExtensions on GoRouterState {
  Map<String, dynamic> get extraMap =>
      extra != null ? extra as Map<String, dynamic> : {};
  Map<String, dynamic> get allParams => <String, dynamic>{}
    ..addAll(pathParameters)
    ..addAll(queryParameters)
    ..addAll(extraMap);
  TransitionInfo get transitionInfo => extraMap.containsKey(kTransitionInfoKey)
      ? extraMap[kTransitionInfoKey] as TransitionInfo
      : TransitionInfo.appDefault();
}

class FFParameters {
  FFParameters(this.state, [this.asyncParams = const {}]);

  final GoRouterState state;
  final Map<String, Future<dynamic> Function(String)> asyncParams;

  Map<String, dynamic> futureParamValues = {};

  // Parameters are empty if the params map is empty or if the only parameter
  // present is the special extra parameter reserved for the transition info.
  bool get isEmpty =>
      state.allParams.isEmpty ||
      (state.extraMap.length == 1 &&
          state.extraMap.containsKey(kTransitionInfoKey));
  bool isAsyncParam(MapEntry<String, dynamic> param) =>
      asyncParams.containsKey(param.key) && param.value is String;
  bool get hasFutures => state.allParams.entries.any(isAsyncParam);
  Future<bool> completeFutures() => Future.wait(
        state.allParams.entries.where(isAsyncParam).map(
          (param) async {
            final doc = await asyncParams[param.key]!(param.value)
                .onError((_, __) => null);
            if (doc != null) {
              futureParamValues[param.key] = doc;
              return true;
            }
            return false;
          },
        ),
      ).onError((_, __) => [false]).then((v) => v.every((e) => e));

  dynamic getParam<T>(
    String paramName,
    ParamType type, [
    bool isList = false,
    List<String>? collectionNamePath,
  ]) {
    if (futureParamValues.containsKey(paramName)) {
      return futureParamValues[paramName];
    }
    if (!state.allParams.containsKey(paramName)) {
      return null;
    }
    final param = state.allParams[paramName];
    // Got parameter from `extras`, so just directly return it.
    if (param is! String) {
      return param;
    }
    // Return serialized value.
    return deserializeParam<T>(param, type, isList,
        collectionNamePath: collectionNamePath);
  }
}

class FFRoute {
  const FFRoute({
    required this.name,
    required this.path,
    required this.builder,
    this.requireAuth = false,
    this.asyncParams = const {},
    this.routes = const [],
  });

  final String name;
  final String path;
  final bool requireAuth;
  final Map<String, Future<dynamic> Function(String)> asyncParams;
  final Widget Function(BuildContext, FFParameters) builder;
  final List<GoRoute> routes;

  GoRoute toRoute(AppStateNotifier appStateNotifier) => GoRoute(
        name: name,
        path: path,
        redirect: (context, state) {
          if (appStateNotifier.shouldRedirect) {
            final redirectLocation = appStateNotifier.getRedirectLocation();
            appStateNotifier.clearRedirectLocation();
            return redirectLocation;
          }

          if (requireAuth && !appStateNotifier.loggedIn) {
            appStateNotifier.setRedirectLocationIfUnset(state.location);
            return '/mMUHomePage';
          }
          return null;
        },
        pageBuilder: (context, state) {
          final ffParams = FFParameters(state, asyncParams);
          final page = ffParams.hasFutures
              ? FutureBuilder(
                  future: ffParams.completeFutures(),
                  builder: (context, _) => builder(context, ffParams),
                )
              : builder(context, ffParams);
          final child = appStateNotifier.loading
              ? Center(
                  child: SizedBox(
                    width: 50.0,
                    height: 50.0,
                    child: CircularProgressIndicator(
                      color: FlutterFlowTheme.of(context).primary,
                    ),
                  ),
                )
              : page;

          final transitionInfo = state.transitionInfo;
          return transitionInfo.hasTransition
              ? CustomTransitionPage(
                  key: state.pageKey,
                  child: child,
                  transitionDuration: transitionInfo.duration,
                  transitionsBuilder: PageTransition(
                    type: transitionInfo.transitionType,
                    duration: transitionInfo.duration,
                    reverseDuration: transitionInfo.duration,
                    alignment: transitionInfo.alignment,
                    child: child,
                  ).transitionsBuilder,
                )
              : MaterialPage(key: state.pageKey, child: child);
        },
        routes: routes,
      );
}

class TransitionInfo {
  const TransitionInfo({
    required this.hasTransition,
    this.transitionType = PageTransitionType.fade,
    this.duration = const Duration(milliseconds: 300),
    this.alignment,
  });

  final bool hasTransition;
  final PageTransitionType transitionType;
  final Duration duration;
  final Alignment? alignment;

  static TransitionInfo appDefault() => TransitionInfo(hasTransition: false);
}
