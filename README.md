Edge Alerts v1.2
================

A replacement for browser default alert/confirmation dialog popups to keep design consistent across browsers and devices.

**Demo:** http://www.cloud-eight.com/github/edge-alerts/


Usage
=====

Link both the 'edge-alerts.css' and 'edge-alerts.js' files into your document.

Currently Edge Alerts only supports `alert()` and `confirm()` styled dialog boxes, for alerts only `title` and `message` are required.
However with confirmation dialogs you will need to specify `type` as well as `callbackConfirm`.
Examples below are using an element click to trigger Edge Alerts.

**Alert**

```
$('#alert').click(function() {
  $('body').edgeAlerts({
    title: 'Alert!',
    message: 'This is an alert...'
  });
});
```

**Confirm**

```
$('#confirm').click(function() {
  $('body').edgeAlerts({
    type: 'confirm',
    title: 'Confirm!',
    message: 'Do you want to go to Google?',
    callbackConfirm: function() { window.location = 'http://www.google.com'; }
  });
});
```


Options
=======

| Options             | Default                  | Description |
|:--------------------|:-------------------------|:------------|
| type                | 'alert'                  | Sets the type of dialog popup to be displayed, `alert` or `confirm` are accepted. |
| title               | null                     | Sets the title for this dialog popup. |
| message             | null                     | Sets the text/message for this dialog popup. |
| cancelText          | 'Cancel'                 | Sets the text for the 'cancel' button (confirmations only). |
| continueText        | 'Continue'               | Sets the text for the 'continue' button. |
| reverseButtons      | false                    | Swaps the positions of the confirm 'cancel' and 'continue' buttons. |
| revealSpeed         | 400                      | The speed at which the dialog popup is displayed and removed from the viewport. |
| background          | 'rgba(0, 0, 0, .8)'      | Sets the background color of the dimmer that overlays the viewport. |
| overlayClose        | true                     | When set to true, clicking the dimmer that overlays the viewport will close the dialog popup. |
| closeButton         | true                     | When set to true, a close button will appear in the top right corner of the viewport which will close the dialog popup. |
| enterKey            | true                     | Allows the use of pressing the enter/return key to click the 'continue' buttons for both alerts and confirmations. |
| escKey              | true                     | Allows the use of pressing the esc key to close both alerts and confirmations. |
| callbackInit        | function() {}            | Calls a JavaScript function when the dialog is initiated. |
| callbackBeforeOpen  | function() {}            | Calls a JavaScript function before the dialog is opened. |
| callbackAfterOpen   | function() {}            | Calls a JavaScript function after the dialog is opened. |
| callbackConfirm     | function() {}            | Required callback for confirmation dialogs. |
| callbackBeforeClose | function() {}            | Calls a JavaScript function before the dialog is closed. |
| callbackAfterClose  | function() {}            | Calls a JavaScript function after the dialog is closed. |
| callbackError       | function() {}            | Calls a JavaScript function when the dialog encounters an error. |
| errorMessage        | 'Error loading content.' | Sets the error message that is displayed upon the plugin encountering an error. |


Browser Compatibility
=====================

<ul>
	<li>IE 8+</li>
	<li>Firefox</li>
	<li>Chrome</li>
	<li>Safari</li>
	<li>Opera</li>
	<li>Most mobile browsers</li>
</ul>


Author
======

Joe Mottershaw, Cloud Eight<br />
http://www.cloud-eight.com