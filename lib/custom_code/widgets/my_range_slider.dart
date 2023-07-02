// Automatic FlutterFlow imports
import '/backend/backend.dart';
import '/backend/schema/structs/index.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom widgets
import '/custom_code/actions/index.dart'; // Imports custom actions
import '/flutter_flow/custom_functions.dart'; // Imports custom functions
import 'package:flutter/material.dart';
// Begin custom widget code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

class MyRangeSlider extends StatefulWidget {
  const MyRangeSlider({
    Key? key,
    this.width,
    this.height,
  }) : super(key: key);

  final double? width;
  final double? height;

  @override
  _MyRangeSliderState createState() => _MyRangeSliderState();
}

class _MyRangeSliderState extends State<MyRangeSlider> {
  RangeValues _currentRangeValues = const RangeValues(20, 40);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width,
      height: widget.height,
      child: RangeSlider(
        values: _currentRangeValues,
        min: 18,
        max: 100,
        divisions: 82,
        labels: RangeLabels(
          _currentRangeValues.start.round().toString(),
          _currentRangeValues.end.round().toString(),
        ),
        activeColor: Colors.red, // Set active color to red
        inactiveColor: Colors.red
            .withOpacity(0.3), // Set inactive color to red with opacity
        onChanged: (RangeValues values) {
          setState(() {
            _currentRangeValues = values;
            FFAppState().start = _currentRangeValues.start;
            FFAppState().end = _currentRangeValues.end;
          });
        },
      ),
    );
  }
}
