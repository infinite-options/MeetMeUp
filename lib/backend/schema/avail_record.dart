import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class AvailRecord extends FirestoreRecord {
  AvailRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "day" field.
  String? _day;
  String get day => _day ?? '';
  bool hasDay() => _day != null;

  // "end" field.
  String? _end;
  String get end => _end ?? '';
  bool hasEnd() => _end != null;

  // "start" field.
  String? _start;
  String get start => _start ?? '';
  bool hasStart() => _start != null;

  // "user_uid" field.
  String? _userUid;
  String get userUid => _userUid ?? '';
  bool hasUserUid() => _userUid != null;

  void _initializeFields() {
    _day = snapshotData['day'] as String?;
    _end = snapshotData['end'] as String?;
    _start = snapshotData['start'] as String?;
    _userUid = snapshotData['user_uid'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('avail');

  static Stream<AvailRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => AvailRecord.fromSnapshot(s));

  static Future<AvailRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => AvailRecord.fromSnapshot(s));

  static AvailRecord fromSnapshot(DocumentSnapshot snapshot) => AvailRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static AvailRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      AvailRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'AvailRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is AvailRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createAvailRecordData({
  String? day,
  String? end,
  String? start,
  String? userUid,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'day': day,
      'end': end,
      'start': start,
      'user_uid': userUid,
    }.withoutNulls,
  );

  return firestoreData;
}

class AvailRecordDocumentEquality implements Equality<AvailRecord> {
  const AvailRecordDocumentEquality();

  @override
  bool equals(AvailRecord? e1, AvailRecord? e2) {
    return e1?.day == e2?.day &&
        e1?.end == e2?.end &&
        e1?.start == e2?.start &&
        e1?.userUid == e2?.userUid;
  }

  @override
  int hash(AvailRecord? e) =>
      const ListEquality().hash([e?.day, e?.end, e?.start, e?.userUid]);

  @override
  bool isValidKey(Object? o) => o is AvailRecord;
}
