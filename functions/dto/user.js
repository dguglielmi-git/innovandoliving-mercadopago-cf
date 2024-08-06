class UserDTO {
  constructor(user) {
    this.user = user;
  }

  getUserData() {
    return {
      confirmed: this.user.confirmed,
      blocked: this.user.blocked,
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email,
      provider: this.user.provider,
      updateAt: this.user.updateAt,
      role: this.user.role,
      isOwner: this.user.isOwner,
      updated_by: this.user.updated_by,
      language: this.user.language,
    };
  }
}

module.exports = UserDTO;
