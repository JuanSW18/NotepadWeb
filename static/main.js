$(function() {
    initNavBar();
    $('#btnCloseModalNote').on('click', function(){
        cleanModalAddNote();
    });
    $( "#btnModalNote").on('click', function(){
        saveNoteForm();
    });
});

/**
 * HELPER FUNCTIONS
 * */

function removeSectionActive() {
    const navigator = $('#section-nav').find("p");
    navigator.removeClass("active");
    sessionStorage.removeItem('current_section_id');
}

function toggleNoteForm() {
    let btnNoteForm = $('#btn-show-note-form');
    let noteForm = $('#note-form');
    let exist = noteForm[0].getAttributeNames().findIndex( item => item === 'hidden' );
    if (exist === -1) {
        btnNoteForm.html('+ Agregar nota');
        noteForm.attr('hidden', true);
    }else {
        btnNoteForm.html('- Eliminar nota');
        noteForm.removeAttr('hidden');
    }
}

function cleanModalSection() {
    $('#section_name').val('');
    $('#title').val('');
    $('#content').val('');
    $('#tag').val('');
    $('#new-tags-box').html('');
}

function cleanModalAddNote() {
    const btnModalNote = $( "#btnModalNote");
    $('#modalAddNoteLabel').html('<b>Nuevo apunte</b>');
    $('#note_title').val('');
    $('#note_content').val('');
    $('#note-tags-edited').html('');
    sessionStorage.removeItem('current_note_id');
    btnModalNote.off( "click" );
    btnModalNote.on('click', function(){
        saveNoteForm();
    });
}

function setValuesModalAddNote(note_title, note_content) {
    const btnModalNote = $( "#btnModalNote");
    $('#modalAddNoteLabel').html('<b>Editar apunte</b>');
    $('#note_title').val(note_title);
    $('#note_content').val(note_content);
    $('#note_tag').val('');
    btnModalNote.off( "click" );
    btnModalNote.on('click', function(){
        saveEditedNote();
    });
}

function showNoteFullDetail(note) {
    const title = $('#title_' + note.id)[0].innerHTML;
    const content = $('#content_' + note.id)[0].innerHTML.replaceAll('<br>', '\n');
    const note_tags_name = 'tag_notes_' + note.id + '[]';
    const note_tags = $('[name=\"'+ note_tags_name +'\"]');
    const common_name = 'note-tags-edited' + note.id + + '[]';
    for (let i = 0; i < note_tags.length; i++){
        drawTagElement('note-tags-edited', common_name, null, note_tags[i].value);
    }
    sessionStorage.setItem('current_note_id', note.id);
    setValuesModalAddNote(title, content);

    $( () => {
        $('#modalAddNote').modal('show');
    });
}

function addSectionInNav(response) {
    const navigator = $('#section-nav');
    const identifier = response['_id']['$oid'];
    const name = response['section_name'];
    let section = '<p class="section" id="' + identifier + '" onclick="getSectionNotes(this)">' + name + '</p>';
    navigator.append(section);
}

function drawNotes(response) {
    const size = response['notes'].length;
    const data = response['notes'];
    let notesDiv = $('#notes-div');
    let empty_notes_msg = $('#empty-notes-msg');
    notesDiv.empty();
    size > 0 ? empty_notes_msg.attr('hidden', true) : empty_notes_msg.removeAttr('hidden');
    for (let i = 0; i < size; i++){
        let content = String(data[i]['content']).replaceAll('\n', '<br>');
        let note_id = data[i]['identifier'];
        let title_id = "title_" + note_id;
        let content_id = "content_" + note_id;
        let tag_box_id = "tag_box_" + note_id;
        let tag_common_name = "tag_notes_" + note_id + '[]';
        let noteElement =
            '<div class="note-item">' +
            '<div class="note-header">' +
            '<span id="' + title_id + '">'+ data[i]['title'] +'</span>' +
            '<span class="show-detail" id="' + note_id + '" onclick="showNoteFullDetail(this)">' +
            '<i class="bi bi-eye"></i></span>' +
            '</div>' +
            '<div class="note-body" id="' + content_id + '">' + content + '</div>' +
            '<div class="note-tag-box" id="' + tag_box_id +'"></div>' +
            '</div>';
        notesDiv.append(noteElement);
        data[i]['related_tags'].forEach(
            tag => drawTagElement(tag_box_id, tag_common_name, null, tag, false)
        );
    }
}

function addTagModalSection(event) {
    if (event.key === 'Enter'){
        const tag_text = $('#tag');
        drawTagElement('new-tags-box', 'new-tag-list[]', tag_text, tag_text.val());
    }
}

function addTagModalNote(event) {
    if (event.key === 'Enter'){
        const note_id = sessionStorage.getItem('current_note_id');
        const tag_text = $('#note_tag');
        if (note_id !== null){ // EDIT
            const common_name = 'note-tags-edited' + note_id + + '[]';
            drawTagElement('note-tags-edited', common_name, tag_text, tag_text.val());
        } else { // NEW NOTE
            const section_id = sessionStorage.getItem('current_section_id');
            const common_name = 'note-tags-edited' + section_id + + '[]';
            drawTagElement('note-tags-edited', common_name, tag_text, tag_text.val());
        }
    }
}

function drawTagElement(tag_container, common_name, tag_input, tag_text, show_delete_btn=true) {
    const identifier = getRandomId();
    const parent_id = "tag_parent_" + identifier;
    const tag_id = "tag_list_" + identifier;
    const btn_delete_id = "btn_tag_" + identifier;
    const input_width = tag_text.length * 9;
    const html_tag =
        '<span class="tag-item" id="' + parent_id + '">' +
        '<input class="tag-text" disabled name="' + common_name + '" id="' + tag_id + '" value="' + tag_text +'">' +
        '</span>';
    $('#' + tag_container).append(html_tag);
    $('#' + tag_id).width(input_width);
    if (show_delete_btn === true){
        $('#' + parent_id).append('<span class="pointer" id="' + btn_delete_id + '"><i class="bi bi-x"></i></span>');
        $('#' + btn_delete_id).on('click', function () {
            $('#' + tag_container + '>#' + parent_id).remove();
        });
    }
    if (tag_input !== null) { tag_input.val(''); }
}

function getRandomId() {
    // / => means init
    // /g => means end
    const regex = "xxxx-xyxy-xyyy";
    return regex.replace(/[xy]/g, (character) => {
        const magic = Math.random() * 16 | 0;
        const new_value = character === 'x' ? magic : (magic & 0x3 | 0x8);
        return new_value.toString(16);
    });
}


/**
 * MAIN FUNCTIONS
 * */

function initNavBar() {
    getSectionList().done(response => {
        const size = response.length;
        for (let i = 0; i < size; i++){
            addSectionInNav(response[i]);
        }
    });
}

function getSectionNotes(section_element) {
    removeSectionActive();
    $("#"+section_element.id).addClass("active");
    sessionStorage.setItem('current_section_id', section_element.id);
    $('#new-note-box').removeAttr('hidden');

    getSectionDetail(section_element.id).done(response => {
        drawNotes(response);
    });
}

function saveSectionForm() {
    const section_name = $('#section_name').val();
    const title = $('#title').val();
    const content = $('#content').val();
    const tag_list_element = $("[name='new-tag-list\[\]']");
    let tag_list = [];

    for (let i = 0; i < tag_list_element.length; i++){
        tag_list.push(tag_list_element[i].value);
    }
    const data = {
        'section_name': section_name,
        'title': title,
        'content': content,
        'tags': tag_list
    };

    saveSection(data).done(response => {
        addSectionInNav(response);
        $( () => {
            cleanModalSection();
            $('#modalAddSection').modal('hide');
        });
    });
}

function saveNoteForm() {
    const section_id = sessionStorage.getItem('current_section_id');
    const title = $('#note_title').val();
    const content = $('#note_content').val();
    const common_name = 'note-tags-edited' + section_id + + '[]';
    const tag_list_element = $('[name=\"'+ common_name +'\"]');
    let tag_list = [];
    for (let i = 0; i < tag_list_element.length; i++){
        tag_list.push(tag_list_element[i].value);
    }

    const data = {
        'section_id': section_id,
        'title': title,
        'content': content,
        'tags': tag_list
    };

    addNote(data).done(response => {
        drawNotes(response);
        cleanModalAddNote();
        $( () => {
            $('#modalAddNote').modal('hide');
        });
    });
}

function saveEditedNote() {
    const current_note_id = sessionStorage.getItem('current_note_id');
    const title = $('#note_title').val();
    const content = $('#note_content').val().replaceAll('<br>', '\n');
    const common_name = 'note-tags-edited' + current_note_id + + '[]';
    const tag_list_element = $('[name=\"'+ common_name +'\"]');
    let tag_list = [];
    for (let i = 0; i < tag_list_element.length; i++){
        tag_list.push(tag_list_element[i].value);
    }

    const data = {
        'section_id': sessionStorage.getItem('current_section_id'),
        'note_id': current_note_id,
        'title': title,
        'content': content,
        'tags': tag_list
    };

    editNote(data).done(response => {
        drawNotes(response);
        cleanModalAddNote();
        $( () => {
            $('#modalAddNote').modal('hide');
        });
    });
}
