import mongoengine as me


class Tag(me.Document):
    tag_name = me.StringField(required=True)
    notes_id = me.ListField(me.StringField(required=True))


class Note(me.EmbeddedDocument):
    identifier = me.StringField(required=True)
    title = me.StringField(required=True)
    content = me.StringField(required=True)
    related_tags = me.ListField(me.StringField())
    created_date = me.StringField()
    last_modified_date = me.StringField()


class Section(me.Document):
    section_name = me.StringField(required=True)
    notes = me.EmbeddedDocumentListField(Note)
