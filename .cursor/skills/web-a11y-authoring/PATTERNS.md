# Authoring Patterns

## Link vs Button

Good:

```html
<a href="/billing">Billing settings</a>
<button type="button">Save changes</button>
```

Bad:

```html
<div onclick="goTo('/billing')">Billing settings</div>
<a href="#" onclick="save()">Save changes</a>
```

## Dialog Basics

Good:

```html
<button type="button" aria-haspopup="dialog" aria-controls="prefs-dialog">
  Open preferences
</button>
<div role="dialog" aria-modal="true" aria-labelledby="prefs-title" id="prefs-dialog">
  <h2 id="prefs-title">Preferences</h2>
  <button type="button">Close</button>
</div>
```

Bad:

```html
<div class="modal">
  <h2>Preferences</h2>
  <div onclick="closeModal()">x</div>
</div>
```

## Non-Text Content

- Functional icon or SVG: provide a clear accessible name.
- Decorative image or SVG: hide from the accessibility tree.
- Media: provide controls and captions/transcripts when content requires them.
