class Blog {
  constructor(id, image, title, description, date, user_id, verify = false) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.description = description;
    this.date = date;
    this.user_id = user_id;
    this.verify = verify;
  }
}
module.exports = Blog;
