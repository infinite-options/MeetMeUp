import 'dart:convert';
import 'dart:typed_data';

import '../../flutter_flow/flutter_flow_util.dart';

import 'api_manager.dart';

export 'api_manager.dart' show ApiCallResponse;

const _kPrivateApiFunctionName = 'ffPrivateApiCall';

class BondMoviesAPICallCall {
  static Future<ApiCallResponse> call() {
    return ApiManager.instance.makeApiCall(
      callName: 'Bond Movies API Call',
      apiUrl:
          'https://iznfqs92n3.execute-api.us-west-1.amazonaws.com/dev/api/v2/movies',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }

  static dynamic bondMovieTitle(dynamic response) => getJsonField(
        response,
        r'''$..movie_title''',
        true,
      );
  static dynamic bondGIrl(dynamic response) => getJsonField(
        response,
        r'''$..bond_girl''',
        true,
      );
}

class IOAvailableAppointmentsCall {
  static Future<ApiCallResponse> call() {
    return ApiManager.instance.makeApiCall(
      callName: 'IO Available Appointments',
      apiUrl:
          'https://3o9ul2w8a1.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/2023-06-24',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }
}

class BondMovieTitlesAPICallCall {
  static Future<ApiCallResponse> call() {
    return ApiManager.instance.makeApiCall(
      callName: 'Bond Movie Titles API Call',
      apiUrl:
          'https://iznfqs92n3.execute-api.us-west-1.amazonaws.com/dev/api/v2/movietitles',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }

  static dynamic bondMovieTitles(dynamic response) => getJsonField(
        response,
        r'''$[:].movie_title''',
        true,
      );
  static dynamic bondMovieOrder(dynamic response) => getJsonField(
        response,
        r'''$[:].movie_order''',
        true,
      );
}

class BondMovieAPICallExampleCall {
  static Future<ApiCallResponse> call() {
    return ApiManager.instance.makeApiCall(
      callName: 'Bond Movie API Call Example',
      apiUrl:
          'https://iznfqs92n3.execute-api.us-west-1.amazonaws.com/dev/api/v2/movies',
      callType: ApiCallType.GET,
      headers: {},
      params: {},
      returnBody: true,
      encodeBodyUtf8: false,
      decodeUtf8: false,
      cache: false,
    );
  }

  static dynamic bondExampleMovieTitle(dynamic response) => getJsonField(
        response,
        r'''$[:].movie_title''',
        true,
      );
  static dynamic bondExampleMovieOrder(dynamic response) => getJsonField(
        response,
        r'''$[:].movie_order''',
        true,
      );
  static dynamic bondExampleMovieYear(dynamic response) => getJsonField(
        response,
        r'''$[:].movie_year''',
        true,
      );
}

class ApiPagingParams {
  int nextPageNumber = 0;
  int numItems = 0;
  dynamic lastResponse;

  ApiPagingParams({
    required this.nextPageNumber,
    required this.numItems,
    required this.lastResponse,
  });

  @override
  String toString() =>
      'PagingParams(nextPageNumber: $nextPageNumber, numItems: $numItems, lastResponse: $lastResponse,)';
}

String _serializeList(List? list) {
  list ??= <String>[];
  try {
    return json.encode(list);
  } catch (_) {
    return '[]';
  }
}

String _serializeJson(dynamic jsonVar, [bool isList = false]) {
  jsonVar ??= (isList ? [] : {});
  try {
    return json.encode(jsonVar);
  } catch (_) {
    return isList ? '[]' : '{}';
  }
}
