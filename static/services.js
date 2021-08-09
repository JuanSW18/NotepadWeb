function getSectionList() {
    return $.ajax({
        url: 'http://localhost:5000/sectionList',
        dataType: 'json',
        headers: {}
    });
}

function getSectionDetail(identifier) {
    const url = 'http://localhost:5000/section/' + identifier;
    return $.ajax({
        url: url,
        dataType: 'json',
        headers: {}
    });
}

function saveSection(data) {
    return $.ajax({
        type: "POST",
        url: 'http://localhost:5000/sectionList',
        dataType: 'json',
        data: data,
        headers: {}
    });
}

function addNote(data) {
    return $.ajax({
        type: "POST",
        url: 'http://localhost:5000/addNote',
        dataType: 'json',
        data: data,
        headers: {}
    });
}

function editNote(data) {
    return $.ajax({
        type: "POST",
        url: 'http://localhost:5000/edit-note' ,
        dataType: 'json',
        data: data,
        headers: {}
    });
}
