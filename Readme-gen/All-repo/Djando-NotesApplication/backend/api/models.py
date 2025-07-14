from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="notes")

    def __str__(self):
        return self.title

# 1.) Model Creation: The Note class is a database model that will translate into a database table named appname_note (where appname is the name of your Django app).
# 2.) Fields:
    # title: Stores the title of the note with a maximum of 100 characters.
    # content: Stores the body of the note with no character limit.
    # created_at: Automatically captures the date and time when the note is created.
    # author: Links the note to a user, creating a one-to-many relationship (one user can have multiple notes).
# 3.) Relationships:
    # ForeignKey is used to establish a relationship between Note and User.
    # on_delete=models.CASCADE ensures that if a user is deleted, all their related notes are also deleted.
    # related_name="notes" lets you access notes of a user using user.notes.
# 4.) String Representation:
    # The __str__ method determines what to display when you print an instance of Note. Here, it returns the note’s title.

'''
### 1. **`CharField`**:
- A `CharField` is used to store short text data, typically a string, with a maximum length limit.
- In this case, `title = models.CharField(max_length=100)` means the title of the note can have up to 100 characters.

### 2. **`TextField`**:
- A `TextField` is used to store large text data such as paragraphs or multi-line content. 
- Here, `content = models.TextField()` allows the storage of any length of text without any character limit.

### 3. **`auto_now_add`**:
- `auto_now_add=True` is a special option for `DateTimeField` that automatically sets the field to the current date and time when the object is created.
- `created_at = models.DateTimeField(auto_now_add=True)` will capture the timestamp of when the note was created automatically and cannot be modified.

### 4. **`self.title`**:
- `self.title` refers to the `title` field of the current instance of the model.
- In the `__str__` method (`def __str__(self):`), `self.title` returns the title of the note when the object is represented as a string, i.e., when printed or displayed.

### Relationships:
- `ForeignKey(User, on_delete=models.CASCADE, related_name="notes")` creates a relationship between the `Note` model and Django’s built-in `User` model.
    - `on_delete=models.CASCADE` ensures that if a user is deleted, all their associated notes are also deleted.
    - `related_name="notes"` allows accessing all notes associated with a specific user using `user.notes`.
'''