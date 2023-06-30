import 'dart:async';

import 'package:collection/collection.dart';

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

  // "location" field.
  LatLng? _location;
  LatLng? get location => _location;
  bool hasLocation() => _location != null;

  // "photo_album" field.
  List<String>? _photoAlbum;
  List<String> get photoAlbum => _photoAlbum ?? const [];
  bool hasPhotoAlbum() => _photoAlbum != null;

  // "height" field.
  String? _height;
  String get height => _height ?? '';
  bool hasHeight() => _height != null;

  // "kids" field.
  String? _kids;
  String get kids => _kids ?? '';
  bool hasKids() => _kids != null;

  // "nationality" field.
  String? _nationality;
  String get nationality => _nationality ?? '';
  bool hasNationality() => _nationality != null;

  // "job" field.
  String? _job;
  String get job => _job ?? '';
  bool hasJob() => _job != null;

  // "religion" field.
  String? _religion;
  String get religion => _religion ?? '';
  bool hasReligion() => _religion != null;

  // "photo1_url" field.
  String? _photo1Url;
  String get photo1Url => _photo1Url ?? '';
  bool hasPhoto1Url() => _photo1Url != null;

  // "photo2_url" field.
  String? _photo2Url;
  String get photo2Url => _photo2Url ?? '';
  bool hasPhoto2Url() => _photo2Url != null;

  // "photo3_url" field.
  String? _photo3Url;
  String get photo3Url => _photo3Url ?? '';
  bool hasPhoto3Url() => _photo3Url != null;

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
    _body = snapshotData['body'] as String?;
    _drinking = snapshotData['drinking'] as String?;
    _smoking = snapshotData['smoking'] as String?;
    _location = snapshotData['location'] as LatLng?;
    _photoAlbum = getDataList(snapshotData['photo_album']);
    _height = snapshotData['height'] as String?;
    _kids = snapshotData['kids'] as String?;
    _nationality = snapshotData['nationality'] as String?;
    _job = snapshotData['job'] as String?;
    _religion = snapshotData['religion'] as String?;
    _photo1Url = snapshotData['photo1_url'] as String?;
    _photo2Url = snapshotData['photo2_url'] as String?;
    _photo3Url = snapshotData['photo3_url'] as String?;
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
  String? body,
  String? drinking,
  String? smoking,
  LatLng? location,
  String? height,
  String? kids,
  String? nationality,
  String? job,
  String? religion,
  String? photo1Url,
  String? photo2Url,
  String? photo3Url,
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
      'body': body,
      'drinking': drinking,
      'smoking': smoking,
      'location': location,
      'height': height,
      'kids': kids,
      'nationality': nationality,
      'job': job,
      'religion': religion,
      'photo1_url': photo1Url,
      'photo2_url': photo2Url,
      'photo3_url': photo3Url,
    }.withoutNulls,
  );

  return firestoreData;
}

class UsersRecordDocumentEquality implements Equality<UsersRecord> {
  const UsersRecordDocumentEquality();

  @override
  bool equals(UsersRecord? e1, UsersRecord? e2) {
    const listEquality = ListEquality();
    return e1?.email == e2?.email &&
        e1?.displayName == e2?.displayName &&
        e1?.photoUrl == e2?.photoUrl &&
        e1?.uid == e2?.uid &&
        e1?.createdTime == e2?.createdTime &&
        e1?.phoneNumber == e2?.phoneNumber &&
        e1?.videoUrl == e2?.videoUrl &&
        e1?.age == e2?.age &&
        e1?.fullName == e2?.fullName &&
        listEquality.equals(e1?.userInterests, e2?.userInterests) &&
        e1?.gender == e2?.gender &&
        e1?.address == e2?.address &&
        e1?.suburb == e2?.suburb &&
        e1?.state == e2?.state &&
        e1?.country == e2?.country &&
        e1?.zip == e2?.zip &&
        e1?.profileBio == e2?.profileBio &&
        e1?.sign == e2?.sign &&
        e1?.sexuality == e2?.sexuality &&
        e1?.openTo == e2?.openTo &&
        e1?.education == e2?.education &&
        e1?.body == e2?.body &&
        e1?.drinking == e2?.drinking &&
        e1?.smoking == e2?.smoking &&
        e1?.location == e2?.location &&
        listEquality.equals(e1?.photoAlbum, e2?.photoAlbum) &&
        e1?.height == e2?.height &&
        e1?.kids == e2?.kids &&
        e1?.nationality == e2?.nationality &&
        e1?.job == e2?.job &&
        e1?.religion == e2?.religion &&
        e1?.photo1Url == e2?.photo1Url &&
        e1?.photo2Url == e2?.photo2Url &&
        e1?.photo3Url == e2?.photo3Url;
  }

  @override
  int hash(UsersRecord? e) => const ListEquality().hash([
        e?.email,
        e?.displayName,
        e?.photoUrl,
        e?.uid,
        e?.createdTime,
        e?.phoneNumber,
        e?.videoUrl,
        e?.age,
        e?.fullName,
        e?.userInterests,
        e?.gender,
        e?.address,
        e?.suburb,
        e?.state,
        e?.country,
        e?.zip,
        e?.profileBio,
        e?.sign,
        e?.sexuality,
        e?.openTo,
        e?.education,
        e?.body,
        e?.drinking,
        e?.smoking,
        e?.location,
        e?.photoAlbum,
        e?.height,
        e?.kids,
        e?.nationality,
        e?.job,
        e?.religion,
        e?.photo1Url,
        e?.photo2Url,
        e?.photo3Url
      ]);

  @override
  bool isValidKey(Object? o) => o is UsersRecord;
}
