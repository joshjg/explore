export default {
  fetchLocations: () => (
    fetch('/api/locations', {
      credentials: 'same-origin',
    })
      .then(res => res.json())
  ),

  fetchLocation: id => (
    fetch(`/api/locations/${id}`)
      .then(res => res.json())
  ),

  fetchEvent: id => (
    fetch(`/api/events/${id}`)
      .then(res => res.json())
  ),

  fetchRelatedEvents: id => (
    fetch(`/api/locations/${id}/events`)
      .then(res => res.json())
  ),

  fetchRelatedPhotos: id => (
    fetch(`/api/locations/${id}/photos`)
      .then(res => res.json())
  ),

  putNewLocation: data => (
    fetch('/api/locations', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
      .then(res => res.json())
  ),

  putLocation: (id, data) => (
    fetch(`/api/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
      .then(res => res.json())
  ),

  putEvent: (id, data) => (
    fetch(`/api/locations/${id}/events`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
  ),

  putPhoto: (id, data) => (
    fetch(`/api/locations/${id}/photos`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
  ),

  deleteLocation: id => (
    fetch(`/api/locations/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
  ),

  deleteEvent: id => (
    fetch(`/api/events/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
  ),

  deletePhoto: id => (
    fetch(`/api/photos/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
  ),

  signup: data => (
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) return res.json();
        const err = new Error(res.statusText);
        err.status = res.status;
        throw err;
      })
  ),

  login: data => (
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
      .then((res) => {
        if (res.ok) return res.json();
        const err = new Error(res.statusText);
        err.status = res.status;
        throw err;
      })
  ),

  logout: () => (
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    })
  ),

  auth: () => (
    fetch('/api/auth', {
      credentials: 'same-origin',
    })
      .then(res => res.json())
  ),

  userCanCreate: (nextState, replace, callback) => {
    fetch('/api/auth', {
      credentials: 'same-origin',
    })
      .then(res => res.text())
      .then(text => (text ? JSON.parse(text) : null))
      .then((user) => {
        if (!user || !user.canCreate) {
          replace('/');
        }
        callback();
      })
      .catch((err) => {
        replace('/');
        callback(err);
      });
  },
};
