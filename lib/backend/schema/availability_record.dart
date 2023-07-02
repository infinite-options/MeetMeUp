import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class AvailabilityRecord extends FirestoreRecord {
  AvailabilityRecord._(
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

  // "endAMPM" field.
  String? _endAMPM;
  String get endAMPM => _endAMPM ?? '';
  bool hasEndAMPM() => _endAMPM != null;

  // "startAMPM" field.
  String? _startAMPM;
  String get startAMPM => _startAMPM ?? '';
  bool hasStartAMPM() => _startAMPM != null;

  // "order" field.
  int? _order;
  int get order => _order ?? 0;
  bool hasOrder() => _order != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _day = snapshotData['day'] as String?;
    _end = snapshotData['end'] as String?;
    _start = snapshotData['start'] as String?;
    _endAMPM = snapshotData['endAMPM'] as String?;
    _startAMPM = snapshotData['startAMPM'] as String?;
    _order = castToType<int>(snapshotData['order']);
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('availability')
          : FirebaseFirestore.instance.collectionGroup('availability');

  static DocumentReference createDoc(DocumentReference parent) =>
      parent.collection('availability').doc();

  static Stream<AvailabilityRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => AvailabilityRecord.fromSnapshot(s));

  static Future<AvailabilityRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => AvailabilityRecord.fromSnapshot(s));

  static AvailabilityRecord fromSnapshot(DocumentSnapshot snapshot) =>
      AvailabilityRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static AvailabilityRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      AvailabilityRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'AvailabilityRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is AvailabilityRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createAvailabilityRecordData({
  String? day,
  String? end,
  String? start,
  String? endAMPM,
  String? startAMPM,
  int? order,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'day': day,
      'end': end,
      'start': start,
      'endAMPM': endAMPM,
      'startAMPM': startAMPM,
      'order': order,
    }.withoutNulls,
  );

  return firestoreData;
}

class AvailabilityRecordDocumentEquality
    implements Equality<AvailabilityRecord> {
  const AvailabilityRecordDocumentEquality();

  @override
  bool equals(AvailabilityRecord? e1, AvailabilityRecord? e2) {
    return e1?.day == e2?.day &&
        e1?.end == e2?.end &&
        e1?.start == e2?.start &&
        e1?.endAMPM == e2?.endAMPM &&
        e1?.startAMPM == e2?.startAMPM &&
        e1?.order == e2?.order;
  }

  @override
  int hash(AvailabilityRecord? e) => const ListEquality()
      .hash([e?.day, e?.end, e?.start, e?.endAMPM, e?.startAMPM, e?.order]);

  @override
  bool isValidKey(Object? o) => o is AvailabilityRecord;
}
