let titles = ['Todos', 'Trainingsplan', 'Einkaufsliste'];
let notes = ['einkaufen, Wäsche abhängen, Fußballtraining', 'Mo, Mi, Fr joggen', '2 Liter Milch <br> Gorgonzola'];
let deletedTitles = [];
let deletedNotes = [];
let popupWindow;
let currentNote;

function render() {
      if (getArray('deletedTitles') !== null && getArray('deletedNotes') !== null) {
            deletedTitles = getArray('deletedTitles');
            deletedNotes = getArray('deletedNotes');
      }

      if (getArray('titles') !== null && getArray('notes') !== null) {
            titles = getArray('titles');
            notes = getArray('notes');
      }

      let noteArea = document.getElementById('note-area');
      noteArea.innerHTML = '';

      for (let i = 0; i < titles.length; i++) {
            noteArea.innerHTML += generateNoteAreaHTML(i);
      }
}

function generateNoteAreaHTML(i) {
      return /*html*/ `
            <div class="note">
                 <b>${titles[i]}</b><br>
                <br>
                  <span class="noteContent">${notes[i]}</span>
                  <img class="pen" src="img/pen.png" onclick="editNote(${i})">
                  <img class="trash" src="img/trash.png" onclick="showConfirm(${i})">
            </div>

      `;
}

function addNote() {
      let title = document.getElementById('title-input');
      let note = document.getElementById('note-input');

      titles.unshift(title.value);
      notes.unshift(note.value);
      setArray('titles', titles);
      setArray('notes', notes);

      title.value = '';
      note.value = '';

      render();
}

function deleteNote(i) {
      deletedTitles.unshift(titles[i]);
      deletedNotes.unshift(notes[i]);
      setArray('deletedTitles', deletedTitles);
      setArray('deletedNotes', deletedNotes);

      titles.splice(i, 1);
      notes.splice(i, 1);

      setArray('titles', titles);
      setArray('notes', notes);

      render();
}

function editNote(i) {
      let popupBackground = document.getElementById('note-edit-popup-background');
      popupWindow = document.getElementById('note-edit-popup-window');
      let titleEdit = document.getElementById('title-edit');
      let noteEdit = document.getElementById('note-edit');
      currentNote = i;

      popupBackground.classList.remove('d-none');
      popupWindow.classList.remove('d-none');

      titleEdit.value = titles[i];

      noteEdit.value = notes[i];
}

function saveNote(i) {
      let titleEdit = document.getElementById('title-edit');
      let noteEdit = document.getElementById('note-edit');

      titles[i] = titleEdit.value;
      notes[i] = noteEdit.value;

      setArray('titles', titles);
      setArray('notes', notes);

      hidePopup();
      render();
}

function showConfirm(i) {
      let popupBackground = document.getElementById('note-edit-popup-background');
      let confirmPopupWindow = document.getElementById('confirm-popup-window');

      popupBackground.classList.remove('d-none');
      confirmPopupWindow.classList.remove('d-none');

      currentNote = i;
}

function hidePopup() {
      let popupBackground = document.getElementById('note-edit-popup-background');
      let popupWindow = document.getElementById('note-edit-popup-window');
      let confirmPopupWindow = document.getElementById('confirm-popup-window');

      popupBackground.classList.add('d-none');
      popupWindow.classList.add('d-none');
      confirmPopupWindow.classList.add('d-none');
}

function renderDustbin() {
      if (getArray('deletedTitles') !== null && getArray('deletedNotes') !== null) {
            deletedTitles = getArray('deletedTitles');
            deletedNotes = getArray('deletedNotes');
      }

      if (getArray('titles') !== null && getArray('notes') !== null) {
            titles = getArray('titles');
            notes = getArray('notes');
      }

      let deletedNoteArea = document.getElementById('deleted-note-area');
      deletedNoteArea.innerHTML = '';

      for (let i = 0; i < deletedTitles.length; i++) {
            if (deletedNotes[i].includes('\n')) {
                  let text = deletedNotes[i];
                  let newText = text.replace(/\n/g, '<br>');
                  deletedNotes[i] = newText;
            }
            deletedNoteArea.innerHTML += /*html*/ `
            <div class="note">
                 <b>${deletedTitles[i]}</b><br>
                <br>
                  <span class="noteContent">${deletedNotes[i]}</span>
                  <img class="back-arrow" src="img/back-arrow.png" onclick="restoreNote(${i})">
                  
                  
            </div>

      `;
      }
}

function restoreNote(i) {
      titles.unshift(deletedTitles[i]);
      notes.unshift(deletedNotes[i]);

      setArray('titles', titles);
      setArray('notes', notes);

      deletedTitles.splice(i, 1);
      deletedNotes.splice(i, 1);

      setArray('deletedTitles', deletedTitles);
      setArray('deletedNotes', deletedNotes);

      renderDustbin();
}

function clearDustbin() {
      deletedTitles.length = 0;
      deletedNotes.length = 0;

      setArray('deletedTitles', deletedTitles);
      setArray('deletedNotes', deletedNotes);

      renderDustbin();
}

function setArray(key, array) {
      localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
      return JSON.parse(localStorage.getItem(key));
}
