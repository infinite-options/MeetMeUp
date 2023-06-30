import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ListsRecord extends FirestoreRecord {
  ListsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "interests" field.
  List<String>? _interests;
  List<String> get interests => _interests ?? const [];
  bool hasInterests() => _interests != null;

  // "sign" field.
  List<String>? _sign;
  List<String> get sign => _sign ?? const [];
  bool hasSign() => _sign != null;

  // "body" field.
  List<String>? _body;
  List<String> get body => _body ?? const [];
  bool hasBody() => _body != null;

  // "drinking" field.
  List<String>? _drinking;
  List<String> get drinking => _drinking ?? const [];
  bool hasDrinking() => _drinking != null;

  // "education" field.
  List<String>? _education;
  List<String> get education => _education ?? const [];
  bool hasEducation() => _education != null;

  // "sexuality" field.
  List<String>? _sexuality;
  List<String> get sexuality => _sexuality ?? const [];
  bool hasSexuality() => _sexuality != null;

  // "smoking" field.
  List<String>? _smoking;
  List<String> get smoking => _smoking ?? const [];
  bool hasSmoking() => _smoking != null;

  // "height" field.
  List<String>? _height;
  List<String> get height => _height ?? const [];
  bool hasHeight() => _height != null;

  // "number" field.
  List<String>? _number;
  List<String> get number => _number ?? const [];
  bool hasNumber() => _number != null;

  // "gender" field.
  List<String>? _gender;
  List<String> get gender => _gender ?? const [];
  bool hasGender() => _gender != null;

  void _initializeFields() {
    _interests = getDataList(snapshotData['interests']);
    _sign = getDataList(snapshotData['sign']);
    _body = getDataList(snapshotData['body']);
    _drinking = getDataList(snapshotData['drinking']);
    _education = getDataList(snapshotData['education']);
    _sexuality = getDataList(snapshotData['sexuality']);
    _smoking = getDataList(snapshotData['smoking']);
    _height = getDataList(snapshotData['height']);
    _number = getDataList(snapshotData['number']);
    _gender = getDataList(snapshotData['gender']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('lists');

  static Stream<ListsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ListsRecord.fromSnapshot(s));

  static Future<ListsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ListsRecord.fromSnapshot(s));

  static ListsRecord fromSnapshot(DocumentSnapshot snapshot) => ListsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ListsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ListsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ListsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ListsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createListsRecordData() {
  final firestoreData = mapToFirestore(
    <String, dynamic>{}.withoutNulls,
  );

  return firestoreData;
}

class ListsRecordDocumentEquality implements Equality<ListsRecord> {
  const ListsRecordDocumentEquality();

  @override
  bool equals(ListsRecord? e1, ListsRecord? e2) {
    const listEquality = ListEquality();
    return listEquality.equals(e1?.interests, e2?.interests) &&
        listEquality.equals(e1?.sign, e2?.sign) &&
        listEquality.equals(e1?.body, e2?.body) &&
        listEquality.equals(e1?.drinking, e2?.drinking) &&
        listEquality.equals(e1?.education, e2?.education) &&
        listEquality.equals(e1?.sexuality, e2?.sexuality) &&
        listEquality.equals(e1?.smoking, e2?.smoking) &&
        listEquality.equals(e1?.height, e2?.height) &&
        listEquality.equals(e1?.number, e2?.number) &&
        listEquality.equals(e1?.gender, e2?.gender);
  }

  @override
  int hash(ListsRecord? e) => const ListEquality().hash([
        e?.interests,
        e?.sign,
        e?.body,
        e?.drinking,
        e?.education,
        e?.sexuality,
        e?.smoking,
        e?.height,
        e?.number,
        e?.gender
      ]);

  @override
  bool isValidKey(Object? o) => o is ListsRecord;
}
