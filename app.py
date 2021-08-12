import uuid

from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_mongoengine import MongoEngine, DoesNotExist
from models import Section, Note


app = Flask(__name__)
# app.config['MONGODB_SETTINGS'] = {
#     'db': 'notepad_db',
#     'host': '127.0.0.1',
#     'port': 27017,
#     'username': '',
#     'password': ''
# }
app.config.from_object("config.LocalConfig")
db = MongoEngine(app)


@app.route("/", methods=["GET"])
def home():
    return render_template('home.html')


@app.route("/sectionList", methods=["GET", "POST"])
def get_section_list():
    if request.form:
        note_identifier = str(uuid.uuid4())
        today = datetime.now()
        created_date = today.strftime("%d/%m/%Y %H:%M")
        section = Section(section_name=request.form.get("section_name"))
        if request.form.get("title") and request.form.get("content"):
            note = Note(identifier=note_identifier, title=request.form.get("title"),
                        content=request.form.get("content"), created_date=created_date,
                        related_tags=request.form.getlist("tags[]"))
            section.notes = [note]
        section.save()
        return jsonify(section), 201
    section_list = Section.objects()
    return jsonify(section_list)


@app.route("/addNote", methods=["POST"])
def add_note():
    if request.form:
        section_id = request.form.get('section_id')
        section = Section.objects(id=section_id).first()
        note_identifier = str(uuid.uuid4())
        today = datetime.now()
        created_date = today.strftime("%d/%m/%Y %H:%M")
        note = Note(identifier=note_identifier, title=request.form.get("title"),
                    content=request.form.get("content"), created_date=created_date,
                    related_tags=request.form.getlist("tags[]"))
        section.notes.append(note)
        section.save()
        return jsonify(section), 201
    return None


@app.route("/section/<identifier>", methods=["GET"])
def get_section_info(identifier: str):
    try:
        section = Section.objects(id=identifier).first()
        return jsonify(section)
    except DoesNotExist:
        return None


@app.route("/edit-note", methods=["POST"])
def edit_note():
    try:
        section_id = request.form.get('section_id')
        note_id = request.form.get("note_id")
        section = Section.objects(id=section_id).first()
        today = datetime.now()
        last_modified_date = today.strftime("%d/%m/%Y %H:%M")

        for note in section.notes:
            if note.identifier == note_id:
                note.title = request.form.get("title")
                note.content = request.form.get("content")
                note.last_modified_date = last_modified_date
                note.related_tags = request.form.getlist("tags[]")
                break
        section.save()
        return jsonify(section), 201
    except DoesNotExist:
        return None


if __name__ == '__main__':
    app.run(debug=True, host='localhost')
