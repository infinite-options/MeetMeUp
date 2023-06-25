import 'dart:async';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class UsersRecord extends FirestoreRecord {
  UsersRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "email" field.
  String? _email;
  String get email => _email ?? '';
  bool hasEmail() => _email != null;

  // "display_name" field.
  String? _displayName;
  String get displayName => _displayName ?? '';
  bool hasDisplayName() => _displayName != null;

  // "photo_url" field.
  String? _photoUrl;
  String get photoUrl => _photoUrl ?? '';
  bool hasPhotoUrl() => _photoUrl != null;

  // "uid" field.
  String? _uid;
  String get uid => _uid ?? '';
  bool hasUid() => _uid != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  // "phone_number" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  bool hasPhoneNumber() => _phoneNumber != null;

  // "video_url" field.
  String? _videoUrl;
  String get videoUrl => _videoUrl ?? '';
  bool hasVideoUrl() => _videoUrl != null;

  // "age" field.
  int? _age;
  int get age => _age ?? 0;
  bool hasAge() => _age != null;

  // "full_name" field.
  String? _fullName;
  String get fullName => _fullName ?? '';
  bool hasFullName() => _fullName != null;

  // "user_interests" field.
  List<String>? _userInterests;
  List<String> get userInterests => _userInterests ?? const [];
  bool hasUserInterests() => _userInterests != null;

  // "gender" field.
  String? _gender;
  String get gender => _gender ?? '';
  bool hasGender() => _gender != null;

  // "address" field.
  String? _address;
  String get address => _address ?? '';
  bool hasAddress() => _address != null;

  // "suburb" field.
  String? _suburb;
  String get suburb => _suburb ?? '';
  bool hasSuburb() => _suburb != null;

  // "state" field.
  String? _state;
  String get state => _state ?? '';
  bool hasState() => _state != null;

  // "country" field.
  String? _country;
  String get country => _country ?? '';
  bool hasCountry() => _country != null;

  // "zip" field.
  String? _zip;
  String get zip => _zip ?? '';
  bool hasZip() => _zip != null;

  // "profile_bio" field.
  String? _profileBio;
  String get profileBio => _profileBio ?? '';
  bool hasProfileBio() => _profileBio != null;

  // "sign" field.
  String? _sign;
  String get sign => _sign ?? '';
  bool hasSign() => _sign != null;

  // "sexuality" field.
  String? _sexuality;
  String get sexuality => _sexuality ?? '';
  bool hasSexuality() => _sexuality != null;

  // "openTo" field.
  String? _openTo;
  String get openTo => _openTo ?? '';
  bool hasOpenTo() => _openTo != null;

  // "education" field.
  String? _education;
  String get education => _education ?? '';
  bool hasEducation() => _education != null;

  // "height" field.
  int? _height;
  int get height => _height ?? 0;
  bool hasHeight() => _height != null;

  // "body" field.
  String? _body;
  String get body => _body ?? '';
  bool hasBody() => _body != null;

  // "drinking" field.
  String? _drinking;
  String get drinking => _drinking ?? '';
  bool hasDrinking() => _drinking != null;

  // "smoking" field.
  String? _smoking;
  String get smoking => _smoking ?? '';
  bool hasSmoking() => _smoking != null;

  void _initializeFields() {
    _email = snapshotData['email'] as String?;
    _displayName = snapshotData['display_name'] as String?;
    _photoUrl = snapshotData['photo_url'] as String?;
    _uid = snapshotData['uid'] as String?;
    _createdTime = snapshotData['created_time'] as DateTime?;
    _phoneNumber = snapshotData['phone_number'] as String?;
    _videoUrl = snapshotData['video_url'] as String?;
    _age = castToType<int>(snapshotData['age']);
    _fullName = snapshotData['full_name'] as String?;
    _userInterests = getDataList(snapshotData['user_interests']);
    _gender = snapshotData['gender'] as String?;
    _address = snapshotData['address'] as String?;
    _suburb = snapshotData['suburb'] as String?;
    _state = snapshotData['state'] as String?;
    _country = snapshotData['country'] as String?;
    _zip = snapshotData['zip'] as String?;
    _profileBio = snapshotData['profile_bio'] as String?;
    _sign = snapshotData['sign'] as String?;
    _sexuality = snapshotData['sexuality'] as String?;
    _openTo = snapshotData['openTo'] as String?;
    _education = snapshotData['education'] as String?;
    _height = castToType<int>(snapshotData['height']);
    _body = snapshotData['body'] as String?;
    _drinking = snapshotData['drinking'] as String?;
    _smoking = snapshotData['smoking'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('users');

  static Stream<UsersRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => UsersRecord.fromSnapshot(s));

  static Future<UsersRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => UsersRecord.fromSnapshot(s));

  static UsersRecord fromSnapshot(DocumentSnapshot snapshot) => UsersRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static UsersRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      UsersRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'UsersRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is UsersRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createUsersRecordData({
  String? email,
  String? displayName,
  String? photoUrl,
  String? uid,
  DateTime? createdTime,
  String? phoneNumber,
  String? videoUrl,
  int? age,
  String? fullName,
  String? gender,
  String? address,
  String? suburb,
  String? state,
  String? country,
  String? zip,
  String? profileBio,
  String? sign,
  String? sexuality,
  String? openTo,
  String? education,
  int? height,
  String? body,
  String? drinking,
  String? smoking,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'email': email,
      'display_name': displayName,
      'photo_url': photoUrl,
      'uid': uid,
      'created_time': createdTime,
      'phone_number': phoneNumber,
      'video_url': videoUrl,
      'age': age,
      'full_name': fullName,
      'gender': gender,
      'address': address,
      'suburb': suburb,
      'state': state,
      'country': country,
      'zip': zip,
      'profile_bio': profileBio,
      'sign': sign,
      'sexuality': sexuality,
      'openTo': openTo,
      'education': education,
      'height': height,
      'body': body,
      'drinking': drinking,
      'smoking': smoking,
    }.withoutNulls,
  );

  return firestoreData;
}
