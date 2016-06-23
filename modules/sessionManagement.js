// Methods for this module
/*
1. add/remove user
2. find session by id
3. find session by user id
4. check permission
 */

var sessions = [];
var userRoles = {
  Admin: 'administrator',
  User: 'user',
  Supervisor: 'supervisor'
};

var sessionManagement = {

  indexOf: function (sessionId) {
    for (var i in sessions) {
      if (sessions[i].sessionId == sessionId) {
        return i;
      }

      return null;
    }
  },
  indexOfUser: function (userId) {
    for (var i in sessions) {
      if (sessions[i].userId == userId) {
        return i;
      }

      return null;
    }
  },

  add: function (sessionData) {
    sessions.push(sessionData);
  },
  remove: function (sessionId) {
    var index = this.indexOf(sessionId);
    if (index != null) {
      sessions.splice(index, 1);
    } else {
      return null;
    }
  },
  removeByUserId: function (userId) {
    var index = this.indexOfUser(userId);
    if (index != null) {
      sessions.splice(index, 1);
    } else {
      return null;
    }
  },
  getSessionById: function (sessionId) {
    var index = this.indexOf(sessionId);
    if (index != null) {
      return sessions[index];
    } else {
      return null;
    }
  },
  getSessionByUserId: function (userId) {
    var index = this.indexOfUser(userId);
    if (index != null) {
      return sessions[index];
    } else {
      return null;
    }
  },
  isAdmin: function (userId) {
    var index = this.indexOfUser(userId);
    if (index != null) {
      if (sessions[index].role == userRoles.Admin) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  getUsersByRole: function (role) {
    var UsersByRole = [];
    for (var i in users) {
      if (user[i].role == role) {
        UsersByRole.push = user[i];
      }
    }
  }
};

module.exports = sessionManagement;